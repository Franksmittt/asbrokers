import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, it, beforeEach } from "node:test";

import {
  DEFAULT_COURSE_CALCULATOR_ID,
  listCourseCalculators,
  sanitizeCourseCalculatorId,
} from "../lib/courses/calculators";
import { canMove, moveBySortOrder } from "../lib/courses/order";
import { mergeCourseStudioSnapshots } from "../lib/courses/merge-snapshot";
import { migrateCourseStudioSnapshot, saveCourseSnapshot, loadCourseSnapshot } from "../lib/courses/persist";
import {
  addBlock,
  addCourseStaffAlert,
  addLesson,
  addLessonComment,
  createCourse,
  deleteLessonComment,
  getCourseById,
  listCommunityAnswers,
  listCourses,
  listLessonComments,
  listUnreadCourseStaffAlerts,
  reorderBlock,
  reorderCourses,
  reorderLessons,
  replyToLessonComment,
  replyToLessonResponse,
  resetCourseStoreForTests,
  submitLessonResponse,
  updateBlock,
  upsertStudent,
} from "../lib/courses/store";
import { formatStudentDisplayName } from "../lib/courses/display-name";
import {
  contentDispositionAttachment,
  coursePdfDownloadHref,
  isPdfUpload,
  sanitizeCoursePdfUrl,
  sanitizePdfFileName,
} from "../lib/courses/pdf";

beforeEach(() => {
  resetCourseStoreForTests();
});

describe("moveBySortOrder", () => {
  it("moves an item down and reindexes 0..n-1", () => {
    const items = [
      { id: "a", sortOrder: 0 },
      { id: "b", sortOrder: 1 },
      { id: "c", sortOrder: 2 },
    ];
    const next = moveBySortOrder(items, "a", "down");
    assert.deepEqual(
      next.map((row) => row.id),
      ["b", "a", "c"]
    );
    assert.deepEqual(
      next.map((row) => row.sortOrder),
      [0, 1, 2]
    );
  });

  it("does not no-op after swapping because sortOrder was left unchanged", () => {
    const items = [
      { id: "heading", sortOrder: 0 },
      { id: "calculator", sortOrder: 1 },
      { id: "text", sortOrder: 2 },
    ];
    const next = moveBySortOrder(items, "calculator", "up");
    assert.equal(next[0]?.id, "calculator");
    assert.equal(next[1]?.id, "heading");
    const again = moveBySortOrder(next, "calculator", "up");
    assert.equal(again[0]?.id, "calculator", "already first — stay first");
  });

  it("canMove matches edges", () => {
    const items = [
      { id: "a", sortOrder: 0 },
      { id: "b", sortOrder: 1 },
    ];
    assert.equal(canMove(items, "a", "up"), false);
    assert.equal(canMove(items, "a", "down"), true);
    assert.equal(canMove(items, "b", "down"), false);
  });
});

describe("course store reorder + calculator replace", () => {
  it("reorders lessons", async () => {
    const course = await createCourse({ title: "Test course", slug: "test-course" });
    const first = await addLesson(course.id, "Lesson A", "lesson-a");
    const second = await addLesson(course.id, "Lesson B", "lesson-b");
    await reorderLessons(course.id, second.id, "up");
    const ordered = [...(await getCourseById(course.id))!.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
    assert.equal(ordered[0]?.id, second.id);
    assert.equal(ordered[1]?.id, first.id);
  });

  it("reorders blocks instead of snapping back", async () => {
    const course = await createCourse({ title: "Blocks", slug: "blocks-course" });
    const lesson = await addLesson(course.id, "One", "one");
    await addBlock(course.id, lesson.id, "calculator");
    const fresh = (await getCourseById(course.id))!.lessons.find((row) => row.id === lesson.id)!;
    const text = fresh.blocks.find((block) => block.type === "text")!;
    const calculator = fresh.blocks.find((block) => block.type === "calculator")!;
    await reorderBlock(course.id, lesson.id, calculator.id, "up");
    const after = (await getCourseById(course.id))!.lessons.find((row) => row.id === lesson.id)!;
    const ordered = [...after.blocks].sort((a, b) => a.sortOrder - b.sortOrder);
    assert.equal(ordered[1]?.id, calculator.id);
    assert.equal(ordered[2]?.id, text.id);
    await reorderBlock(course.id, lesson.id, calculator.id, "up");
    const again = [...(await getCourseById(course.id))!.lessons.find((row) => row.id === lesson.id)!.blocks].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    assert.equal(again[0]?.id, calculator.id);
  });

  it("replaces the calculator on a block and does not snap back to a retired id", async () => {
    const course = await createCourse({ title: "Calcs", slug: "calcs-course" });
    const lesson = await addLesson(course.id, "One", "one");
    const block = await addBlock(course.id, lesson.id, "calculator");
    if (block.type === "calculator") {
      assert.equal(block.calculatorId, DEFAULT_COURSE_CALCULATOR_ID);
    }
    await updateBlock(course.id, lesson.id, block.id, {
      type: "calculator",
      calculatorId: "asset-004-life-of-capital",
    });
    const fresh = (await getCourseById(course.id))!.lessons.find((row) => row.id === lesson.id)!;
    const saved = fresh.blocks.find((row) => row.id === block.id);
    assert.equal(saved?.type, "calculator");
    if (saved?.type === "calculator") {
      assert.equal(saved.calculatorId, "asset-004-life-of-capital");
    }
    await updateBlock(course.id, lesson.id, block.id, {
      type: "calculator",
      calculatorId: "asset-017-personal-goal",
    });
    const migrated = (await getCourseById(course.id))!.lessons.find((row) => row.id === lesson.id)!;
    const afterRetired = migrated.blocks.find((row) => row.id === block.id);
    assert.equal(afterRetired?.type, "calculator");
    if (afterRetired?.type === "calculator") {
      assert.equal(afterRetired.calculatorId, DEFAULT_COURSE_CALCULATOR_ID);
    }
  });

  it("saves a YouTube URL on a video block", async () => {
    const course = await createCourse({ title: "Video", slug: "video-course" });
    const lesson = await addLesson(course.id, "One", "one");
    const block = await addBlock(course.id, lesson.id, "video");
    await updateBlock(course.id, lesson.id, block.id, {
      type: "video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      caption: "Lesson video",
      posterUrl: "",
    });
    const fresh = (await getCourseById(course.id))!.lessons.find((row) => row.id === lesson.id)!;
    const saved = fresh.blocks.find((row) => row.id === block.id);
    assert.equal(saved?.type, "video");
    if (saved?.type === "video") {
      assert.equal(saved.url, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      assert.equal(saved.caption, "Lesson video");
    }
  });

  it("saves a PDF block the client can download and drops unsafe links", async () => {
    const course = await createCourse({ title: "Workbook", slug: "workbook-course" });
    const lesson = await addLesson(course.id, "One", "one");
    const block = await addBlock(course.id, lesson.id, "pdf");
    assert.equal(block.type, "pdf");
    await updateBlock(course.id, lesson.id, block.id, {
      type: "pdf",
      url: "/api/studio/media?bucket=course-pdfs&path=courses/2026-10-12/abc.pdf",
      title: "  Retirement workbook  ",
      fileName: "Retirement workbook.pdf",
    });
    const fresh = (await getCourseById(course.id))!.lessons.find((row) => row.id === lesson.id)!;
    const saved = fresh.blocks.find((row) => row.id === block.id);
    assert.equal(saved?.type, "pdf");
    if (saved?.type !== "pdf") return;
    assert.equal(saved.title, "Retirement workbook");
    assert.equal(saved.fileName, "Retirement workbook.pdf");
    assert.equal(
      saved.url,
      "/api/studio/media?bucket=course-pdfs&path=courses%2F2026-10-12%2Fabc.pdf"
    );
    assert.match(coursePdfDownloadHref(saved.url, saved.fileName), /download=1/);
    assert.match(coursePdfDownloadHref(saved.url, saved.fileName), /Retirement/);

    await updateBlock(course.id, lesson.id, block.id, {
      type: "pdf",
      url: "javascript:alert(1)",
      title: "Nope",
      fileName: "../secret.pdf",
    });
    const blocked = (await getCourseById(course.id))!.lessons
      .find((row) => row.id === lesson.id)!
      .blocks.find((row) => row.id === block.id);
    if (blocked?.type !== "pdf") return;
    assert.equal(blocked.url, "");
    assert.equal(blocked.fileName, "secret.pdf");
  });

  it("reorders courses on the studio list", async () => {
    const extra = await createCourse({ title: "Newest", slug: "newest" });
    const before = await listCourses();
    const originalIndex = before.findIndex((row) => row.id === extra.id);
    assert.ok(originalIndex > 0);
    await reorderCourses(extra.id, "up");
    const after = await listCourses();
    assert.equal(after[originalIndex - 1]?.id, extra.id);
  });
});

describe("course calculator library", () => {
  it("lists staff registry calculators without retired Asset 017", () => {
    const options = listCourseCalculators();
    assert.ok(options.length >= 16);
    assert.ok(options.some((row) => row.id === "asset-001-retirement-growth"));
    assert.ok(options.some((row) => row.id === "asset-014-living-annuity"));
    assert.equal(
      options.some((row) => row.id === "asset-017-personal-goal"),
      false
    );
    assert.equal(sanitizeCourseCalculatorId("asset-017-personal-goal"), DEFAULT_COURSE_CALCULATOR_ID);
    assert.equal(sanitizeCourseCalculatorId(""), DEFAULT_COURSE_CALCULATOR_ID);
  });
});

describe("classroom answers", () => {
  it("shows other students after you submit, and keeps Albert’s personal reply", async () => {
    const course = await createCourse({ title: "Classroom", slug: "classroom-course" });
    const lesson = await addLesson(course.id, "One", "one");
    const albert = await upsertStudent({
      firstName: "Ada",
      surname: "Peters",
      email: "ada@example.com",
      privacyConsent: true,
      marketingConsent: false,
    });
    const classmate = await upsertStudent({
      firstName: "Thabo",
      surname: "Mokoena",
      email: "thabo2@example.com",
      privacyConsent: true,
      marketingConsent: false,
    });
    await submitLessonResponse(classmate.id, course.id, lesson.id, "I am planning the date, not the condition.");
    assert.equal((await listCommunityAnswers(course.id, lesson.id, albert.id)).length, 0);
    await submitLessonResponse(albert.id, course.id, lesson.id, "I need the income picture first.");
    const thread = await listCommunityAnswers(course.id, lesson.id, albert.id);
    assert.equal(thread.length, 2);
    const classmateRow = thread.find((row) => row.displayName.startsWith("Thabo"));
    assert.ok(classmateRow);
    assert.equal(classmateRow?.displayName, "Thabo M.");
    const replied = await replyToLessonResponse(classmateRow!.id, "Keep testing the income against the capital.");
    assert.equal(replied.instructorReply, "Keep testing the income against the capital.");
    const afterReply = await listCommunityAnswers(course.id, lesson.id, albert.id);
    assert.equal(afterReply.find((row) => row.id === classmateRow!.id)?.instructorReply?.includes("income"), true);
  });
});

describe("student display names", () => {
  it("formats first name and surname initial like Frank S.", () => {
    assert.equal(formatStudentDisplayName({ firstName: "Frank", surname: "Smit" }), "Frank S.");
    assert.equal(formatStudentDisplayName({ firstName: "Thabo", surname: "Mokoena" }), "Thabo M.");
    assert.equal(formatStudentDisplayName({ firstName: "Lerato", surname: "" }), "Lerato");
  });
});

describe("lesson comments", () => {
  it("lets students post multiple comments and Albert reply with Frank S. labels", async () => {
    const course = await createCourse({ title: "Engage", slug: "engage-course" });
    const lesson = await addLesson(course.id, "One", "one");
    const frank = await upsertStudent({
      firstName: "Frank",
      surname: "Smit",
      email: "frank@example.com",
      privacyConsent: true,
      marketingConsent: false,
    });
    const thabo = await upsertStudent({
      firstName: "Thabo",
      surname: "Mokoena",
      email: "thabo3@example.com",
      privacyConsent: true,
      marketingConsent: false,
    });
    await addLessonComment(frank.id, course.id, lesson.id, "This lesson clarified the income condition.");
    await addLessonComment(frank.id, course.id, lesson.id, "Going to try the calculator next.");
    await addLessonComment(thabo.id, course.id, lesson.id, "Same realisation here.");
    const thread = await listLessonComments(course.id, lesson.id, frank.id);
    assert.equal(thread.length, 3);
    assert.equal(thread[0]?.displayName, "Frank S.");
    assert.equal(thread[0]?.isMine, true);
    assert.equal(thread[2]?.displayName, "Thabo M.");
    const replied = await replyToLessonComment(thread[0]!.id, "Great start, Frank — bring your numbers.");
    assert.equal(replied.instructorReply?.includes("Frank"), true);
    const after = await listLessonComments(course.id, lesson.id, frank.id);
    assert.equal(after[0]?.instructorReply?.includes("Great start"), true);
  });

  it("creates CRM staff alerts on comment and lets Albert delete comments", async () => {
    const course = await createCourse({ title: "Notify", slug: "notify-course" });
    const lesson = await addLesson(course.id, "One", "one");
    const frank = await upsertStudent({
      firstName: "Frank",
      surname: "Smit",
      email: "frank-notify@example.com",
      privacyConsent: true,
      marketingConsent: false,
    });
    const comment = await addLessonComment(frank.id, course.id, lesson.id, "Please review my drawdown plan.");
    await addCourseStaffAlert({
      type: "comment",
      title: "New lesson comment",
      body: `Frank S. on ${course.title} · ${lesson.title}: Please review my drawdown plan.`,
      href: `/studio/courses/${course.id}/lessons/${lesson.id}`,
      relatedCommentId: comment.id,
      relatedStudentId: frank.id,
      relatedCourseId: course.id,
      relatedLessonId: lesson.id,
    });
    const alerts = await listUnreadCourseStaffAlerts();
    assert.equal(alerts.some((row) => row.relatedCommentId === comment.id), true);
    await deleteLessonComment(comment.id);
    assert.equal((await listLessonComments(course.id, lesson.id)).length, 0);
    assert.equal(
      (await listUnreadCourseStaffAlerts()).some((row) => row.relatedCommentId === comment.id),
      false
    );
  });
});

describe("course studio snapshot", () => {
  it("rewrites retired calculator ids when a snapshot is loaded", () => {
    const migrated = migrateCourseStudioSnapshot({
      version: 1,
      courses: [
        {
          id: "crs_x",
          title: "X",
          slug: "x",
          introduction: "",
          featuredImageUrl: null,
          status: "draft",
          sortOrder: 0,
          registrationRequired: false,
          sequentialLocking: false,
          access: "free",
          priceZar: null,
          accessNote: "",
          createdAt: "2026-01-01T00:00:00.000Z",
          updatedAt: "2026-01-01T00:00:00.000Z",
          lessons: [
            {
              id: "lsn_x",
              courseId: "crs_x",
              title: "One",
              slug: "one",
              sortOrder: 0,
              status: "draft",
              isFinal: false,
              responseRequired: false,
              responsePrompt: "",
              offer: null,
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
              blocks: [{ id: "blk_x", type: "calculator", sortOrder: 0, calculatorId: "asset-017-personal-goal" }],
            },
          ],
        },
      ],
      students: [],
      enrollments: [],
      progress: [],
      responses: [],
      comments: [],
      events: [],
      staffAlerts: [],
      clarityProfiles: [],
      clarityLedger: [],
    });
    const block = migrated.courses[0]?.lessons[0]?.blocks[0];
    assert.equal(block?.type, "calculator");
    if (block?.type === "calculator") {
      assert.equal(block.calculatorId, DEFAULT_COURSE_CALCULATOR_ID);
    }
    assert.ok(Array.isArray(migrated.comments));
    assert.equal(migrated.comments.length, 0);
    assert.ok(Array.isArray(migrated.staffAlerts));
    assert.equal(migrated.staffAlerts.length, 0);
    assert.equal(migrated.courses[0]?.access, "free");
    assert.ok(Array.isArray(migrated.portalConfig.promoSlides));
    assert.ok(migrated.portalConfig.promoSlides.length >= 1);
  });

  it("round-trips a snapshot to disk so a calculator and video stay saved", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "course-studio-"));
    const filePath = path.join(dir, "snapshot.json");
    try {
      await saveCourseSnapshot(
        {
          version: 1,
          courses: [
            {
              id: "crs_saved",
              title: "Saved course",
              slug: "saved-course",
              introduction: "Intro",
              featuredImageUrl: null,
              status: "draft",
              sortOrder: 0,
              registrationRequired: false,
              sequentialLocking: false,
              access: "free",
              priceZar: null,
              accessNote: "",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
              lessons: [
                {
                  id: "lsn_saved",
                  courseId: "crs_saved",
                  title: "One",
                  slug: "one",
                  sortOrder: 0,
                  status: "draft",
                  isFinal: false,
                  responseRequired: false,
                  responsePrompt: "",
                  offer: null,
                  createdAt: "2026-01-01T00:00:00.000Z",
                  updatedAt: "2026-01-01T00:00:00.000Z",
                  blocks: [
                    {
                      id: "blk_calc",
                      type: "calculator",
                      sortOrder: 0,
                      calculatorId: "asset-004-life-of-capital",
                    },
                    {
                      id: "blk_vid",
                      type: "video",
                      sortOrder: 1,
                      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                      caption: "Lesson video",
                    },
                  ],
                },
              ],
            },
          ],
          students: [],
          enrollments: [],
          progress: [],
          responses: [],
          comments: [],
          events: [],
          staffAlerts: [],
          portalConfig: { promoSlides: [] },
          clarityProfiles: [],
          clarityLedger: [],
        },
        filePath
      );
      const raw = JSON.parse(await readFile(filePath, "utf8"));
      assert.equal(raw.courses[0].lessons[0].blocks[0].calculatorId, "asset-004-life-of-capital");
      const loaded = await loadCourseSnapshot(filePath);
      const blocks = loaded?.courses[0]?.lessons[0]?.blocks ?? [];
      assert.equal(blocks[0]?.type, "calculator");
      if (blocks[0]?.type === "calculator") {
        assert.equal(blocks[0].calculatorId, "asset-004-life-of-capital");
      }
      assert.equal(blocks[1]?.type, "video");
      if (blocks[1]?.type === "video") {
        assert.equal(blocks[1].url, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("course PDF downloads", () => {
  it("keeps https links and private media paths, and rejects other URLs", () => {
    assert.equal(sanitizeCoursePdfUrl("https://example.com/files/notes.pdf"), "https://example.com/files/notes.pdf");
    assert.equal(sanitizeCoursePdfUrl("http://example.com/notes.pdf"), "");
    assert.equal(sanitizeCoursePdfUrl("javascript:alert(1)"), "");
    assert.equal(
      sanitizeCoursePdfUrl("/api/studio/media?bucket=course-pdfs&path=../secret.pdf"),
      ""
    );
    assert.equal(sanitizePdfFileName("My workbook.pdf"), "My workbook.pdf");
    assert.equal(sanitizePdfFileName("../../etc/passwd"), "passwd.pdf");
    assert.equal(sanitizePdfFileName(""), "");
    assert.equal(isPdfUpload("application/pdf", "notes.pdf"), true);
    assert.equal(isPdfUpload("", "notes.PDF"), true);
    assert.equal(isPdfUpload("image/png", "notes.pdf"), false);
    assert.equal(isPdfUpload("application/pdf", "notes.exe"), false);
    const href = coursePdfDownloadHref(
      "/api/studio/media?bucket=course-pdfs&path=courses/2026-10-12/file.pdf",
      "Workbook.pdf"
    );
    assert.match(href, /^\/api\/studio\/media\?/);
    assert.match(href, /download=1/);
    assert.match(href, /name=Workbook\.pdf/);
    assert.equal(
      contentDispositionAttachment('bad"name\r\n.pdf'),
      'attachment; filename="bad-name-.pdf"; filename*=UTF-8\'\'bad-name-.pdf'
    );
  });
});

function vitalitySnapshot(status: "draft" | "published", body: string, updatedAt: string) {
  return {
    version: 1 as const,
    courses: [
      {
        id: "crs_health",
        title: "The 104 Week Health Challenge",
        slug: "the-104-week-health-challenge",
        introduction: "",
        featuredImageUrl: null,
        status: "published" as const,
        sortOrder: 0,
        registrationRequired: true,
        sequentialLocking: false,
        access: "free" as const,
        priceZar: null,
        accessNote: "",
        createdAt: "2026-10-01T00:00:00.000Z",
        updatedAt: "2026-10-01T00:00:00.000Z",
        lessons: [
          {
            id: "lsn_watch",
            courseId: "crs_health",
            title: "The Watch That Changed My Behaviour",
            slug: "the-watch-that-changed-my-behaviour",
            sortOrder: 0,
            status: "published" as const,
            isFinal: false,
            responseRequired: true,
            responsePrompt: "What changed?",
            offer: null,
            createdAt: "2026-10-02T00:00:00.000Z",
            updatedAt: "2026-10-02T00:00:00.000Z",
            blocks: [{ id: "blk_watch", type: "text" as const, sortOrder: 0, body: "Lesson 1" }],
          },
          {
            id: "lsn_vitality",
            courseId: "crs_health",
            title: "Vitality Is My Accountability Partner",
            slug: "vitality-is-my-accountability-partner",
            sortOrder: 1,
            status,
            isFinal: false,
            responseRequired: true,
            responsePrompt: "Have you started a routine before?",
            offer: null,
            createdAt: "2026-10-14T19:32:31.717Z",
            updatedAt,
            blocks: [{ id: "blk_vitality", type: "text" as const, sortOrder: 0, body }],
          },
        ],
      },
    ],
    students: [],
    enrollments: [],
    progress: [],
    responses: [],
    comments: [],
    events: [],
    staffAlerts: [],
    portalConfig: { promoSlides: [] },
    clarityProfiles: [],
    clarityLedger: [],
  };
}

describe("course snapshot merge", () => {
  it("keeps a publish when a block save still has the old draft status", () => {
    const base = vitalitySnapshot("draft", "original lesson", "2026-10-16T06:00:00.000Z");
    const blockSave = vitalitySnapshot("draft", "Vitality holds me accountable.", "2026-10-16T06:56:46.983Z");
    const published = vitalitySnapshot("published", "original lesson", "2026-10-16T06:40:00.000Z");
    const merged = mergeCourseStudioSnapshots(base, blockSave, published);
    const lesson = merged.courses[0]?.lessons.find((row) => row.id === "lsn_vitality");
    assert.equal(lesson?.status, "published");
    assert.equal(lesson?.blocks[0] && "body" in lesson.blocks[0] ? lesson.blocks[0].body : "", "Vitality holds me accountable.");
    assert.equal(lesson?.responsePrompt, "Have you started a routine before?");
    assert.equal(merged.courses[0]?.lessons[0]?.title, "The Watch That Changed My Behaviour");
  });

  it("keeps a block edit when this save is the one that publishes", () => {
    const base = vitalitySnapshot("draft", "original lesson", "2026-10-16T06:00:00.000Z");
    const publish = vitalitySnapshot("published", "original lesson", "2026-10-16T06:57:00.000Z");
    const blockSave = vitalitySnapshot("draft", "Vitality holds me accountable.", "2026-10-16T06:56:46.983Z");
    const merged = mergeCourseStudioSnapshots(base, publish, blockSave);
    const lesson = merged.courses[0]?.lessons.find((row) => row.id === "lsn_vitality");
    assert.equal(lesson?.status, "published");
    assert.equal(lesson?.blocks[0] && "body" in lesson.blocks[0] ? lesson.blocks[0].body : "", "Vitality holds me accountable.");
  });
});
