"use client";

import { useEffect, useState, useTransition } from "react";

import { fetchThreadSentiment } from "@/app/actions/crm-ai";
import type { ThreadSentiment } from "@/lib/crm/ai/schemas";

const SENTIMENT_STYLE: Record<
  ThreadSentiment["overall"],
  { label: string; className: string }
> = {
  positive: { label: "Positive", className: "bg-[#3ecf8e]/15 text-[#3ecf8e]" },
  neutral: { label: "Neutral", className: "bg-zinc-500/15 text-zinc-300" },
  concerned: { label: "Concerned", className: "bg-amber-500/15 text-amber-300" },
  urgent: { label: "Urgent", className: "bg-red-500/15 text-red-300" },
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
    return <p className="text-[11px] text-zinc-500">Sentiment: {error}</p>;
  }

  if (!sentiment) {
    return <p className="text-[11px] text-zinc-500">{isPending ? "Analysing tone…" : null}</p>;
  }

  const style = SENTIMENT_STYLE[sentiment.overall];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${style.className}`}>
        {style.label}
      </span>
      <span className="text-[11px] text-zinc-400">{sentiment.summary}</span>
      <button
        type="button"
        onClick={load}
        disabled={isPending}
        className="text-[10px] text-zinc-600 hover:text-zinc-400 disabled:opacity-50"
      >
        Refresh
      </button>
    </div>
  );
}
