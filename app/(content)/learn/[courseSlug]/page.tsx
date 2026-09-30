import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  HubContentSection,
  HubSplitHero,
  HubUtilityHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";
import { LessonSidebar } from "@/components/courses/LessonSidebar";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getCourseBySlug, getStudentCourseState } from "@/lib/courses/store";
import { firstAvailableLesson, publishedLessons, progressLabel } from "@/lib/courses/progress";
import {
  coursePath,
  lessonPath,
  registerPath,
  studentAccountPath,
} from "@/lib/courses/paths";
import { courseRequiresStudentAuth } from "@/lib/courses/flags";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { renderLessonText } from "@/lib/courses/text";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BTN_PRIMARY, WARM_BTN_SECONDARY } from "@/lib/warm-theme";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);
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
  const course = await getCourseBySlug(courseSlug);
  if (!course || course.status !== "published") notFound();

  const studentId = await getCourseStudentId();
  const state = studentId ? await getStudentCourseState(studentId, course.id) : null;
  const lessons = publishedLessons(course);
  const resume = firstAvailableLesson(course, state);

  const startHref = resume ? lessonPath(course.slug, resume.slug) : coursePath(course.slug);
  const needsAccount = courseRequiresStudentAuth(course) && !studentId;
  const needsEnroll = courseRequiresStudentAuth(course) && !!studentId && !state;
  const primaryHref = needsAccount
    ? studentAccountPath({ mode: "signup", next: registerPath(course.slug) })
    : needsEnroll
      ? registerPath(course.slug)
      : startHref;
  const primaryLabel = state
    ? "Continue"
    : needsAccount
      ? "Create account to start"
      : "Start the course";

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
      {course.featuredImageUrl ? (
        <HubSplitHero
          kicker={
            course.access === "paid"
              ? course.priceZar
                ? `Paid course · R${course.priceZar}`
                : "Paid course"
              : "Free educational course"
          }
          title={course.title}
          description={progressLabel(course, state)}
          imageSrc={course.featuredImageUrl}
          imageAlt={course.title}
        />
      ) : (
        <HubUtilityHero
          kicker={
            course.access === "paid"
              ? course.priceZar
                ? `Paid course · R${course.priceZar}`
                : "Paid course"
              : "Free educational course"
          }
          title={course.title}
          description={progressLabel(course, state)}
        />
      )}
      <HubContentSection className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div
              className="max-w-3xl text-base leading-relaxed text-stone-600"
              dangerouslySetInnerHTML={{ __html: renderLessonText(course.introduction) }}
            />
            {state?.enrollment.paymentStatus === "pending" ? (
              <p className="mt-6 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                You have registered for this paid course. Albert will confirm access after payment.
                {course.accessNote ? ` ${course.accessNote}` : ""}{" "}
                <Link href="/learn/dashboard" className="font-semibold underline">
                  View your dashboard
                </Link>
              </p>
            ) : null}
            {!studentId ? (
              <p className="mt-6 max-w-2xl rounded-2xl bg-[#F7F6F3] px-4 py-3 text-sm text-stone-600 ring-1 ring-stone-200">
                This overview is open to everyone. Create a free Learn account to open lessons and
                save your progress.
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {state?.enrollment.paymentStatus === "pending" ? (
                <Link href="/learn/dashboard" prefetch={false} className={WARM_BTN_PRIMARY}>
                  Go to dashboard
                </Link>
              ) : (
                <Link href={primaryHref} prefetch={false} className={WARM_BTN_PRIMARY}>
                  {primaryLabel}
                </Link>
              )}
              {!studentId ? (
                <Link
                  href={studentAccountPath({ mode: "signin", next: registerPath(course.slug) })}
                  prefetch={false}
                  className={WARM_BTN_SECONDARY}
                >
                  Already have an account? Sign in
                </Link>
              ) : (
                <Link href="/learn" prefetch={false} className={WARM_BTN_SECONDARY}>
                  All courses
                </Link>
              )}
            </div>
          </div>
          <LessonSidebar course={course} lessons={lessons} currentSlug="" state={state} />
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
