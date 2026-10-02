"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";

import type { HealthyRetirementAssessment } from "@/lib/db";
import {
  exportHealthyRetirementCsv,
  fetchHealthyRetirementAssessments,
} from "@/app/(crm)/crm/healthy-retirement-assessments/actions";

type SerializedRow = Omit<HealthyRetirementAssessment, "createdAt"> & { createdAt: string };

const BANDS = [
  { value: "all", label: "All bands" },
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "moderate-risk", label: "Moderate Risk" },
  { value: "high-risk", label: "High Risk" },
  { value: "action-required", label: "Action Required" },
];

export function HealthyRetirementAssessmentsAdmin({ initialRows }: { initialRows: SerializedRow[] }) {
  const [rows, setRows] = useState<SerializedRow[]>(initialRows);
  const [query, setQuery] = useState("");
  const [band, setBand] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isPending, startTransition] = useTransition();

  const filters = useMemo(
    () => ({
      query: query || undefined,
      band: band || undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }),
    [query, band, fromDate, toDate]
  );

  useEffect(() => {
    startTransition(async () => {
      const next = await fetchHealthyRetirementAssessments(filters);
      setRows(
        next.map((row) => ({
          ...row,
          createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
        }))
      );
    });
  }, [filters]);

  function handleExport() {
    startTransition(async () => {
      const csv = await exportHealthyRetirementCsv(filters);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `healthy-retirement-assessments-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="trust-hallmark mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#52525b]">
          CRM · Health pillar
        </p>
        <h1 className="text-2xl font-bold text-[#1D1D1F] sm:text-3xl">Healthy Retirement assessments</h1>
        <p className="mt-2 text-sm text-[#52525b]">
          Retirement Health Gap™ submissions from the Healthy Retirement Blueprint™.
        </p>
      </div>

      <div className="rim-light grid gap-4 rounded-2xl border border-[#E5E5E5] bg-white/[0.04] p-4 md:grid-cols-2 lg:grid-cols-4">
        <input
          placeholder="Search name, email, phone…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-xl border border-[#E5E5E5] bg-zinc-950 px-3 py-2 text-sm text-[#1D1D1F] lg:col-span-2"
        />
        <select
          value={band}
          onChange={(e) => setBand(e.target.value)}
          className="rounded-xl border border-[#E5E5E5] bg-zinc-950 px-3 py-2 text-sm text-[#1D1D1F]"
        >
          {BANDS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleExport}
          disabled={isPending}
          className="rounded-xl bg-[#00549F] px-4 py-2 text-sm font-semibold text-[#1D1D1F] disabled:opacity-60"
        >
          Export CSV
        </button>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="rounded-xl border border-[#E5E5E5] bg-zinc-950 px-3 py-2 text-sm text-[#1D1D1F]"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="rounded-xl border border-[#E5E5E5] bg-zinc-950 px-3 py-2 text-sm text-[#1D1D1F]"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#E5E5E5] bg-[#FAFAF8] text-xs uppercase tracking-wider text-[#52525b]">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Gap</th>
              <th className="px-4 py-3">Band</th>
              <th className="px-4 py-3">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEFEA]">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#52525b]">
                  {isPending ? "Loading…" : "No assessments yet."}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="text-[#3F3F46] hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 text-[#52525b]">
                    {new Date(row.createdAt).toLocaleString("en-ZA")}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1D1D1F]">{row.firstName}</td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">{row.healthScore}</td>
                  <td className="px-4 py-3">{row.healthGap}</td>
                  <td className="px-4 py-3 capitalize">{row.scoreBand.replace(/-/g, " ")}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/healthy-retirement-blueprint/report/${row.id}`}
                      className="text-[#00549F] hover:underline"
                      target="_blank"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
