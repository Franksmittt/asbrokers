import Link from "next/link";
import type { CSSProperties } from "react";
import type { CalculatorPracticalWays } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const CREAM = "#FDFCFA";

type Props = {
  path: string;
  practicalWays: CalculatorPracticalWays;
};

function itemLabel(item: CalculatorPracticalWays["items"][number]) {
  return typeof item === "string" ? item : item.label;
}

function itemHref(item: CalculatorPracticalWays["items"][number]) {
  return typeof item === "string" ? undefined : item.href;
}

function CompareLabel({ letter, name }: { letter: string; name: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1F] text-sm font-bold text-white">
        {letter}
      </span>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
        Option {letter} · {name}
      </p>
    </div>
  );
}

function ItemText({
  item,
  className,
  style,
  onDark = false,
}: {
  item: CalculatorPracticalWays["items"][number];
  className?: string;
  style?: CSSProperties;
  onDark?: boolean;
}) {
  const label = itemLabel(item);
  const href = itemHref(item);
  if (href) {
    return (
      <Link
        href={href}
        prefetch={false}
        className={`font-semibold hover:underline ${className ?? ""}`}
        style={{ color: onDark ? "#5EEAD4" : TEAL, ...style }}
      >
        {label}
      </Link>
    );
  }
  return (
    <span className={className} style={style}>
      {label}
    </span>
  );
}

function Cta({ practicalWays }: { practicalWays: CalculatorPracticalWays }) {
  if (!practicalWays.ctaLabel || !practicalWays.ctaHref) return null;
  return (
    <p className="mt-8">
      <Link
        href={practicalWays.ctaHref}
        prefetch={false}
        className="inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
      >
        {practicalWays.ctaLabel}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </p>
  );
}

/** A — 2×2 lever cards beside intro copy. */
function OptionA({ path, practicalWays }: Props) {
  return (
    <section
      id="practical-option-a"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-practical-a-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="A" name="Lever grid" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2
              id={`${path}-practical-a-heading`}
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)", color: INK }}
            >
              {practicalWays.heading}
            </h2>
            <p
              className="mt-5 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {practicalWays.intro}
            </p>
            <p
              className="mt-6 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {practicalWays.closing}
            </p>
            <Cta practicalWays={practicalWays} />
          </div>
          <ol className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {practicalWays.items.map((item, index) => (
              <li
                key={itemLabel(item)}
                className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-stone-200/90 sm:p-6"
              >
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: TEAL }}
                >
                  Lever {String(index + 1).padStart(2, "0")}
                </span>
                <p
                  className="mt-3 flex-1 font-medium leading-relaxed"
                  style={{ color: INK, fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)" }}
                >
                  <ItemText item={item} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** B — Dark band with numbered horizontal levers. */
function OptionB({ path, practicalWays }: Props) {
  return (
    <section
      id="practical-option-b"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 bg-shark py-14 text-white md:py-20"
      aria-labelledby={`${path}-practical-b-heading`}
    >
      <div className={HOME4_WRAP}>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-shark">
            B
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Option B · Numbered strip
          </p>
        </div>
        <h2
          id={`${path}-practical-b-heading`}
          className="max-w-3xl font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)" }}
        >
          {practicalWays.heading}
        </h2>
        <p
          className="mt-5 max-w-3xl leading-relaxed text-white/70"
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
        >
          {practicalWays.intro}
        </p>
        <ol className="mt-10 grid list-none gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {practicalWays.items.map((item, index) => (
            <li key={itemLabel(item)} className="border-t border-white/20 pt-5">
              <p className="font-serif text-3xl font-semibold tabular-nums text-[#5EEAD4]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                <ItemText item={item} onDark />
              </p>
            </li>
          ))}
        </ol>
        <p
          className="mt-10 max-w-3xl leading-relaxed text-white/60"
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
        >
          {practicalWays.closing}
        </p>
        {practicalWays.ctaLabel && practicalWays.ctaHref ? (
          <p className="mt-8">
            <Link
              href={practicalWays.ctaHref}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              {practicalWays.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}

/** C — Cream timeline ladder: vertical sequence with connectors. */
function OptionC({ path, practicalWays }: Props) {
  return (
    <section
      id="practical-option-c"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={`${path}-practical-c-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="C" name="Timeline ladder" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h2
              id={`${path}-practical-c-heading`}
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)", color: INK }}
            >
              {practicalWays.heading}
            </h2>
            <p
              className="mt-5 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {practicalWays.intro}
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="relative list-none">
              {practicalWays.items.map((item, index) => {
                const last = index === practicalWays.items.length - 1;
                return (
                  <li key={itemLabel(item)} className="relative flex gap-5 pb-8 last:pb-0 sm:gap-6">
                    {!last ? (
                      <span
                        className="absolute left-[15px] top-8 bottom-0 w-px bg-stone-300 sm:left-[17px]"
                        aria-hidden
                      />
                    ) : null}
                    <span
                      className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:h-9 sm:w-9"
                      style={{ backgroundColor: TEAL }}
                    >
                      {index + 1}
                    </span>
                    <p
                      className="pt-1 leading-relaxed"
                      style={{
                        fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
                        color: INK,
                      }}
                    >
                      <ItemText item={item} />
                    </p>
                  </li>
                );
              })}
            </ol>
            <p
              className="mt-8 border-t border-stone-200/90 pt-6 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {practicalWays.closing}
            </p>
            <Cta practicalWays={practicalWays} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Temporary live compare: three Practical Ways layouts stacked.
 * Remove after a winner is chosen.
 */
export function PracticalWaysCompare({ path, practicalWays }: Props) {
  return (
    <>
      <div
        className="sticky top-16 z-30 border-b border-stone-200/90 bg-white/95 py-3 backdrop-blur-md md:top-20"
        role="navigation"
        aria-label="Compare Practical Ways layouts"
      >
        <div className={`${HOME4_WRAP} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="text-sm font-medium text-stone-700">
            Compare <span className="font-semibold text-shark">Practical Ways</span> — pick A, B, or C
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "practical-option-a", label: "A · Lever grid" },
                { id: "practical-option-b", label: "B · Numbered strip" },
                { id: "practical-option-c", label: "C · Timeline" },
              ] as const
            ).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full bg-stone-100 px-3.5 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <OptionA path={path} practicalWays={practicalWays} />
      <OptionB path={path} practicalWays={practicalWays} />
      <OptionC path={path} practicalWays={practicalWays} />
    </>
  );
}
