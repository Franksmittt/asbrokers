"use client";

import { useState, useMemo } from "react";
import { EverestLiquidityWarning } from "./EverestLiquidityWarning";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

const GROSS_RATE = 0.142;
const TAX_RATE = 0.2;

export function Everest142Calculator() {
  const [investmentAmount, setInvestmentAmount] = useState(1_000_000);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    const grossAnnualReturn = investmentAmount * GROSS_RATE;
    const annualDividendsTax = grossAnnualReturn * TAX_RATE;
    const netAnnualReturn = grossAnnualReturn - annualDividendsTax;
    const netMonthlyReturn = netAnnualReturn / 12;
    return { grossAnnualReturn, annualDividendsTax, netAnnualReturn, netMonthlyReturn };
  }, [investmentAmount]);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">Everest 14.2% Investment Calculator</h2>
      <p className="text-zinc-400 text-sm mb-2">Fixed 14.2% p.a. maximum income from day one.</p>
      <p className="text-zinc-500 text-xs mb-6">No loyalty bonus; higher immediate yield instead.</p>

      <div className="mb-6">
        <label className={labelClass}>Investment amount (R)</label>
        <input
          type="number"
          min={100_000}
          step={100_000}
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value) || 0)}
          className={inputClass}
          placeholder="Enter investment amount"
        />
      </div>

      <button
        type="button"
        onClick={() => setHasCalculated(true)}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate
      </button>

      {hasCalculated && (
        <div className="mt-8 space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Gross annual return (14.2%)</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.grossAnnualReturn)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Annual dividends tax (20%)</p>
            <p className="text-xl font-bold text-red-400">− {formatCurrency(result.annualDividendsTax)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Net annual return</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.netAnnualReturn)}</p>
          </div>
          <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Net monthly return</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(result.netMonthlyReturn)}</p>
          </div>
        </div>
      )}

      <EverestLiquidityWarning />
      <p className="text-zinc-500 text-xs mt-6">
        This is an illustration based on a fixed 14.2% annual return with 20% dividend tax. Not an official quote. Please consult a qualified financial adviser.
      </p>
    </div>
  );
}
