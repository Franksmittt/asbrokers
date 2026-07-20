import type { CalculatorResultGuide } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import {
  HUB_TEAL as TEAL,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const CREAM = "#FDFCFA";

type Props = {
  path: string;
  metrics: NonNullable<CalculatorResultGuide["metricsListed"]>;
  footer?: string;
};

/** Winner: spotlight cards, lead left, dark serif metric cards right. */
export function MetricsListedSection({ path, metrics, footer }: Props) {
  return (
    <section
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={`${path}-metrics-heading`}
    >
      <div className={HOME4_WRAP}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p
              id={`${path}-metrics-heading`}
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
