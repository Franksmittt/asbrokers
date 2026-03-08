"use client";

import { useState } from "react";
import { generateMeetingBrief } from "@/app/crm/actions";

export function MeetingBriefButton({
  type,
  entityId,
  label = "Generate meeting brief",
}: {
  type: "lead" | "client";
  entityId: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ markdown?: string; error?: string } | null>(null);

  const run = async () => {
    setLoading(true);
    setResult(null);
    setOpen(true);
    const res = await generateMeetingBrief(type, entityId);
    setLoading(false);
    if (res.ok) setResult({ markdown: res.markdown });
    else setResult({ error: res.error });
  };

  return (
    <>
      <button
        type="button"
        onClick={run}
        disabled={loading}
        className="px-3 py-1.5 rounded-xl bg-cinematic-teal/20 text-cinematic-teal text-sm font-medium hover:bg-cinematic-teal/30 disabled:opacity-60"
      >
        {loading ? "Generating…" : label}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            className="rounded-2xl bg-vault-card border border-white/10 max-w-lg w-full max-h-[80vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-semibold text-white">Meeting brief</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] text-sm text-zinc-300">
              {loading && <p>Generating brief…</p>}
              {result?.error && <p className="text-red-400">{result.error}</p>}
              {result?.markdown && (
                <pre className="whitespace-pre-wrap font-sans text-zinc-300">{result.markdown}</pre>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
