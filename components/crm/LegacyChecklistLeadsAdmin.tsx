"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import type { LegacyChecklistLead } from "@/lib/db";
import {
  exportLegacyChecklistLeadsCsv,
  fetchLegacyChecklistLeads,
} from "@/app/(crm)/crm/legacy-checklist-leads/actions";

type SerializedLead = Omit<LegacyChecklistLead, "createdAt"> & { createdAt: string };

export function LegacyChecklistLeadsAdmin({ initialRows }: { initialRows: SerializedLead[] }) {
  const [rows, setRows] = useState<SerializedLead[]>(initialRows);
  const [query, setQuery] = useState("");
  const [businessOwner, setBusinessOwner] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isPending, startTransition] = useTransition();

  const filters = useMemo(
    () => ({
      query: query || undefined,
      businessOwner: businessOwner || undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }),
    [query, businessOwner, fromDate, toDate]
  );

  useEffect(() => {
    startTransition(async () => {
      const next = await fetchLegacyChecklistLeads(filters);
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
      const csv = await exportLegacyChecklistLeadsCsv(filters);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `legacy-checklist-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="trust-hallmark mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          CRM · Legacy Conversations™
        </p>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Legacy Checklist leads</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Lead magnet submissions from the Legacy Readiness Checklist™ landing page.
        </p>
      </div>

      <div className="rim-light grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-2 lg:grid-cols-4">
        <input
          placeholder="Search name, email, phone…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white lg:col-span-2"
        />
        <select
          value={businessOwner}
          onChange={(e) => setBusinessOwner(e.target.value)}
          className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white"
        >
          <option value="all">All business owners</option>
          <option value="yes">Business owner: Yes</option>
          <option value="no">Business owner: No</option>
        </select>
        <button
          type="button"
          onClick={handleExport}
          disabled={isPending}
          className="rounded-xl bg-[#00549F] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          Export CSV
        </button>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-sm text-white"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Business</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                  {isPending ? "Loading…" : "No leads yet."}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="text-zinc-300 hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                    {new Date(row.createdAt).toLocaleString("en-ZA")}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    {row.firstName} {row.surname}
                  </td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">{row.phone}</td>
                  <td className="px-4 py-3">{row.age ?? ", "}</td>
                  <td className="px-4 py-3 capitalize">{row.businessOwner ?? ", "}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
