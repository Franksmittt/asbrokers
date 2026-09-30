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
import { coursePath, studentDashboardPath, studentLoginPath } from "@/lib/courses/paths";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BTN_PRIMARY, WARM_BTN_SECONDARY } from "@/lib/warm-theme";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  path: "/learn",
  title: "Courses",
  description:
    "Educational courses from AS Brokers CC. Work through lessons at your own pace with calculators, videos and teaching notes.",
});

export default async function LearnCatalogPage() {
  const courses = await listPublishedCourses();

  return (
    <PageWithFooter>
      <PageJsonLd
        path="/learn"
        webPage={{
          name: "Courses | AS Brokers",
          description: "Educational courses you can take at your own pace.",
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Courses", path: "/learn" },
        ]}
      />
      <HubUtilityHero
        kicker="AS Brokers CC · FSP 17273"
        title="Educational courses"
        description="Courses you can take yourself. Sign in to your student portal to track progress, or open a lesson and come back whenever you like."
      />
      <HubContentSection className="pt-0">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href={studentLoginPath(studentDashboardPath())} prefetch={false} className={WARM_BTN_PRIMARY}>
            Student sign in
          </Link>
          <Link href={studentDashboardPath()} prefetch={false} className={WARM_BTN_SECONDARY}>
            My dashboard
          </Link>
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
                <li key={course.id} className="overflow-hidden rounded-3xl bg-white/95 shadow-xl ring-1 ring-stone-200/80">
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
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-shark">{course.title}</h2>
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-stone-600">
                      {course.introduction.split("\n")[0]}
                    </p>
                    <p className="mt-4 text-xs text-stone-500">
                      {total} {total === 1 ? "lesson" : "lessons"}
                    </p>
                    <Link href={coursePath(course.slug)} prefetch={false} className={`${WARM_BTN_PRIMARY} mt-6`}>
                      View course
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
