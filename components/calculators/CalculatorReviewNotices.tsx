/**
 * Visible calculator review notices (containment 2026-07-22).
 * Must remain above the input section and below results, not hidden in footers/tooltips.
 */

import {
  CALCULATOR_REVIEW_NOTICE_ABOVE_INPUT,
  CALCULATOR_REVIEW_NOTICE_BELOW_RESULT,
} from "@/lib/compliance/containment";

export function CalculatorReviewNoticeAbove() {
  return (
    <aside
      className="rounded-2xl border border-amber-200/90 bg-amber-50 px-4 py-4 sm:px-5"
      role="note"
      aria-label="Calculator review notice"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-900">
        Calculator review notice
      </p>
      <p className="mt-2 text-sm leading-relaxed text-amber-950/90">
        {CALCULATOR_REVIEW_NOTICE_ABOVE_INPUT}
      </p>
    </aside>
  );
}

export function CalculatorReviewNoticeBelowResult() {
  return (
    <aside
      className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 sm:px-5"
      role="note"
      aria-label="Result estimate notice"
    >
      <p className="text-sm leading-relaxed text-stone-700">{CALCULATOR_REVIEW_NOTICE_BELOW_RESULT}</p>
    </aside>
  );
}
