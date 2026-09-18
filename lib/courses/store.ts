import { newId, nowIso } from "./ids";
import { createBlock, emptyLesson, sortBlocks } from "./blocks";
import { sanitizeCourseCalculatorId } from "./calculators";
import { COURSE_STUDENT_AUTH_ENABLED } from "./flags";
import { moveBySortOrder } from "./order";
import {
  loadCourseSnapshot,
  saveCourseSnapshot,
  type CourseStudioSnapshot,
} from "./persist";
import { createDemoClassroom, createSeedCourses } from "./seed";
import { getLessonAccess, isLessonComplete, publishedLessons } from "./progress";
import type {
  CommunityAnswer,
  CourseEnrollment,
  CourseEvent,
  CourseEventType,
  CourseLesson,
  CourseRecord,
  CourseStudent,
  LessonAccess,
  LessonBlock,
  LessonOffer,
  LessonProgress,
  LessonResponse,
  PublishStatus,
  StudentCourseState,
} from "./types";

type CourseStore = {
  courses: CourseRecord[];
  students: CourseStudent[];
  enrollments: CourseEnrollment[];
  progress: LessonProgress[];
  responses: LessonResponse[];
  events: CourseEvent[];
};

function emptyStore(): CourseStore {
  const classroom = createDemoClassroom();
  return {
    courses: createSeedCourses(),
    students: classroom.students,
    enrollments: classroom.enrollments,
    progress: classroom.progress,
    responses: classroom.responses,
    events: classroom.events,
  };
}

type CourseStoreGlobal = {
  __asbCourseStore?: CourseStore;
  __asbCourseHydrated?: boolean;
  __asbCourseHydratePromise?: Promise<void> | null;
  __asbCoursePersistEnabled?: boolean;
};

const globalForCourses = globalThis as CourseStoreGlobal;

function persistEnabled(): boolean {
  return globalForCourses.__asbCoursePersistEnabled !== false;
}

function snapshotFromStore(value: CourseStore): CourseStudioSnapshot {
  return {
    version: 1,
    courses: value.courses,
    students: value.students,
    enrollments: value.enrollments,
    progress: value.progress,
    responses: value.responses,
    events: value.events,
  };
}

function applySnapshot(snapshot: CourseStudioSnapshot): CourseStore {
  return {
    courses: snapshot.courses,
    students: snapshot.students,
    enrollments: snapshot.enrollments,
    progress: snapshot.progress,
    responses: snapshot.responses,
    events: snapshot.events,
  };
}

function store(): CourseStore {
  const value = globalForCourses.__asbCourseStore;
  if (!value) {
    throw new Error("Course store used before ensureCourseStore().");
  }
  return value;
}

async function persistIfEnabled(): Promise<void> {
  if (!persistEnabled()) return;
  await saveCourseSnapshot(snapshotFromStore(store()));
}

export async function ensureCourseStore(): Promise<void> {
  if (globalForCourses.__asbCourseHydrated) return;
  if (!globalForCourses.__asbCourseHydratePromise) {
    globalForCourses.__asbCourseHydratePromise = (async () => {
      if (!persistEnabled()) {
        globalForCourses.__asbCourseStore ??= emptyStore();
        globalForCourses.__asbCourseHydrated = true;
        return;
      }
      const snapshot = await loadCourseSnapshot();
      globalForCourses.__asbCourseStore = snapshot ? applySnapshot(snapshot) : emptyStore();
      if (!snapshot) await persistIfEnabled();
      globalForCourses.__asbCourseHydrated = true;
    })();
  }
  await globalForCourses.__asbCourseHydratePromise;
}

function touch(course: CourseRecord): CourseRecord {
  course.updatedAt = nowIso();
  return course;
}

function findCourse(courseId: string): CourseRecord {
  const course = store().courses.find((row) => row.id === courseId);
  if (!course) throw new Error("Course not found.");
  return course;
}

function findLesson(courseId: string, lessonId: string): { course: CourseRecord; lesson: CourseLesson } {
  const course = findCourse(courseId);
  const lesson = course.lessons.find((row) => row.id === lessonId);
  if (!lesson) throw new Error("Lesson not found.");
  return { course, lesson };
}

function recordEvent(input: {
  studentId: string;
  courseId: string;
  lessonId?: string | null;
  enrollmentId?: string | null;
  type: CourseEventType;
}): void {
  store().events.push({
    id: newId("evt"),
    studentId: input.studentId,
    courseId: input.courseId,
    lessonId: input.lessonId ?? null,
    enrollmentId: input.enrollmentId ?? null,
    type: input.type,
    createdAt: nowIso(),
  });
}

export async function listCourses(): Promise<CourseRecord[]> {
  await ensureCourseStore();
  return [...store().courses].sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
}

export async function listPublishedCourses(): Promise<CourseRecord[]> {
  const courses = await listCourses();
  return courses.filter((course) => course.status === "published");
}

export async function getCourseById(courseId: string): Promise<CourseRecord | null> {
  await ensureCourseStore();
  return store().courses.find((row) => row.id === courseId) ?? null;
}

export async function getCourseBySlug(slug: string): Promise<CourseRecord | null> {
  await ensureCourseStore();
  return store().courses.find((row) => row.slug === slug) ?? null;
}

export async function createCourse(input: {
  title: string;
  slug: string;
  introduction?: string;
}): Promise<CourseRecord> {
  await ensureCourseStore();
  const existing = store().courses.some((row) => row.slug === input.slug);
  if (existing) throw new Error("A course with this URL already exists.");
  const stamp = nowIso();
  const course: CourseRecord = {
    id: newId("crs"),
    title: input.title,
    slug: input.slug,
    introduction: input.introduction ?? "",
    featuredImageUrl: null,
    status: "draft",
    sortOrder: store().courses.length,
    registrationRequired: COURSE_STUDENT_AUTH_ENABLED,
    sequentialLocking: COURSE_STUDENT_AUTH_ENABLED,
    createdAt: stamp,
    updatedAt: stamp,
    lessons: [],
  };
  store().courses.push(course);
  await persistIfEnabled();
  return course;
}

export async function updateCourse(
  courseId: string,
  patch: Partial<Omit<CourseRecord, "id" | "lessons" | "createdAt">>
): Promise<CourseRecord> {
  await ensureCourseStore();
  const course = findCourse(courseId);
  if (patch.slug && patch.slug !== course.slug) {
    if (store().courses.some((row) => row.slug === patch.slug && row.id !== courseId)) {
      throw new Error("A course with this URL already exists.");
    }
  }
  Object.assign(course, patch);
  const saved = touch(course);
  await persistIfEnabled();
  return saved;
}

export async function deleteCourse(courseId: string): Promise<void> {
  await ensureCourseStore();
  const s = store();
  s.courses = s.courses.filter((row) => row.id !== courseId);
  s.enrollments = s.enrollments.filter((row) => row.courseId !== courseId);
  await persistIfEnabled();
}

export async function addLesson(courseId: string, title: string, slug: string): Promise<CourseLesson> {
  await ensureCourseStore();
  const course = findCourse(courseId);
  if (course.lessons.some((row) => row.slug === slug)) {
    throw new Error("A lesson with this URL already exists in this course.");
  }
  const lesson = emptyLesson(courseId, title, slug, course.lessons.length);
  if (course.lessons.length === 0) {
    lesson.blocks[0] = { ...lesson.blocks[0], type: "heading", level: 2, text: title, sortOrder: 0 } as LessonBlock;
  }
  course.lessons.push(lesson);
  touch(course);
  await persistIfEnabled();
  return lesson;
}

export async function updateLesson(
  courseId: string,
  lessonId: string,
  patch: Partial<Omit<CourseLesson, "id" | "courseId" | "blocks" | "createdAt">>
): Promise<CourseLesson> {
  await ensureCourseStore();
  const { course, lesson } = findLesson(courseId, lessonId);
  if (patch.slug && patch.slug !== lesson.slug) {
    if (course.lessons.some((row) => row.slug === patch.slug && row.id !== lessonId)) {
      throw new Error("A lesson with this URL already exists in this course.");
    }
  }
  if (patch.isFinal === true) {
    course.lessons.forEach((row) => {
      row.isFinal = row.id === lessonId;
    });
  }
  const { isFinal, ...rest } = patch;
  Object.assign(lesson, rest);
  if (isFinal === false) {
    lesson.isFinal = false;
  } else if (isFinal === true) {
    lesson.isFinal = true;
  }
  lesson.updatedAt = nowIso();
  touch(course);
  await persistIfEnabled();
  return lesson;
}

export async function setLessonOffer(courseId: string, lessonId: string, offer: LessonOffer | null): Promise<CourseLesson> {
  await ensureCourseStore();
  const { course, lesson } = findLesson(courseId, lessonId);
  lesson.offer = offer;
  lesson.updatedAt = nowIso();
  touch(course);
  await persistIfEnabled();
  return lesson;
}

export async function deleteLesson(courseId: string, lessonId: string): Promise<void> {
  await ensureCourseStore();
  const course = findCourse(courseId);
  course.lessons = course.lessons
    .filter((row) => row.id !== lessonId)
    .map((row, index) => ({ ...row, sortOrder: index }));
  touch(course);
  await persistIfEnabled();
}

export async function reorderLessons(courseId: string, lessonId: string, direction: "up" | "down"): Promise<void> {
  await ensureCourseStore();
  const course = findCourse(courseId);
  course.lessons = moveBySortOrder(course.lessons, lessonId, direction);
  touch(course);
  await persistIfEnabled();
}

export async function reorderCourses(courseId: string, direction: "up" | "down"): Promise<void> {
  await ensureCourseStore();
  const s = store();
  s.courses = moveBySortOrder(s.courses, courseId, direction);
  await persistIfEnabled();
}

export async function addBlock(courseId: string, lessonId: string, type: LessonBlock["type"]): Promise<LessonBlock> {
  await ensureCourseStore();
  const { course, lesson } = findLesson(courseId, lessonId);
  const block = createBlock(type, lesson.blocks.length);
  lesson.blocks.push(block);
  lesson.blocks = sortBlocks(lesson.blocks);
  lesson.updatedAt = nowIso();
  touch(course);
  await persistIfEnabled();
  return block;
}

export async function updateBlock(
  courseId: string,
  lessonId: string,
  blockId: string,
  patch: Partial<LessonBlock>
): Promise<LessonBlock> {
  await ensureCourseStore();
  const { course, lesson } = findLesson(courseId, lessonId);
  const block = lesson.blocks.find((row) => row.id === blockId);
  if (!block) throw new Error("Block not found.");
  const nextPatch =
    patch.type === "calculator" && "calculatorId" in patch
      ? { ...patch, calculatorId: sanitizeCourseCalculatorId(patch.calculatorId) }
      : patch;
  Object.assign(block, nextPatch, { id: block.id, type: block.type });
  lesson.updatedAt = nowIso();
  touch(course);
  await persistIfEnabled();
  return block;
}

export async function deleteBlock(courseId: string, lessonId: string, blockId: string): Promise<void> {
  await ensureCourseStore();
  const { course, lesson } = findLesson(courseId, lessonId);
  lesson.blocks = sortBlocks(lesson.blocks.filter((row) => row.id !== blockId));
  lesson.updatedAt = nowIso();
  touch(course);
  await persistIfEnabled();
}

export async function reorderBlock(
  courseId: string,
  lessonId: string,
  blockId: string,
  direction: "up" | "down"
): Promise<void> {
  await ensureCourseStore();
  const { course, lesson } = findLesson(courseId, lessonId);
  lesson.blocks = moveBySortOrder(lesson.blocks, blockId, direction);
  lesson.updatedAt = nowIso();
  touch(course);
  await persistIfEnabled();
}

export function resetCourseStoreForTests(): void {
  globalForCourses.__asbCoursePersistEnabled = false;
  globalForCourses.__asbCourseHydrated = true;
  globalForCourses.__asbCourseHydratePromise = Promise.resolve();
  globalForCourses.__asbCourseStore = emptyStore();
}

export async function listStudents(): Promise<CourseStudent[]> {
  await ensureCourseStore();
  return [...store().students].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getStudentById(studentId: string): Promise<CourseStudent | null> {
  await ensureCourseStore();
  return store().students.find((row) => row.id === studentId) ?? null;
}

export async function getStudentByEmail(email: string): Promise<CourseStudent | null> {
  await ensureCourseStore();
  const needle = email.trim().toLowerCase();
  return store().students.find((row) => row.email === needle) ?? null;
}

export async function upsertStudent(input: {
  firstName: string;
  surname: string;
  email: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}): Promise<CourseStudent> {
  await ensureCourseStore();
  const existing = store().students.find((row) => row.email === input.email.trim().toLowerCase());
  if (existing) {
    existing.firstName = input.firstName;
    existing.surname = input.surname;
    existing.privacyConsent = input.privacyConsent;
    existing.marketingConsent = input.marketingConsent;
    await persistIfEnabled();
    return existing;
  }
  const student: CourseStudent = {
    id: newId("stu"),
    firstName: input.firstName,
    surname: input.surname,
    email: input.email.trim().toLowerCase(),
    phone: null,
    privacyConsent: input.privacyConsent,
    marketingConsent: input.marketingConsent,
    createdAt: nowIso(),
  };
  store().students.push(student);
  await persistIfEnabled();
  return student;
}

export async function getEnrollment(studentId: string, courseId: string): Promise<CourseEnrollment | null> {
  await ensureCourseStore();
  return store().enrollments.find((row) => row.studentId === studentId && row.courseId === courseId) ?? null;
}

export async function ensureEnrollment(studentId: string, courseId: string): Promise<CourseEnrollment> {
  await ensureCourseStore();
  const existing = store().enrollments.find((row) => row.studentId === studentId && row.courseId === courseId);
  if (existing) return existing;
  const course = findCourse(courseId);
  const enrollment: CourseEnrollment = {
    id: newId("enr"),
    studentId,
    courseId,
    startedAt: nowIso(),
    completedAt: null,
    currentLessonId: publishedLessons(course)[0]?.id ?? null,
    offerClickedAt: null,
  };
  store().enrollments.push(enrollment);
  recordEvent({
    studentId,
    courseId,
    enrollmentId: enrollment.id,
    lessonId: enrollment.currentLessonId,
    type: "course_started",
  });
  await persistIfEnabled();
  return enrollment;
}

export async function getStudentCourseState(studentId: string, courseId: string): Promise<StudentCourseState | null> {
  await ensureCourseStore();
  const student = store().students.find((row) => row.id === studentId);
  const enrollment = store().enrollments.find((row) => row.studentId === studentId && row.courseId === courseId);
  if (!student || !enrollment) return null;
  const progressRows = store().progress.filter((row) => row.enrollmentId === enrollment.id);
  const responses = store().responses.filter((row) => row.enrollmentId === enrollment.id);
  const course = findCourse(courseId);
  const completedLessonIds = course.lessons
    .filter((lesson) => {
      const progress = progressRows.find((row) => row.lessonId === lesson.id);
      const response = responses.find((row) => row.lessonId === lesson.id);
      return isLessonComplete(lesson, progress, response);
    })
    .map((lesson) => lesson.id);

  return {
    student,
    enrollment,
    completedLessonIds,
    responsesByLessonId: Object.fromEntries(responses.map((row) => [row.lessonId, row])),
    offerClicked: Boolean(enrollment.offerClickedAt),
  };
}

export async function openLesson(studentId: string, courseId: string, lessonId: string): Promise<LessonAccess> {
  await ensureCourseStore();
  const course = findCourse(courseId);
  const lesson = course.lessons.find((row) => row.id === lessonId);
  if (!lesson) throw new Error("Lesson not found.");
  const enrollment = await ensureEnrollment(studentId, courseId);
  const state = await getStudentCourseState(studentId, courseId);
  const access = getLessonAccess(course, lesson, state);
  if (access === "locked") return "locked";

  const existing = store().progress.find(
    (row) => row.enrollmentId === enrollment.id && row.lessonId === lessonId
  );
  if (!existing) {
    store().progress.push({
      id: newId("prg"),
      enrollmentId: enrollment.id,
      lessonId,
      openedAt: nowIso(),
      completedAt: null,
    });
    recordEvent({
      studentId,
      courseId,
      lessonId,
      enrollmentId: enrollment.id,
      type: "lesson_opened",
    });
    await persistIfEnabled();
  }
  enrollment.currentLessonId = lessonId;
  await persistIfEnabled();
  return access;
}

export async function submitLessonResponse(
  studentId: string,
  courseId: string,
  lessonId: string,
  answer: string
): Promise<void> {
  await ensureCourseStore();
  const course = findCourse(courseId);
  const lesson = course.lessons.find((row) => row.id === lessonId);
  if (!lesson) throw new Error("Lesson not found.");
  const enrollment = await ensureEnrollment(studentId, courseId);
  const existing = store().responses.find(
    (row) => row.enrollmentId === enrollment.id && row.lessonId === lessonId
  );
  if (existing) {
    existing.answer = answer;
    existing.submittedAt = nowIso();
    await persistIfEnabled();
    return;
  }
  store().responses.push({
    id: newId("rsp"),
    enrollmentId: enrollment.id,
    lessonId,
    answer,
    submittedAt: nowIso(),
    instructorReply: null,
    instructorRepliedAt: null,
  });
  await persistIfEnabled();
}

export async function completeLesson(studentId: string, courseId: string, lessonId: string): Promise<void> {
  await ensureCourseStore();
  const course = findCourse(courseId);
  const lesson = course.lessons.find((row) => row.id === lessonId);
  if (!lesson) throw new Error("Lesson not found.");
  const enrollment = await ensureEnrollment(studentId, courseId);
  if (lesson.responseRequired) {
    const response = store().responses.find(
      (row) => row.enrollmentId === enrollment.id && row.lessonId === lessonId
    );
    if (!response) throw new Error("A written response is required before this lesson can be completed.");
  }

  let progress = store().progress.find(
    (row) => row.enrollmentId === enrollment.id && row.lessonId === lessonId
  );
  if (!progress) {
    progress = {
      id: newId("prg"),
      enrollmentId: enrollment.id,
      lessonId,
      openedAt: nowIso(),
      completedAt: null,
    };
    store().progress.push(progress);
  }
  if (!progress.completedAt) {
    progress.completedAt = nowIso();
    recordEvent({
      studentId,
      courseId,
      lessonId,
      enrollmentId: enrollment.id,
      type: "lesson_completed",
    });
  }

  const state = await getStudentCourseState(studentId, courseId);
  const published = publishedLessons(course);
  const allDone = published.every((row) => state?.completedLessonIds.includes(row.id));
  if ((lesson.isFinal || allDone) && !enrollment.completedAt) {
    enrollment.completedAt = nowIso();
    recordEvent({
      studentId,
      courseId,
      lessonId,
      enrollmentId: enrollment.id,
      type: "course_completed",
    });
  }
  await persistIfEnabled();
}

export async function recordOfferClick(studentId: string, courseId: string, lessonId: string): Promise<void> {
  const enrollment = await ensureEnrollment(studentId, courseId);
  if (!enrollment.offerClickedAt) enrollment.offerClickedAt = nowIso();
  recordEvent({
    studentId,
    courseId,
    lessonId,
    enrollmentId: enrollment.id,
    type: "offer_clicked",
  });
  await persistIfEnabled();
}

export async function listEventsForStudent(studentId: string): Promise<CourseEvent[]> {
  await ensureCourseStore();
  return store().events.filter((row) => row.studentId === studentId).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function listResponsesForStudent(studentId: string): Promise<LessonResponse[]> {
  await ensureCourseStore();
  const enrollmentIds = store()
    .enrollments.filter((row) => row.studentId === studentId)
    .map((row) => row.id);
  return store().responses.filter((row) => enrollmentIds.includes(row.enrollmentId));
}

export async function listEnrollmentsForStudent(studentId: string): Promise<CourseEnrollment[]> {
  await ensureCourseStore();
  return store().enrollments.filter((row) => row.studentId === studentId);
}

function communityDisplayName(student: CourseStudent): string {
  const initial = student.surname.trim().charAt(0).toUpperCase();
  return initial ? `${student.firstName} ${initial}.` : student.firstName;
}

export async function listCommunityAnswers(
  courseId: string,
  lessonId: string,
  viewerStudentId?: string | null
): Promise<CommunityAnswer[]> {
  await ensureCourseStore();
  const enrollmentIds = store()
    .enrollments.filter((row) => row.courseId === courseId)
    .map((row) => row.id);
  const viewerEnrollment = viewerStudentId
    ? store().enrollments.find((row) => row.studentId === viewerStudentId && row.courseId === courseId)
    : null;
  const viewerHasSubmitted = Boolean(
    viewerEnrollment &&
      store().responses.some((row) => row.enrollmentId === viewerEnrollment.id && row.lessonId === lessonId)
  );
  if (viewerStudentId && !viewerHasSubmitted) return [];

  return store()
    .responses.filter((row) => enrollmentIds.includes(row.enrollmentId) && row.lessonId === lessonId)
    .sort((a, b) => a.submittedAt.localeCompare(b.submittedAt))
    .map((row) => {
      const enrollment = store().enrollments.find((item) => item.id === row.enrollmentId);
      const student = enrollment ? store().students.find((item) => item.id === enrollment.studentId) : null;
      return {
        id: row.id,
        displayName: student ? communityDisplayName(student) : "Student",
        answer: row.answer,
        submittedAt: row.submittedAt,
        instructorReply: row.instructorReply ?? null,
        instructorRepliedAt: row.instructorRepliedAt ?? null,
        isMine: Boolean(viewerEnrollment && row.enrollmentId === viewerEnrollment.id),
      };
    });
}

export async function replyToLessonResponse(responseId: string, reply: string): Promise<LessonResponse> {
  await ensureCourseStore();
  const response = store().responses.find((row) => row.id === responseId);
  if (!response) throw new Error("Answer not found.");
  const text = reply.trim();
  if (!text) throw new Error("Write a short reply before sending.");
  response.instructorReply = text;
  response.instructorRepliedAt = nowIso();
  await persistIfEnabled();
  return response;
}

export type { PublishStatus };
