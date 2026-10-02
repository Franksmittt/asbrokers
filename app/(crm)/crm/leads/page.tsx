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
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1D1D1F]">Leads</h1>
        <p className="mt-2 text-sm text-[#52525b] tabular-nums">
          {filteredLeads.length} record{filteredLeads.length === 1 ? "" : "s"}
          {statusLabel ? ` · ${statusLabel}` : ""}
        </p>
        {statusFilter ? (
          <div className="mt-3">
            <Link
              href="/crm/leads"
              className="rounded-xl border border-[#E5E5E5] bg-white px-3 py-1.5 text-xs font-medium text-[#52525b] transition-colors hover:text-[#1D1D1F]"
            >
              Clear filter
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
                "rounded-xl border px-2.5 py-1 text-[11px] font-medium tabular-nums transition-colors",
                active
                  ? "border-[#006B6B]/30 bg-[#E8F3F3] text-[#006B6B]"
                  : "border-[#E5E5E5] bg-white text-[#71717a] hover:border-[#D4D4D4] hover:text-[#1D1D1F]"
              )}
            >
              {col.label} · {count}
            </Link>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5] bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#E5E5E5] text-xs uppercase tracking-wider text-[#71717a]">
              <th className="px-5 py-3.5 font-medium">Name</th>
              <th className="px-5 py-3.5 font-medium">Service</th>
              <th className="px-5 py-3.5 font-medium">Status</th>
              <th className="px-5 py-3.5 font-medium">Advisor</th>
              <th className="px-5 py-3.5 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-[#71717a]">
                  No leads{statusLabel ? ` in ${statusLabel}` : ""}.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-[#F0F0EE] last:border-0 hover:bg-[#FAFAF8]">
                  <td className="px-5 py-3">
                    <Link
                      href={`/crm/leads/${lead.id}`}
                      className="font-medium text-[#1D1D1F] hover:text-[#0057B8]"
                    >
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[#52525b]">
                    {SERVICE_LABELS[lead.service_category]}
                  </td>
                  <td className="px-5 py-3 text-[#52525b]">{formatLeadStatus(lead.status)}</td>
                  <td className="px-5 py-3 text-[#52525b]">
                    {formatAdvisorLabel(lead.assignedAdvisorId)}
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-lg bg-[#F7F6F3] px-2 py-0.5 text-xs font-semibold tabular-nums text-[#52525b]">
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
