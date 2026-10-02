import Link from "next/link";

import { createCourseAction, reorderCourseAction } from "@/app/studio/courses/actions";
import { isCourseStudioPreviewUnlocked } from "@/lib/courses/studio-access";
import { COURSE_STUDENT_AUTH_ENABLED } from "@/lib/courses/flags";
import { canMove } from "@/lib/courses/order";
import { listCourses } from "@/lib/courses/store";
import { publishedLessons } from "@/lib/courses/progress";
import { studioCoursePath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function CourseStudioIndexPage() {
  const courses = await listCourses();
  const preview = await isCourseStudioPreviewUnlocked();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {preview ? (
        <p className="rounded-lg border border-amber-200 bg-amber-950/40 px-4 py-3 text-sm text-amber-900">
          Course Studio is unlocked for preview because the studio password is not set. Once{" "}
          <code>CLIENT_STUDIO_PASSWORD</code> is configured, this area uses the same login as Blog Studio.
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#52525b]">Course Studio</p>
          <h1 className="mt-1 text-2xl font-semibold text-[#1D1D1F]">Courses</h1>
          <p className="mt-2 max-w-xl text-sm text-[#52525b]">
            Create courses and lessons yourself. Published courses appear at{" "}
            <Link href="/learn" className="text-[#006B6B] hover:underline">
              /learn
            </Link>
            . Course signups land in{" "}
            <Link href="/studio/courses/students" className="text-[#006B6B] hover:underline">
              Students
            </Link>{" "}
            and also in CRM → Course registrations.
          </p>
        </div>
        {COURSE_STUDENT_AUTH_ENABLED ? (
          <div className="flex flex-wrap gap-2">
            <Link
              href="/studio/courses/learners"
              className="rounded-md bg-[#006B6B] px-3 py-2 text-xs font-medium text-white"
            >
              Learners coach view
            </Link>
            <Link
              href="/studio/courses/analytics"
              className="rounded-md border border-[#E5E5E5] px-3 py-2 text-xs font-medium text-[#3F3F46] hover:text-[#1D1D1F]"
            >
              Progress
            </Link>
            <Link
              href="/studio/courses/students"
              className="rounded-md border border-[#E5E5E5] px-3 py-2 text-xs font-medium text-[#3F3F46] hover:text-[#1D1D1F]"
            >
              Students
            </Link>
            <Link
              href="/studio/courses/portal"
              className="rounded-md border border-[#E5E5E5] px-3 py-2 text-xs font-medium text-[#3F3F46] hover:text-[#1D1D1F]"
            >
              Student banner
            </Link>
          </div>
        ) : null}
      </div>

      <form action={createCourseAction} className="rounded-xl border border-[#E5E5E5] bg-white p-5">
        <p className="text-sm font-medium text-[#1D1D1F]">Create a course</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_200px_auto]">
          <input
            name="title"
            required
            placeholder="Course title"
            className="rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA]"
          />
          <input
            name="slug"
            placeholder="url-slug (optional)"
            className="rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA]"
          />
          <button type="submit" className="rounded-md bg-[#006B6B] px-4 py-2 text-sm font-medium text-white">
            Create
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {courses.map((course) => (
          <li
            key={course.id}
            className="flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-4 py-4"
          >
            <Link href={studioCoursePath(course.id)} className="min-w-0 flex-1 hover:opacity-90">
              <p className="font-medium text-[#1D1D1F]">{course.title}</p>
              <p className="mt-1 text-xs text-[#52525b]">
                /learn/{course.slug} · {course.lessons.length} lessons · {publishedLessons(course).length}{" "}
                published ·{" "}
                {course.access === "paid"
                  ? course.priceZar
                    ? `Paid R${course.priceZar}`
                    : "Paid"
                  : "Free"}
              </p>
            </Link>
            <span className="rounded border border-[#E5E5E5] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#52525b]">
              {course.status}
            </span>
            <div className="flex shrink-0 gap-1">
              <form action={reorderCourseAction}>
                <input type="hidden" name="courseId" value={course.id} />
                <input type="hidden" name="direction" value="up" />
                <button
                  type="submit"
                  disabled={!canMove(courses, course.id, "up")}
                  aria-label={`Move ${course.title} up`}
                  className="rounded-md border border-[#E5E5E5] px-2 py-1 text-xs text-[#52525b] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Up
                </button>
              </form>
              <form action={reorderCourseAction}>
                <input type="hidden" name="courseId" value={course.id} />
                <input type="hidden" name="direction" value="down" />
                <button
                  type="submit"
                  disabled={!canMove(courses, course.id, "down")}
                  aria-label={`Move ${course.title} down`}
                  className="rounded-md border border-[#E5E5E5] px-2 py-1 text-xs text-[#52525b] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Down
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
