"use client";

import { useState, useMemo } from "react";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

/** SARS 2025/26 tax before rebates (annual taxable income). Age 65+ rebates: 17235 + 9444 = 26679 */
function taxBeforeRebates(annual: number): number {
  if (annual <= 0) return 0;
  if (annual <= 237_100) return annual * 0.18;
  if (annual <= 370_500) return 42_678 + (annual - 237_100) * 0.26;
  if (annual <= 512_800) return 77_362 + (annual - 370_500) * 0.31;
  if (annual <= 673_000) return 121_475 + (annual - 512_800) * 0.36;
  if (annual <= 857_900) return 179_147 + (annual - 673_000) * 0.39;
  if (annual <= 1_817_000) return 251_258 + (annual - 857_900) * 0.41;
  return 644_489 + (annual - 1_817_000) * 0.45;
}

const REBATES_65 = 17_235 + 9_444;

const DRAWDOWN_OPTIONS = [2.5, 3, 4, 5, 6, 7, 8, 9, 10];

export function AmethystAnnuityCalculator() {
  const [retirementCapital, setRetirementCapital] = useState(2_000_000);
  const [drawdownRate, setDrawdownRate] = useState(9);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    const drawdownDec = drawdownRate / 100;
    const grossAnnualIncome = retirementCapital * drawdownDec;
    const grossMonthlyIncome = grossAnnualIncome / 12;
    const taxBefore = taxBeforeRebates(grossAnnualIncome);
    const annualTaxPayable = Math.max(0, taxBefore - REBATES_65);
    const estimatedMonthlyTax = annualTaxPayable / 12;
    const netMonthlyIncome = grossMonthlyIncome - estimatedMonthlyTax;
    return {
      grossMonthlyIncome,
      grossAnnualIncome,
      estimatedMonthlyTax,
      annualTaxPayable,
      netMonthlyIncome,
    };
  }, [retirementCapital, drawdownRate]);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">AS Brokers – Amethyst Living Annuity Calculator</h2>
      <p className="text-zinc-400 text-sm mb-6">Estimate your monthly retirement income from a living annuity.</p>

      <div className="space-y-6">
        <div>
          <label className={labelClass}>Retirement capital (R)</label>
          <input
            type="number"
            min={0}
            step={100_000}
            value={retirementCapital}
            onChange={(e) => setRetirementCapital(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 11000000"
          />
        </div>
        <div>
          <label className={labelClass}>Drawdown rate (%)</label>
          <select
            value={drawdownRate}
            onChange={(e) => setDrawdownRate(Number(e.target.value))}
            className={inputClass}
          >
            {DRAWDOWN_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}%
              </option>
            ))}
          </select>
          <p className="text-zinc-500 text-xs mt-1">
            Pension fund rules allow between 2.5% and 17.5%. Everest product targets ~10.2% return.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setHasCalculated(true)}
        className="w-full mt-8 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate my annuity income
      </button>

      {hasCalculated && (
        <div className="mt-8 space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Gross monthly income</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.grossMonthlyIncome)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Estimated monthly tax</p>
            <p className="text-xl font-bold text-red-400">− {formatCurrency(result.estimatedMonthlyTax)}</p>
            <p className="text-zinc-500 text-xs mt-1">Assumes age 65+ (primary + secondary SARS rebates).</p>
          </div>
          <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Net monthly income</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(result.netMonthlyIncome)}</p>
          </div>
        </div>
      )}

      <p className="text-zinc-500 text-xs mt-6">
        This is a guideline calculator based on SARS 2025/26 tax brackets for individuals aged 65+. Results are estimates only and do not constitute financial advice. For an official quote, please submit your details and we&apos;ll request a formal quotation from Everest Wealth.
      </p>
    </div>
  );
}
