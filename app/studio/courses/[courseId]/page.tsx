import Link from "next/link";
import { notFound } from "next/navigation";

import {
  addLessonAction,
  deleteCourseAction,
  deleteLessonAction,
  reorderLessonAction,
  updateCourseAction,
} from "@/app/studio/courses/actions";
import { getCourseById } from "@/lib/courses/store";
import { coursePath, studioLessonPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ courseId: string }> };

export default async function CourseEditorPage({ params }: Props) {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  if (!course) notFound();
  const lessons = [...course.lessons].sort((a, b) => a.sortOrder - b.sortOrder);

  const field =
    "mt-1 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600";
  const label = "block text-xs font-medium text-zinc-400";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/studio/courses" className="text-xs text-zinc-500 hover:text-white">
            ← All courses
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-white">{course.title}</h1>
        </div>
        <Link
          href={coursePath(course.slug)}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[#3ecf8e] hover:underline"
        >
          View student page ↗
        </Link>
      </div>

      <form action={updateCourseAction} className="space-y-4 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <input type="hidden" name="courseId" value={course.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Course title
            <input name="title" required defaultValue={course.title} className={field} />
          </label>
          <label className={label}>
            URL slug
            <input name="slug" required defaultValue={course.slug} className={field} />
          </label>
        </div>
        <label className={label}>
          Course introduction
          <textarea name="introduction" rows={7} defaultValue={course.introduction} className={field} />
        </label>
        <label className={label}>
          Featured image URL
          <input name="featuredImageUrl" defaultValue={course.featuredImageUrl ?? ""} className={field} />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className={label}>
            Status
            <select name="status" defaultValue={course.status} className={field}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label className={label}>
            Course order
            <input name="sortOrder" type="number" min={0} defaultValue={course.sortOrder} className={field} />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" name="registrationRequired" defaultChecked={course.registrationRequired} />
          Registration required
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" name="sequentialLocking" defaultChecked={course.sequentialLocking} />
          Sequential lesson locking
        </label>
        <button type="submit" className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black">
          Save course
        </button>
      </form>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Lessons</h2>
            <p className="mt-1 text-xs text-zinc-500">Add, rename, reorder, publish, and mark one lesson as final.</p>
          </div>
        </div>

        <form action={addLessonAction} className="flex flex-col gap-3 rounded-xl border border-dashed border-[#2a2a2a] p-4 sm:flex-row">
          <input type="hidden" name="courseId" value={course.id} />
          <input
            name="title"
            required
            placeholder="New lesson title"
            className="flex-1 rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white"
          />
          <button type="submit" className="rounded-md border border-[#3ecf8e]/40 px-4 py-2 text-sm text-[#3ecf8e]">
            Add lesson
          </button>
        </form>

        <ol className="space-y-2">
          {lessons.map((lesson, index) => (
            <li
              key={lesson.id}
              className="flex flex-col gap-3 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-white">
                  {index + 1}. {lesson.title}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500">
                  {lesson.status}
                  {lesson.isFinal ? " · Final lesson" : ""}
                  {lesson.responseRequired ? " · Response required" : ""}
                  · {lesson.blocks.length} blocks
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <form action={reorderLessonAction}>
                  <input type="hidden" name="courseId" value={course.id} />
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button type="submit" className="rounded-md border border-[#2a2a2a] px-2 py-1 text-xs text-zinc-400">
                    Up
                  </button>
                </form>
                <form action={reorderLessonAction}>
                  <input type="hidden" name="courseId" value={course.id} />
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button type="submit" className="rounded-md border border-[#2a2a2a] px-2 py-1 text-xs text-zinc-400">
                    Down
                  </button>
                </form>
                <Link
                  href={studioLessonPath(course.id, lesson.id)}
                  className="rounded-md bg-white/10 px-3 py-1 text-xs text-white"
                >
                  Edit blocks
                </Link>
                <form action={deleteLessonAction}>
                  <input type="hidden" name="courseId" value={course.id} />
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <button type="submit" className="rounded-md px-2 py-1 text-xs text-red-400">
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <form action={deleteCourseAction} className="pt-4">
        <input type="hidden" name="courseId" value={course.id} />
        <button type="submit" className="text-xs text-red-500 hover:underline">
          Delete this course
        </button>
      </form>
    </div>
  );
}
