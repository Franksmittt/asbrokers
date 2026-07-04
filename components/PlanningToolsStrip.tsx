import Link from "next/link";
import { PILLAR_FUNNELS, PILLAR_HUB } from "@/lib/site-navigation";
import { WARM_LINK } from "@/lib/warm-theme";

/** Compact cross-links to pillar funnels, use on calculators, solutions, etc. */
export function PlanningToolsStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-samsung-blue/25 bg-samsung-blue/5 px-4 py-4 sm:px-6 ${className}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-samsung-blue">Planning tools</p>
          <p className="text-sm text-stone-600">
            Free assessments & blueprints, paid guides from R299 when available.{" "}
            Assessments and blueprints for{" "}
            <Link href={PILLAR_HUB.href} className={WARM_LINK}>
              Health · Wealth · Legacy · Business
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PILLAR_FUNNELS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-samsung-blue/40 hover:text-samsung-blue"
            >
              {item.pillar}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
