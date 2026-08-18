import type {
  CourseEnrollment,
  CourseLesson,
  CourseRecord,
  LessonAccess,
  LessonProgress,
  LessonResponse,
  StudentCourseState,
} from "./types";

export function publishedLessons(course: CourseRecord): CourseLesson[] {
  return course.lessons
    .filter((lesson) => lesson.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function isLessonComplete(
  lesson: CourseLesson,
  progress: LessonProgress | undefined,
  response: LessonResponse | undefined
): boolean {
  if (!progress?.completedAt) return false;
  if (lesson.responseRequired && !response) return false;
  return true;
}

export function getLessonAccess(
  course: CourseRecord,
  lesson: CourseLesson,
  state: StudentCourseState | null
): LessonAccess {
  const lessons = publishedLessons(course);
  const completed = new Set(state?.completedLessonIds ?? []);
  if (completed.has(lesson.id)) return "completed";
  if (!course.sequentialLocking) return "available";

  const index = lessons.findIndex((row) => row.id === lesson.id);
  if (index <= 0) return "available";
  const previous = lessons[index - 1];
  return previous && completed.has(previous.id) ? "available" : "locked";
}

export function firstAvailableLesson(
  course: CourseRecord,
  state: StudentCourseState | null
): CourseLesson | null {
  const lessons = publishedLessons(course);
  for (const lesson of lessons) {
    const access = getLessonAccess(course, lesson, state);
    if (access === "available") return lesson;
  }
  return lessons.find((lesson) => getLessonAccess(course, lesson, state) === "completed") ?? lessons[0] ?? null;
}

export function countCompleted(course: CourseRecord, state: StudentCourseState | null): number {
  const published = publishedLessons(course);
  if (!state) return 0;
  return published.filter((lesson) => state.completedLessonIds.includes(lesson.id)).length;
}

export function canCompleteLesson(
  lesson: CourseLesson,
  answer: string | undefined
): { ok: true } | { ok: false; error: string } {
  if (!lesson.responseRequired) return { ok: true };
  if (!answer || answer.trim().length < 8) {
    return { ok: false, error: "This lesson requires a short written response before you can continue." };
  }
  return { ok: true };
}

export function progressLabel(course: CourseRecord, state: StudentCourseState | null): string {
  const total = publishedLessons(course).length;
  const done = countCompleted(course, state);
  if (state?.enrollment.completedAt) return `Course completed · ${done} of ${total} lessons`;
  return `${done} of ${total} lessons completed`;
}

export function nextLesson(
  course: CourseRecord,
  current: CourseLesson
): CourseLesson | null {
  const lessons = publishedLessons(course);
  const index = lessons.findIndex((lesson) => lesson.id === current.id);
  return index >= 0 ? lessons[index + 1] ?? null : null;
}

export type AdminStudentRow = {
  student: import("./types").CourseStudent;
  enrollment: CourseEnrollment | null;
  completedCount: number;
  totalLessons: number;
  currentLessonTitle: string | null;
};
