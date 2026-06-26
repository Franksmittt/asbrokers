"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function MessageReply() {
  const [draft, setDraft] = useState("");

  return (
    <div className="sticky bottom-0 border-t border-white/10 bg-void/95 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-3xl gap-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder="Reply via portal…"
          className="min-h-[3rem] flex-1 resize-none rounded-2xl border border-white/10 bg-shark px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-samsung-blue/50 focus:outline-none focus:ring-1 focus:ring-samsung-blue/30"
        />
        <button
          type="button"
          disabled={!draft.trim()}
          className={cn(
            "self-end rounded-2xl bg-samsung-blue px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-apple",
            "hover:shadow-cta-glow-blue disabled:cursor-not-allowed disabled:opacity-40",
            draft.trim() && "hover:bg-samsung-blue/90"
          )}
          onClick={() => setDraft("")}
        >
          Send
        </button>
      </div>
    </div>
  );
}
