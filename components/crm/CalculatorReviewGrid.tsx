"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getAllEmbedCalculators } from "@/lib/calculators/embed-registry";
import { formatStaffCalculatorLabel } from "@/lib/calculators/registry";
import { getCalculatorReviewMeta } from "@/lib/calculators/review-meta";
import {
  CRM_CALCULATOR_REVIEW_STORAGE_KEY,
  downloadCrmCalculatorReviewJson,
  downloadCrmCalculatorReviewMarkdown,
  emptyCrmReviewState,
  type CalculatorReviewState,
} from "@/lib/calculators/crm-calculator-review-export";

const ALL_CALCULATORS = getAllEmbedCalculators();

export function CalculatorReviewGrid() {
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [review, setReview] = useState<CalculatorReviewState>(emptyCrmReviewState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CRM_CALCULATOR_REVIEW_STORAGE_KEY);
      if (raw) {
        setReview({ ...emptyCrmReviewState(), ...(JSON.parse(raw) as CalculatorReviewState) });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CRM_CALCULATOR_REVIEW_STORAGE_KEY, JSON.stringify(review));
  }, [review, hydrated]);

  const updateEntry = useCallback((id: string, patch: Partial<{ keep: boolean; notes: string }>) => {
    setReview((prev) => ({
      ...prev,
      [id]: { keep: prev[id]?.keep ?? false, notes: prev[id]?.notes ?? "", ...patch },
    }));
  }, []);

  const stats = useMemo(() => {
    const entries = ALL_CALCULATORS.map((c) => review[c.id] ?? { keep: false, notes: "" });
    return {
      keep: entries.filter((e) => e.keep).length,
      notes: entries.filter((e) => e.notes.trim()).length,
    };
  }, [review]);

  const groups = useMemo(() => {
    const set = new Set(ALL_CALCULATORS.map((c) => getCalculatorReviewMeta(c.id).group));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const calculators = useMemo(() => {
    const rows = ALL_CALCULATORS.map((calc, index) => ({
      ...calc,
      index: index + 1,
      meta: getCalculatorReviewMeta(calc.id),
      staffLabel: formatStaffCalculatorLabel({
        assetCode: calc.assetCode,
        title: calc.title,
      }),
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
      <div className="sticky top-16 z-30 -mx-2 rounded-2xl border border-[#00549F]/30 bg-shark/95 px-4 py-3 backdrop-blur-xl sm:mx-0">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#00549F]">
              Curation · internal only
            </p>
            <p className="text-sm text-zinc-400">
              Tick calculators for the <strong className="text-white">public /calculators</strong> page, add notes, then
              export for Frank.
              {hydrated && (
                <span className="ml-2 text-zinc-500">
                  {stats.keep} keep · {stats.notes} with notes
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setReview(emptyCrmReviewState())}
              className="rounded-xl border border-white/15 px-3 py-2 text-sm text-zinc-400 hover:bg-white/5"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => downloadCrmCalculatorReviewMarkdown(review)}
              className="rounded-xl border border-white/15 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
            >
              Export .md
            </button>
            <button
              type="button"
              onClick={() => downloadCrmCalculatorReviewJson(review)}
              className="rounded-xl bg-[#00549F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0066b8]"
            >
              Export review file
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="trust-hallmark mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Internal only · Not public
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">All calculators</h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            Test every calculator below. Mark which ones Albert wants on the live site, the public page stays clean until
            you export and we apply his choices.
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
          const entry = review[calc.id] ?? { keep: false, notes: "" };

          return (
            <article
              key={calc.id}
              id={`calculator-${calc.id}`}
              className={`rim-light flex flex-col overflow-hidden rounded-2xl border bg-[#050506] ${
                entry.keep ? "border-emerald-500/40 ring-1 ring-emerald-500/25" : "border-white/10"
              }`}
            >
              <header className="border-b border-white/10 bg-white/[0.03] px-4 py-4 sm:px-5">
                <div
                  className="mb-4 rounded-xl border border-white/10 bg-black/30 p-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={entry.keep}
                      onChange={(e) => updateEntry(calc.id, { keep: e.target.checked })}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#00549F]"
                    />
                    <span className="text-sm font-medium text-white">Keep on public calculators page</span>
                  </label>
                  <label className="mt-3 block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Albert&apos;s notes
                    </span>
                    <textarea
                      value={entry.notes}
                      onChange={(e) => updateEntry(calc.id, { notes: e.target.value })}
                      rows={2}
                      placeholder="Rename, merge, feature, remove duplicate…"
                      className="w-full resize-y rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#00549F]/50 focus:outline-none"
                    />
                  </label>
                </div>

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
                <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl">{calc.staffLabel}</h2>
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
