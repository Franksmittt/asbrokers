"use client";

import { useMemo, useState } from "react";

function formatRand(value: number): string {
  if (!Number.isFinite(value) || Number.isNaN(value)) return "R0";
  return `R${Math.round(value).toLocaleString("en-ZA")}`;
}

function calculateMonthlyContributionRequired(
  targetCapital: number,
  years: number,
  annualGrowthRate: number,
  annualIncreaseRate: number
): number {
  const months = years * 12;
  if (months <= 0 || targetCapital <= 0) return 0;

  const r = Math.pow(1 + annualGrowthRate, 1 / 12) - 1;
  const g = Math.pow(1 + annualIncreaseRate, 1 / 12) - 1;

  if (Math.abs(r - g) < 0.0000001) {
    return targetCapital / (months * Math.pow(1 + r, months - 1));
  }

  const numerator = targetCapital * (r - g);
  const denominator = Math.pow(1 + r, months) - Math.pow(1 + g, months);
  return numerator / denominator;
}

const inputClass =
  "w-full rounded-[10px] border border-[#D1D5DB] bg-white px-[13px] py-3 text-[15px] text-[#1F2933] focus:border-[#F4A300] focus:outline-none focus:ring-[3px] focus:ring-[#F4A300]/20";
const labelClass = "mb-1.5 block font-bold text-[#1F2933]";
const hintClass = "mt-1 text-[13px] text-[#6B7280]";

export function RetirementShortfallCalculator() {
  const [currentAge, setCurrentAge] = useState(40);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyIncomeToday, setMonthlyIncomeToday] = useState(20_000);
  const [inflationRate, setInflationRate] = useState(6);
  const [growthRate, setGrowthRate] = useState(10);
  const [drawdownRate, setDrawdownRate] = useState(5);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [premiumIncreaseRate, setPremiumIncreaseRate] = useState(10);
  const [validationError, setValidationError] = useState<string | null>(null);

  const results = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const inflation = inflationRate / 100;
    const growth = growthRate / 100;
    const drawdown = drawdownRate / 100;
    const premiumIncrease = premiumIncreaseRate / 100;

    if (yearsToRetirement <= 0) {
      return { error: "Retirement age must be higher than current age." };
    }
    if (drawdown <= 0) {
      return { error: "Drawdown rate must be greater than 0." };
    }

    const futureMonthlyIncome = monthlyIncomeToday * Math.pow(1 + inflation, yearsToRetirement);
    const annualIncomeNeededAtRetirement = futureMonthlyIncome * 12;
    const capitalRequired = annualIncomeNeededAtRetirement / drawdown;
    const futureCurrentSavings = currentSavings * Math.pow(1 + growth, yearsToRetirement);
    const capitalShortfall = Math.max(capitalRequired - futureCurrentSavings, 0);
    const monthlyContribution = calculateMonthlyContributionRequired(
      capitalShortfall,
      yearsToRetirement,
      growth,
      premiumIncrease
    );

    const explanation =
      `If you start at age ${currentAge} and want the equivalent of ${formatRand(monthlyIncomeToday)} ` +
      `per month in today's buying power, you may need approximately ${formatRand(futureMonthlyIncome)} ` +
      `per month by age ${retirementAge}. Using a ${(drawdown * 100).toFixed(1)}% drawdown rate, ` +
      `this means estimated retirement capital of about ${formatRand(capitalRequired)}. After allowing ` +
      `for current savings, your estimated shortfall is ${formatRand(capitalShortfall)}. The estimated ` +
      `starting monthly contribution required is ${formatRand(monthlyContribution)}, increasing annually by ` +
      `${(premiumIncrease * 100).toFixed(1)}%.`;

    return {
      yearsToRetirement,
      futureMonthlyIncome,
      capitalRequired,
      futureCurrentSavings,
      capitalShortfall,
      monthlyContribution,
      explanation,
    };
  }, [
    currentAge,
    retirementAge,
    monthlyIncomeToday,
    inflationRate,
    growthRate,
    drawdownRate,
    currentSavings,
    premiumIncreaseRate,
  ]);

  const handleCalculate = () => {
    if ("error" in results && results.error) {
      setValidationError(results.error);
      return;
    }
    setValidationError(null);
  };

  const display = "error" in results ? null : results;

  return (
    <div className="mx-auto max-w-[1100px] p-5 font-sans text-[#1F2933] leading-normal">
      <div className="overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white shadow-[0_12px_30px_rgba(0,43,92,0.12)]">
        <div className="bg-[#002B5C] px-7 py-7 text-white">
          <h1 className="mb-2.5 text-2xl font-bold leading-tight sm:text-[28px]">Retirement Readiness Calculator</h1>
          <p className="max-w-[820px] text-[#F3F4F6]">
            This calculator estimates how much capital you may need at retirement, and what monthly contribution may
            be required to reach that amount.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="border-b border-[#E5E7EB] p-7 lg:border-b-0 lg:border-r">
            <h2 className="mb-[18px] text-xl text-[#002B5C]">Your Assumptions</h2>

            <div className="mb-4">
              <label className={labelClass} htmlFor="shortfall-current-age">
                Current age
              </label>
              <input
                id="shortfall-current-age"
                type="number"
                min={18}
                max={64}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value) || 0)}
                className={inputClass}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="shortfall-retirement-age">
                Retirement age
              </label>
              <input
                id="shortfall-retirement-age"
                type="number"
                min={45}
                max={80}
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value) || 0)}
                className={inputClass}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="shortfall-monthly-income">
                Required monthly income in today&apos;s money
              </label>
              <input
                id="shortfall-monthly-income"
                type="number"
                min={0}
                step={500}
                value={monthlyIncomeToday}
                onChange={(e) => setMonthlyIncomeToday(Number(e.target.value) || 0)}
                className={inputClass}
              />
              <div className={hintClass}>Example: R20,000 per month in today&apos;s buying power.</div>
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="shortfall-inflation">
                Inflation rate per year (%)
              </label>
              <input
                id="shortfall-inflation"
                type="number"
                min={0}
                max={20}
                step={0.1}
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                className={inputClass}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="shortfall-growth">
                Investment growth before retirement (%)
              </label>
              <input
                id="shortfall-growth"
                type="number"
                min={0}
                max={30}
                step={0.1}
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value) || 0)}
                className={inputClass}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="shortfall-drawdown">
                Income drawdown rate at retirement (%)
              </label>
              <input
                id="shortfall-drawdown"
                type="number"
                min={1}
                max={20}
                step={0.1}
                value={drawdownRate}
                onChange={(e) => setDrawdownRate(Number(e.target.value) || 0)}
                className={inputClass}
              />
              <div className={hintClass}>This converts retirement income into required capital.</div>
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="shortfall-savings">
                Current retirement savings
              </label>
              <input
                id="shortfall-savings"
                type="number"
                min={0}
                step={1000}
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
                className={inputClass}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="shortfall-premium-increase">
                Annual contribution increase (%)
              </label>
              <input
                id="shortfall-premium-increase"
                type="number"
                min={0}
                max={30}
                step={0.1}
                value={premiumIncreaseRate}
                onChange={(e) => setPremiumIncreaseRate(Number(e.target.value) || 0)}
                className={inputClass}
              />
              <div className={hintClass}>Use 0% for fixed monthly contributions.</div>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              className="mt-2 w-full cursor-pointer rounded-xl border-0 bg-[#F4A300] px-[18px] py-3.5 text-base font-extrabold text-[#002B5C] hover:brightness-[0.97]"
            >
              Calculate My Retirement Gap
            </button>
          </div>

          <div className="p-7">
            <h2 className="mb-[18px] text-xl text-[#002B5C]">Your Result</h2>

            {validationError || ("error" in results && results.error) ? (
              <p className="text-sm text-[#B91C1C]">{validationError ?? ("error" in results ? results.error : "")}</p>
            ) : display ? (
              <>
                <div className="grid grid-cols-1 gap-3.5">
                  <div className="rounded-[14px] border border-[#E5E7EB] bg-[#F7F7F7] p-4">
                    <div className="text-[13px] font-bold uppercase tracking-wide text-[#6B7280]">Years until retirement</div>
                    <div className="mt-1 text-[25px] font-extrabold text-[#002B5C]">{display.yearsToRetirement} years</div>
                  </div>

                  <div className="rounded-[14px] border border-[#E5E7EB] bg-[#F7F7F7] p-4">
                    <div className="text-[13px] font-bold uppercase tracking-wide text-[#6B7280]">Future monthly income needed</div>
                    <div className="mt-1 text-[25px] font-extrabold text-[#002B5C]">{formatRand(display.futureMonthlyIncome)}</div>
                  </div>

                  <div className="rounded-[14px] border border-[rgba(185,28,28,0.35)] bg-[#FEF2F2] p-4">
                    <div className="text-[13px] font-bold uppercase tracking-wide text-[#6B7280]">
                      Estimated capital required at retirement
                    </div>
                    <div className="mt-1 text-[25px] font-extrabold text-[#B91C1C]">{formatRand(display.capitalRequired)}</div>
                  </div>

                  <div className="rounded-[14px] border border-[#E5E7EB] bg-[#F7F7F7] p-4">
                    <div className="text-[13px] font-bold uppercase tracking-wide text-[#6B7280]">
                      Projected value of current savings
                    </div>
                    <div className="mt-1 text-[25px] font-extrabold text-[#002B5C]">{formatRand(display.futureCurrentSavings)}</div>
                  </div>

                  <div className="rounded-[14px] border border-[rgba(185,28,28,0.35)] bg-[#FEF2F2] p-4">
                    <div className="text-[13px] font-bold uppercase tracking-wide text-[#6B7280]">Estimated capital shortfall</div>
                    <div className="mt-1 text-[25px] font-extrabold text-[#B91C1C]">{formatRand(display.capitalShortfall)}</div>
                  </div>

                  <div className="rounded-[14px] border border-[rgba(22,101,52,0.35)] bg-[#F0FDF4] p-4">
                    <div className="text-[13px] font-bold uppercase tracking-wide text-[#6B7280]">
                      Estimated starting monthly contribution required
                    </div>
                    <div className="mt-1 text-[25px] font-extrabold text-[#166534]">{formatRand(display.monthlyContribution)}</div>
                  </div>
                </div>

                <div className="mt-5 rounded-[14px] border border-[rgba(244,163,0,0.35)] bg-[#FFFBEB] p-4 text-sm">
                  <strong className="text-[#002B5C]">What this means:</strong> {display.explanation}
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] bg-[#FAFAFA] px-7 py-6 text-sm text-[#374151]">
          <h3 className="mt-0 text-[#002B5C]">How the calculator works</h3>
          <ul className="mb-0 list-disc pl-5">
            <li>It first inflates today&apos;s required income to retirement age.</li>
            <li>It then converts that future monthly income into a required capital amount using the selected drawdown rate.</li>
            <li>It projects the future value of existing savings using the selected investment growth rate.</li>
            <li>It calculates the capital shortfall.</li>
            <li>It estimates the starting monthly contribution needed, allowing for annual contribution increases.</li>
          </ul>
        </div>

        <div className="border-t border-[#E5E7EB] bg-[#F3F4F6] px-7 py-[18px] text-xs text-[#4B5563]">
          This calculator is for educational and illustrative purposes only. It does not constitute financial advice.
          Actual retirement outcomes depend on market returns, tax, product costs, investment structure, inflation,
          withdrawal behaviour, legislation, and personal circumstances. Please consult a licensed financial advisor
          before making retirement planning decisions.
        </div>
      </div>
    </div>
  );
}
