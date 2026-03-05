"use client";

import { useState, useMemo } from "react";
import { Lock } from "./icons";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(val);

export function RunOutCalculator() {
  const [portfolio, setPortfolio] = useState(15_000_000);
  const [drawdown, setDrawdown] = useState(120_000);
  const [emailCaptured, setEmailCaptured] = useState(false);

  const chartData = useMemo(() => {
    let balance = portfolio;
    const annualDrawdown = drawdown * 12;
    const estimatedGrowthRate = 0.06;
    const data: { year: number; balance: number; isZero: boolean }[] = [];
    for (let year = 1; year <= 25; year++) {
      balance = balance * (1 + estimatedGrowthRate) - annualDrawdown;
      data.push({
        year,
        balance: Math.max(0, balance),
        isZero: balance <= 0,
      });
      if (balance <= 0) break;
    }
    return data;
  }, [portfolio, drawdown]);

  const hitZeroYear = chartData.find((d) => d.isZero)?.year ?? "> 25";
  const maxBalance = Math.max(...chartData.map((d) => d.balance), portfolio);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-4 bg-[#151518] rounded-[2rem] p-8 border border-white/5 shadow-2xl">
        <div className="mb-8">
          <label className="flex justify-between text-sm font-medium text-zinc-400 mb-4">
            <span>Total Portfolio Value</span>
            <span className="text-blue-400 font-bold">{formatCurrency(portfolio)}</span>
          </label>
          <input
            type="range"
            min={1_000_000}
            max={50_000_000}
            step={500_000}
            value={portfolio}
            onChange={(e) => setPortfolio(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mb-8">
          <label className="flex justify-between text-sm font-medium text-zinc-400 mb-4">
            <span>Monthly Drawdown</span>
            <span className="text-teal-400 font-bold">{formatCurrency(drawdown)}/mo</span>
          </label>
          <input
            type="range"
            min={10_000}
            max={500_000}
            step={5_000}
            value={drawdown}
            onChange={(e) => setDrawdown(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mt-8">
          <div className="text-sm text-zinc-400 mb-1">Estimated Capital Lifespan</div>
          <div className="text-4xl font-black text-white">
            {hitZeroYear === "> 25" ? "25+ Yrs" : `${hitZeroYear} Yrs`}
          </div>
          {hitZeroYear !== "> 25" && (
            <div className="text-xs text-red-400 mt-2 font-medium">Warning: Capital depletion risk detected.</div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="lg:col-span-8 bg-[#151518] rounded-[2rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-end min-h-[400px]">
        {!emailCaptured && (
          <div className="absolute inset-0 z-20 bg-[#0a0a0c]/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <Lock className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Unlock the Full Actuarial Breakdown</h3>
            <p className="text-zinc-400 mb-6 max-w-md text-sm">
              See the exact year-by-year trajectory, tax implications, and inflation adjustments. Enter your email to generate the PDF.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmailCaptured(true);
              }}
              className="flex flex-col w-full max-w-sm gap-3"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-white placeholder-zinc-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-colors"
              >
                Reveal
              </button>
            </form>
          </div>
        )}

        <div className="flex items-end justify-between h-64 gap-1 relative z-10 w-full">
          {chartData.map((data, i) => {
            const heightPercent = maxBalance > 0 ? (data.balance / maxBalance) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col justify-end group relative h-full">
                <div
                  className={`w-full rounded-t-sm transition-all duration-500 ease-out ${
                    heightPercent === 0 ? "bg-red-500 h-1" : "bg-gradient-to-t from-blue-600 to-teal-400"
                  }`}
                  style={{ height: `${Math.max(1, heightPercent)}%` }}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-black text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30 transition-opacity">
                  Year {data.year}: {formatCurrency(data.balance)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-zinc-500 mt-4 border-t border-white/10 pt-4 font-medium">
          <span>Year 1</span>
          <span>Year {chartData.length}</span>
        </div>
      </div>
    </div>
  );
}
