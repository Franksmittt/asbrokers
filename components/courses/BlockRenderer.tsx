import Image from "next/image";
import Link from "next/link";

import { CourseCalculatorFrame } from "@/components/courses/CourseCalculatorFrame";
import { getCalculatorById, formatPublicCalculatorTitle } from "@/lib/calculators/registry";
import { renderLessonText } from "@/lib/courses/text";
import { parseVideoUrl } from "@/lib/courses/video";
import type { CalloutVariant, LessonBlock } from "@/lib/courses/types";
import { WARM_BTN_PRIMARY } from "@/lib/warm-theme";

const CALLOUT_STYLES: Record<CalloutVariant, string> = {
  info: "border-samsung-blue/30 bg-samsung-blue/5",
  key: "border-[#006B6B]/30 bg-[#006B6B]/5",
  warning: "border-amber-400/40 bg-amber-50",
  example: "border-stone-200 bg-white",
};

const CALLOUT_LABEL: Record<CalloutVariant, string> = {
  info: "Note",
  key: "Important point",
  warning: "Warning",
  example: "Example",
};

export function BlockRenderer({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((block) => (
          <BlockView key={block.id} block={block} />
        ))}
    </div>
  );
}

function BlockView({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case "heading": {
      const className = block.level === 3 ? "text-xl font-semibold text-shark" : "text-2xl font-bold tracking-tight text-shark sm:text-3xl";
      return block.level === 3 ? <h3 className={className}>{block.text}</h3> : <h2 className={className}>{block.text}</h2>;
    }
    case "text":
      return (
        <div
          className="text-base leading-relaxed text-stone-600 [&_strong]:text-shark"
          dangerouslySetInnerHTML={{ __html: renderLessonText(block.body) }}
        />
      );
    case "video": {
      const parsed = parseVideoUrl(block.url);
      if (!parsed.embedUrl) {
        return (
          <figure className="space-y-2">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-shark ring-1 ring-stone-200">
              {block.posterUrl ? (
                block.posterUrl.startsWith("/") ? (
                  <Image
                    src={block.posterUrl}
                    alt={block.caption || "Lesson video"}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={block.posterUrl} alt={block.caption || "Lesson video"} className="h-full w-full object-cover opacity-80" />
                )
              ) : null}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-shark shadow-lg" aria-hidden>
                  ▶
                </span>
                <p className="mt-4 max-w-md text-sm font-medium text-white">
                  {block.caption || "Lesson video"}
                </p>
              </div>
            </div>
          </figure>
        );
      }
      return (
        <figure className="space-y-2">
          <div className="relative aspect-video overflow-hidden rounded-3xl ring-1 ring-stone-200">
            <iframe
              src={parsed.embedUrl}
              title={block.caption || "Lesson video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          {block.caption ? <figcaption className="text-sm text-stone-500">{block.caption}</figcaption> : null}
        </figure>
      );
    }
    case "calculator": {
      const calc = getCalculatorById(block.calculatorId);
      if (!calc) {
        return (
          <p className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-500">
            Calculator not found. Choose another calculator in Course Studio.
          </p>
        );
      }
      return (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#006B6B]">
            {formatPublicCalculatorTitle(calc)}
          </p>
          <CourseCalculatorFrame embedPath={calc.embedPath} title={calc.title} />
        </div>
      );
    }
    case "image":
      if (!block.url) {
        return (
          <div className="flex min-h-48 items-center justify-center rounded-3xl bg-stone-100 ring-1 ring-dashed ring-stone-300">
            <p className="text-sm text-stone-500">Add an image URL in Course Studio.</p>
          </div>
        );
      }
      return (
        <figure className="space-y-2">
          {block.url.startsWith("/") ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-stone-200">
              <Image src={block.url} alt={block.alt || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.url} alt={block.alt || ""} className="w-full rounded-3xl ring-1 ring-stone-200" />
          )}
          {block.caption ? <figcaption className="text-sm text-stone-500">{block.caption}</figcaption> : null}
        </figure>
      );
    case "callout":
      return (
        <aside className={`rounded-3xl border px-5 py-4 sm:px-6 sm:py-5 ${CALLOUT_STYLES[block.variant]}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
            {block.title || CALLOUT_LABEL[block.variant]}
          </p>
          <div
            className="mt-2 text-sm leading-relaxed text-stone-700 sm:text-base"
            dangerouslySetInnerHTML={{ __html: renderLessonText(block.body) }}
          />
        </aside>
      );
    case "cta":
      return (
        <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-stone-200 sm:p-8">
          {block.heading ? <h3 className="text-xl font-semibold text-shark">{block.heading}</h3> : null}
          {block.body ? (
            <div
              className="mt-2 text-sm leading-relaxed text-stone-600"
              dangerouslySetInnerHTML={{ __html: renderLessonText(block.body) }}
            />
          ) : null}
          <Link
            href={block.buttonUrl}
            prefetch={false}
            target={block.openInNewTab ? "_blank" : undefined}
            rel={block.openInNewTab ? "noreferrer" : undefined}
            className={`${WARM_BTN_PRIMARY} mt-4`}
          >
            {block.buttonText}
          </Link>
        </div>
      );
  }
}
