import type { CalculatorResultGuide } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import {
  HUB_TEAL as TEAL,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const CREAM = "#FDFCFA";

type Props = {
  path: string;
  metrics: NonNullable<CalculatorResultGuide["metricsListed"]>;
  footer?: string;
};

/** Winner: editorial split, label + footer left, metrics right with hairline rules. */
export function MetricsListedSection({ path, metrics, footer }: Props) {
  return (
    <section
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-12 md:py-16"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={`${path}-metrics-heading`}
    >
      <div className={HOME4_WRAP}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p
              id={`${path}-metrics-heading`}
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
