import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  HubContentSection,
  HubUtilityHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";
import { LessonSidebar } from "@/components/courses/LessonSidebar";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getCourseBySlug, getStudentCourseState } from "@/lib/courses/store";
import { firstAvailableLesson, publishedLessons, progressLabel } from "@/lib/courses/progress";
import { coursePath, lessonPath, registerPath } from "@/lib/courses/paths";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { renderLessonText } from "@/lib/courses/text";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BTN_PRIMARY, WARM_BTN_SECONDARY } from "@/lib/warm-theme";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course || course.status !== "published") {
    return { title: "Course" };
  }
  return buildPageMetadata({
    path: coursePath(course.slug),
    title: course.title,
    description: course.introduction.slice(0, 180),
  });
}

export default async function CourseOverviewPage({ params }: Props) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course || course.status !== "published") notFound();

  const studentId = await getCourseStudentId();
  const state = studentId ? getStudentCourseState(studentId, course.id) : null;
  const lessons = publishedLessons(course);
  const resume = firstAvailableLesson(course, state);

  const startHref = resume
    ? lessonPath(course.slug, resume.slug)
    : registerPath(course.slug);

  return (
    <PageWithFooter>
      <PageJsonLd
        path={coursePath(course.slug)}
        webPage={{ name: `${course.title} | AS Brokers`, description: course.introduction.slice(0, 180) }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Courses", path: "/learn" },
          { name: course.title, path: coursePath(course.slug) },
        ]}
      />
      <HubUtilityHero
        kicker="Free educational course"
        title={course.title}
        description={progressLabel(course, state)}
      />
      <HubContentSection className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div
              className="max-w-3xl text-base leading-relaxed text-stone-600"
              dangerouslySetInnerHTML={{ __html: renderLessonText(course.introduction) }}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={state ? startHref : registerPath(course.slug)} prefetch={false} className={WARM_BTN_PRIMARY}>
                {state ? "Continue" : "Register to start"}
              </Link>
              <Link href="/learn" prefetch={false} className={WARM_BTN_SECONDARY}>
                All courses
              </Link>
            </div>
          </div>
          <LessonSidebar course={course} lessons={lessons} currentSlug="" state={state} />
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
