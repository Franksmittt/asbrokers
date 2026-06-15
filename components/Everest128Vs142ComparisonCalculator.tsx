"use client";

import { useMemo, useState } from "react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);

const GROSS_128 = 0.128;
const GROSS_142 = 0.142;
const TAX_RATE = 0.2;

const YEAR_OPTIONS = [
  { value: 1, label: "1 year" },
  { value: 3, label: "3 years" },
  { value: 5, label: "5 years" },
  { value: 10, label: "10 years" },
] as const;

type IncomeMode = "income" | "reinvest";

export function Everest128Vs142ComparisonCalculator() {
  const [capital, setCapital] = useState(1_000_000);
  const [years, setYears] = useState(5);
  const [mode, setMode] = useState<IncomeMode>("income");
  const [includeBonus, setIncludeBonus] = useState(true);

  const results = useMemo(() => {
    if (!capital || capital <= 0) return null;

    const net128 = GROSS_128 * (1 - TAX_RATE);
    const net142 = GROSS_142 * (1 - TAX_RATE);

    const annualIncome128 = capital * net128;
    const annualIncome142 = capital * net142;
    const monthlyIncome128 = annualIncome128 / 12;
    const monthlyIncome142 = annualIncome142 / 12;

    let final128 = capital;
    let final142 = capital;
    let totalIncome128 = 0;
    let totalIncome142 = 0;

    if (mode === "income") {
      totalIncome128 = annualIncome128 * years;
      totalIncome142 = annualIncome142 * years;
    } else {
      final128 = capital * Math.pow(1 + net128, years);
      final142 = capital * Math.pow(1 + net142, years);
    }

    let bonus128 = 0;
    if (includeBonus) {
      const bonusPeriods = Math.floor(years / 5);
      bonus128 = capital * 0.08 * bonusPeriods;
      final128 += bonus128;
    }

    const annualDifference = annualIncome142 - annualIncome128;
    const monthlyDifference = annualDifference / 12;
    const finalDifference = final142 - final128;

    let winnerText = "";
    if (mode === "income") {
      winnerText = `The 14.2% option produces ${formatCurrency(monthlyDifference)} more monthly income before considering product risk, liquidity, structure, and suitability. Over ${years} year(s), the income difference is ${formatCurrency(annualDifference * years)}.`;
    } else if (finalDifference > 0) {
      winnerText = `On a pure reinvestment calculation, the 14.2% option ends ahead by ${formatCurrency(finalDifference)} over ${years} year(s).`;
    } else {
      winnerText = `After including the 5-year bonus, the 12.8% option ends ahead by ${formatCurrency(Math.abs(finalDifference))} over ${years} year(s).`;
    }

    return {
      net128,
      net142,
      monthlyIncome128,
      monthlyIncome142,
      annualIncome128,
      annualIncome142,
      totalIncome128,
      totalIncome142,
      bonus128,
      final128,
      final142,
      winnerText,
    };
  }, [capital, years, mode, includeBonus]);

  const inputClass =
    "w-full rounded-lg border-0 bg-white px-3 py-3 text-base text-[#0b1020] box-border focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50";
  const labelClass = "mt-4 mb-1.5 block text-sm font-bold text-white";

  return (
    <div className="mx-auto max-w-[760px] rounded-[18px] bg-[#0b1020] p-7 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] font-sans">
      <h2 className="mb-2.5 text-center text-xl font-bold text-[#d4af37] sm:text-2xl">
        12.8% vs 14.2% Investment Income Comparison Calculator
      </h2>
      <p className="mb-6 text-center text-[#d6d6d6]">
        Compare two income options side by side. A higher headline return does not always mean the best outcome.
      </p>

      <label className={labelClass} htmlFor="comparison-capital">
        Investment Amount
      </label>
      <input
        id="comparison-capital"
        type="number"
        min={10000}
        step={10000}
        value={capital}
        onChange={(e) => setCapital(Number(e.target.value) || 0)}
        className={inputClass}
      />

      <label className={labelClass} htmlFor="comparison-years">
        Comparison Period
      </label>
      <select
        id="comparison-years"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
        className={inputClass}
      >
        {YEAR_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label className={labelClass} htmlFor="comparison-mode">
        Income Treatment
      </label>
      <select
        id="comparison-mode"
        value={mode}
        onChange={(e) => setMode(e.target.value as IncomeMode)}
        className={inputClass}
      >
        <option value="income">Take income out monthly</option>
        <option value="reinvest">Reinvest income</option>
      </select>

      <label className="mt-4 flex cursor-pointer items-center font-bold">
        <input
          type="checkbox"
          checked={includeBonus}
          onChange={(e) => setIncludeBonus(e.target.checked)}
          className="mr-2 h-4 w-4"
        />
        Include 8% bonus on the 12.8% option every 5 years
      </label>

      {results ? (
        <div className="mt-6">
          <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="rounded-xl border border-[#2c3558] bg-[#151b2f] p-4">
              <h3 className="mt-0 text-lg font-bold text-[#d4af37]">12.8% Option</h3>
              <p>
                <strong>Net annual return:</strong> {(results.net128 * 100).toFixed(2)}%
              </p>
              <p>
                <strong>Monthly income:</strong> {formatCurrency(results.monthlyIncome128)}
              </p>
              <p>
                <strong>Annual income:</strong> {formatCurrency(results.annualIncome128)}
              </p>
              <p>
                <strong>Total income:</strong> {formatCurrency(results.totalIncome128)}
              </p>
              <p>
                <strong>Bonus added:</strong> {formatCurrency(results.bonus128)}
              </p>
              <p>
                <strong>Projected value:</strong> {formatCurrency(results.final128)}
              </p>
            </div>

            <div className="rounded-xl border border-[#2c3558] bg-[#151b2f] p-4">
              <h3 className="mt-0 text-lg font-bold text-[#d4af37]">14.2% Option</h3>
              <p>
                <strong>Net annual return:</strong> {(results.net142 * 100).toFixed(2)}%
              </p>
              <p>
                <strong>Monthly income:</strong> {formatCurrency(results.monthlyIncome142)}
              </p>
              <p>
                <strong>Annual income:</strong> {formatCurrency(results.annualIncome142)}
              </p>
              <p>
                <strong>Total income:</strong> {formatCurrency(results.totalIncome142)}
              </p>
              <p>
                <strong>Bonus added:</strong> R0
              </p>
              <p>
                <strong>Projected value:</strong> {formatCurrency(results.final142)}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border-l-[5px] border-[#d4af37] bg-[#1f2a44] p-4">
            <strong>Comparison Result:</strong>
            <br />
            {results.winnerText}
          </div>
        </div>
      ) : (
        <p className="mt-6">Please enter a valid investment amount.</p>
      )}

      <p className="mt-6 text-xs leading-relaxed text-[#b8b8b8]">
        This calculator is for educational purposes only and does not constitute financial advice. Returns, tax
        treatment, liquidity, risk, and suitability must be confirmed before any investment decision is made.
      </p>
    </div>
  );
}
