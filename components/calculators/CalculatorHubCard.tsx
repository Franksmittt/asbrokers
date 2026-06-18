"use client";

import Link from "next/link";
import type { HubCalculator } from "@/lib/calculators/hub-catalog";
import type { CalculatorReviewEntry } from "@/lib/calculators/hub-review-export";

type Props = {
  calc: HubCalculator;
  review: CalculatorReviewEntry;
  onKeepChange: (keep: boolean) => void;
  onNotesChange: (notes: string) => void;
};

export function CalculatorHubCard({ calc, review, onKeepChange, onNotesChange }: Props) {
  const { featured, glow, muted, leadsToAccent } = calc;

  return (
    <article
      className={`flex h-full flex-col rounded-[2rem] border transition-all duration-500 ${
        muted
          ? "border-white/5 bg-[#101014] hover:bg-[#121218]"
          : "rim-light border-0 bg-white/[0.04] hover:bg-white/[0.07]"
      } ${glow ? "border-blue-500/40 shadow-lg shadow-blue-500/10" : ""} ${
        review.keep ? "ring-2 ring-emerald-500/40" : ""
      } ${featured ? "p-6 md:p-8 lg:p-10" : "p-6 md:p-8"}`}
    >
      <div
        className="mb-4 rounded-xl border border-white/10 bg-black/30 p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={review.keep}
            onChange={(e) => onKeepChange(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 accent-[#00549F]"
          />
          <span className="text-sm font-medium text-white">Keep on final calculators page</span>
        </label>
        <label className="mt-3 block">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Notes for Albert / developer
          </span>
          <textarea
            value={review.notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={2}
            placeholder="e.g. Keep but rename, merge with income calculator, move to estate section…"
            className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#00549F]/50 focus:outline-none focus:ring-1 focus:ring-[#00549F]/30"
          />
        </label>
      </div>

      <div className="flex flex-1 flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cinematic-teal">{calc.tag}</span>
        <h3 className="mt-2 mb-3 text-xl font-bold tracking-tight text-white">{calc.title}</h3>
        <p className="mb-4 text-sm leading-relaxed tracking-[0.01em] text-gray-400">{calc.description}</p>
        <ul className="mb-4 space-y-1.5">
          {calc.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-gray-500">
              <span className="mt-0.5 text-cinematic-teal">→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="mb-4 text-xs">
          <span className="text-gray-400">Leads to:</span>{" "}
          <span className={leadsToAccent ? "font-medium text-cinematic-teal" : "text-gray-500"}>{calc.leadsTo}</span>
        </p>
        <Link
          href={calc.href}
          prefetch={false}
          className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-cinematic-teal transition-all duration-300 hover:gap-2"
        >
          Open calculator
        </Link>
      </div>
    </article>
  );
}
