"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";

import { INDUSTRY_OPTIONS } from "@/lib/business-risk/catalog";
import type { BusinessRiskReview } from "@/lib/db";
import { exportBusinessRiskReviewsCsv, fetchBusinessRiskReviews } from "@/app/crm/business-risk-reviews/actions";

type SerializedReview = Omit<BusinessRiskReview, "createdAt"> & { createdAt: string };

export function BusinessRiskReviewsAdmin({ initialRows }: { initialRows: SerializedReview[] }) {
  const [rows, setRows] = useState<SerializedReview[]>(initialRows);
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isPending, startTransition] = useTransition();

  const filters = useMemo(
    () => ({
      query: query || undefined,
      industry: industry || undefined,
      minScore: minScore ? Number(minScore) : undefined,
      maxScore: maxScore ? Number(maxScore) : undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }),
    [query, industry, minScore, maxScore, fromDate, toDate]
  );

  useEffect(() => {
    startTransition(async () => {
      const next = await fetchBusinessRiskReviews(filters);
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
      const csv = await exportBusinessRiskReviewsCsv(filters);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `business-risk-reviews-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="trust-hallmark mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          CRM · Lead magnet
        </p>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Business Risk Review submissions</h1>
        <p className="mt-2 text-sm text-zinc-400">Search, filter, export CSV, and open printable reports.</p>
      </div>

      <div className="rim-light grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-2 lg:grid-cols-3">
        <input
          placeholder="Search name, email, company…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white"
        />
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white">
          <option value="all">All industries</option>
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <input type="number" placeholder="Min coverage score" value={minScore} onChange={(e) => setMinScore(e.target.value)} className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white" />
        <input type="number" placeholder="Max coverage score" value={maxScore} onChange={(e) => setMaxScore(e.target.value)} className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white" />
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white" />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white" />
        <button type="button" onClick={handleExport} disabled={isPending} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-black hover:bg-zinc-200 disabled:opacity-60">
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Industry</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Protection</th>
              <th className="px-4 py-3">Report</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-zinc-500">
                  {isPending ? "Loading…" : "No submissions yet."}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-white/10 text-zinc-200">
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(row.createdAt).toLocaleDateString("en-ZA")}</td>
                  <td className="px-4 py-3">{row.company}</td>
                  <td className="px-4 py-3">
                    <div>{row.name}</div>
                    <div className="text-xs text-zinc-500">{row.email}</div>
                  </td>
                  <td className="px-4 py-3">{row.industry}</td>
                  <td className="px-4 py-3">
                    {row.coverageScore}/{row.totalItems}
                  </td>
                  <td className="px-4 py-3">{row.protectionPercent}%</td>
                  <td className="px-4 py-3">
                    <Link href={`/business-risk-review/report/${row.id}`} target="_blank" className="text-cinematic-teal hover:underline">
                      View PDF
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
