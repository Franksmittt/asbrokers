"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCrm } from "@/components/crm/CrmContext";
import { KANBAN_COLUMNS, SERVICE_LABELS, type LeadStatus } from "@/lib/crm/types";
import { formatAdvisorLabel, formatLeadStatus } from "@/lib/crm/utils";
import { cn } from "@/lib/utils";

const VALID_STATUSES = new Set<string>(KANBAN_COLUMNS.map((c) => c.status));

function parseStatusFilter(raw: string | null): LeadStatus | null {
  if (!raw || !VALID_STATUSES.has(raw)) return null;
  return raw as LeadStatus;
}

export default function CrmLeadsPage() {
  const searchParams = useSearchParams();
  const statusFilter = parseStatusFilter(searchParams.get("status"));
  const { visibleLeads } = useCrm();

  const filteredLeads = useMemo(
    () => (statusFilter ? visibleLeads.filter((l) => l.status === statusFilter) : visibleLeads),
    [visibleLeads, statusFilter]
  );

  const statusLabel = statusFilter
    ? KANBAN_COLUMNS.find((c) => c.status === statusFilter)?.label ?? statusFilter
    : null;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="mt-2 text-sm text-gray-100 tabular-nums">
          {filteredLeads.length} record{filteredLeads.length === 1 ? "" : "s"}
          {statusLabel ? ` · ${statusLabel}` : " in view"}
        </p>
        {statusFilter ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/crm/leads"
              className="rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-1 text-xs text-zinc-400 transition-colors hover:text-white"
            >
              Clear filter
            </Link>
            <Link
              href="/crm/kanban"
              className="rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-1 text-xs text-zinc-400 transition-colors hover:text-white"
            >
              Open in Kanban
            </Link>
          </div>
        ) : null}
      </header>

      <div className="flex flex-wrap gap-1.5">
        {KANBAN_COLUMNS.map((col) => {
          const active = statusFilter === col.status;
          const count = visibleLeads.filter((l) => l.status === col.status).length;
          return (
            <Link
              key={col.status}
              href={active ? "/crm/leads" : `/crm/leads?status=${col.status}`}
              className={cn(
                "rounded-md border px-2.5 py-1 text-[11px] font-medium tabular-nums transition-colors",
                active
                  ? "border-[#3ecf8e]/50 bg-[#3ecf8e]/10 text-[#3ecf8e]"
                  : "border-[#2a2a2a] text-zinc-500 hover:border-[#3a3a3a] hover:text-zinc-300"
              )}
            >
              {col.label} · {count}
            </Link>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-[2rem] rim-light">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
              <th className="px-5 py-4 font-medium">Name</th>
              <th className="px-5 py-4 font-medium">Service</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Advisor</th>
              <th className="px-5 py-4 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-zinc-500">
                  No leads{statusLabel ? ` in ${statusLabel}` : ""}.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-5 py-3">
                    <Link
                      href={`/crm/leads/${lead.id}`}
                      className="font-medium text-white hover:text-cinematic-teal"
                    >
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-gray-100">{SERVICE_LABELS[lead.service_category]}</td>
                  <td className="px-5 py-3 text-gray-100">{formatLeadStatus(lead.status)}</td>
                  <td className="px-5 py-3 text-gray-100">
                    {formatAdvisorLabel(lead.assignedAdvisorId)}
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-supernova-gold/20 px-2 py-0.5 text-xs font-bold tabular-nums text-supernova-gold">
                      {lead.lead_score}
                    </span>
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
