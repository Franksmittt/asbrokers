"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { lessonResponseSchema, studentRegisterSchema } from "@/lib/courses/schema";
import { coursePath, lessonPath, registerPath } from "@/lib/courses/paths";
import {
  completeLesson,
  ensureEnrollment,
  getCourseBySlug,
  getStudentCourseState,
  openLesson,
  recordOfferClick,
  submitLessonResponse,
  upsertStudent,
} from "@/lib/courses/store";
import { firstAvailableLesson, nextLesson } from "@/lib/courses/progress";
import {
  getCourseStudentId,
  setCourseStudentCookie,
} from "@/lib/courses/student-session";

export type LearnActionState = {
  ok: boolean;
  message?: string;
};

export async function registerForCourse(
  _prev: LearnActionState,
  formData: FormData
): Promise<LearnActionState> {
  if (String(formData.get("website") ?? "")) {
    return { ok: true };
  }

  const parsed = studentRegisterSchema.safeParse({
    firstName: formData.get("firstName"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    privacyConsent: formData.get("privacyConsent"),
    marketingConsent: formData.get("marketingConsent"),
    courseSlug: formData.get("courseSlug"),
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const course = getCourseBySlug(parsed.data.courseSlug);
  if (!course || course.status !== "published") {
    return { ok: false, message: "This course is not available." };
  }

  const student = upsertStudent({
    firstName: parsed.data.firstName,
    surname: parsed.data.surname,
    email: parsed.data.email,
    privacyConsent: Boolean(parsed.data.privacyConsent),
    marketingConsent: Boolean(parsed.data.marketingConsent),
  });
  await setCourseStudentCookie(student.id);
  ensureEnrollment(student.id, course.id);
  const state = getStudentCourseState(student.id, course.id);
  const next = firstAvailableLesson(course, state);
  revalidatePath(coursePath(course.slug));
  revalidatePath("/studio/courses/students");
  redirect(next ? lessonPath(course.slug, next.slug) : coursePath(course.slug));
}

export async function submitLessonAnswer(
  _prev: LearnActionState,
  formData: FormData
): Promise<LearnActionState> {
  const parsed = lessonResponseSchema.safeParse({
    courseSlug: formData.get("courseSlug"),
    lessonSlug: formData.get("lessonSlug"),
    answer: formData.get("answer"),
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Please write a short answer." };
  }

  const course = getCourseBySlug(parsed.data.courseSlug);
  const lesson = course?.lessons.find((row) => row.slug === parsed.data.lessonSlug);
  if (!course || !lesson) return { ok: false, message: "Lesson not found." };

  const studentId = await getCourseStudentId();
  if (!studentId) {
    redirect(registerPath(course.slug));
  }

  submitLessonResponse(studentId, course.id, lesson.id, parsed.data.answer);
  completeLesson(studentId, course.id, lesson.id);
  revalidatePath(lessonPath(course.slug, lesson.slug));
  revalidatePath(coursePath(course.slug));
  revalidatePath("/studio/courses/students");

  if (lesson.isFinal) {
    redirect(`${lessonPath(course.slug, lesson.slug)}?completed=1`);
  }
  const following = nextLesson(course, lesson);
  if (following) {
    redirect(lessonPath(course.slug, following.slug));
  }
  redirect(coursePath(course.slug));
}

export async function continueLesson(
  _prev: LearnActionState,
  formData: FormData
): Promise<LearnActionState> {
  const courseSlug = String(formData.get("courseSlug") ?? "");
  const lessonSlug = String(formData.get("lessonSlug") ?? "");
  const course = getCourseBySlug(courseSlug);
  const lesson = course?.lessons.find((row) => row.slug === lessonSlug);
  if (!course || !lesson) return { ok: false, message: "Lesson not found." };
  if (lesson.responseRequired) {
    return { ok: false, message: "This lesson requires a written response." };
  }

  const studentId = await getCourseStudentId();
  if (!studentId) redirect(registerPath(course.slug));

  openLesson(studentId, course.id, lesson.id);
  completeLesson(studentId, course.id, lesson.id);
  revalidatePath(lessonPath(course.slug, lesson.slug));
  revalidatePath("/studio/courses/students");

  if (lesson.isFinal) {
    redirect(`${lessonPath(course.slug, lesson.slug)}?completed=1`);
  }
  const following = nextLesson(course, lesson);
  if (following) redirect(lessonPath(course.slug, following.slug));
  redirect(coursePath(course.slug));
}

export async function trackOfferClick(formData: FormData): Promise<void> {
  const courseSlug = String(formData.get("courseSlug") ?? "");
  const lessonSlug = String(formData.get("lessonSlug") ?? "");
  const url = String(formData.get("url") ?? "/");
  const newTab = String(formData.get("newTab") ?? "") === "true";
  const course = getCourseBySlug(courseSlug);
  const lesson = course?.lessons.find((row) => row.slug === lessonSlug);
  const studentId = await getCourseStudentId();
  if (course && lesson && studentId) {
    recordOfferClick(studentId, course.id, lesson.id);
    revalidatePath("/studio/courses/students");
  }
  if (!newTab && url.startsWith("/")) {
    redirect(url);
  }
}
