"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { getAllEmbedCalculators } from "@/lib/calculators/embed-registry";
import { getCalculatorReviewMeta } from "@/lib/calculators/review-meta";

const ALL_CALCULATORS = getAllEmbedCalculators();

export function CalculatorReviewGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [groupFilter, setGroupFilter] = useState<string>("all");

  const groups = useMemo(() => {
    const set = new Set(ALL_CALCULATORS.map((c) => getCalculatorReviewMeta(c.id).group));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const calculators = useMemo(() => {
    const rows = ALL_CALCULATORS.map((calc) => ({
      ...calc,
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
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="trust-hallmark mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Internal only · Not public
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Calculator review</h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400">
          Test every calculator in one place. Use this grid with Albert to decide which tools to keep, remove, or
          merge. Similar calculators are grouped — duplicates are flagged.
        </p>
      </div>

      <div className="rim-light rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <label htmlFor="review-group-filter" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {calculators.map((calc) => {
          const isExpanded = expandedId === calc.id;
          const isDuplicateGroup = duplicateGroups.has(calc.meta.group);

          return (
            <article
              key={calc.id}
              className="rim-light flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#050506]"
            >
              <div className="border-b border-white/10 p-4 sm:p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
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
                <h2 className="text-lg font-bold text-white">{calc.title}</h2>
                {calc.meta.note && <p className="mt-1 text-sm text-zinc-500">{calc.meta.note}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : calc.id)}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
                  >
                    {isExpanded ? "Hide preview" : "Test calculator"}
                  </button>
                  <a
                    href={calc.embedPath}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    Open embed
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {isExpanded && (
                <div className="min-h-[520px] flex-1 p-2 sm:p-3">
                  <iframe
                    title={calc.title}
                    src={calc.embedPath}
                    className="h-[min(72vh,640px)] w-full rounded-xl border border-white/10 bg-[#0a0a0c]"
                    loading="lazy"
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
