"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { fetchRecentAiAuditLog, type CrmAiAuditEntry } from "@/app/actions/crm-ai";

const ACTION_LABELS: Record<string, string> = {
  morning_brief: "Morning brief",
  lead_insight: "Lead insight",
  reply_draft: "Reply draft",
  executive_report: "Executive report",
  kanban_priorities: "Kanban priorities",
  thread_sentiment: "Thread sentiment",
  pre_meeting_brief: "Pre-meeting brief",
  dashboard_chat: "Dashboard chat",
};

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function CrmAiActivityFeed() {
  const [entries, setEntries] = useState<CrmAiAuditEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const result = await fetchRecentAiAuditLog(20);
      if (result.ok) {
        setEntries(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="rounded-lg border border-[#E5E5E5] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-[#1D1D1F]">AI activity log</h2>
          <p className="text-xs text-[#52525b]">POPIA audit trail · Gemini actions</p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={isPending}
          className="text-xs text-[#52525b] hover:text-[#1D1D1F] disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error ? <p className="text-sm text-amber-900">{error}</p> : null}

      {entries.length === 0 && !isPending ? (
        <p className="text-sm text-[#52525b]">No AI actions logged yet.</p>
      ) : (
        <ul className="max-h-72 space-y-2 overflow-y-auto">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-col gap-1 rounded-md border border-[#E5E5E5] bg-[#FAFAF8] px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#006B6B]">
                  {ACTION_LABELS[entry.actionType] ?? entry.actionType}
                </p>
                {entry.summary ? (
                  <p className="truncate text-xs text-[#52525b]">{entry.summary}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3 text-[10px] text-[#52525b]">
                {entry.leadId ? (
                  <Link href={`/crm/leads/${entry.leadId}`} className="hover:text-[#006B6B]">
                    View lead
                  </Link>
                ) : null}
                <span>{formatWhen(entry.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
