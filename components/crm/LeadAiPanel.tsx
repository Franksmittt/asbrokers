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
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cinematic-teal">
            Gemini AI advisor
          </p>
          <p className="mt-1 text-xs text-gray-400">Grounded in FSP rules + your lead data</p>
        </div>
        <button
          type="button"
          onClick={loadInsight}
          disabled={isPending}
          className="text-[11px] text-gray-400 hover:text-white disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error ? <p className="mb-3 text-xs text-amber-300">{error}</p> : null}

      {isPending && !insight ? (
        <p className="text-sm text-gray-400">Analysing lead…</p>
      ) : insight ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-supernova-gold/20 px-3 py-1 text-xs font-bold tabular-nums text-supernova-gold">
              AI priority {insight.aiPriorityScore}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-100">{insight.executiveSummary}</p>
          <div className="rounded-xl bg-void/60 px-3 py-3 ring-1 ring-white/5">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
              Next best action
            </p>
            <p className="mt-1 text-sm font-medium text-white">{insight.nextBestAction}</p>
          </div>
          <ul className="space-y-1.5">
            {insight.suggestedTalkingPoints.map((point) => (
              <li key={point} className="text-xs text-gray-300 before:mr-2 before:text-cinematic-teal before:content-['•']">
                {point}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-gray-500">{insight.complianceNote}</p>
          <button
            type="button"
            onClick={draftReply}
            disabled={isPending}
            className="w-full rounded-xl bg-cinematic-teal/20 py-2.5 text-sm font-semibold text-cinematic-teal transition-colors hover:bg-cinematic-teal/30 disabled:opacity-50"
          >
            {isPending ? "Drafting…" : "AI draft WhatsApp reply"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
