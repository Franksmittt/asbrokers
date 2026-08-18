import { newId, nowIso } from "./ids";
import { createBlock, emptyLesson, sortBlocks } from "./blocks";
import { createSeedCourse, createSeedStudent } from "./seed";
import { getLessonAccess, isLessonComplete, publishedLessons } from "./progress";
import type {
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
  const course = createSeedCourse();
  const student = createSeedStudent();
  const enrollment: CourseEnrollment = {
    id: "enr_sample_preview",
    studentId: student.id,
    courseId: course.id,
    startedAt: nowIso(),
    completedAt: null,
    currentLessonId: course.lessons[0]?.id ?? null,
    offerClickedAt: null,
  };
  return {
    courses: [course],
    students: [student],
    enrollments: [enrollment],
    progress: [],
    responses: [],
    events: [
      {
        id: "evt_sample_start",
        studentId: student.id,
        courseId: course.id,
        lessonId: course.lessons[0]?.id ?? null,
        enrollmentId: enrollment.id,
        type: "course_started",
        createdAt: nowIso(),
      },
    ],
  };
}

const globalForCourses = globalThis as { __asbCourseStore?: CourseStore };

function store(): CourseStore {
  if (!globalForCourses.__asbCourseStore) {
    globalForCourses.__asbCourseStore = emptyStore();
  }
  return globalForCourses.__asbCourseStore;
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

export function listCourses(): CourseRecord[] {
  return [...store().courses].sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
}

export function listPublishedCourses(): CourseRecord[] {
  return listCourses().filter((course) => course.status === "published");
}

export function getCourseById(courseId: string): CourseRecord | null {
  return store().courses.find((row) => row.id === courseId) ?? null;
}

export function getCourseBySlug(slug: string): CourseRecord | null {
  return store().courses.find((row) => row.slug === slug) ?? null;
}

export function createCourse(input: {
  title: string;
  slug: string;
  introduction?: string;
}): CourseRecord {
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
    registrationRequired: true,
    sequentialLocking: true,
    createdAt: stamp,
    updatedAt: stamp,
    lessons: [],
  };
  store().courses.push(course);
  return course;
}

export function updateCourse(
  courseId: string,
  patch: Partial<Omit<CourseRecord, "id" | "lessons" | "createdAt">>
): CourseRecord {
  const course = findCourse(courseId);
  if (patch.slug && patch.slug !== course.slug) {
    if (store().courses.some((row) => row.slug === patch.slug && row.id !== courseId)) {
      throw new Error("A course with this URL already exists.");
    }
  }
  Object.assign(course, patch);
  return touch(course);
}

export function deleteCourse(courseId: string): void {
  const s = store();
  s.courses = s.courses.filter((row) => row.id !== courseId);
  s.enrollments = s.enrollments.filter((row) => row.courseId !== courseId);
}

export function addLesson(courseId: string, title: string, slug: string): CourseLesson {
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
  return lesson;
}

export function updateLesson(
  courseId: string,
  lessonId: string,
  patch: Partial<Omit<CourseLesson, "id" | "courseId" | "blocks" | "createdAt">>
): CourseLesson {
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
  return lesson;
}

export function setLessonOffer(courseId: string, lessonId: string, offer: LessonOffer | null): CourseLesson {
  const { course, lesson } = findLesson(courseId, lessonId);
  lesson.offer = offer;
  lesson.updatedAt = nowIso();
  touch(course);
  return lesson;
}

export function deleteLesson(courseId: string, lessonId: string): void {
  const course = findCourse(courseId);
  course.lessons = course.lessons
    .filter((row) => row.id !== lessonId)
    .map((row, index) => ({ ...row, sortOrder: index }));
  touch(course);
}

export function reorderLessons(courseId: string, lessonId: string, direction: "up" | "down"): void {
  const course = findCourse(courseId);
  const ordered = [...course.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
  const index = ordered.findIndex((row) => row.id === lessonId);
  if (index < 0) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= ordered.length) return;
  const current = ordered[index];
  const other = ordered[swapWith];
  if (!current || !other) return;
  const temp = current.sortOrder;
  current.sortOrder = other.sortOrder;
  other.sortOrder = temp;
  touch(course);
}

export function addBlock(courseId: string, lessonId: string, type: LessonBlock["type"]): LessonBlock {
  const { course, lesson } = findLesson(courseId, lessonId);
  const block = createBlock(type, lesson.blocks.length);
  lesson.blocks.push(block);
  lesson.blocks = sortBlocks(lesson.blocks);
  lesson.updatedAt = nowIso();
  touch(course);
  return block;
}

export function updateBlock(
  courseId: string,
  lessonId: string,
  blockId: string,
  patch: Partial<LessonBlock>
): LessonBlock {
  const { course, lesson } = findLesson(courseId, lessonId);
  const block = lesson.blocks.find((row) => row.id === blockId);
  if (!block) throw new Error("Block not found.");
  Object.assign(block, patch, { id: block.id, type: block.type });
  lesson.updatedAt = nowIso();
  touch(course);
  return block;
}

export function deleteBlock(courseId: string, lessonId: string, blockId: string): void {
  const { course, lesson } = findLesson(courseId, lessonId);
  lesson.blocks = sortBlocks(lesson.blocks.filter((row) => row.id !== blockId));
  lesson.updatedAt = nowIso();
  touch(course);
}

export function reorderBlock(
  courseId: string,
  lessonId: string,
  blockId: string,
  direction: "up" | "down"
): void {
  const { course, lesson } = findLesson(courseId, lessonId);
  const ordered = sortBlocks(lesson.blocks);
  const index = ordered.findIndex((row) => row.id === blockId);
  if (index < 0) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= ordered.length) return;
  const next = [...ordered];
  const current = next[index];
  const other = next[swapWith];
  if (!current || !other) return;
  next[index] = other;
  next[swapWith] = current;
  lesson.blocks = sortBlocks(next);
  lesson.updatedAt = nowIso();
  touch(course);
}

export function listStudents(): CourseStudent[] {
  return [...store().students].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getStudentById(studentId: string): CourseStudent | null {
  return store().students.find((row) => row.id === studentId) ?? null;
}

export function getStudentByEmail(email: string): CourseStudent | null {
  const needle = email.trim().toLowerCase();
  return store().students.find((row) => row.email === needle) ?? null;
}

export function upsertStudent(input: {
  firstName: string;
  surname: string;
  email: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}): CourseStudent {
  const existing = getStudentByEmail(input.email);
  if (existing) {
    existing.firstName = input.firstName;
    existing.surname = input.surname;
    existing.privacyConsent = input.privacyConsent;
    existing.marketingConsent = input.marketingConsent;
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
  return student;
}

export function getEnrollment(studentId: string, courseId: string): CourseEnrollment | null {
  return store().enrollments.find((row) => row.studentId === studentId && row.courseId === courseId) ?? null;
}

export function ensureEnrollment(studentId: string, courseId: string): CourseEnrollment {
  const existing = getEnrollment(studentId, courseId);
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
  return enrollment;
}

export function getStudentCourseState(studentId: string, courseId: string): StudentCourseState | null {
  const student = getStudentById(studentId);
  const enrollment = getEnrollment(studentId, courseId);
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

export function openLesson(studentId: string, courseId: string, lessonId: string): LessonAccess {
  const course = findCourse(courseId);
  const lesson = course.lessons.find((row) => row.id === lessonId);
  if (!lesson) throw new Error("Lesson not found.");
  const enrollment = ensureEnrollment(studentId, courseId);
  const state = getStudentCourseState(studentId, courseId);
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
  }
  enrollment.currentLessonId = lessonId;
  return access;
}

export function submitLessonResponse(
  studentId: string,
  courseId: string,
  lessonId: string,
  answer: string
): void {
  const course = findCourse(courseId);
  const lesson = course.lessons.find((row) => row.id === lessonId);
  if (!lesson) throw new Error("Lesson not found.");
  const enrollment = ensureEnrollment(studentId, courseId);
  const existing = store().responses.find(
    (row) => row.enrollmentId === enrollment.id && row.lessonId === lessonId
  );
  if (existing) {
    existing.answer = answer;
    existing.submittedAt = nowIso();
    return;
  }
  store().responses.push({
    id: newId("rsp"),
    enrollmentId: enrollment.id,
    lessonId,
    answer,
    submittedAt: nowIso(),
  });
}

export function completeLesson(studentId: string, courseId: string, lessonId: string): void {
  const course = findCourse(courseId);
  const lesson = course.lessons.find((row) => row.id === lessonId);
  if (!lesson) throw new Error("Lesson not found.");
  const enrollment = ensureEnrollment(studentId, courseId);
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

  const state = getStudentCourseState(studentId, courseId);
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
}

export function recordOfferClick(studentId: string, courseId: string, lessonId: string): void {
  const enrollment = ensureEnrollment(studentId, courseId);
  if (!enrollment.offerClickedAt) enrollment.offerClickedAt = nowIso();
  recordEvent({
    studentId,
    courseId,
    lessonId,
    enrollmentId: enrollment.id,
    type: "offer_clicked",
  });
}

export function listEventsForStudent(studentId: string): CourseEvent[] {
  return store().events.filter((row) => row.studentId === studentId).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function listResponsesForStudent(studentId: string): LessonResponse[] {
  const enrollmentIds = store()
    .enrollments.filter((row) => row.studentId === studentId)
    .map((row) => row.id);
  return store().responses.filter((row) => enrollmentIds.includes(row.enrollmentId));
}

export function listEnrollmentsForStudent(studentId: string): CourseEnrollment[] {
  return store().enrollments.filter((row) => row.studentId === studentId);
}

export type { PublishStatus };
