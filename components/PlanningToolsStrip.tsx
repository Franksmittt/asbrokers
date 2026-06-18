import Link from "next/link";
import { PILLAR_FUNNELS, PILLAR_HUB } from "@/lib/site-navigation";

/** Compact cross-links to pillar funnels — use on calculators, solutions, etc. */
export function PlanningToolsStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[#00549F]/25 bg-[#00549F]/5 px-4 py-4 sm:px-6 ${className}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#00549F]">Free planning tools</p>
          <p className="text-sm text-zinc-400">
            Assessments and blueprints for{" "}
            <Link href={PILLAR_HUB.href} className="text-white hover:underline">
              Health · Wealth · Legacy · Business
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PILLAR_FUNNELS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-[#00549F]/40 hover:text-white"
            >
              {item.pillar}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
