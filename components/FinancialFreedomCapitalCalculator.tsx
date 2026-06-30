"use client";

import { useMemo, useState } from "react";

const INCOME_YIELD = 0.05;
const BRAND_BLUE = "#00549F";

function formatRand(value: number): string {
  if (!Number.isFinite(value) || Number.isNaN(value)) return "R0";
  return `R${Math.round(value).toLocaleString("en-ZA")}`;
}

function calculateLevelMonthlyContribution(
  targetCapital: number,
  currentSavings: number,
  years: number,
  annualGrowthRate: number
): number {
  const months = years * 12;
  if (months <= 0 || targetCapital <= 0) return 0;

  const futureCurrentSavings = currentSavings * Math.pow(1 + annualGrowthRate, years);
  const shortfall = Math.max(targetCapital - futureCurrentSavings, 0);
  if (shortfall <= 0) return 0;

  const monthlyRate = Math.pow(1 + annualGrowthRate, 1 / 12) - 1;
  if (Math.abs(monthlyRate) < 1e-12) {
    return shortfall / months;
  }

  const annuityFactor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  return shortfall / annuityFactor;
}

const inputClass =
  "w-full rounded-xl border border-[#00549F]/20 bg-white px-4 py-4 text-lg text-[#1F2933] shadow-sm focus:border-[#00549F] focus:outline-none focus:ring-2 focus:ring-[#00549F]/20";
const labelClass = "mb-2 block text-sm font-bold text-[#00549F]";
const hintClass = "mt-1 text-xs text-[#6B7280]";

export function FinancialFreedomCapitalCalculator() {
  const [currentAge, setCurrentAge] = useState(50);
  const [retirementAge, setRetirementAge] = useState(65);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(40_000);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [growthRate, setGrowthRate] = useState(10);

  const results = useMemo(() => {
    const yearsUntilRetirement = retirementAge - currentAge;
    if (yearsUntilRetirement <= 0) {
      return { error: "Retirement age must be greater than current age." };
    }
    if (desiredMonthlyIncome <= 0) {
      return { error: "Enter a valid desired monthly income." };
    }
    if (growthRate < 0) {
      return { error: "Enter a valid expected annual investment growth rate." };
    }

    const annualIncomeRequired = desiredMonthlyIncome * 12;
    const capitalRequired = annualIncomeRequired / INCOME_YIELD;
    const growth = growthRate / 100;
    const monthlyContributionRequired = calculateLevelMonthlyContribution(
      capitalRequired,
      currentSavings,
      yearsUntilRetirement,
      growth
    );
    const futureCurrentSavings = currentSavings * Math.pow(1 + growth, yearsUntilRetirement);
    const onTrack = monthlyContributionRequired <= 0;

    return {
      yearsUntilRetirement,
      annualIncomeRequired,
      capitalRequired,
      monthlyContributionRequired,
      futureCurrentSavings,
      onTrack,
    };
  }, [currentAge, retirementAge, desiredMonthlyIncome, currentSavings, growthRate]);

  const display = results && !("error" in results) ? results : null;

  return (
    <div className="mx-auto max-w-xl font-sans">
      <div className="overflow-hidden rounded-2xl border border-[#00549F]/15 bg-white shadow-lg">
        <div className="px-6 py-6 text-white sm:px-8" style={{ backgroundColor: BRAND_BLUE }}>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-white/80">AS Brokers</p>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">Financial Freedom Calculator</h2>
          <p className="mt-2 text-sm text-white/90">
            How much capital you need, and how much to save monthly to get there.
          </p>
        </div>

        <div className="space-y-4 px-6 py-6 sm:px-8">
          <div>
            <label className={labelClass} htmlFor="ff-current-age">
              Current Age
            </label>
            <input
              id="ff-current-age"
              type="number"
              min={18}
              max={100}
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="ff-retirement-age">
              Retirement Age
            </label>
            <input
              id="ff-retirement-age"
              type="number"
              min={19}
              max={100}
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="ff-monthly-income">
              Desired Monthly Income
            </label>
            <input
              id="ff-monthly-income"
              type="number"
              min={0}
              step={500}
              value={desiredMonthlyIncome}
              onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="ff-current-savings">
              Current Retirement Savings
            </label>
            <input
              id="ff-current-savings"
              type="number"
              min={0}
              step={1000}
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="ff-growth-rate">
              Expected Annual Investment Growth Rate (%)
            </label>
            <input
              id="ff-growth-rate"
              type="number"
              min={0}
              max={30}
              step={0.1}
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value) || 0)}
              className={inputClass}
            />
            <p className={hintClass}>Monthly contributions remain level. Growth compounds monthly.</p>
          </div>

          {"error" in results && results.error ? (
            <p className="text-sm text-red-600">{results.error}</p>
          ) : display ? (
            <div className="mt-2 space-y-5">
              <section className="rounded-2xl border border-[#00549F]/20 bg-[#F5F9FC] p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#00549F]/80">Section 1</p>
                <h3 className="text-lg font-bold text-[#00549F]">Financial Freedom Capital Required</h3>
                <p className="mt-4 text-4xl font-extrabold text-[#00549F] sm:text-5xl">
                  {formatRand(display.capitalRequired)}
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#00549F]/70">Years Until Retirement</p>
                    <p className="mt-1 text-lg font-bold text-[#00549F]">{display.yearsUntilRetirement}</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#00549F]/70">Annual Income Required</p>
                    <p className="mt-1 text-lg font-bold text-[#00549F]">{formatRand(display.annualIncomeRequired)}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[#00549F]/20 bg-[#F5F9FC] p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#00549F]/80">Section 2</p>
                <h3 className="text-lg font-bold text-[#00549F]">Monthly Investment Required</h3>
                {display.onTrack ? (
                  <p className="mt-4 text-lg font-semibold text-[#166534]">
                    Your current savings are projected to meet the target at the assumed growth rate. No additional
                    monthly investment is required.
                  </p>
                ) : (
                  <p className="mt-4 text-4xl font-extrabold text-[#00549F] sm:text-5xl">
                    {formatRand(display.monthlyContributionRequired)}
                    <span className="ml-1 text-lg font-semibold text-[#374151]">per month</span>
                  </p>
                )}
              </section>

              <section className="rounded-2xl border-2 border-[#00549F] bg-white p-5 shadow-sm">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#00549F]/80">Section 3</p>
                <h3 className="text-lg font-bold text-[#00549F]">Summary</h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#374151]">
                  <p>
                    You have <strong>{display.yearsUntilRetirement} years</strong> until retirement.
                  </p>
                  <p>
                    To generate <strong>{formatRand(desiredMonthlyIncome)}</strong> per month in retirement, you need
                    approximately:
                  </p>
                  <p className="text-2xl font-extrabold text-[#00549F]">{formatRand(display.capitalRequired)}</p>
                  {display.onTrack ? (
                    <p>
                      Assuming investment growth of <strong>{growthRate.toFixed(1)}%</strong> per year and current
                      retirement savings of <strong>{formatRand(currentSavings)}</strong>, your projected savings at age{" "}
                      <strong>{retirementAge}</strong> are on track for this target.
                    </p>
                  ) : (
                    <p>
                      Assuming investment growth of <strong>{growthRate.toFixed(1)}%</strong> per year
                      {currentSavings > 0 ? (
                        <>
                          {" "}
                          and starting with <strong>{formatRand(currentSavings)}</strong> in retirement savings
                        </>
                      ) : (
                        <> and starting with no retirement savings</>
                      )}
                      , you would need to invest approximately:
                    </p>
                  )}
                  {!display.onTrack && (
                    <>
                      <p className="text-2xl font-extrabold text-[#00549F]">
                        {formatRand(display.monthlyContributionRequired)} per month
                      </p>
                      <p>
                        to reach your target by age <strong>{retirementAge}</strong>.
                      </p>
                    </>
                  )}
                </div>
              </section>

              <div className="rounded-xl bg-[#F5F9FC] p-4 text-xs leading-relaxed text-[#4B5563]">
                <p className="mb-2 font-bold text-[#00549F]">Retirement planning framework</p>
                <ol className="list-decimal space-y-1 pl-4">
                  <li>
                    <strong>Where are you now?</strong> Current savings: {formatRand(currentSavings)}
                  </li>
                  <li>
                    <strong>Where do you want to go?</strong> Desired income: {formatRand(desiredMonthlyIncome)}/month
                  </li>
                  <li>
                    <strong>What must happen?</strong>{" "}
                    {display.onTrack
                      ? "Stay on course with your current trajectory."
                      : `Save ${formatRand(display.monthlyContributionRequired)}/month`}
                  </li>
                </ol>
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-[#00549F]/10 bg-[#F5F9FC] px-6 py-4 text-xs leading-relaxed text-[#6B7280] sm:px-8">
          This calculator is for educational purposes only. It uses a simplified 5% income yield assumption and does not
          constitute financial advice. Actual retirement outcomes depend on investment returns, inflation, tax, fees,
          legislation, and personal circumstances. Please consult a licensed financial advisor before making investment
          decisions.
        </div>
      </div>
    </div>
  );
}
