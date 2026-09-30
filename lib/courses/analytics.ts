import { formatStudentDisplayName } from "@/lib/courses/display-name";
import { coursePath, lessonPath, registerPath } from "@/lib/courses/paths";
import {
  countCompleted,
  firstAvailableLesson,
  progressLabel,
  publishedLessons,
} from "@/lib/courses/progress";
import {
  ensureCourseStore,
  getStudentById,
  getStudentCourseState,
  listAllEnrollments,
  listCourses,
  listEnrollmentsForStudent,
  listEventsForStudent,
  listPublishedCourses,
} from "@/lib/courses/store";
import type { CourseEnrollment, CourseRecord, CourseStudent } from "@/lib/courses/types";

const ACTIVE_WITHIN_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

export type CourseAnalyticsRow = {
  course: CourseRecord;
  started: number;
  active: number;
  completed: number;
  incomplete: number;
  stalled: number;
  pendingPayment: number;
  learners: Array<{
    student: CourseStudent;
    enrollment: CourseEnrollment;
    status: "active" | "completed" | "stalled" | "pending_payment";
    currentLessonTitle: string;
    progressLabel: string;
    lastActivityAt: string;
  }>;
};

function lastActivityAt(enrollment: CourseEnrollment, eventDates: string[]): string {
  const stamps = [enrollment.startedAt, enrollment.completedAt ?? "", ...eventDates].filter(Boolean);
  return stamps.sort().at(-1) ?? enrollment.startedAt;
}

export async function buildCourseAnalytics(): Promise<CourseAnalyticsRow[]> {
  await ensureCourseStore();
  const courses = await listCourses();
  const enrollments = await listAllEnrollments();

  const rows: CourseAnalyticsRow[] = [];
  for (const course of courses) {
    const courseEnrollments = enrollments.filter((row) => row.courseId === course.id);
    const lessons = publishedLessons(course);
    const learners: CourseAnalyticsRow["learners"] = [];

    for (const enrollment of courseEnrollments) {
      const student = await getStudentById(enrollment.studentId);
      if (!student) continue;
      const state = await getStudentCourseState(student.id, course.id);
      const events = await listEventsForStudent(student.id);
      const courseEvents = events.filter((event) => event.courseId === course.id);
      const lastAt = lastActivityAt(
        enrollment,
        courseEvents.map((event) => event.createdAt)
      );
      const currentLesson =
        lessons.find((lesson) => lesson.id === enrollment.currentLessonId) ??
        (state ? firstAvailableLesson(course, state) : null);
      const total = lessons.length;
      const done = state ? countCompleted(course, state) : 0;
      const label = total > 0 ? `${done} of ${total}` : "—";

      let status: CourseAnalyticsRow["learners"][number]["status"] = "active";
      if (enrollment.paymentStatus === "pending") status = "pending_payment";
      else if (enrollment.completedAt) status = "completed";
      else if (Date.now() - new Date(lastAt).getTime() > ACTIVE_WITHIN_MS) status = "stalled";

      learners.push({
        student,
        enrollment,
        status,
        currentLessonTitle: currentLesson?.title ?? "Not started",
        progressLabel: label,
        lastActivityAt: lastAt,
      });
    }

    learners.sort((a, b) => b.lastActivityAt.localeCompare(a.lastActivityAt));

    rows.push({
      course,
      started: learners.length,
      active: learners.filter((row) => row.status === "active").length,
      completed: learners.filter((row) => row.status === "completed").length,
      incomplete: learners.filter((row) => row.status !== "completed").length,
      stalled: learners.filter((row) => row.status === "stalled").length,
      pendingPayment: learners.filter((row) => row.status === "pending_payment").length,
      learners,
    });
  }

  return rows.sort((a, b) => a.course.sortOrder - b.course.sortOrder);
}

export type StudentDashboardCourse = {
  course: CourseRecord;
  enrollment: CourseEnrollment | null;
  progressLabel: string;
  continueHref: string | null;
  canAccessLessons: boolean;
  statusLabel: string;
};

export async function buildStudentDashboard(studentId: string): Promise<{
  student: CourseStudent;
  myCourses: StudentDashboardCourse[];
  availableCourses: StudentDashboardCourse[];
}> {
  const student = await getStudentById(studentId);
  if (!student) throw new Error("Student not found.");

  const published = await listPublishedCourses();
  const enrollments = await listEnrollmentsForStudent(studentId);
  const byCourse = new Map(enrollments.map((row) => [row.courseId, row]));

  const myCourses: StudentDashboardCourse[] = [];
  const availableCourses: StudentDashboardCourse[] = [];

  for (const course of published) {
    const enrollment = byCourse.get(course.id) ?? null;
    const state = enrollment ? await getStudentCourseState(studentId, course.id) : null;
    const next = state ? firstAvailableLesson(course, state) : null;
    const canAccessLessons =
      !!enrollment &&
      (enrollment.paymentStatus === "not_required" || enrollment.paymentStatus === "granted");

    const row: StudentDashboardCourse = {
      course,
      enrollment,
      progressLabel: state ? progressLabel(course, state) : "Not started",
      continueHref: canAccessLessons
        ? next
          ? lessonPath(course.slug, next.slug)
          : coursePath(course.slug)
        : enrollment
          ? coursePath(course.slug)
          : registerPath(course.slug),
      canAccessLessons,
      statusLabel: !enrollment
        ? course.access === "paid"
          ? course.priceZar
            ? `Paid · R${course.priceZar}`
            : "Paid course"
          : "Free"
        : enrollment.paymentStatus === "pending"
          ? "Waiting for access"
          : enrollment.completedAt
            ? "Completed"
            : "In progress",
    };

    if (enrollment) myCourses.push(row);
    else availableCourses.push(row);
  }

  return { student, myCourses, availableCourses };
}

export function studentDisplayName(student: CourseStudent): string {
  return formatStudentDisplayName(student);
}
