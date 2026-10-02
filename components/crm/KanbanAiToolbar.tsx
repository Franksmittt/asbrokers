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
        className="rounded-md bg-[#E8F3F3] px-3 py-1.5 text-xs font-semibold text-[#006B6B] ring-1 ring-[#3ecf8e]/30 transition-colors hover:bg-[#006B6B]/25 disabled:opacity-50"
      >
        {isPending ? "Gemini prioritising…" : "✦ AI prioritise pipeline"}
      </button>
      <button
        type="button"
        onClick={onToggleAiSort}
        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
          aiSortEnabled
            ? "border-[#006B6B]/35 bg-[#E8F3F3] text-[#006B6B]"
            : "border-[#E5E5E5] text-[#52525b] hover:text-[#1D1D1F]"
        }`}
      >
        {aiSortEnabled ? "AI sort: ON" : "AI sort: OFF"}
      </button>
      {error ? <p className="text-xs text-amber-900">{error}</p> : null}
    </div>
  );
}
