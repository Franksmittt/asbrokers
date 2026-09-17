import Link from "next/link";

import type { CoursesSection as CoursesSectionType } from "@/lib/newsletter/types";
import { NewsletterAccordion } from "./NewsletterAccordion";

interface CoursesSectionProps {
  courses: CoursesSectionType;
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  return (
    <NewsletterAccordion id="courses" title="Courses">
      <div className="space-y-4">
        <p className="text-stone-600">
          AS Brokers is building a growing library of practical financial education courses. The
          purpose of these courses is to help clients understand the reasoning behind important
          financial decisions before they make them.
        </p>

        <p className="text-sm text-stone-500">
          Courses can cover topics such as Financial Freedom, Retirement Planning, Investments,
          Medical Aid, Personal Risk Planning, Business Insurance, Estate Planning, Trusts &
          Business Structuring, Discovery, and Vitality & Wellness.
        </p>

        {courses.availableCourses.length > 0 && (
          <div className="space-y-4 pt-2">
            <p className="text-sm font-semibold text-shark">Available courses:</p>
            <ul className="space-y-4">
              {courses.availableCourses.map((course, idx) => (
                <li key={idx} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                  <h4 className="font-semibold text-shark">{course.title}</h4>
                  <p className="mt-1 text-sm text-stone-600">{course.description}</p>
                  <Link
                    href={course.href}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue hover:underline"
                  >
                    Start the Course
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </NewsletterAccordion>
  );
}
