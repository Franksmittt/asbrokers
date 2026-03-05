"use client";

import { useState, useMemo } from "react";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(val);

/**
 * SARS 2026/27 tax brackets (annual taxable income).
 * Source: Budget 2026 / SARS rates for individuals (year of assessment 2027).
 * Rates as of Budget 2026 — consult a tax practitioner for latest.
 */
const TAX_BRACKETS: { limit: number; baseTax: number; rate: number }[] = [
  { limit: 245_100, baseTax: 0, rate: 0.18 },
  { limit: 383_100, baseTax: 44_118, rate: 0.26 },
  { limit: 530_200, baseTax: 79_998, rate: 0.31 },
  { limit: 695_800, baseTax: 125_599, rate: 0.36 },
  { limit: 887_000, baseTax: 185_215, rate: 0.39 },
  { limit: 1_878_600, baseTax: 259_783, rate: 0.41 },
  { limit: Infinity, baseTax: 666_339, rate: 0.45 },
];

const BRACKET_THRESHOLDS = [0, 245_100, 383_100, 530_200, 695_800, 887_000, 1_878_600];

/** Rebates 2026/27: under 65 (primary), 65–74 (primary + secondary), 75+ (primary + secondary + tertiary) */
const REBATES = [17_820, 17_820 + 9_765, 17_820 + 9_765 + 3_249];

function getRebate(age: number): number {
  if (age >= 75) return REBATES[2];
  if (age >= 65) return REBATES[1];
  return REBATES[0];
}

function calculateAnnualTax(taxableAnnual: number, age: number): number {
  if (taxableAnnual <= 0) return 0;
  let taxBeforeRebate = 0;
  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    const bracket = TAX_BRACKETS[i];
    const prevLimit = BRACKET_THRESHOLDS[i] ?? 0;
    if (taxableAnnual <= bracket.limit) {
      taxBeforeRebate = bracket.baseTax + (taxableAnnual - prevLimit) * bracket.rate;
      break;
    }
  }
  const rebate = getRebate(age);
  return Math.max(0, taxBeforeRebate - rebate);
}

export function IncomeTaxCalculator() {
  const [grossMonthly, setGrossMonthly] = useState(50_000);
  const [age, setAge] = useState(45);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    const annualGross = grossMonthly * 12;
    const annualTax = calculateAnnualTax(annualGross, age);
    const monthlyPaye = annualTax / 12;
    const netAnnual = annualGross - annualTax;
    const netMonthly = netAnnual / 12;
    const effectiveRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0;
    return {
      annualTax,
      monthlyPaye,
      effectiveRate,
      netMonthly,
      netAnnual,
    };
  }, [grossMonthly, age]);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">AS Brokers – Income Tax Calculator</h2>
      <p className="text-zinc-400 text-sm mb-6">
        Calculate your South African PAYE based on 2026/27 tax tables (Budget 2026).
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Gross monthly salary (Rand)</label>
          <input
            type="number"
            min={0}
            step={1000}
            value={grossMonthly}
            onChange={(e) => setGrossMonthly(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 50000"
          />
          <p className="text-zinc-500 text-xs mt-1">Your total monthly salary before deductions.</p>
        </div>
        <div>
          <label className={labelClass}>Your age</label>
          <input
            type="number"
            min={18}
            max={120}
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || 18)}
            className={inputClass}
            placeholder="e.g. 45"
          />
          <p className="text-zinc-500 text-xs mt-1">Age affects tax rebates (65+ and 75+ get extra).</p>
        </div>
      </div>

      <p className="text-zinc-500 text-xs mt-4 mb-6">
        This calculator uses official SARS 2026/27 tax brackets and rebates (Budget 2026).
      </p>

      <button
        type="button"
        onClick={() => setHasCalculated(true)}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate my tax
      </button>

      {hasCalculated && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Annual tax payable</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.annualTax)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Monthly PAYE</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.monthlyPaye)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Effective tax rate</p>
            <p className="text-xl font-bold text-white">{result.effectiveRate.toFixed(1)}%</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Net monthly pay</p>
            <p className="text-xl font-bold text-green-400">{formatCurrency(result.netMonthly)}</p>
          </div>
        </div>
      )}

      <p className="text-zinc-500 text-xs mt-6">
        About this estimate: This calculator provides an estimate based on SARS 2026/27 tax brackets and rebates (Budget 2026). It
        does not account for UIF, medical aid tax credits, retirement fund contributions, or other deductions that may
        reduce your tax liability. Rates as of Budget 2026 — consult a qualified tax practitioner for the latest.
      </p>
    </div>
  );
}
