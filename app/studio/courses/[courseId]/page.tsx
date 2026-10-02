import Link from "next/link";
import { notFound } from "next/navigation";

import {
  addLessonAction,
  deleteCourseAction,
  deleteLessonAction,
  reorderLessonAction,
  updateCourseAction,
} from "@/app/studio/courses/actions";
import { StudioImageField } from "@/components/courses/StudioImageField";
import { StudioPersistForm, StudioSaveButton, StudioSelect } from "@/components/courses/studio-controls";
import { COURSE_STUDENT_AUTH_ENABLED } from "@/lib/courses/flags";
import { canMove } from "@/lib/courses/order";
import { getCourseById } from "@/lib/courses/store";
import { coursePath, studioLessonPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ courseId: string }> };

export default async function CourseEditorPage({ params }: Props) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  if (!course) notFound();
  const lessons = [...course.lessons].sort((a, b) => a.sortOrder - b.sortOrder);

  const field =
    "mt-1 w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA]";
  const label = "block text-xs font-medium text-[#52525b]";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/studio/courses" className="text-xs text-[#52525b] hover:text-[#1D1D1F]">
            ← All courses
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-[#1D1D1F]">{course.title}</h1>
            <span
              data-course-status={course.status}
              className="rounded border border-[#E5E5E5] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#52525b]"
            >
              {course.status}
            </span>
          </div>
        </div>
        <Link
          href={coursePath(course.slug)}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[#006B6B] hover:underline"
        >
          View published page ↗
        </Link>
      </div>

      <StudioPersistForm
        action={updateCourseAction}
        formKey={`${course.id}:${course.updatedAt}`}
        className="space-y-4 rounded-xl border border-[#E5E5E5] bg-white p-5"
      >
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
        <StudioImageField
          name="featuredImageUrl"
          label="Featured image"
          defaultValue={course.featuredImageUrl ?? ""}
          placeholder="Paste a link or upload from your computer"
          inputClassName={field}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <label className={label}>
            Status
            <StudioSelect name="status" value={course.status} className={field}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </StudioSelect>
          </label>
          <label className={label}>
            Course order
            <input name="sortOrder" type="number" min={0} defaultValue={course.sortOrder} className={field} />
          </label>
          <label className={label}>
            Free or paid
            <StudioSelect name="access" value={course.access ?? "free"} className={field}>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </StudioSelect>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Price in Rand (paid courses)
            <input
              name="priceZar"
              type="number"
              min={0}
              step="1"
              defaultValue={course.priceZar ?? ""}
              placeholder="e.g. 499"
              className={field}
            />
          </label>
          <label className={label}>
            Paid-access note for students
            <input
              name="accessNote"
              defaultValue={course.accessNote ?? ""}
              placeholder="Albert will confirm access after payment."
              className={field}
            />
          </label>
        </div>
        {COURSE_STUDENT_AUTH_ENABLED ? (
          <>
            <label className="flex items-center gap-2 text-sm text-[#3F3F46]">
              <input type="checkbox" name="registrationRequired" defaultChecked={course.registrationRequired} />
              Registration required
            </label>
            <label className="flex items-center gap-2 text-sm text-[#3F3F46]">
              <input type="checkbox" name="sequentialLocking" defaultChecked={course.sequentialLocking} />
              Sequential lesson locking
            </label>
          </>
        ) : (
          <p className="rounded-md border border-amber-500/20 bg-amber-950/30 px-3 py-2 text-xs text-amber-900/90">
            Student registration is paused while you build courses. Anyone can open published lessons. We will turn
            login, register, and sequential locking back on when the content is ready.
          </p>
        )}
        <StudioSaveButton
          idleLabel="Save course"
          className="rounded-md bg-[#006B6B] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        />
      </StudioPersistForm>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1D1D1F]">Lessons</h2>
            <p className="mt-1 text-xs text-[#52525b]">Add, rename, reorder, publish, and mark one lesson as final.</p>
          </div>
        </div>

        <form action={addLessonAction} className="flex flex-col gap-3 rounded-xl border border-dashed border-[#E5E5E5] p-4 sm:flex-row">
          <input type="hidden" name="courseId" value={course.id} />
          <input
            name="title"
            required
            placeholder="New lesson title"
            className="flex-1 rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F]"
          />
          <button type="submit" className="rounded-md border border-[#006B6B]/35 px-4 py-2 text-sm text-[#006B6B]">
            Add lesson
          </button>
        </form>

        <ol className="space-y-2">
          {lessons.map((lesson, index) => (
            <li
              key={lesson.id}
              className="flex flex-col gap-3 rounded-xl border border-[#E5E5E5] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-[#1D1D1F]">
                  {index + 1}. {lesson.title}
                </p>
                <p className="mt-1 text-[11px] text-[#52525b]">
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
                  <button
                    type="submit"
                    disabled={!canMove(lessons, lesson.id, "up")}
                    aria-label={`Move ${lesson.title} up`}
                    className="rounded-md border border-[#E5E5E5] px-2 py-1 text-xs text-[#52525b] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Up
                  </button>
                </form>
                <form action={reorderLessonAction}>
                  <input type="hidden" name="courseId" value={course.id} />
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button
                    type="submit"
                    disabled={!canMove(lessons, lesson.id, "down")}
                    aria-label={`Move ${lesson.title} down`}
                    className="rounded-md border border-[#E5E5E5] px-2 py-1 text-xs text-[#52525b] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Down
                  </button>
                </form>
                <Link
                  href={studioLessonPath(course.id, lesson.id)}
                  className="rounded-md bg-[#F0F0EE] px-3 py-1 text-xs text-[#1D1D1F]"
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
