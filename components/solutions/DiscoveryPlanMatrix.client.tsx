"use client";

import { useState } from "react";

export type DiscoveryPlanCard = {
  series: string;
  avatar: string;
  mechanism: string;
  premiums: string[];
  filter: "all" | "premium" | "family" | "budget";
};

const TEAL = "#0F766E";

const FILTERS = [
  { id: "all" as const, label: "All series" },
  { id: "premium" as const, label: "High cover" },
  { id: "family" as const, label: "Family / day-to-day" },
  { id: "budget" as const, label: "Budget / network" },
];

type Props = {
  plans: DiscoveryPlanCard[];
};

export function DiscoveryPlanMatrix({ plans }: Props) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const visible = filter === "all" ? plans : plans.filter((p) => p.filter === filter || p.filter === "all");

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter Discovery plan series">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded px-3 py-1.5 text-sm font-medium transition ${
                active
                  ? "text-white"
                  : "border border-stone-300 bg-white text-stone-700 hover:border-stone-400"
              }`}
              style={active ? { backgroundColor: TEAL } : undefined}
              aria-pressed={active}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 sm:grid-cols-2">
        {visible.map((plan) => (
          <li key={plan.series} className="flex flex-col bg-[#F7F6F3] p-6 sm:p-7">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: TEAL }}
            >
              {plan.series}
            </p>
            <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight text-shark">
              {plan.avatar}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{plan.mechanism}</p>
            <ul className="mt-5 space-y-1 border-t border-stone-200 pt-4">
              {plan.premiums.map((line) => (
                <li key={line} className="text-sm font-semibold tabular-nums text-shark">
                  {line}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-stone-600">
        Illustrative main-member starting contributions from Discovery Health Medical Scheme
        materials for the 2026 benefit year (rates effective 1 April 2026 where applicable). Exact
        premiums depend on dependents, income band (KeyCare), and plan options. Confirm with FSP
        17273 before deciding.
      </p>
    </div>
  );
}
