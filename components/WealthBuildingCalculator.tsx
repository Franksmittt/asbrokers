"use client";

import { useMemo, useState } from "react";
import {
  CURRENCY_OPTIONS,
  calculateWealthBuilding,
  formatWealthAmount,
  type CurrencyOption,
} from "@/lib/calculators/wealth-building";

const BRAND_BLUE = "#00549F";

const inputClass =
  "w-full rounded-xl border border-[#00549F]/20 bg-white px-4 py-4 text-lg text-[#1F2933] shadow-sm focus:border-[#00549F] focus:outline-none focus:ring-2 focus:ring-[#00549F]/20";
const labelClass = "mb-2 block text-sm font-bold text-[#00549F]";
const hintClass = "mt-1 text-xs text-[#6B7280]";

export function WealthBuildingCalculator() {
  const [currency, setCurrency] = useState<CurrencyOption>("ZAR");
  const [initialAmount, setInitialAmount] = useState(100_000);
  const [annualGrowthRate, setAnnualGrowthRate] = useState(10);
  const [years, setYears] = useState(10);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualContributionIncrease, setAnnualContributionIncrease] = useState(10);
  const [hasCalculated, setHasCalculated] = useState(false);

  const results = useMemo(() => {
    if (years <= 0) {
      return { error: "Enter a growth period of at least 1 year." };
    }
    return calculateWealthBuilding({
      initialAmount,
      annualGrowthRatePercent: annualGrowthRate,
      years,
      monthlyContribution,
      annualContributionIncreasePercent: annualContributionIncrease,
    });
  }, [initialAmount, annualGrowthRate, years, monthlyContribution, annualContributionIncrease]);

  const display = results && !("error" in results) ? results : null;
  const fmt = (n: number) => formatWealthAmount(n, currency);

  return (
    <div className="mx-auto max-w-xl font-sans">
      <div className="overflow-hidden rounded-2xl border border-[#00549F]/15 bg-white shadow-lg">
        <div className="px-6 py-6 text-white sm:px-8" style={{ backgroundColor: BRAND_BLUE }}>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-white/80">AS Brokers</p>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">Wealth Building Calculator</h2>
          <p className="mt-2 text-sm text-white/90">
            Model compound growth for investments, retirement savings, business growth, or any wealth-building scenario.
          </p>
        </div>

        <div className="space-y-4 px-6 py-6 sm:px-8">
          <div>
            <label className={labelClass} htmlFor="wb-currency">
              Currency
            </label>
            <select
              id="wb-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyOption)}
              className={inputClass}
            >
              {CURRENCY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="wb-initial">
              Initial Investment / Starting Value
            </label>
            <input
              id="wb-initial"
              type="number"
              step="any"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value) || 0)}
              className={inputClass}
            />
            <p className={hintClass}>The amount you are starting with today.</p>
          </div>

          <div>
            <label className={labelClass} htmlFor="wb-growth">
              Annual Growth Rate (%)
            </label>
            <input
              id="wb-growth"
              type="number"
              step="any"
              value={annualGrowthRate}
              onChange={(e) => setAnnualGrowthRate(Number(e.target.value) || 0)}
              className={inputClass}
            />
            <p className={hintClass}>Expected annual growth — any rate (e.g. 10%, 50%, 200%).</p>
          </div>

          <div>
            <label className={labelClass} htmlFor="wb-years">
              Years
            </label>
            <input
              id="wb-years"
              type="number"
              min={1}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
              className={inputClass}
            />
            <p className={hintClass}>Number of years the growth will continue.</p>
          </div>

          <div>
            <label className={labelClass} htmlFor="wb-monthly">
              Monthly Contribution
            </label>
            <input
              id="wb-monthly"
              type="number"
              step="any"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
              className={inputClass}
            />
            <p className={hintClass}>Amount added each month.</p>
          </div>

          <div>
            <label className={labelClass} htmlFor="wb-increase">
              Annual Increase (%)
            </label>
            <input
              id="wb-increase"
              type="number"
              step="any"
              value={annualContributionIncrease}
              onChange={(e) => setAnnualContributionIncrease(Number(e.target.value) || 0)}
              className={inputClass}
            />
            <p className={hintClass}>
              Increase the monthly contribution each year (e.g. R500 → R550 → R605 at 10%).
            </p>
          </div>

          {"error" in results && results.error && (
            <p className="text-sm text-red-600" role="alert">
              {results.error}
            </p>
          )}

          <button
            type="button"
            onClick={() => setHasCalculated(true)}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition hover:brightness-110"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            Calculate future wealth
          </button>

          {hasCalculated && display && (
            <div className="space-y-3 border-t border-[#00549F]/10 pt-6">
              <div className="rounded-xl border border-[#00549F]/15 bg-[#00549F]/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00549F]">Estimated Future Value</p>
                <p className="mt-1 text-2xl font-bold text-[#1F2933]">{fmt(display.futureValue)}</p>
                <p className={hintClass}>Final value after growth and contributions.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Total Invested</p>
                  <p className="mt-1 text-lg font-bold text-[#1F2933]">{fmt(display.totalInvested)}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Growth Earned</p>
                  <p className="mt-1 text-lg font-bold text-[#1F2933]">{fmt(display.growthEarned)}</p>
                </div>
              </div>
            </div>
          )}

          <p className={hintClass}>
            This calculator is for educational and illustrative purposes only. Actual investment returns and business
            growth outcomes may differ. AS Brokers CC · FSP 17273.
          </p>
        </div>
      </div>
    </div>
  );
}
