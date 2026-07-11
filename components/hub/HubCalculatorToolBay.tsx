"use client";

import Link from "next/link";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, LineChart } from "@/components/icons";
import { HUB_INK as INK } from "@/lib/hub-design-tokens";

export type HubCalculatorTool = {
  code: string;
  title: string;
  description: string;
  href: string;
  /** Grid span classes, e.g. `col-span-12 md:col-span-4`. Defaults to equal thirds. */
  span?: string;
  /** CTA label. Defaults to "Run calculator". */
  cta?: string;
};

type Props = {
  headingId: string;
  title: string;
  lead: string;
  tools: HubCalculatorTool[];
  showChartIcon?: boolean;
  /**
   * Render as a block inside a parent dark chapter (no full-bleed section chrome).
   * Use when Blueprint → tools → trust should read as one continuous band.
   */
  embedded?: boolean;
};

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

function ToolCard({
  code,
  title,
  description,
  href,
  cta = "Run calculator",
  index,
}: HubCalculatorTool & { index: number }) {
  return (
    <article className="h-full">
      <Link
        href={href}
        prefetch={false}
        className="group flex h-full flex-col rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-2xl transition hover:bg-white/[0.08] sm:p-7"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">{code}</p>
          <span className="text-xs font-bold tabular-nums text-white/35">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3
          className="mt-4 font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)" }}
        >
          {title}
        </h3>
        <p
          className="mt-3 flex-1 leading-relaxed text-white/70"
          style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)" }}
        >
          {description}
        </p>
        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-shark transition group-hover:bg-stone-100">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </article>
  );
}

/** Dark shark / glass calculator strip — Option A tool bay. */
export function HubCalculatorToolBay({
  headingId,
  title,
  lead,
  tools,
  showChartIcon = true,
  embedded = false,
}: Props) {
  const body = (
    <div className={`relative ${GRID}`}>
      <div className="col-span-12">
        <div className="flex items-center gap-3">
          {showChartIcon ? (
            <LineChart className="h-7 w-7 shrink-0 text-cinematic-teal" aria-hidden />
          ) : null}
          <h2
            id={headingId}
            className="font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)" }}
          >
            {title}
          </h2>
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-white/70" style={{ fontSize: "1.0625rem" }}>
          {lead}
        </p>
      </div>
      {tools.map((tool, index) => (
        <div key={tool.code} className={tool.span ?? "col-span-12 md:col-span-4"}>
          <ToolCard {...tool} index={index} />
        </div>
      ))}
    </div>
  );

  if (embedded) {
    return (
      <div className="relative" aria-labelledby={headingId}>
        {body}
      </div>
    );
  }

  return (
    <section
      data-chunk-boundary="true"
      className="relative overflow-hidden border-t border-stone-800 py-16 md:py-24"
      style={{ backgroundColor: INK }}
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-cinematic-teal/20 blur-3xl"
        aria-hidden
      />
      {body}
    </section>
  );
}
