"use client";

import { useMemo, useState } from "react";

const WITHDRAWAL_RATE = 0.05;
const RATE_PRECISION = 0.0001;
const BRAND_BLUE = "#00549F";

function formatRand(value: number): string {
  if (!Number.isFinite(value) || Number.isNaN(value)) return "R0";
  return `R${Math.round(value).toLocaleString("en-ZA")}`;
}

function projectFutureValue(
  currentValue: number,
  monthlyInvestment: number,
  years: number,
  annualGrowthRate: number
): number {
  const months = years * 12;
  const monthlyRate = Math.pow(1 + annualGrowthRate, 1 / 12) - 1;
  const lumpSum = currentValue * Math.pow(1 + annualGrowthRate, years);

  if (Math.abs(monthlyRate) < 1e-12) {
    return lumpSum + monthlyInvestment * months;
  }

  const annuity = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  return lumpSum + annuity;
}

function solveRequiredGrowthRate(
  currentValue: number,
  monthlyInvestment: number,
  years: number,
  requiredCapital: number
): number | null {
  if (requiredCapital <= 0) return 0;
  if (years <= 0) return null;
  if (monthlyInvestment <= 0 && currentValue <= 0) return null;

  const atZero = projectFutureValue(currentValue, monthlyInvestment, years, 0);
  if (atZero >= requiredCapital) return 0;

  let low = 0;
  let high = 0.5;
  const absoluteMax = 10;

  while (projectFutureValue(currentValue, monthlyInvestment, years, high) < requiredCapital && high < absoluteMax) {
    high = Math.min(high * 2, absoluteMax);
  }

  if (projectFutureValue(currentValue, monthlyInvestment, years, high) < requiredCapital) {
    return high;
  }

  while (high - low > RATE_PRECISION) {
    const mid = (low + high) / 2;
    const futureValue = projectFutureValue(currentValue, monthlyInvestment, years, mid);
    if (futureValue >= requiredCapital) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return high;
}

function getGuidance(ratePercent: number): string {
  if (ratePercent < 8) {
    return "Your goal appears highly achievable based on your current savings pattern.";
  }
  if (ratePercent <= 15) {
    return "Your goal may be achievable with disciplined long-term investing.";
  }
  return "Your current plan requires significant growth to reach your target. This result is not a recommended investment return and is not linked to any product. It indicates the size of the gap between your current position and your desired outcome.";
}

const inputClass =
  "w-full rounded-xl border border-[#00549F]/20 bg-white px-4 py-4 text-lg text-[#1F2933] shadow-sm focus:border-[#00549F] focus:outline-none focus:ring-2 focus:ring-[#00549F]/20";
const labelClass = "mb-2 block text-sm font-bold text-[#00549F]";

export function GrowthRateCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [freedomAge, setFreedomAge] = useState(55);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(30_000);
  const [inflationRate, setInflationRate] = useState(6);
  const [monthlyInvestment, setMonthlyInvestment] = useState(5_000);
  const [currentInvestment, setCurrentInvestment] = useState(200_000);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const results = useMemo(() => {
    const years = freedomAge - currentAge;
    if (years <= 0) {
      return { error: "Financial Freedom Age must be greater than Current Age." };
    }

    const inflation = inflationRate / 100;
    const futureMonthlyIncome = desiredMonthlyIncome * Math.pow(1 + inflation, years);
    const annualFutureIncome = futureMonthlyIncome * 12;
    const requiredCapital = annualFutureIncome / WITHDRAWAL_RATE;
    const requiredGrowthRate = solveRequiredGrowthRate(
      currentInvestment,
      monthlyInvestment,
      years,
      requiredCapital
    );

    if (requiredGrowthRate === null) {
      return {
        error:
          "Unable to calculate a freedom rate with the current inputs. Check that you have time until financial freedom and either current capital or monthly investment.",
      };
    }

    const requiredGrowthPercent = requiredGrowthRate * 100;

    return {
      years,
      futureMonthlyIncome,
      requiredCapital,
      requiredGrowthPercent,
      guidance: getGuidance(requiredGrowthPercent),
    };
  }, [
    currentAge,
    freedomAge,
    desiredMonthlyIncome,
    inflationRate,
    monthlyInvestment,
    currentInvestment,
  ]);

  const handleCalculate = () => {
    if ("error" in results && results.error) {
      setValidationError(results.error);
      setHasCalculated(false);
      return;
    }
    setValidationError(null);
    setHasCalculated(true);
  };

  const display = hasCalculated && !("error" in results) ? results : null;

  return (
    <div className="mx-auto max-w-xl font-sans">
      <div className="overflow-hidden rounded-2xl border border-[#00549F]/15 bg-white shadow-lg">
        <div className="px-6 py-6 text-white sm:px-8" style={{ backgroundColor: BRAND_BLUE }}>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-white/80">AS Brokers</p>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">Growth Rate Calculator</h2>
          <p className="mt-2 text-sm text-white/90">
            Work backwards from your desired lifestyle to the annual growth rate needed for financial freedom.
          </p>
        </div>

        <div className="space-y-4 px-6 py-6 sm:px-8">
          <div>
            <label className={labelClass} htmlFor="growth-current-age">
              Current Age
            </label>
            <input
              id="growth-current-age"
              type="number"
              min={18}
              max={100}
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="growth-freedom-age">
              Financial Freedom Age
            </label>
            <input
              id="growth-freedom-age"
              type="number"
              min={19}
              max={100}
              value={freedomAge}
              onChange={(e) => setFreedomAge(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="growth-desired-income">
              Desired Monthly Income (Today&apos;s Money)
            </label>
            <input
              id="growth-desired-income"
              type="number"
              min={0}
              step={500}
              value={desiredMonthlyIncome}
              onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="growth-inflation">
              Inflation Rate (%)
            </label>
            <input
              id="growth-inflation"
              type="number"
              min={0}
              max={30}
              step={0.1}
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="growth-monthly-investment">
              Monthly Investment
            </label>
            <input
              id="growth-monthly-investment"
              type="number"
              min={0}
              step={500}
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="growth-current-investment">
              Current Investment Value
            </label>
            <input
              id="growth-current-investment"
              type="number"
              min={0}
              step={1000}
              value={currentInvestment}
              onChange={(e) => setCurrentInvestment(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full rounded-xl py-4 text-lg font-bold text-white shadow-md transition hover:brightness-95"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            Calculate
          </button>

          {validationError && <p className="text-sm text-red-600">{validationError}</p>}

          {display && (
            <div className="mt-2 space-y-3 rounded-2xl border border-[#00549F]/20 bg-[#F5F9FC] p-5">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-[#00549F]/70">Years to Financial Freedom</p>
                <p className="mt-1 text-xl font-bold text-[#00549F]">{display.years} Years</p>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-[#00549F]/70">
                  Future Monthly Income Required
                </p>
                <p className="mt-1 text-xl font-bold text-[#00549F]">{formatRand(display.futureMonthlyIncome)}</p>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-[#00549F]/70">Capital Required</p>
                <p className="mt-1 text-xl font-bold text-[#00549F]">{formatRand(display.requiredCapital)}</p>
              </div>

              <div className="rounded-xl border-2 border-[#00549F] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-[#00549F]/70">AS Brokers Freedom Rate</p>
                <p className="mt-1 text-3xl font-extrabold text-[#00549F]">
                  {display.requiredGrowthPercent.toFixed(2)}% p.a.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">
                  The annual rate of growth required to reach your target lifestyle goal based on your current capital,
                  monthly savings, and available time. This measures the gap, it is not a recommended investment return.
                </p>
              </div>

              <div className="rounded-xl border border-[#00549F]/15 bg-white p-4 text-sm leading-relaxed text-[#374151]">
                {display.guidance}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#00549F]/10 bg-[#F5F9FC] px-6 py-4 text-xs leading-relaxed text-[#6B7280] sm:px-8">
          This calculator is for educational and planning purposes only. Investment returns are not guaranteed and
          actual outcomes may differ.
        </div>
      </div>
    </div>
  );
}
