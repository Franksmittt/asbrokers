import type { CalculatorResultGuide } from "@/lib/calculators/page-configs";
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
  metrics: NonNullable<CalculatorResultGuide["metricsListed"]>;
  footer?: string;
};

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

/** A — Soft metric tiles in a full-width 3×2 grid. */
function OptionA({ path, metrics, footer }: Props) {
  return (
    <section
      id="metrics-option-a"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-12 md:py-16"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-metrics-a-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="A" name="Metric tiles" />
        <p
          id={`${path}-metrics-a-heading`}
          className="text-sm font-semibold uppercase tracking-[0.12em]"
          style={{ color: TEAL }}
        >
          What the calculator illustrates
        </p>
        <ul className="mt-6 grid list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <li
              key={metric}
              className="rounded-2xl bg-white px-5 py-5 ring-1 ring-stone-200/90 sm:px-6"
            >
              <span className="text-[11px] font-semibold tabular-nums tracking-[0.14em] text-stone-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-medium leading-snug" style={{ color: INK }}>
                {metric}
              </p>
            </li>
          ))}
        </ul>
        {footer ? (
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-stone-600">{footer}</p>
        ) : null}
      </div>
    </section>
  );
}

/** B — Dark panel, numbered metrics in a clean 3×2 strip. */
function OptionB({ path, metrics, footer }: Props) {
  return (
    <section
      id="metrics-option-b"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 bg-shark py-12 text-white md:py-16"
      aria-labelledby={`${path}-metrics-b-heading`}
    >
      <div className={HOME4_WRAP}>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-shark">
            B
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Option B · Dark strip
          </p>
        </div>
        <p
          id={`${path}-metrics-b-heading`}
          className="text-sm font-semibold uppercase tracking-[0.12em] text-[#5EEAD4]"
        >
          What the calculator illustrates
        </p>
        <ul className="mt-8 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <li key={metric} className="border-t border-white/20 pt-4">
              <p className="font-serif text-2xl font-semibold tabular-nums text-[#5EEAD4]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">{metric}</p>
            </li>
          ))}
        </ul>
        {footer ? (
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/55">{footer}</p>
        ) : null}
      </div>
    </section>
  );
}

/** C — Editorial split: label + footer left, metric list right with hairline rules. */
function OptionC({ path, metrics, footer }: Props) {
  return (
    <section
      id="metrics-option-c"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-12 md:py-16"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={`${path}-metrics-c-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="C" name="Editorial split" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p
              id={`${path}-metrics-c-heading`}
              className="text-sm font-semibold uppercase tracking-[0.12em]"
              style={{ color: TEAL }}
            >
              What the calculator illustrates
            </p>
            {footer ? (
              <p
                className="mt-5 leading-relaxed"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
              >
                {footer}
              </p>
            ) : null}
          </div>
          <ul className="grid list-none grid-cols-1 gap-0 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:gap-x-8">
            {metrics.map((metric) => (
              <li
                key={metric}
                className="border-t border-stone-300/80 py-4 text-sm font-medium leading-snug sm:text-[0.9375rem]"
                style={{ color: INK }}
              >
                {metric}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Temporary live compare: three “What the calculator illustrates” layouts.
 * Remove after a winner is chosen.
 */
export function MetricsListedCompare({ path, metrics, footer }: Props) {
  return (
    <>
      <div
        className="sticky top-16 z-30 border-b border-stone-200/90 bg-white/95 py-3 backdrop-blur-md md:top-20"
        role="navigation"
        aria-label="Compare metrics layouts"
      >
        <div className={`${HOME4_WRAP} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="text-sm font-medium text-stone-700">
            Compare <span className="font-semibold text-shark">What the calculator illustrates</span> — pick
            A, B, or C
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "metrics-option-a", label: "A · Tiles" },
                { id: "metrics-option-b", label: "B · Dark strip" },
                { id: "metrics-option-c", label: "C · Editorial" },
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
      <OptionA path={path} metrics={metrics} footer={footer} />
      <OptionB path={path} metrics={metrics} footer={footer} />
      <OptionC path={path} metrics={metrics} footer={footer} />
    </>
  );
}
