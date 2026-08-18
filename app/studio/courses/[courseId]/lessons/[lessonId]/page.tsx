import Link from "next/link";
import { notFound } from "next/navigation";

import {
  addBlockAction,
  deleteBlockAction,
  reorderBlockAction,
  updateBlockAction,
  updateLessonAction,
} from "@/app/studio/courses/actions";
import { BLOCK_LABELS } from "@/lib/courses/blocks";
import { getStaffRegistryCalculators, formatStaffCalculatorLabel } from "@/lib/calculators/registry";
import { getCourseById } from "@/lib/courses/store";
import { studioCoursePath } from "@/lib/courses/paths";
import type { LessonBlock } from "@/lib/courses/types";
import { BLOCK_TYPES } from "@/lib/courses/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ courseId: string; lessonId: string }> };

const field =
  "mt-1 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600";
const labelCls = "block text-xs font-medium text-zinc-400";

export default async function LessonBuilderPage({ params }: Props) {
  const { courseId, lessonId } = await params;
  const course = getCourseById(courseId);
  const lesson = course?.lessons.find((row) => row.id === lessonId);
  if (!course || !lesson) notFound();
  const blocks = [...lesson.blocks].sort((a, b) => a.sortOrder - b.sortOrder);
  const calculators = getStaffRegistryCalculators();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div>
        <Link href={studioCoursePath(course.id)} className="text-xs text-zinc-500 hover:text-white">
          ← {course.title}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">{lesson.title}</h1>
        <p className="mt-1 text-sm text-zinc-500">Blocks can be arranged in any order. This is not a fixed page layout.</p>
      </div>

      <form action={updateLessonAction} className="space-y-4 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <input type="hidden" name="courseId" value={course.id} />
        <input type="hidden" name="lessonId" value={lesson.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Lesson title
            <input name="title" required defaultValue={lesson.title} className={field} />
          </label>
          <label className={labelCls}>
            URL slug
            <input name="slug" required defaultValue={lesson.slug} className={field} />
          </label>
        </div>
        <label className={labelCls}>
          Status
          <select name="status" defaultValue={lesson.status} className={field}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" name="isFinal" defaultChecked={lesson.isFinal} />
          Final lesson
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" name="responseRequired" defaultChecked={lesson.responseRequired} />
          Response required
        </label>
        <label className={labelCls}>
          Student question
          <textarea name="responsePrompt" rows={3} defaultValue={lesson.responsePrompt} className={field} />
        </label>
        <fieldset className="space-y-3 rounded-lg border border-[#2a2a2a] p-4">
            <legend className="px-1 text-xs uppercase tracking-wide text-zinc-500">Final lesson offer</legend>
            <p className="text-[11px] text-zinc-500">Used when this lesson is marked final. Leave blank on other lessons.</p>
            <label className={labelCls}>
              Offer heading
              <input name="offerHeading" defaultValue={lesson.offer?.heading ?? ""} className={field} />
            </label>
            <label className={labelCls}>
              Offer text
              <textarea name="offerBody" rows={3} defaultValue={lesson.offer?.body ?? ""} className={field} />
            </label>
            <label className={labelCls}>
              Button text
              <input name="offerButtonText" defaultValue={lesson.offer?.buttonText ?? ""} className={field} />
            </label>
            <label className={labelCls}>
              Button URL
              <input name="offerButtonUrl" defaultValue={lesson.offer?.buttonUrl ?? ""} className={field} />
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" name="offerOpenInNewTab" defaultChecked={lesson.offer?.openInNewTab ?? true} />
              Open in a new window
            </label>
          </fieldset>
        <button type="submit" className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black">
          Save lesson settings
        </button>
      </form>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Content blocks</h2>
        {blocks.map((block) => (
          <BlockEditor
            key={block.id}
            courseId={course.id}
            lessonId={lesson.id}
            block={block}
            calculators={calculators.map((entry) => ({
              id: entry.id,
              label: formatStaffCalculatorLabel(entry),
            }))}
          />
        ))}
        <div className="flex flex-wrap gap-2">
          {BLOCK_TYPES.map((type) => (
            <form key={type} action={addBlockAction}>
              <input type="hidden" name="courseId" value={course.id} />
              <input type="hidden" name="lessonId" value={lesson.id} />
              <input type="hidden" name="type" value={type} />
              <button
                type="submit"
                className="rounded-md border border-[#2a2a2a] px-3 py-1.5 text-xs text-zinc-300 hover:text-white"
              >
                + {BLOCK_LABELS[type]}
              </button>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}

function BlockEditor({
  courseId,
  lessonId,
  block,
  calculators,
}: {
  courseId: string;
  lessonId: string;
  block: LessonBlock;
  calculators: { id: string; label: string }[];
}) {
  return (
    <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#3ecf8e]">{BLOCK_LABELS[block.type]}</p>
        <div className="flex gap-1">
          <IconForm courseId={courseId} lessonId={lessonId} blockId={block.id} direction="up" />
          <IconForm courseId={courseId} lessonId={lessonId} blockId={block.id} direction="down" />
          <form action={deleteBlockAction}>
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={lessonId} />
            <input type="hidden" name="blockId" value={block.id} />
            <button type="submit" className="rounded px-2 py-1 text-[11px] text-red-400">
              Remove
            </button>
          </form>
        </div>
      </div>
      <form action={updateBlockAction} className="space-y-3">
        <input type="hidden" name="courseId" value={courseId} />
        <input type="hidden" name="lessonId" value={lessonId} />
        <input type="hidden" name="blockId" value={block.id} />
        <input type="hidden" name="type" value={block.type} />
        <BlockFields block={block} calculators={calculators} />
        <button type="submit" className="rounded-md border border-[#2a2a2a] px-3 py-1.5 text-xs text-zinc-200">
          Save block
        </button>
      </form>
    </div>
  );
}

function IconForm({
  courseId,
  lessonId,
  blockId,
  direction,
}: {
  courseId: string;
  lessonId: string;
  blockId: string;
  direction: "up" | "down";
}) {
  return (
    <form action={reorderBlockAction}>
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="blockId" value={blockId} />
      <input type="hidden" name="direction" value={direction} />
      <button type="submit" className="rounded border border-[#2a2a2a] px-2 py-1 text-[11px] text-zinc-400">
        {direction === "up" ? "Up" : "Down"}
      </button>
    </form>
  );
}

function BlockFields({
  block,
  calculators,
}: {
  block: LessonBlock;
  calculators: { id: string; label: string }[];
}) {
  switch (block.type) {
    case "heading":
      return (
        <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
          <select name="level" defaultValue={block.level} className={field}>
            <option value={2}>Heading</option>
            <option value={3}>Subheading</option>
          </select>
          <input name="text" defaultValue={block.text} className={field} placeholder="Lesson heading" />
        </div>
      );
    case "text":
      return (
        <textarea
          name="body"
          rows={8}
          defaultValue={block.body}
          className={field}
          placeholder={"Paragraphs, **bold**, - bullets, 1. numbered lists, and [links](/path)."}
        />
      );
    case "video":
      return (
        <>
          <input name="url" defaultValue={block.url} className={field} placeholder="YouTube or Vimeo URL" />
          <input name="caption" defaultValue={block.caption ?? ""} className={field} placeholder="Optional caption" />
        </>
      );
    case "calculator":
      return (
        <select name="calculatorId" defaultValue={block.calculatorId} className={field}>
          {calculators.map((calc) => (
            <option key={calc.id} value={calc.id}>
              {calc.label}
            </option>
          ))}
        </select>
      );
    case "image":
      return (
        <>
          <input name="url" defaultValue={block.url} className={field} placeholder="Image URL" />
          <input name="alt" defaultValue={block.alt} className={field} placeholder="Alt text" />
          <input name="caption" defaultValue={block.caption ?? ""} className={field} placeholder="Optional caption" />
        </>
      );
    case "callout":
      return (
        <>
          <select name="variant" defaultValue={block.variant} className={field}>
            <option value="key">Key lesson</option>
            <option value="warning">Warning</option>
            <option value="example">Example</option>
            <option value="info">Note</option>
          </select>
          <input name="title" defaultValue={block.title ?? ""} className={field} placeholder="Optional title" />
          <textarea name="body" rows={4} defaultValue={block.body} className={field} />
        </>
      );
    case "cta":
      return (
        <>
          <input name="heading" defaultValue={block.heading ?? ""} className={field} placeholder="Optional heading" />
          <textarea name="body" rows={3} defaultValue={block.body ?? ""} className={field} placeholder="Optional text" />
          <input name="buttonText" defaultValue={block.buttonText} className={field} placeholder="Button text" />
          <input name="buttonUrl" defaultValue={block.buttonUrl} className={field} placeholder="/contact or https://…" />
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" name="openInNewTab" defaultChecked={block.openInNewTab} />
            Open in a new window
          </label>
        </>
      );
  }
}
