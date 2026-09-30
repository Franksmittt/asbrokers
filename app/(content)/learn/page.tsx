import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import {
  HubContentSection,
  HubUtilityHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { listPublishedCourses } from "@/lib/courses/store";
import { publishedLessons } from "@/lib/courses/progress";
import {
  coursePath,
  studentAccountPath,
  studentDashboardPath,
} from "@/lib/courses/paths";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BTN_PRIMARY, WARM_BTN_SECONDARY } from "@/lib/warm-theme";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  path: "/learn",
  title: "Courses overview",
  description:
    "Educational courses from AS Brokers CC. Browse the overview, then create a free account to open lessons and track your progress.",
});

export default async function LearnCatalogPage() {
  const courses = await listPublishedCourses();
  const studentId = await getCourseStudentId();

  return (
    <PageWithFooter>
      <PageJsonLd
        path="/learn"
        webPage={{
          name: "Courses overview | AS Brokers",
          description: "Browse AS Brokers educational courses. Sign in to open lessons.",
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Courses", path: "/learn" },
        ]}
      />
      <HubUtilityHero
        kicker="AS Brokers CC · FSP 17273"
        title="Courses overview"
        description="Browse what is available. To open lessons and save your progress, create a free Learn account or sign in."
      />
      <HubContentSection className="pt-0">
        <div className="mb-8 flex flex-wrap gap-3">
          {studentId ? (
            <Link href={studentDashboardPath()} prefetch={false} className={WARM_BTN_PRIMARY}>
              My learning home
            </Link>
          ) : (
            <>
              <Link
                href={studentAccountPath({ mode: "signup", next: "/learn" })}
                prefetch={false}
                className={WARM_BTN_PRIMARY}
              >
                Create free account
              </Link>
              <Link
                href={studentAccountPath({ mode: "signin", next: "/learn" })}
                prefetch={false}
                className={WARM_BTN_SECONDARY}
              >
                Sign in
              </Link>
            </>
          )}
        </div>
        {courses.length === 0 ? (
          <p className="rounded-3xl bg-white p-8 text-stone-600 ring-1 ring-stone-200">
            No published courses yet. Create one in Course Studio.
          </p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => {
              const total = publishedLessons(course).length;
              return (
                <li
                  key={course.id}
                  className="overflow-hidden rounded-3xl bg-white/95 shadow-xl ring-1 ring-stone-200/80"
                >
                  {course.featuredImageUrl ? (
                    <div className="relative aspect-[16/9] bg-stone-100">
                      <Image
                        src={course.featuredImageUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
                      {course.access === "paid"
                        ? course.priceZar
                          ? `Paid · R${course.priceZar}`
                          : "Paid course"
                        : "Free course"}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-shark">
                      {course.title}
                    </h2>
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-stone-600">
                      {course.introduction.split("\n")[0]}
                    </p>
                    <p className="mt-4 text-xs text-stone-500">
                      {total} {total === 1 ? "lesson" : "lessons"} · Account required to open
                    </p>
                    <Link
                      href={coursePath(course.slug)}
                      prefetch={false}
                      className={`${WARM_BTN_PRIMARY} mt-6`}
                    >
                      View overview
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </HubContentSection>
    </PageWithFooter>
  );
}
