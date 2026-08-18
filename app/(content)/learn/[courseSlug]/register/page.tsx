import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import {
  HubContentSection,
  HubUtilityHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";
import { RegisterForm } from "@/components/courses/RegisterForm";
import { getCourseBySlug, getStudentCourseState } from "@/lib/courses/store";
import { firstAvailableLesson } from "@/lib/courses/progress";
import { coursePath, lessonPath, registerPath } from "@/lib/courses/paths";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  return buildPageMetadata({
    path: registerPath(courseSlug),
    title: course ? `Register · ${course.title}` : "Register for the course",
    description: "Register with your name and email to start this free AS Brokers educational course.",
  });
}

export default async function CourseRegisterPage({ params }: Props) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course || course.status !== "published") notFound();

  const studentId = await getCourseStudentId();
  const state = studentId ? getStudentCourseState(studentId, course.id) : null;
  if (state) {
    const next = firstAvailableLesson(course, state);
    redirect(next ? lessonPath(course.slug, next.slug) : coursePath(course.slug));
  }

  if (!course.registrationRequired) {
    redirect(coursePath(course.slug));
  }

  return (
    <PageWithFooter>
      <HubUtilityHero
        kicker="Free course registration"
        title={course.title}
        description="A few details so we can remember your progress and keep lesson answers private. This course is free."
      />
      <HubContentSection className="pt-0">
        <div className="mx-auto max-w-xl">
          <RegisterForm courseSlug={course.slug} courseTitle={course.title} />
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
