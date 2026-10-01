import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import {
  getCourseBySlug,
  ensureEnrollment,
  getStudentById,
  getStudentCourseState,
} from "@/lib/courses/store";
import { notifyCourseRegistration } from "@/lib/courses/crm-bridge";
import { firstAvailableLesson } from "@/lib/courses/progress";
import {
  coursePath,
  lessonPath,
  registerPath,
  studentAccountPath,
  studentDashboardPath,
} from "@/lib/courses/paths";
import { courseRequiresStudentAuth } from "@/lib/courses/flags";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);
  return buildPageMetadata({
    path: registerPath(courseSlug),
    title: course ? `Start · ${course.title}` : "Start the course",
    description: "Sign in to your Learn account to start this AS Brokers educational course.",
  });
}

/**
 * Enroll a signed-in learner and send them into the course.
 * Guests are sent to Create account / Sign in first.
 */
export default async function CourseRegisterPage({ params }: Props) {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);
  if (!course || course.status !== "published") notFound();

  if (!courseRequiresStudentAuth(course)) {
    redirect(coursePath(course.slug));
  }

  const studentId = await getCourseStudentId();
  if (!studentId) {
    redirect(studentAccountPath({ mode: "signup", next: registerPath(course.slug) }));
  }

  const prior = await getStudentCourseState(studentId, course.id);
  if (!prior) {
    const enrollment = await ensureEnrollment(studentId, course.id);
    const student = await getStudentById(studentId);
    if (student) {
      await notifyCourseRegistration({
        student,
        course,
        isNewEnrollment: true,
      });
    }
    if (enrollment.paymentStatus === "pending") {
      redirect(studentDashboardPath());
    }
  } else if (prior.enrollment.paymentStatus === "pending") {
    redirect(studentDashboardPath());
  }

  const state = await getStudentCourseState(studentId, course.id);
  const next = firstAvailableLesson(course, state);
  redirect(next ? lessonPath(course.slug, next.slug) : coursePath(course.slug));
}
