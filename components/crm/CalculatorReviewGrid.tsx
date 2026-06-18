"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getAllEmbedCalculators } from "@/lib/calculators/embed-registry";
import { getCalculatorReviewMeta } from "@/lib/calculators/review-meta";

const ALL_CALCULATORS = getAllEmbedCalculators();

export function CalculatorReviewGrid() {
  const [groupFilter, setGroupFilter] = useState<string>("all");

  const groups = useMemo(() => {
    const set = new Set(ALL_CALCULATORS.map((c) => getCalculatorReviewMeta(c.id).group));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const calculators = useMemo(() => {
    const rows = ALL_CALCULATORS.map((calc, index) => ({
      ...calc,
      index: index + 1,
      meta: getCalculatorReviewMeta(calc.id),
    }));
    if (groupFilter === "all") return rows;
    return rows.filter((c) => c.meta.group === groupFilter);
  }, [groupFilter]);

  const duplicateGroups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const calc of ALL_CALCULATORS) {
      const group = getCalculatorReviewMeta(calc.id).group;
      counts.set(group, (counts.get(group) ?? 0) + 1);
    }
    return new Set([...counts.entries()].filter(([, n]) => n > 1).map(([g]) => g));
  }, []);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="trust-hallmark mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Internal only · Not public
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">All calculators</h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            Every calculator is open below in a two-column grid. Scroll through, test each one, and mark which to keep
            or remove. No cycling through a dropdown.
          </p>
        </div>
        <Link
          href="/crm/calculator-session"
          className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
        >
          Client session mode (single calculator)
        </Link>
      </div>

      <div className="rim-light rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <label
          htmlFor="review-group-filter"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-zinc-400"
        >
          Filter by group
        </label>
        <select
          id="review-group-filter"
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="w-full max-w-md rounded-xl border border-white/15 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-50 focus:border-teal-500/40 focus:outline-none"
        >
          {groups.map((group) => (
            <option key={group} value={group}>
              {group === "all" ? "All calculators" : group}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-zinc-500">
          {calculators.length} calculator{calculators.length === 1 ? "" : "s"} shown · {ALL_CALCULATORS.length} total
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {calculators.map((calc) => {
          const isDuplicateGroup = duplicateGroups.has(calc.meta.group);

          return (
            <article
              key={calc.id}
              id={`calculator-${calc.id}`}
              className="rim-light flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#050506]"
            >
              <header className="border-b border-white/10 bg-white/[0.03] px-4 py-4 sm:px-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#00549F]/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-200">
                    #{calc.index}
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                    {calc.id}
                  </span>
                  <span className="rounded-full bg-teal-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-300">
                    {calc.meta.group}
                  </span>
                  {isDuplicateGroup && (
                    <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200">
                      Similar tools exist
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl">{calc.title}</h2>
                {calc.meta.note && <p className="mt-1.5 text-sm text-zinc-500">{calc.meta.note}</p>}
              </header>

              <div className="p-2 sm:p-3">
                <iframe
                  title={calc.title}
                  src={calc.embedPath}
                  className="h-[min(80vh,720px)] w-full rounded-xl border border-white/10 bg-[#0a0a0c]"
                  loading="eager"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
