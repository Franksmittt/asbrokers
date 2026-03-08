"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import type { MockLead, LeadStatus } from "@/lib/mock-crm";
import { SERVICE_LABELS } from "@/lib/mock-crm";

const STORAGE_KEY = "crm-kanban-status";

function loadPersistedStatus(): Record<string, LeadStatus> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed as Record<string, LeadStatus>;
  } catch {
    return {};
  }
}

function savePersistedStatus(map: Record<string, LeadStatus>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

const COLUMNS: { status: LeadStatus; label: string }[] = [
  { status: "new", label: "New" },
  { status: "contacted", label: "Contacted" },
  { status: "qualified", label: "Qualified" },
  { status: "proposal", label: "Proposal" },
  { status: "closed_won", label: "Won" },
  { status: "closed_lost", label: "Lost" },
];

export function LeadsKanban({ initialLeads, isOwner }: { initialLeads: MockLead[]; isOwner: boolean }) {
  const persisted = useMemo(() => loadPersistedStatus(), []);
  const [leads, setLeads] = useState<MockLead[]>(() =>
    initialLeads.map((l) => ({
      ...l,
      status: (persisted[l.id] as LeadStatus) ?? l.status,
    }))
  );

  const moveLead = useCallback((leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) => {
      const next = prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
      const nextMap = { ...loadPersistedStatus(), [leadId]: newStatus };
      savePersistedStatus(nextMap);
      return next;
    });
  }, []);

  const byStatus = (status: LeadStatus) => leads.filter((l) => l.status === status);

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 min-h-[420px]">
      {COLUMNS.map(({ status, label }) => (
        <div
          key={status}
          className="flex-shrink-0 w-64 rounded-2xl bg-vault-card border border-white/10 flex flex-col overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">{label}</span>
            <span className="text-xs text-zinc-500">{byStatus(status).length}</span>
          </div>
          <div
            className="flex-1 p-2 space-y-2 overflow-y-auto"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData("leadId");
              if (id) moveLead(id, status);
            }}
          >
            {byStatus(status).map((lead) => (
              <div
                key={lead.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("leadId", lead.id)}
                className="rounded-xl bg-black/40 border border-white/10 p-3 cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors"
              >
                <Link
                  href={`/crm/leads/${lead.id}`}
                  className="block font-medium text-white text-sm hover:text-cinematic-teal"
                  onClick={(e) => e.stopPropagation()}
                >
                  {lead.name}
                </Link>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">{lead.intent}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">
                    {SERVICE_LABELS[lead.serviceCategory]}
                  </span>
                  {isOwner && (
                    <span className="text-[10px] text-zinc-500">{lead.assignedAdvisorName.split(" ")[0]}</span>
                  )}
                </div>
                <p className="text-[10px] text-zinc-600 mt-1">F{lead.fitScore} E{lead.engagementScore}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
