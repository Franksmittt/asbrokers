import type { CalculatorIncomeFlow } from "@/lib/calculators/page-configs";
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
  incomeFlow: CalculatorIncomeFlow;
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

/** A — Full-width horizontal stepper (wraps on small screens). */
function OptionA({ path, incomeFlow }: Props) {
  return (
    <section
      id="income-flow-option-a"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-income-flow-a-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="A" name="Horizontal stepper" />
        <h2
          id={`${path}-income-flow-a-heading`}
          className="max-w-3xl font-bold tracking-tight"
          style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)", color: INK }}
        >
          {incomeFlow.heading}
        </h2>
        {incomeFlow.intro ? (
          <p
            className="mt-5 max-w-3xl leading-relaxed"
            style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
          >
            {incomeFlow.intro}
          </p>
        ) : null}
        <ol className="mt-10 flex list-none flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch lg:flex-nowrap lg:gap-0">
          {incomeFlow.steps.map((step, index) => (
            <li key={step} className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-stretch">
              <div className="flex flex-1 flex-col justify-center rounded-2xl bg-white px-4 py-5 text-center ring-1 ring-stone-200/90 sm:px-5">
                <span className="text-[11px] font-semibold tabular-nums tracking-[0.14em]" style={{ color: TEAL }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-semibold leading-snug text-shark sm:text-[0.9375rem]">{step}</p>
              </div>
              {index < incomeFlow.steps.length - 1 ? (
                <div className="flex items-center justify-center py-1 sm:px-2 sm:py-0" aria-hidden>
                  <span className="text-lg font-semibold sm:hidden" style={{ color: TEAL }}>
                    ↓
                  </span>
                  <span className="hidden text-lg font-semibold sm:inline" style={{ color: TEAL }}>
                    →
                  </span>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        {incomeFlow.footer ? (
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-stone-600">{incomeFlow.footer}</p>
        ) : null}
      </div>
    </section>
  );
}

/** B — Dark split: copy left, numbered vertical ladder right. */
function OptionB({ path, incomeFlow }: Props) {
  return (
    <section
      id="income-flow-option-b"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 bg-shark py-14 text-white md:py-20"
      aria-labelledby={`${path}-income-flow-b-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="B" name="Dark ladder" onDark />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2
              id={`${path}-income-flow-b-heading`}
              className="font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)" }}
            >
              {incomeFlow.heading}
            </h2>
            {incomeFlow.intro ? (
              <p
                className="mt-5 leading-relaxed text-white/70"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
              >
                {incomeFlow.intro}
              </p>
            ) : null}
            {incomeFlow.footer ? (
              <p className="mt-8 text-sm leading-relaxed text-white/55">{incomeFlow.footer}</p>
            ) : null}
          </div>
          <ol className="relative list-none lg:col-span-7">
            {incomeFlow.steps.map((step, index) => {
              const last = index === incomeFlow.steps.length - 1;
              return (
                <li key={step} className="relative flex gap-5 pb-6 last:pb-0 sm:gap-6">
                  {!last ? (
                    <span
                      className="absolute left-[17px] top-9 bottom-0 w-px bg-white/20 sm:left-[19px]"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5EEAD4] text-xs font-bold text-shark">
                    {index + 1}
                  </span>
                  <p className="pt-1.5 text-base font-semibold leading-snug text-white sm:text-lg">{step}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** C — Cream funnel: steps narrow as income moves down the page. */
function OptionC({ path, incomeFlow }: Props) {
  const widths = ["100%", "92%", "84%", "76%", "68%"];
  return (
    <section
      id="income-flow-option-c"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={`${path}-income-flow-c-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="C" name="Income funnel" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h2
              id={`${path}-income-flow-c-heading`}
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)", color: INK }}
            >
              {incomeFlow.heading}
            </h2>
            {incomeFlow.intro ? (
              <p
                className="mt-5 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                {incomeFlow.intro}
              </p>
            ) : null}
            {incomeFlow.footer ? (
              <p className="mt-8 text-sm leading-relaxed text-stone-600">{incomeFlow.footer}</p>
            ) : null}
          </div>
          <ol className="flex list-none flex-col items-center gap-2 lg:col-span-8">
            {incomeFlow.steps.map((step, index) => (
              <li
                key={step}
                className="w-full"
                style={{ maxWidth: widths[Math.min(index, widths.length - 1)] }}
              >
                <div className="rounded-2xl bg-white px-5 py-4 text-center ring-1 ring-stone-200/90 sm:px-6 sm:py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
                    Step {index + 1}
                  </p>
                  <p className="mt-2 font-semibold text-shark">{step}</p>
                </div>
                {index < incomeFlow.steps.length - 1 ? (
                  <p className="py-1 text-center text-lg font-semibold" style={{ color: TEAL }} aria-hidden>
                    ↓
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Temporary live compare: three income-flow layouts.
 * Remove after a winner is chosen.
 */
export function IncomeFlowCompare({ path, incomeFlow }: Props) {
  return (
    <>
      <div
        className="sticky top-16 z-30 border-b border-stone-200/90 bg-white/95 py-3 backdrop-blur-md md:top-20"
        role="navigation"
        aria-label="Compare income flow layouts"
      >
        <div className={`${HOME4_WRAP} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="text-sm font-medium text-stone-700">
            Compare <span className="font-semibold text-shark">Where your income goes</span>, pick A, B, or C
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "income-flow-option-a", label: "A · Horizontal" },
                { id: "income-flow-option-b", label: "B · Dark ladder" },
                { id: "income-flow-option-c", label: "C · Funnel" },
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
      <OptionA path={path} incomeFlow={incomeFlow} />
      <OptionB path={path} incomeFlow={incomeFlow} />
      <OptionC path={path} incomeFlow={incomeFlow} />
    </>
  );
}
