"use client";

import { useState, useMemo } from "react";
import { EverestLiquidityWarning } from "./EverestLiquidityWarning";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

const GROWTH_RATE = 0.145;
const TAX_RATE = 0.2;

export function Everest145GrowthCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(1_000_000);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    const year1 = investmentAmount * Math.pow(1 + GROWTH_RATE, 1);
    const year2 = investmentAmount * Math.pow(1 + GROWTH_RATE, 2);
    const year3 = investmentAmount * Math.pow(1 + GROWTH_RATE, 3);
    const year4 = investmentAmount * Math.pow(1 + GROWTH_RATE, 4);
    const year5Gross = investmentAmount * Math.pow(1 + GROWTH_RATE, 5);
    const grossGrowth = year5Gross - investmentAmount;
    const taxOnGrowth = grossGrowth * TAX_RATE;
    const netGrowth = grossGrowth - taxOnGrowth;
    const totalCapitalAfter5Years = investmentAmount + netGrowth;
    const netReturnPct = investmentAmount > 0 ? (netGrowth / investmentAmount) * 100 : 0;
    return {
      year1,
      year2,
      year3,
      year4,
      year5Gross,
      grossGrowth,
      taxOnGrowth,
      netGrowth,
      totalCapitalAfter5Years,
      netReturnPct,
    };
  }, [investmentAmount]);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">Strategic Growth Calculator</h2>
      <p className="text-zinc-400 text-sm mb-2">14.5% fixed compound growth · 20% flat tax on dividends</p>
      <p className="text-zinc-500 text-sm mb-2">See what your capital becomes after 5 years of compound growth.</p>
      <p className="text-zinc-500 text-xs mb-6">No monthly withdrawals; value paid at maturity (60 months).</p>

      <div className="mb-6">
        <label className={labelClass}>Investment amount (R)</label>
        <input
          type="number"
          min={100_000}
          step={100_000}
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value) || 0)}
          className={inputClass}
          placeholder="e.g. 1 000 000"
        />
        <p className="text-zinc-500 text-xs mt-1">Minimum investment: R100,000</p>
      </div>

      <button
        type="button"
        onClick={() => setHasCalculated(true)}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate my 5-year growth
      </button>

      {hasCalculated && (
        <>
          <div className="mt-8 p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-zinc-400 text-sm uppercase tracking-wider mb-1">Projected value at maturity</p>
            <p className="text-3xl font-bold text-cinematic-teal">{formatCurrency(result.totalCapitalAfter5Years)}</p>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Capital invested</p>
              <p className="text-xl font-bold text-white">{formatCurrency(investmentAmount)}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Net growth</p>
              <p className="text-xl font-bold text-white">{formatCurrency(result.netGrowth)}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Gross value at year 5</p>
              <p className="text-xl font-bold text-white">{formatCurrency(result.year5Gross)}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Net return %</p>
              <p className="text-xl font-bold text-white">{result.netReturnPct.toFixed(1)}%</p>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-sm font-medium mb-3">Year-by-year growth (gross)</p>
            <ul className="text-sm text-zinc-300 space-y-1">
              <li>Start: {formatCurrency(investmentAmount)}</li>
              <li>Year 1: {formatCurrency(result.year1)}</li>
              <li>Year 2: {formatCurrency(result.year2)}</li>
              <li>Year 3: {formatCurrency(result.year3)}</li>
              <li>Year 4: {formatCurrency(result.year4)}</li>
              <li>Year 5: {formatCurrency(result.year5Gross)}</li>
            </ul>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-400 text-sm font-medium mb-2">Tax on growth</p>
            <p className="text-sm text-zinc-300">Gross growth: {formatCurrency(result.grossGrowth)}</p>
            <p className="text-sm text-red-400">Less 20% tax: − {formatCurrency(result.taxOnGrowth)}</p>
            <p className="text-sm text-white font-medium mt-1">You keep: {formatCurrency(result.netGrowth)}</p>
          </div>
        </>
      )}

      <EverestLiquidityWarning />
      <ul className="text-zinc-500 text-xs mt-6 space-y-1">
        <li>· Fixed 14.5% compound growth per annum</li>
        <li>· No monthly income returns accumulate</li>
        <li>· Paid at maturity or redemption after 5 years</li>
        <li>· Dividends taxed at flat 20%</li>
        <li>· Zero broker fees 100% of capital invested</li>
      </ul>
      <p className="text-zinc-500 text-xs mt-4">
        Estimates based on 14.5% annual compound growth over 5 years, less 20% dividends withholding tax on growth. Not an official quote. Early access may involve notice periods and penalties. Please consult a qualified financial adviser.
      </p>
    </div>
  );
}
