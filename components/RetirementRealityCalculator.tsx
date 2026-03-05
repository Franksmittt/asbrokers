"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(val);

/**
 * Retirement Reality Calculator – TVM logic:
 * 1. Years to retirement, years in retirement
 * 2. Inflate monthly income to retirement date: FV = monthlyToday * (1 + inflation)^yearsToRetirement
 * 3. Gross up for tax: grossMonthly = netMonthly / (1 - taxRate)
 * 4. First year annual withdrawal = grossMonthly * 12
 * 5. PV of growing annuity: Capital = firstYearWithdrawal * [1 - ((1+inf)/(1+growth))^N] / (growth - inflation)
 */
export function RetirementRealityCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);
  const [monthlyIncomeToday, setMonthlyIncomeToday] = useState(30_000);
  const [inflationRate, setInflationRate] = useState(6);
  const [growthRate, setGrowthRate] = useState(10);
  const [taxRate, setTaxRate] = useState(20);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);

    const inflationDec = inflationRate / 100;
    const growthDec = growthRate / 100;
    const taxDec = taxRate / 100;

    // Future monthly net income at retirement (cost-of-living adjustment)
    const futureMonthlyNetIncome = monthlyIncomeToday * Math.pow(1 + inflationDec, yearsToRetirement);
    // Gross up so that after tax we get the required net
    const futureMonthlyGrossIncome = futureMonthlyNetIncome / (1 - taxDec);
    const firstYearAnnualWithdrawal = futureMonthlyGrossIncome * 12;

    // Present value of a growing annuity: withdrawals grow at inflation, discounted at growth rate
    if (growthDec <= inflationDec) {
      return {
        capital: null as number | null,
        yearsInRetirement,
        firstYearAnnualWithdrawal,
        error: "Investment growth rate must exceed inflation for the calculation to be valid.",
      };
    }

    const pvFactor =
      (1 - Math.pow((1 + inflationDec) / (1 + growthDec), yearsInRetirement)) / (growthDec - inflationDec);
    const totalCapitalRequired = firstYearAnnualWithdrawal * pvFactor;

    return {
      capital: Math.round(totalCapitalRequired),
      yearsInRetirement,
      firstYearAnnualWithdrawal: Math.round(firstYearAnnualWithdrawal),
      error: null as string | null,
    };
  }, [currentAge, retirementAge, lifeExpectancy, monthlyIncomeToday, inflationRate, growthRate, taxRate]);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">Retirement Reality Calculator</h2>
      <p className="text-zinc-400 text-sm mb-8">
        Discover how much capital you really need, and whether you are saving enough.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Current age</label>
          <input
            type="number"
            min={18}
            max={80}
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Retirement age</label>
          <input
            type="number"
            min={50}
            max={80}
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Life expectancy</label>
          <input
            type="number"
            min={70}
            max={100}
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Monthly income needed today (after tax) (R)</label>
          <input
            type="number"
            min={5000}
            step={5000}
            value={monthlyIncomeToday}
            onChange={(e) => setMonthlyIncomeToday(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Inflation rate (% p.a.)</label>
          <input
            type="number"
            min={0}
            max={15}
            step={0.5}
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Investment growth rate (% p.a.)</label>
          <input
            type="number"
            min={0}
            max={20}
            step={0.5}
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Average tax rate in retirement (%)</label>
          <input
            type="number"
            min={0}
            max={45}
            step={1}
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setHasCalculated(true)}
        className="w-full mt-8 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate my retirement reality
      </button>

      {hasCalculated && (
        <div className="mt-8 p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
          {result.error ? (
            <>
              <p className="text-amber-400 text-sm font-medium mb-1">Cannot compute</p>
              <p className="text-zinc-400 text-sm">{result.error}</p>
            </>
          ) : (
            <>
              <p className="text-zinc-400 text-sm mb-1">Estimated capital required at retirement</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{formatCurrency(result.capital!)}</p>
              <p className="text-zinc-500 text-xs mt-2">
                To fund your income for {result.yearsInRetirement} years in retirement, after inflation and tax.
              </p>
              {result.firstYearAnnualWithdrawal != null && (
                <p className="text-zinc-500 text-xs mt-1">
                  First year gross withdrawal (approx.): {formatCurrency(result.firstYearAnnualWithdrawal)}/year
                </p>
              )}
            </>
          )}
        </div>
      )}

      <p className="text-zinc-500 text-xs mt-6">
        <Link href="/income-tax-calculator" className="text-blue-400 hover:underline">Income tax calculator</Link> – find your tax rate.
      </p>
    </div>
  );
}
