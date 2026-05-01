"use client";

import { useState, useCallback } from "react";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

/**
 * Future Value / Cost of Inflation Calculator.
 * futureCost = PV * (1 + i)^n
 * futureBuyingPower = PV / (1 + i)^n
 * purchasingPowerLostPct = ((PV - futureBuyingPower) / PV) * 100
 */
export function FutureValueCalculator() {
  const [presentValue, setPresentValue] = useState(50_000);
  const [inflationRate, setInflationRate] = useState(6);
  const [timePeriod, setTimePeriod] = useState(20);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = (() => {
    const inflationDec = inflationRate / 100;
    const futureCost = presentValue * Math.pow(1 + inflationDec, timePeriod);
    const futureBuyingPower = presentValue / Math.pow(1 + inflationDec, timePeriod);
    let purchasingPowerLostPct = 0;
    if (presentValue > 0) {
      purchasingPowerLostPct = ((presentValue - futureBuyingPower) / presentValue) * 100;
    }
    return { futureCost, futureBuyingPower, purchasingPowerLostPct };
  })();

  const handleCalculate = useCallback(() => {
    setHasCalculated(true);
  }, []);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">AS Brokers – Future Value Calculator</h2>
      <p className="text-zinc-400 text-sm mb-6">
        See how inflation affects your money over time, and what you&apos;ll need to maintain your buying power.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Present value (Rand)</label>
          <input
            type="number"
            min={0}
            step={1000}
            value={presentValue}
            onChange={(e) => setPresentValue(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 50000"
          />
          <p className="text-zinc-500 text-xs mt-1">The amount of money you have or need today.</p>
        </div>
        <div>
          <label className={labelClass}>Inflation rate (% per year)</label>
          <input
            type="number"
            min={0}
            max={20}
            step={0.5}
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value) ?? 0)}
            className={inputClass}
          />
          <p className="text-zinc-500 text-xs mt-1">Average annual inflation (SA typically 5–7%).</p>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Time period (years)</label>
          <input
            type="number"
            min={1}
            max={80}
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 20"
          />
          <p className="text-zinc-500 text-xs mt-1">How far into the future you&apos;re planning.</p>
        </div>
      </div>

      <p className="text-zinc-500 text-xs mt-4 mb-6">
        This calculator shows the impact of inflation on your money, an essential part of retirement planning.
      </p>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate future value
      </button>

      {hasCalculated && (
        <div className="mt-8 space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Today&apos;s value</p>
            <p className="text-xl font-bold text-white">{formatCurrency(presentValue)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Future cost</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.futureCost)}</p>
            <p className="text-zinc-500 text-xs mt-1">What it will cost in {timePeriod} years.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Future buying power</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.futureBuyingPower)}</p>
            <p className="text-zinc-500 text-xs mt-1">If your money doesn&apos;t grow.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Purchasing power lost</p>
            <p className="text-xl font-bold text-amber-400">{result.purchasingPowerLostPct.toFixed(1)}%</p>
          </div>
        </div>
      )}

      <p className="text-zinc-500 text-xs mt-6">
        About this estimate: This calculator demonstrates the effect of inflation on your money&apos;s purchasing
        power. It assumes a constant inflation rate over the period. Actual inflation varies year to year. Use this as
        an educational tool to understand why your investments need to grow to maintain your standard of living.
      </p>
    </div>
  );
}
