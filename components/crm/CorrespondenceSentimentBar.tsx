"use client";

import { useEffect, useState, useTransition } from "react";

import { fetchThreadSentiment } from "@/app/actions/crm-ai";
import type { ThreadSentiment } from "@/lib/crm/ai/schemas";

const SENTIMENT_STYLE: Record<
  ThreadSentiment["overall"],
  { label: string; className: string }
> = {
  positive: { label: "Positive", className: "bg-[#E8F3F3] text-[#006B6B]" },
  neutral: { label: "Neutral", className: "bg-[#F0F0EE] text-[#3F3F46]" },
  concerned: { label: "Concerned", className: "bg-amber-500/15 text-amber-900" },
  urgent: { label: "Urgent", className: "bg-red-50 text-red-800" },
};

export function CorrespondenceSentimentBar({ leadId }: { leadId: string }) {
  const [sentiment, setSentiment] = useState<ThreadSentiment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const result = await fetchThreadSentiment(leadId);
      if (result.ok) {
        setSentiment(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    });
  };

  useEffect(() => {
    load();
  }, [leadId]);

  if (error && !sentiment) {
    return <p className="text-[11px] text-[#52525b]">Sentiment: {error}</p>;
  }

  if (!sentiment) {
    return <p className="text-[11px] text-[#52525b]">{isPending ? "Analysing tone…" : null}</p>;
  }

  const style = SENTIMENT_STYLE[sentiment.overall];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${style.className}`}>
        {style.label}
      </span>
      <span className="text-[11px] text-[#52525b]">{sentiment.summary}</span>
      <button
        type="button"
        onClick={load}
        disabled={isPending}
        className="text-[10px] text-[#71717a] hover:text-[#52525b] disabled:opacity-50"
      >
        Refresh
      </button>
    </div>
  );
}
