"use client";

import { useState, useCallback } from "react";

/**
 * Life of Capital / Retirement Longevity Calculator.
 * Year-by-year simulation: capital grows by return, annual withdrawal escalates by inflation.
 */
function runSimulation(
  capitalAmount: number,
  monthlyIncomeNeeded: number,
  expectedReturn: number,
  estimatedTax: number,
  inflationRate: number
): { yearsLasted: number; isSustainableForever: boolean } {
  const returnDec = expectedReturn / 100;
  const taxDec = estimatedTax / 100;
  const inflationDec = inflationRate / 100;

  let currentAnnualWithdrawal = (monthlyIncomeNeeded / (1 - taxDec)) * 12;
  let currentCapital = capitalAmount;
  let yearsLasted = 0;
  let isSustainableForever = false;

  for (let year = 1; year <= 100; year++) {
    currentCapital += currentCapital * returnDec;
    currentCapital -= currentAnnualWithdrawal;

    if (currentCapital <= 0) {
      const previousCapital = currentCapital + currentAnnualWithdrawal;
      const fractionalYear = previousCapital / currentAnnualWithdrawal;
      yearsLasted = year - 1 + Math.max(0, Math.min(1, fractionalYear));
      break;
    }

    currentAnnualWithdrawal += currentAnnualWithdrawal * inflationDec;

    if (year === 100) {
      isSustainableForever = true;
      yearsLasted = 100;
    }
  }

  return { yearsLasted, isSustainableForever };
}

export function LifeOfCapitalCalculator() {
  const [capitalAmount, setCapitalAmount] = useState(5_000_000);
  const [monthlyIncomeNeeded, setMonthlyIncomeNeeded] = useState(35_000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [estimatedTax, setEstimatedTax] = useState(25);
  const [inflationRate, setInflationRate] = useState(7);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [result, setResult] = useState<{ yearsLasted: number; isSustainableForever: boolean } | null>(null);

  const handleCalculate = useCallback(() => {
    setResult(
      runSimulation(
        capitalAmount,
        monthlyIncomeNeeded,
        expectedReturn,
        estimatedTax,
        inflationRate
      )
    );
    setHasCalculated(true);
  }, [capitalAmount, monthlyIncomeNeeded, expectedReturn, estimatedTax, inflationRate]);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">Life of Capital Calculator</h2>
      <p className="text-zinc-400 text-sm mb-6">
        Enter your numbers to see how long your retirement savings will last.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Capital amount (R) – money available to invest to create income</label>
          <input
            type="number"
            min={0}
            step={100_000}
            value={capitalAmount}
            onChange={(e) => setCapitalAmount(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 5 000 000"
          />
        </div>
        <div>
          <label className={labelClass}>Monthly income needed (R) – net, after tax</label>
          <input
            type="number"
            min={0}
            step={5000}
            value={monthlyIncomeNeeded}
            onChange={(e) => setMonthlyIncomeNeeded(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 35 000"
          />
        </div>
        <div>
          <label className={labelClass}>Expected return (% p.a.)</label>
          <input
            type="number"
            min={0}
            max={30}
            step={0.5}
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value) || 0)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Estimated tax on income (%)</label>
          <input
            type="number"
            min={0}
            max={45}
            step={1}
            value={estimatedTax}
            onChange={(e) => setEstimatedTax(Number(e.target.value) || 0)}
            className={inputClass}
          />
          <p className="text-zinc-500 text-xs mt-1">
            Typical effective rates: 20–25% (under R40k/mo) · 30–35% (R40–80k) · 36–45% (over R80k)
          </p>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Inflation / income escalation (% p.a.)</label>
          <input
            type="number"
            min={0}
            max={20}
            step={0.5}
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
            className={inputClass}
          />
          <p className="text-zinc-500 text-xs mt-1">
            Your income requirement will increase each year by this rate to keep up with rising costs.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full mt-8 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate. How long will it last?
      </button>

      {hasCalculated && result && (
        <div className="mt-8 p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
          {result.isSustainableForever ? (
            <p className="text-white font-medium">
              Your capital outpaces your withdrawals. Your money is projected to last indefinitely under these
              conditions.
            </p>
          ) : (
            <p className="text-white font-medium">
              Your capital is projected to last for <strong>{result.yearsLasted.toFixed(1)} years</strong>.
            </p>
          )}
        </div>
      )}

      <p className="text-zinc-500 text-xs mt-6">
        This calculation assumes your required income increases annually by the selected inflation rate. The projection
        is based on assumed investment returns, tax rates and inflation and is for illustrative purposes only. Actual
        outcomes may differ. This tool does not constitute financial advice.
      </p>
    </div>
  );
}
