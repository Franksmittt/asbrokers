"use client";

import { useMemo, useState } from "react";

function formatRand(value: number): string {
  if (!Number.isFinite(value) || Number.isNaN(value)) return "R0";
  return `R${Math.round(value).toLocaleString("en-ZA")}`;
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/30";
const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

export function AverageClauseCalculator() {
  const [sumInsured, setSumInsured] = useState(1_000_000);
  const [actualValue, setActualValue] = useState(2_000_000);
  const [claimAmount, setClaimAmount] = useState(1_000_000);

  const results = useMemo(() => {
    if (sumInsured <= 0 || actualValue <= 0 || claimAmount <= 0) return null;

    const averageFactor = sumInsured / actualValue;
    const claimPayable = claimAmount * averageFactor;
    const uninsuredPortion = claimAmount - claimPayable;

    return {
      averagePercent: averageFactor * 100,
      claimPayable,
      uninsuredPortion,
      isUnderinsured: sumInsured < actualValue,
    };
  }, [sumInsured, actualValue, claimAmount]);

  return (
    <div className="rounded-[2rem] border border-white/5 bg-[#151518] p-6 sm:p-8">
      <h2 className="mb-2 text-2xl font-bold text-white">Average Clause Calculator</h2>
      <p className="mb-6 text-sm text-zinc-400">
        See how much a claim may be reduced when the sum insured is less than the actual replacement value.
      </p>

      {results?.isUnderinsured && (
        <div
          className="mb-6 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100"
          role="alert"
        >
          <strong className="text-amber-200">Warning:</strong> If your assets are underinsured, the average clause can
          reduce every claim, even a partial loss.
        </div>
      )}

      <div className="mb-4">
        <label className={labelClass} htmlFor="average-sum-insured">
          Sum Insured
        </label>
        <input
          id="average-sum-insured"
          type="number"
          min={0}
          step={10000}
          value={sumInsured}
          onChange={(e) => setSumInsured(Number(e.target.value) || 0)}
          className={inputClass}
          placeholder="Amount the client is insured for"
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor="average-actual-value">
          Actual Value at Risk
        </label>
        <input
          id="average-actual-value"
          type="number"
          min={0}
          step={10000}
          value={actualValue}
          onChange={(e) => setActualValue(Number(e.target.value) || 0)}
          className={inputClass}
          placeholder="True replacement value of the property or assets"
        />
      </div>

      <div className="mb-6">
        <label className={labelClass} htmlFor="average-claim-amount">
          Claim Amount
        </label>
        <input
          id="average-claim-amount"
          type="number"
          min={0}
          step={10000}
          value={claimAmount}
          onChange={(e) => setClaimAmount(Number(e.target.value) || 0)}
          className={inputClass}
          placeholder="Amount of the loss being claimed"
        />
      </div>

      {results ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Average Percentage</p>
            <p className="mt-1 text-2xl font-bold text-white">{results.averagePercent.toFixed(2)}%</p>
          </div>
          <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Claim Payable</p>
            <p className="mt-1 text-2xl font-bold text-teal-300">{formatRand(results.claimPayable)}</p>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Uninsured Portion</p>
            <p className="mt-1 text-2xl font-bold text-red-300">{formatRand(results.uninsuredPortion)}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">Enter valid amounts greater than zero to see results.</p>
      )}

      <p className="mt-6 text-xs text-zinc-500">
        For illustration only. Claim outcomes depend on policy wording, endorsements, and insurer assessment. This does
        not constitute financial or insurance advice.
      </p>
    </div>
  );
}
