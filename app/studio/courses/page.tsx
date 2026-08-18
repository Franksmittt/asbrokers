import Link from "next/link";

import { createCourseAction } from "@/app/studio/courses/actions";
import { isCourseStudioPreviewUnlocked } from "@/lib/courses/studio-access";
import { listCourses } from "@/lib/courses/store";
import { publishedLessons } from "@/lib/courses/progress";
import { studioCoursePath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function CourseStudioIndexPage() {
  const courses = listCourses();
  const preview = await isCourseStudioPreviewUnlocked();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {preview ? (
        <p className="rounded-lg border border-amber-500/30 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">
          Course Studio is unlocked for preview because the studio password is not set. Once{" "}
          <code>CLIENT_STUDIO_PASSWORD</code> is configured, this area uses the same login as Blog Studio.
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Course Studio</p>
          <h1 className="mt-1 text-2xl font-semibold text-white">Courses</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Create courses and lessons yourself. Students see published courses at{" "}
            <Link href="/learn" className="text-[#3ecf8e] hover:underline">
              /learn
            </Link>
            .
          </p>
        </div>
        <Link
          href="/studio/courses/students"
          className="rounded-md border border-[#2a2a2a] px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white"
        >
          Student database
        </Link>
      </div>

      <form action={createCourseAction} className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <p className="text-sm font-medium text-white">Create a course</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_200px_auto]">
          <input
            name="title"
            required
            placeholder="Course title"
            className="rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600"
          />
          <input
            name="slug"
            placeholder="url-slug (optional)"
            className="rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600"
          />
          <button type="submit" className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black">
            Create
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {courses.map((course) => (
          <li key={course.id}>
            <Link
              href={studioCoursePath(course.id)}
              className="flex items-center justify-between rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-4 hover:border-[#3a3a3a]"
            >
              <div>
                <p className="font-medium text-white">{course.title}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  /learn/{course.slug} · {course.lessons.length} lessons · {publishedLessons(course).length}{" "}
                  published
                </p>
              </div>
              <span className="rounded border border-[#2a2a2a] px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
                {course.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
