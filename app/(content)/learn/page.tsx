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
import { coursePath } from "@/lib/courses/paths";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BTN_PRIMARY, WARM_CARD } from "@/lib/warm-theme";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  path: "/learn",
  title: "Free courses",
  description:
    "Free educational courses from AS Brokers CC. Register once, then learn at your own pace with calculators, videos and private lesson responses.",
});

export default function LearnCatalogPage() {
  const courses = listPublishedCourses();

  return (
    <PageWithFooter>
      <PageJsonLd
        path="/learn"
        webPage={{
          name: "Free courses | AS Brokers",
          description: "Educational courses you can take at your own pace.",
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Courses", path: "/learn" },
        ]}
      />
      <HubUtilityHero
        kicker="AS Brokers CC · FSP 17273"
        title="Free educational courses"
        description="Courses you can take yourself. Lessons unlock in order, your progress is remembered, and any written answers stay private."
      />
      <HubContentSection className="pt-0">
        {courses.length === 0 ? (
          <p className="rounded-3xl bg-white p-8 text-stone-600 ring-1 ring-stone-200">
            No published courses yet. Create one in Course Studio.
          </p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => {
              const total = publishedLessons(course).length;
              return (
                <li key={course.id} className={WARM_CARD}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">Free course</p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-shark">{course.title}</h2>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-stone-600">
                    {course.introduction.split("\n")[0]}
                  </p>
                  <p className="mt-4 text-xs text-stone-500">
                    {total} {total === 1 ? "lesson" : "lessons"}
                    {course.sequentialLocking ? " · sequential" : " · open access"}
                  </p>
                  <Link href={coursePath(course.slug)} prefetch={false} className={`${WARM_BTN_PRIMARY} mt-6`}>
                    View course
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </HubContentSection>
    </PageWithFooter>
  );
}
