"use client";

import { useState, useCallback } from "react";

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

type PolicyRow = { year: number; monthlyPremium: number };
type Policy = { name: string; rows: PolicyRow[] };

const YEAR_OPTIONS = [5, 10, 15, 20, 25] as const;
const MILESTONES = [5, 10, 15, 20, 25] as const;

function rowAnnualTotal(row: PolicyRow): number {
  return row.monthlyPremium * 12;
}

function rowChangePct(rows: PolicyRow[], index: number): number | null {
  if (index <= 0) return null;
  const prev = rows[index - 1].monthlyPremium;
  const curr = rows[index].monthlyPremium;
  if (prev <= 0) return null;
  return ((curr - prev) / prev) * 100;
}

function averageAnnualIncrease(rows: PolicyRow[]): number | null {
  let sum = 0;
  let count = 0;
  for (let i = 1; i < rows.length; i++) {
    const pct = rowChangePct(rows, i);
    if (pct !== null) {
      sum += pct;
      count++;
    }
  }
  if (count === 0) return null;
  return sum / count;
}

function cumulativeSpend(rows: PolicyRow[], upToYears: number): number {
  let total = 0;
  for (let i = 0; i < Math.min(upToYears, rows.length); i++) {
    total += rowAnnualTotal(rows[i]);
  }
  return total;
}

function PolicyTable({
  policy,
  onRename,
  onPremiumChange,
  isEditingName,
  onToggleEditName,
}: {
  policy: Policy;
  onRename: (name: string) => void;
  onPremiumChange: (yearIndex: number, value: number) => void;
  isEditingName: boolean;
  onToggleEditName: () => void;
}) {
  const avgIncrease = averageAnnualIncrease(policy.rows);
  const inputClass =
    "w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500";

  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-[#151518] overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center gap-2 flex-wrap">
        <span className="text-zinc-400 text-sm">Compare:</span>
        {isEditingName ? (
          <input
            type="text"
            value={policy.name}
            onChange={(e) => onRename(e.target.value)}
            onBlur={onToggleEditName}
            onKeyDown={(e) => e.key === "Enter" && onToggleEditName()}
            className="bg-white/5 border border-white/20 rounded-lg px-2 py-1 text-white text-sm font-medium min-w-[120px]"
            autoFocus
          />
        ) : (
          <span className="font-medium text-white">{policy.name}</span>
        )}
        <button
          type="button"
          onClick={onToggleEditName}
          className="text-zinc-500 hover:text-white text-sm"
          aria-label="Edit policy name"
        >
          ✏️ edit
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-3 text-zinc-400 font-medium">Year</th>
              <th className="text-left py-2 px-3 text-zinc-400 font-medium">Monthly premium (R)</th>
              <th className="text-left py-2 px-3 text-zinc-400 font-medium">Change %</th>
              <th className="text-left py-2 px-3 text-zinc-400 font-medium">Annual total</th>
            </tr>
          </thead>
          <tbody>
            {policy.rows.map((row, i) => {
              const changePct = rowChangePct(policy.rows, i);
              const annual = rowAnnualTotal(row);
              return (
                <tr key={row.year} className="border-b border-white/5">
                  <td className="py-2 px-3 text-zinc-300">{row.year}</td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      min={0}
                      step={50}
                      value={row.monthlyPremium || ""}
                      onChange={(e) => onPremiumChange(i, Number(e.target.value) || 0)}
                      className={inputClass}
                    />
                  </td>
                  <td className="py-2 px-3 text-zinc-400">
                    {changePct !== null ? `${changePct.toFixed(1)}%` : "–"}
                  </td>
                  <td className="py-2 px-3 text-zinc-300">{formatCurrency(annual)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-3 border-t border-white/10 text-sm">
        <span className="text-zinc-500">Average annual increase: </span>
        <span className="text-white font-medium">
          {avgIncrease !== null ? `${avgIncrease.toFixed(1)}%` : "–"}
        </span>
      </div>
    </div>
  );
}

export function PremiumComparisonCalculator() {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(currentYear);
  const [numYears, setNumYears] = useState<number>(10);
  const [policyA, setPolicyA] = useState<Policy>({ name: "Policy A", rows: [] });
  const [policyB, setPolicyB] = useState<Policy>({ name: "Policy B", rows: [] });
  const [tablesGenerated, setTablesGenerated] = useState(false);
  const [editingA, setEditingA] = useState(false);
  const [editingB, setEditingB] = useState(false);

  const generateTables = useCallback(() => {
    const rows: PolicyRow[] = [];
    for (let i = 0; i < numYears; i++) {
      rows.push({ year: startYear + i, monthlyPremium: 0 });
    }
    setPolicyA((prev) => ({ ...prev, name: prev.name || "Policy A", rows }));
    setPolicyB((prev) => ({ ...prev, name: prev.name || "Policy B", rows }));
    setTablesGenerated(true);
  }, [startYear, numYears]);

  const updatePolicyAPremium = useCallback((yearIndex: number, value: number) => {
    setPolicyA((prev) => {
      const next = [...prev.rows];
      if (yearIndex >= 0 && yearIndex < next.length) next[yearIndex] = { ...next[yearIndex], monthlyPremium: value };
      return { ...prev, rows: next };
    });
  }, []);

  const updatePolicyBPremium = useCallback((yearIndex: number, value: number) => {
    setPolicyB((prev) => {
      const next = [...prev.rows];
      if (yearIndex >= 0 && yearIndex < next.length) next[yearIndex] = { ...next[yearIndex], monthlyPremium: value };
      return { ...prev, rows: next };
    });
  }, []);

  const milestonesToShow = MILESTONES.filter((m) => m <= numYears);
  const inputClass =
    "bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-1";

  return (
    <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-2">Insurance Premium Comparison Calculator</h2>
      <p className="text-zinc-400 text-sm mb-4">
        How to use: Enter the monthly premiums from your policy documents for each year. You can find these on your
        annual statements or quote documents. The calculator will automatically work out the percentage increases and
        total spend.
      </p>

      {/* Setup */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>Start year</label>
          <input
            type="number"
            min={2020}
            max={2040}
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value) || currentYear)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Number of years to compare</label>
          <select
            value={numYears}
            onChange={(e) => setNumYears(Number(e.target.value) as typeof YEAR_OPTIONS[number])}
            className={inputClass}
          >
            {YEAR_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} years
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={generateTables}
        className="w-full sm:w-auto bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-zinc-200 transition-colors"
      >
        Generate tables
      </button>

      {tablesGenerated && policyA.rows.length > 0 && (
        <>
          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <PolicyTable
              policy={policyA}
              onRename={(name) => setPolicyA((p) => ({ ...p, name }))}
              onPremiumChange={updatePolicyAPremium}
              isEditingName={editingA}
              onToggleEditName={() => setEditingA((e) => !e)}
            />
            <PolicyTable
              policy={policyB}
              onRename={(name) => setPolicyB((p) => ({ ...p, name }))}
              onPremiumChange={updatePolicyBPremium}
              isEditingName={editingB}
              onToggleEditName={() => setEditingB((e) => !e)}
            />
          </div>

          {/* Total spend comparison */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Total spend comparison</h3>
            <div className="space-y-4">
              {milestonesToShow.map((years) => {
                const totalA = cumulativeSpend(policyA.rows, years);
                const totalB = cumulativeSpend(policyB.rows, years);
                const diff = totalA - totalB;
                const hasData = totalA > 0 || totalB > 0;
                return (
                  <div
                    key={years}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <span className="text-zinc-400 font-medium">After {years} years</span>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="text-zinc-300">
                        {policyA.name}: {formatCurrency(totalA)}
                      </span>
                      <span className="text-zinc-300">
                        {policyB.name}: {formatCurrency(totalB)}
                      </span>
                      {hasData && (
                        <span className={diff > 0 ? "text-red-400" : diff < 0 ? "text-green-400" : "text-zinc-500"}>
                          Difference: {formatCurrency(Math.abs(diff))} {diff > 0 ? `${policyA.name} costs more` : diff < 0 ? `${policyB.name} costs more` : "Same"}
                        </span>
                      )}
                      {!hasData && <span className="text-zinc-500">Enter premiums to compare</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
