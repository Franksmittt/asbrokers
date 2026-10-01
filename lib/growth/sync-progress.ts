import type { CourseRecord } from "@/lib/courses/types";
import { getStudentById, getStudentCourseState } from "@/lib/courses/store";
import { publishedLessons } from "@/lib/courses/progress";

import { recordProgressInfluence } from "./store";

/** Push lesson/course completion into the Influence ledger (best-effort). */
export async function syncGrowthAfterLessonProgress(input: {
  studentId: string;
  course: CourseRecord;
  kind: "lesson" | "offer";
}): Promise<void> {
  try {
    const student = await getStudentById(input.studentId);
    if (!student) return;
    const state = await getStudentCourseState(input.studentId, input.course.id);
    if (!state) return;

    const published = publishedLessons(input.course);
    const total = Math.max(published.length, 1);
    const done = state.completedLessonIds.filter((id) =>
      published.some((lesson) => lesson.id === id)
    ).length;
    const progressPercent = Math.round((done / total) * 100);
    const courseComplete = Boolean(state.enrollment.completedAt) || progressPercent >= 100;

    if (input.kind === "offer") {
      await recordProgressInfluence({
        student,
        course: input.course,
        progressPercent: Math.max(progressPercent, 1),
        eventType: "offer_clicked",
        label: `Offer clicked · ${input.course.title}`,
      });
      return;
    }

    await recordProgressInfluence({
      student,
      course: input.course,
      progressPercent,
      eventType: courseComplete ? "course_completed" : "lesson_completed",
      label: courseComplete
        ? `Completed ${input.course.title}`
        : `Lesson progress ${progressPercent}% · ${input.course.title}`,
    });
  } catch (error) {
    console.error("[growth] syncGrowthAfterLessonProgress failed:", error);
  }
}
