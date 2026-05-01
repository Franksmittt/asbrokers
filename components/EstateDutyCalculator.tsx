"use client";

import { useState, useCallback } from "react";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

const PRIMARY_ABATEMENT = 3_500_000;
const DUTY_THRESHOLD = 30_000_000;
const DUTY_RATE_FIRST = 0.2;
const DUTY_RATE_ABOVE = 0.25;
const DUTY_ON_FIRST_30M = 6_000_000; // 20% of R30m
const EXECUTOR_FEE_RATE = 0.04025; // 3.5% + 15% VAT

/**
 * South African Estate Duty Calculator.
 * Executor fees: 3.5% of gross + 15% VAT = 4.025%.
 * Deductions: liabilities + bequests to spouse + executor fees.
 * Primary abatement: R3.5m. Duty: 20% on first R30m, 25% above.
 */
function calculateEstateCosts(
  grossEstateValue: number,
  liabilities: number,
  bequestsToSpouse: number
): { executorFees: number; estateDutyPayable: number; totalEstateCosts: number; netEstate: number; dutiableEstate: number } {
  const executorFees = grossEstateValue * EXECUTOR_FEE_RATE;
  const totalDeductions = liabilities + bequestsToSpouse + executorFees;
  const netEstate = Math.max(0, grossEstateValue - totalDeductions);
  const dutiableEstate = Math.max(0, netEstate - PRIMARY_ABATEMENT);

  let estateDutyPayable = 0;
  if (dutiableEstate <= DUTY_THRESHOLD) {
    estateDutyPayable = dutiableEstate * DUTY_RATE_FIRST;
  } else {
    estateDutyPayable = DUTY_ON_FIRST_30M + (dutiableEstate - DUTY_THRESHOLD) * DUTY_RATE_ABOVE;
  }

  const totalEstateCosts = executorFees + estateDutyPayable;
  return { executorFees, estateDutyPayable, totalEstateCosts, netEstate, dutiableEstate };
}

export function EstateDutyCalculator() {
  const [grossEstateValue, setGrossEstateValue] = useState(5_000_000);
  const [liabilities, setLiabilities] = useState(500_000);
  const [bequestsToSpouse, setBequestsToSpouse] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = calculateEstateCosts(grossEstateValue, liabilities, bequestsToSpouse);

  const handleCalculate = useCallback(() => {
    setHasCalculated(true);
  }, []);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">AS Brokers – Estate Duty Calculator</h2>
      <p className="text-zinc-400 text-sm mb-6">
        Calculate estate duty, executor fees, and the total cash your estate will need at death.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Gross estate value (R)</label>
          <input
            type="number"
            min={0}
            step={100_000}
            value={grossEstateValue}
            onChange={(e) => setGrossEstateValue(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 5000000"
          />
          <p className="text-zinc-500 text-xs mt-1">
            Property, investments, cash, life cover paid to estate.
          </p>
        </div>
        <div>
          <label className={labelClass}>Liabilities (R)</label>
          <input
            type="number"
            min={0}
            step={50_000}
            value={liabilities}
            onChange={(e) => setLiabilities(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 500000"
          />
          <p className="text-zinc-500 text-xs mt-1">Mortgages, loans, debts.</p>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Bequests to spouse (R) – Section 4(q) deduction, exempt from duty</label>
          <input
            type="number"
            min={0}
            step={100_000}
            value={bequestsToSpouse}
            onChange={(e) => setBequestsToSpouse(Number(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 0"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full mt-8 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate estate costs
      </button>

      {hasCalculated && (
        <div className="mt-8 space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Estate duty payable</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.estateDutyPayable)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Executor fees</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.executorFees)}</p>
            <p className="text-zinc-500 text-xs mt-1">3.5% of gross estate + 15% VAT.</p>
          </div>
          <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Total estate costs</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(result.totalEstateCosts)}</p>
            <p className="text-zinc-500 text-xs mt-1">Cash the estate needs at death (cost of dying).</p>
          </div>
        </div>
      )}

      <p className="text-zinc-500 text-xs mt-6">
        This calculator provides a high-level estimate of estate duty and executor fees based on current SARS brackets
        (20% up to R30m, 25% thereafter) and standard 3.5% (ex VAT) executor rates. It is designed for awareness and
        does not replace formal estate planning.
      </p>
    </div>
  );
}
