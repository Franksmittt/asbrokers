"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { refreshKanbanAiPriorities } from "@/app/actions/crm-ai";

type KanbanAiToolbarProps = {
  aiSortEnabled: boolean;
  onToggleAiSort: () => void;
};

export function KanbanAiToolbar({ aiSortEnabled, onToggleAiSort }: KanbanAiToolbarProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    setError(null);
    startTransition(async () => {
      const result = await refreshKanbanAiPriorities();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={refresh}
        disabled={isPending}
        className="rounded-md bg-[#3ecf8e]/15 px-3 py-1.5 text-xs font-semibold text-[#3ecf8e] ring-1 ring-[#3ecf8e]/30 transition-colors hover:bg-[#3ecf8e]/25 disabled:opacity-50"
      >
        {isPending ? "Gemini prioritising…" : "✦ AI prioritise pipeline"}
      </button>
      <button
        type="button"
        onClick={onToggleAiSort}
        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
          aiSortEnabled
            ? "border-[#3ecf8e]/40 bg-[#3ecf8e]/10 text-[#3ecf8e]"
            : "border-[#2a2a2a] text-zinc-400 hover:text-white"
        }`}
      >
        {aiSortEnabled ? "AI sort: ON" : "AI sort: OFF"}
      </button>
      {error ? <p className="text-xs text-amber-300">{error}</p> : null}
    </div>
  );
}
