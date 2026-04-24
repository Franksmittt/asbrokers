"use client";

import { useState, useCallback } from "react";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

type DonationType = "single" | "couple";

/**
 * Annual Estate Reduction Strategy / Trust Donation Calculator.
 * Single: R100k/year, Couple: R200k/year. Estate duty saved at 20% of total donations.
 * Trust value = FV of annuity due (donations at start of each year).
 */
function runCalculation(
  donationType: DonationType,
  currentAge: number,
  plannedAge: number,
  assumedGrowthRate: number
): { donationPeriod: number; totalDonations: number; estateDutySaved: number; trustValue: number; annualDonation: number } {
  const annualDonation = donationType === "couple" ? 200_000 : 100_000;
  const donationPeriod = Math.max(0, plannedAge - currentAge);
  const totalDonations = annualDonation * donationPeriod;
  const estateDutySaved = totalDonations * 0.2;
  const growthDec = assumedGrowthRate / 100;

  let trustValue = 0;
  if (donationPeriod > 0) {
    if (growthDec === 0) {
      trustValue = totalDonations;
    } else {
      // FV of annuity due: PMT * [((1+r)^n - 1) / r] * (1 + r)
      trustValue = annualDonation * ((Math.pow(1 + growthDec, donationPeriod) - 1) / growthDec) * (1 + growthDec);
    }
  }

  return { donationPeriod, totalDonations, estateDutySaved, trustValue, annualDonation };
}

export function EstateReductionCalculator() {
  const [donationType, setDonationType] = useState<DonationType>("single");
  const [currentAge, setCurrentAge] = useState(65);
  const [plannedAge, setPlannedAge] = useState(85);
  const [assumedGrowthRate, setAssumedGrowthRate] = useState(10);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = runCalculation(donationType, currentAge, plannedAge, assumedGrowthRate);

  const handleCalculate = useCallback(() => {
    setHasCalculated(true);
  }, []);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";
  const optionClass = (active: boolean) =>
    `flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
      active ? "bg-blue-500/20 border border-blue-500/50 text-white" : "bg-white/5 border border-white/10 text-zinc-400 hover:border-white/20"
    }`;

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">Trust Donation Calculator</h2>
      <p className="text-zinc-400 text-sm mb-6">
        Choose Single (R100,000/year) or Couple (R200,000/year), then estimate the donation period and potential estate duty saving.
      </p>

      <div className="space-y-6">
        <div>
          <label className={labelClass}>Donation type</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => setDonationType("single")}
              className={optionClass(donationType === "single")}
            >
              Single person R100,000 per year
            </button>
            <button
              type="button"
              onClick={() => setDonationType("couple")}
              className={optionClass(donationType === "couple")}
            >
              Couple R200,000 per year
            </button>
          </div>
          <p className="text-zinc-500 text-xs mt-2">
            Fixed annual donation: {formatCurrency(result.annualDonation)}
          </p>
        </div>

        <div>
          <label className={labelClass}>Current age</label>
          <input
            type="number"
            min={18}
            max={100}
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value) || 0)}
            className={inputClass}
          />
          <p className="text-zinc-500 text-xs mt-1">Use your age today (years).</p>
        </div>

        <div>
          <label className={labelClass}>Planned age (life expectancy)</label>
          <input
            type="number"
            min={50}
            max={120}
            value={plannedAge}
            onChange={(e) => setPlannedAge(Number(e.target.value) || 0)}
            className={inputClass}
          />
          <p className="text-zinc-500 text-xs mt-1">The age you want to plan until (years).</p>
        </div>

        <div>
          <label className={labelClass}>Assumed growth rate % (optional)</label>
          <input
            type="number"
            min={0}
            max={20}
            step={0.5}
            value={assumedGrowthRate}
            onChange={(e) => setAssumedGrowthRate(Number(e.target.value) ?? 0)}
            className={inputClass}
          />
          <p className="text-zinc-500 text-xs mt-1">Used only for the illustrative trust value estimate.</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full mt-8 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Calculate
      </button>

      {hasCalculated && (
        <div className="mt-8 space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Donation period</p>
            <p className="text-xl font-bold text-white">{result.donationPeriod} years</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total donations made</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.totalDonations)}</p>
          </div>
          <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Estimated estate duty saved (20%)</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(result.estateDutySaved)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Estimated trust value at planned age</p>
            <p className="text-xl font-bold text-white">{formatCurrency(result.trustValue)}</p>
            <p className="text-zinc-500 text-xs mt-1">Illustrative assuming {assumedGrowthRate}% growth.</p>
          </div>
        </div>
      )}

      <p className="text-zinc-500 text-xs mt-6">
        Notes: This calculator uses fixed annual donations of R100,000 (single) or R200,000 (couple) as per current SARS
        legislation. Estate duty saving is shown at 20% of total donations as a simple estimate. Growth is illustrative
        and depends on actual investment returns.
      </p>
    </div>
  );
}
