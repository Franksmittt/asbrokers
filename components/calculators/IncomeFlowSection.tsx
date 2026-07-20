import type { CalculatorIncomeFlow } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

type Props = {
  path: string;
  incomeFlow: CalculatorIncomeFlow;
};

/** Winner: full-width horizontal stepper. */
export function IncomeFlowSection({ path, incomeFlow }: Props) {
  return (
    <section
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-income-flow-heading`}
    >
      <div className={HOME4_WRAP}>
        <h2
          id={`${path}-income-flow-heading`}
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
