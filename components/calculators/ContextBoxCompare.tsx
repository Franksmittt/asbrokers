import Link from "next/link";
import type { CalculatorContextBox } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const CREAM = "#FDFCFA";

type Props = {
  path: string;
  contextBox: CalculatorContextBox;
};

function ToolkitLinks({ onDark = false }: { onDark?: boolean }) {
  const muted = onDark ? "text-white/55" : "text-stone-600";
  const link = onDark
    ? "font-semibold text-[#5EEAD4] hover:opacity-80"
    : "font-semibold hover:underline";
  return (
    <p className={`text-sm leading-relaxed ${muted}`}>
      Part of the{" "}
      <Link
        href="/calculators"
        prefetch={false}
        className={link}
        style={onDark ? undefined : { color: TEAL }}
      >
        Retirement Gap Toolkit™
      </Link>
      . After you run the numbers, continue with the{" "}
      <Link
        href="/retirement-gap-method"
        prefetch={false}
        className={link}
        style={onDark ? undefined : { color: TEAL }}
      >
        Retirement Gap Method™
      </Link>
      .
    </p>
  );
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

/** A — Light editorial: body column + full-width rule quote (no cards). */
function OptionA({ path, contextBox }: Props) {
  return (
    <section
      id="why-option-a"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-context-a-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="A" name="Editorial rule" />
        <h2
          id={`${path}-context-a-heading`}
          className="max-w-xl font-bold tracking-tight"
          style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)", color: INK }}
        >
          {contextBox.heading}
        </h2>
        <div className="mt-6 max-w-2xl space-y-4">
          {contextBox.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)", color: BODY }}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {contextBox.highlightQuestion ? (
          <blockquote className="mt-12 border-t border-stone-300/90 pt-8">
            <p
              className="max-w-4xl font-serif font-semibold tracking-tight"
              style={{
                fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)",
                lineHeight: 1.2,
                color: INK,
              }}
            >
              {contextBox.highlightQuestion}
            </p>
          </blockquote>
        ) : null}
        <div className="mt-10 max-w-2xl">
          <ToolkitLinks />
        </div>
      </div>
    </section>
  );
}

/** B — Question-led: the highlight leads; supporting copy sits in two columns below. */
function OptionB({ path, contextBox }: Props) {
  return (
    <section
      id="why-option-b"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={`${path}-context-b-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="B" name="Question first" />
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: TEAL }}
          id={`${path}-context-b-heading`}
        >
          {contextBox.heading}
        </p>
        {contextBox.highlightQuestion ? (
          <p
            className="mt-5 max-w-5xl font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.5rem)",
              lineHeight: 1.12,
              color: INK,
            }}
          >
            {contextBox.highlightQuestion}
          </p>
        ) : (
          <h2
            className="mt-4 font-bold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)", color: INK }}
          >
            {contextBox.heading}
          </h2>
        )}
        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-stone-200/90 pt-8 md:grid-cols-2 md:gap-10">
          {contextBox.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-10">
          <ToolkitLinks />
        </div>
      </div>
    </section>
  );
}

/** C — Split panes: dark intent column + light explanation column (edge-to-edge in wrap). */
function OptionC({ path, contextBox }: Props) {
  return (
    <section
      id="why-option-c"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-10 md:py-14"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-context-c-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="C" name="Split panes" />
        <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-stone-300/70 lg:grid lg:grid-cols-12">
          <div className="bg-[#1D1D1F] px-6 py-10 text-white sm:px-8 sm:py-12 lg:col-span-5 lg:px-10 lg:py-14">
            <h2
              id={`${path}-context-c-heading`}
              className="font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)" }}
            >
              {contextBox.heading}
            </h2>
            {contextBox.highlightQuestion ? (
              <p
                className="mt-8 font-serif font-semibold tracking-tight text-white"
                style={{
                  fontSize: "clamp(1.5rem, 1.25rem + 1.1vw, 2.125rem)",
                  lineHeight: 1.25,
                }}
              >
                {contextBox.highlightQuestion}
              </p>
            ) : null}
          </div>
          <div
            className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:col-span-7 lg:px-12 lg:py-14"
            style={{ backgroundColor: CREAM }}
          >
            <div className="space-y-4">
              {contextBox.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <ToolkitLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Temporary live compare: three Why This Matters layouts stacked.
 * Remove after a winner is chosen.
 */
export function ContextBoxCompare({ path, contextBox }: Props) {
  return (
    <>
      <div
        className="sticky top-16 z-30 border-b border-stone-200/90 bg-white/95 py-3 backdrop-blur-md md:top-20"
        role="navigation"
        aria-label="Compare Why This Matters layouts"
      >
        <div className={`${HOME4_WRAP} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="text-sm font-medium text-stone-700">
            Compare <span className="font-semibold text-shark">Why This Matters</span> — pick A, B, or C
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "why-option-a", label: "A · Editorial" },
                { id: "why-option-b", label: "B · Question first" },
                { id: "why-option-c", label: "C · Split panes" },
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
      <OptionA path={path} contextBox={contextBox} />
      <OptionB path={path} contextBox={contextBox} />
      <OptionC path={path} contextBox={contextBox} />
    </>
  );
}
