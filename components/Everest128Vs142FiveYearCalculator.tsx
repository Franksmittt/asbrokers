"use client";

import { useMemo, useState } from "react";

const GROSS_A = 0.128;
const GROSS_B = 0.142;
const TAX_RATE = 0.2;
const BONUS_RATE = 0.1;
const YEARS = 5;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

type ProductResult = {
  grossAnnualReturn: number;
  grossAnnualIncome: number;
  taxWithheld: number;
  netAnnualIncome: number;
  netMonthlyIncome: number;
  fiveYearNetIncome: number;
  netBonus: number;
  totalFiveYearIncome: number;
};

function calculateProduct(investment: number, grossRate: number, includeBonus: boolean): ProductResult {
  const grossAnnualIncome = investment * grossRate;
  const taxWithheld = grossAnnualIncome * TAX_RATE;
  const netAnnualIncome = grossAnnualIncome - taxWithheld;
  const netMonthlyIncome = netAnnualIncome / 12;
  const fiveYearNetIncome = netAnnualIncome * YEARS;

  let netBonus = 0;
  if (includeBonus) {
    const grossBonus = investment * BONUS_RATE;
    const taxOnBonus = grossBonus * TAX_RATE;
    netBonus = grossBonus - taxOnBonus;
  }

  return {
    grossAnnualReturn: grossRate,
    grossAnnualIncome,
    taxWithheld,
    netAnnualIncome,
    netMonthlyIncome,
    fiveYearNetIncome,
    netBonus,
    totalFiveYearIncome: fiveYearNetIncome + netBonus,
  };
}

const TABLE_ROWS: { label: string; key: keyof ProductResult; format: (v: number) => string }[] = [
  { label: "Gross annual return", key: "grossAnnualReturn", format: formatPercent },
  { label: "Gross annual income", key: "grossAnnualIncome", format: formatCurrency },
  { label: "Tax withheld", key: "taxWithheld", format: formatCurrency },
  { label: "Net annual income", key: "netAnnualIncome", format: formatCurrency },
  { label: "Net monthly income", key: "netMonthlyIncome", format: formatCurrency },
  { label: "Five-year net income", key: "fiveYearNetIncome", format: formatCurrency },
  { label: "Net bonus", key: "netBonus", format: formatCurrency },
  { label: "Total five-year income", key: "totalFiveYearIncome", format: formatCurrency },
];

export function Everest128Vs142FiveYearCalculator() {
  const [investment, setInvestment] = useState(1_000_000);

  const results = useMemo(() => {
    if (!investment || investment <= 0) return null;

    const productA = calculateProduct(investment, GROSS_A, true);
    const productB = calculateProduct(investment, GROSS_B, false);
    const difference = productA.totalFiveYearIncome - productB.totalFiveYearIncome;
    const winner =
      difference > 0
        ? "Product A (12.8%) produces the higher total income over five years."
        : difference < 0
          ? "Product B (14.2%) produces the higher total income over five years."
          : "Both products produce the same total income over five years.";

    return { productA, productB, difference, winner };
  }, [investment]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#151518] p-6 sm:p-8">
      <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl">12.8% vs 14.2% Comparison</h2>
      <p className="mb-6 text-sm text-zinc-400">Fixed five-year comparison. Bonus on Product A: 10% at end of year 5.</p>

      <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="five-year-investment">
        Investment amount
      </label>
      <input
        id="five-year-investment"
        type="number"
        min={100000}
        step={10000}
        value={investment}
        onChange={(e) => setInvestment(Number(e.target.value) || 0)}
        className="mb-6 w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
      />

      {results ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="py-3 pr-4 font-semibold text-zinc-400"> </th>
                <th className="py-3 px-4 font-semibold text-teal-300">Product A (12.8%)</th>
                <th className="py-3 pl-4 font-semibold text-blue-300">Product B (14.2%)</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row.key} className="border-b border-white/5">
                  <td className="py-3 pr-4 text-zinc-300">{row.label}</td>
                  <td className="py-3 px-4 font-medium text-white">{row.format(results.productA[row.key])}</td>
                  <td className="py-3 pl-4 font-medium text-white">{row.format(results.productB[row.key])}</td>
                </tr>
              ))}
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 text-zinc-300">Difference over five years</td>
                <td colSpan={2} className="py-3 pl-4 font-bold text-white">
                  {formatCurrency(Math.abs(results.difference))}
                  {results.difference > 0 ? " in favour of Product A" : results.difference < 0 ? " in favour of Product B" : ""}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-zinc-300">Higher total over five years</td>
                <td colSpan={2} className="py-3 pl-4 font-semibold text-zinc-100">
                  {results.winner}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">Enter a valid investment amount.</p>
      )}
    </div>
  );
}
