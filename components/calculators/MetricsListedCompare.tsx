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

function CompareLabel({ letter, name, onDark = false }: { letter: string; name: string; onDark?: boolean }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
          onDark ? "bg-white text-shark" : "bg-[#1D1D1F] text-white"
        }`}
      >
        {letter}
      </span>
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
          onDark ? "text-white/50" : "text-stone-500"
        }`}
      >
        Option {letter} · {name}
      </p>
    </div>
  );
}

/** A — Full-width numbered statement rows. */
function OptionA({ path, metrics, footer }: Props) {
  return (
    <section
      id="metrics-option-a"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-metrics-a-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="A" name="Statement rows" />
        <div className="mx-auto max-w-4xl text-center">
          <p
            id={`${path}-metrics-a-heading`}
            className="text-sm font-semibold uppercase tracking-[0.14em]"
            style={{ color: TEAL }}
          >
            What the calculator illustrates
          </p>
          {footer ? (
            <p
              className="mt-5 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {footer}
            </p>
          ) : null}
        </div>
        <ol className="mt-10 list-none space-y-3">
          {metrics.map((metric, index) => (
            <li
              key={metric}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 rounded-2xl bg-white px-5 py-5 ring-1 ring-stone-200/90 sm:gap-8 sm:px-8 sm:py-6"
            >
              <span
                className="font-serif text-3xl font-semibold tabular-nums sm:text-4xl"
                style={{ color: TEAL }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p
                className="pt-1 font-medium leading-snug sm:pt-2"
                style={{
                  fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.25rem)",
                  color: INK,
                }}
              >
                {metric}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** B — Three equal spotlight cards under a short lead. */
function OptionB({ path, metrics, footer }: Props) {
  return (
    <section
      id="metrics-option-b"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={`${path}-metrics-b-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="B" name="Spotlight cards" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p
              id={`${path}-metrics-b-heading`}
              className="text-sm font-semibold uppercase tracking-[0.14em]"
              style={{ color: TEAL }}
            >
              What the calculator illustrates
            </p>
            {footer ? (
              <p
                className="mt-5 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                {footer}
              </p>
            ) : null}
          </div>
          <ul
            className={`grid list-none gap-4 lg:col-span-8 ${
              metrics.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {metrics.map((metric, index) => (
              <li
                key={metric}
                className="flex h-full flex-col rounded-2xl bg-[#1D1D1F] px-5 py-6 text-white sm:px-6"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5EEAD4]">
                  Point {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 flex-1 font-serif text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                  {metric}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** C — Dark chapter with large typographic metric list. */
function OptionC({ path, metrics, footer }: Props) {
  return (
    <section
      id="metrics-option-c"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 bg-shark py-14 text-white md:py-20"
      aria-labelledby={`${path}-metrics-c-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="C" name="Typographic list" onDark />
        <p
          id={`${path}-metrics-c-heading`}
          className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5EEAD4]"
        >
          What the calculator illustrates
        </p>
        {footer ? (
          <p
            className="mt-5 max-w-3xl leading-relaxed text-white/65"
            style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
          >
            {footer}
          </p>
        ) : null}
        <ul className="mt-10 list-none divide-y divide-white/15 border-y border-white/15">
          {metrics.map((metric) => (
            <li key={metric} className="py-6 sm:py-7">
              <p
                className="max-w-4xl font-serif font-semibold tracking-tight text-white"
                style={{
                  fontSize: "clamp(1.25rem, 1.05rem + 0.9vw, 1.875rem)",
                  lineHeight: 1.25,
                }}
              >
                {metric}
              </p>
            </li>
          ))}
        </ul>
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
            Compare <span className="font-semibold text-shark">What the calculator illustrates</span>, pick
            A, B, or C
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "metrics-option-a", label: "A · Statement rows" },
                { id: "metrics-option-b", label: "B · Spotlight cards" },
                { id: "metrics-option-c", label: "C · Typographic list" },
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
