import Link from "next/link";

import { lessonPath } from "@/lib/courses/paths";
import { getLessonAccess } from "@/lib/courses/progress";
import type { CourseLesson, CourseRecord, LessonAccess, StudentCourseState } from "@/lib/courses/types";

export function LessonSidebar({
  course,
  lessons,
  currentSlug,
  state,
}: {
  course: CourseRecord;
  lessons: CourseLesson[];
  currentSlug: string;
  state: StudentCourseState | null;
}) {
  return (
    <nav aria-label="Course lessons" className="rounded-3xl bg-white p-5 ring-1 ring-stone-200">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">Lessons</p>
      <ol className="mt-4 space-y-2">
        {lessons.map((lesson, index) => {
          const access = getLessonAccess(course, lesson, state);
          return (
            <li key={lesson.id}>
              <LessonRow
                href={lessonPath(course.slug, lesson.slug)}
                index={index + 1}
                title={lesson.title}
                access={access}
                current={lesson.slug === currentSlug}
                isFinal={lesson.isFinal}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LessonRow({
  href,
  index,
  title,
  access,
  current,
  isFinal,
}: {
  href: string;
  index: number;
  title: string;
  access: LessonAccess;
  current: boolean;
  isFinal: boolean;
}) {
  const status =
    access === "completed" ? "Completed" : access === "locked" ? "Locked" : "Available";
  const className = [
    "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left text-sm transition",
    current ? "bg-stone-100 ring-1 ring-stone-200" : "hover:bg-stone-50",
    access === "locked" ? "cursor-not-allowed opacity-60 hover:bg-transparent" : "",
  ].join(" ");

  const body = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-[11px] font-semibold text-white">
        {access === "completed" ? "✓" : access === "locked" ? "•" : index}
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-shark">{title}</span>
        <span className="mt-0.5 block text-xs text-stone-500">
          {status}
          {isFinal ? " · Final lesson" : ""}
        </span>
      </span>
    </>
  );

  if (access === "locked") {
    return <div className={className}>{body}</div>;
  }

  return (
    <Link href={href} prefetch={false} className={className}>
      {body}
    </Link>
  );
}
