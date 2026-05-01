"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(val);

export function HeroCalculator() {
  const [portfolio, setPortfolio] = useState(5_000_000);
  const [drawdown, setDrawdown] = useState(40_000);

  const hitZeroYear = useMemo(() => {
    let balance = portfolio;
    const annualDrawdown = drawdown * 12;
    const growthRate = 0.06;
    for (let year = 1; year <= 30; year++) {
      balance = balance * (1 + growthRate) - annualDrawdown;
      if (balance <= 0) return year;
    }
    return null;
  }, [portfolio, drawdown]);

  return (
    <div className="bg-[#151518]/90 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 w-full min-w-0">
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-4">Quick check</p>
      <div className="space-y-4">
        <div>
          <label className="flex justify-between text-xs text-zinc-500 mb-1.5">
            <span>Portfolio</span>
            <span className="text-white font-medium">{formatCurrency(portfolio)}</span>
          </label>
          <input
            type="range"
            min={500_000}
            max={20_000_000}
            step={500_000}
            value={portfolio}
            onChange={(e) => setPortfolio(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="flex justify-between text-xs text-zinc-500 mb-1.5">
            <span>Monthly drawdown</span>
            <span className="text-white font-medium">{formatCurrency(drawdown)}</span>
          </label>
          <input
            type="range"
            min={10_000}
            max={150_000}
            step={5_000}
            value={drawdown}
            onChange={(e) => setDrawdown(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-zinc-500 mb-0.5">Capital lasts</p>
        <p className="text-2xl font-bold text-white">
          {hitZeroYear ? `${hitZeroYear} years` : "25+ years"}
        </p>
        <Link href="#lab" className="mt-3 inline-block text-xs text-blue-400 hover:text-blue-300 font-medium">
          Full calculator →
        </Link>
      </div>
    </div>
  );
}
