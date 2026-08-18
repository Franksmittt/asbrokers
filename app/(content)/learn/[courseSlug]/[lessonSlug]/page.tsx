import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import {
  HubContentSection,
  PageWithFooter,
} from "@/components/hub/HubContentShell";
import { BlockRenderer } from "@/components/courses/BlockRenderer";
import { FinalOffer } from "@/components/courses/FinalOffer";
import { LessonResponseForm } from "@/components/courses/LessonResponseForm";
import { LessonSidebar } from "@/components/courses/LessonSidebar";
import { getCourseBySlug, getStudentCourseState, openLesson } from "@/lib/courses/store";
import { getLessonAccess, progressLabel, publishedLessons } from "@/lib/courses/progress";
import { coursePath, lessonPath, registerPath } from "@/lib/courses/paths";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
  searchParams: Promise<{ completed?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const lesson = course?.lessons.find((row) => row.slug === lessonSlug);
  return buildPageMetadata({
    path: lessonPath(courseSlug, lessonSlug),
    title: lesson && course ? `${lesson.title} · ${course.title}` : "Lesson",
    description: lesson?.title ?? "Course lesson",
  });
}

export default async function LessonPage({ params, searchParams }: Props) {
  const { courseSlug, lessonSlug } = await params;
  const { completed } = await searchParams;
  const course = getCourseBySlug(courseSlug);
  if (!course || course.status !== "published") notFound();
  const lesson = course.lessons.find((row) => row.slug === lessonSlug && row.status === "published");
  if (!lesson) notFound();

  const studentId = await getCourseStudentId();
  if (course.registrationRequired && !studentId) {
    redirect(registerPath(course.slug));
  }

  let state = studentId ? getStudentCourseState(studentId, course.id) : null;
  if (studentId) {
    const access = openLesson(studentId, course.id, lesson.id);
    if (access === "locked") {
      redirect(coursePath(course.slug));
    }
    state = getStudentCourseState(studentId, course.id);
  } else if (getLessonAccess(course, lesson, null) === "locked") {
    redirect(coursePath(course.slug));
  }

  const lessons = publishedLessons(course);
  const completedThis = Boolean(state?.completedLessonIds.includes(lesson.id) || completed === "1");
  const showOffer = Boolean(lesson.isFinal && lesson.offer && completedThis);

  return (
    <PageWithFooter>
      <header className="border-b border-stone-200/80 bg-white/70 pb-8 pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
            <Link href={coursePath(course.slug)} prefetch={false} className="hover:underline">
              {course.title}
            </Link>
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-shark sm:text-4xl">{lesson.title}</h1>
          <p className="mt-3 text-sm text-stone-500">{progressLabel(course, state)}</p>
        </div>
      </header>
      <HubContentSection className="pt-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0 space-y-10">
            <BlockRenderer blocks={lesson.blocks} />
            {studentId ? (
              <LessonResponseForm
                courseSlug={course.slug}
                lessonSlug={lesson.slug}
                prompt={lesson.responsePrompt || "What is your main takeaway from this lesson?"}
                required={lesson.responseRequired}
                alreadySubmitted={Boolean(state?.responsesByLessonId[lesson.id])}
              />
            ) : null}
            {showOffer && lesson.offer ? (
              <FinalOffer offer={lesson.offer} courseSlug={course.slug} lessonSlug={lesson.slug} />
            ) : null}
            {completedThis && lesson.isFinal ? (
              <p className="text-sm text-stone-500">Course completed. You can revisit any lesson at any time.</p>
            ) : null}
          </article>
          <LessonSidebar course={course} lessons={lessons} currentSlug={lesson.slug} state={state} />
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
