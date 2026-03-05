"use client";

import { useState, useMemo } from "react";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

const GROSS_RATE = 0.128;
const DIVIDEND_TAX_RATE = 0.2;
const BONUS_RATE = 0.1;

export function Everest128Calculator() {
  const [investmentAmount, setInvestmentAmount] = useState(1_000_000);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    const grossAnnualIncome = investmentAmount * GROSS_RATE;
    const netAnnualIncome = grossAnnualIncome * (1 - DIVIDEND_TAX_RATE);
    const netMonthlyIncome = netAnnualIncome / 12;
    const loyaltyBonus = investmentAmount * BONUS_RATE;
    const total5YearReturn = netAnnualIncome * 5 + loyaltyBonus;
    const returnOnCapitalPct = investmentAmount > 0 ? (total5YearReturn / investmentAmount) * 100 : 0;
    const taxAt36Percent = grossAnnualIncome * 0.36;
    const netAt36Percent = grossAnnualIncome - taxAt36Percent;
    const monthlyDifference = (netAnnualIncome - netAt36Percent) / 12;
    return {
      netMonthlyIncome,
      netAnnualIncome,
      loyaltyBonus,
      total5YearReturn,
      returnOnCapitalPct,
      monthlyDifference,
    };
  }, [investmentAmount]);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">Strategic Income Calculator</h2>
      <p className="text-zinc-400 text-sm mb-2">12.8% fixed return · 20% flat tax on dividends</p>
      <p className="text-zinc-500 text-sm mb-6">Enter your investment amount to see your monthly income.</p>

      <div className="mb-6">
        <label className={labelClass}>Investment amount (R)</label>
        <input
          type="number"
          min={100_000}
          step={100_000}
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value) || 0)}
          className={inputClass}
          placeholder="e.g. 2 000 000"
        />
        <p className="text-zinc-500 text-xs mt-1">Minimum investment: R100,000</p>
      </div>

      <button
        type="button"
        onClick={() => setHasCalculated(true)}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Get my quote
      </button>

      {hasCalculated && (
        <>
          <div className="mt-8 p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-zinc-400 text-sm uppercase tracking-wider mb-1">Your monthly income (after tax)</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(result.netMonthlyIncome)}</p>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Annual income</p>
              <p className="text-xl font-bold text-white">{formatCurrency(result.netAnnualIncome)}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">5-year loyalty bonus</p>
              <p className="text-xl font-bold text-white">{formatCurrency(result.loyaltyBonus)}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total 5-year return</p>
              <p className="text-xl font-bold text-white">{formatCurrency(result.total5YearReturn)}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Return on capital</p>
              <p className="text-xl font-bold text-white">{result.returnOnCapitalPct.toFixed(1)}%</p>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-sm font-medium mb-1">Why dividends beat income tax</p>
            <p className="text-zinc-300 text-sm">
              You keep an extra {formatCurrency(result.monthlyDifference)} per month compared to the same return taxed at a 36% marginal rate.
            </p>
          </div>
        </>
      )}

      <ul className="text-zinc-500 text-xs mt-6 space-y-1">
        <li>· Fixed 12.8% per annum for 5 years</li>
        <li>· Dividends taxed at flat 20% (not income tax)</li>
        <li>· 10% loyalty bonus on capital after 5 years</li>
        <li>· Zero broker fees 100% of capital invested</li>
      </ul>
      <p className="text-zinc-500 text-xs mt-4">
        This is an estimation based on a 12.8% annual return, less 20% dividend withholding tax, and a 10% loyalty bonus at the end of year 5. It is not an official quote from Everest Wealth. Please consult a qualified financial adviser before making any investment decisions.
      </p>
    </div>
  );
}
