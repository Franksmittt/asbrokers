"use client";

import { useEffect, useState, useTransition } from "react";

import { fetchLeadAiInsight, fetchLeadReplyDraft } from "@/app/actions/crm-ai";
import type { LeadAiInsight } from "@/lib/crm/ai/schemas";

type LeadAiPanelProps = {
  leadId: string;
  onApplyDraft: (text: string) => void;
};

export function LeadAiPanel({ leadId, onApplyDraft }: LeadAiPanelProps) {
  const [insight, setInsight] = useState<LeadAiInsight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadInsight = () => {
    startTransition(async () => {
      const result = await fetchLeadAiInsight(leadId);
      if (result.ok) {
        setInsight(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    });
  };

  useEffect(() => {
    loadInsight();
  }, [leadId]);

  const draftReply = () => {
    startTransition(async () => {
      const result = await fetchLeadReplyDraft(leadId, "whatsapp");
      if (result.ok) {
        onApplyDraft(result.data.draft);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <section className="rounded-[2rem] border border-cinematic-teal/20 bg-gradient-to-br from-shark to-void/80 p-5 ring-1 ring-cinematic-teal/10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#006B6B]">
            Gemini AI advisor
          </p>
          <p className="mt-1 text-xs text-[#71717a]">Grounded in FSP rules + your lead data</p>
        </div>
        <button
          type="button"
          onClick={loadInsight}
          disabled={isPending}
          className="text-[11px] text-[#71717a] hover:text-[#1D1D1F] disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error ? <p className="mb-3 text-xs text-amber-900">{error}</p> : null}

      {isPending && !insight ? (
        <p className="text-sm text-[#71717a]">Analysing lead…</p>
      ) : insight ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-supernova-gold/20 px-3 py-1 text-xs font-bold tabular-nums text-supernova-gold">
              AI priority {insight.aiPriorityScore}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#52525b]">{insight.executiveSummary}</p>
          <div className="rounded-xl bg-[#F7F6F3]/60 px-3 py-3 ring-1 ring-[#E5E5E5]">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-[#71717a]">
              Next best action
            </p>
            <p className="mt-1 text-sm font-medium text-[#1D1D1F]">{insight.nextBestAction}</p>
          </div>
          <ul className="space-y-1.5">
            {insight.suggestedTalkingPoints.map((point) => (
              <li key={point} className="text-xs text-gray-300 before:mr-2 before:text-[#006B6B] before:content-['•']">
                {point}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-gray-500">{insight.complianceNote}</p>
          <button
            type="button"
            onClick={draftReply}
            disabled={isPending}
            className="w-full rounded-xl bg-cinematic-teal/20 py-2.5 text-sm font-semibold text-[#006B6B] transition-colors hover:bg-cinematic-teal/30 disabled:opacity-50"
          >
            {isPending ? "Drafting…" : "AI draft WhatsApp reply"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
