"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import { fetchCrmMorningBrief } from "@/app/actions/crm-ai";
import type { CrmMorningBrief } from "@/lib/crm/ai/schemas";

export function CrmAiMorningBrief() {
  const [brief, setBrief] = useState<CrmMorningBrief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const result = await fetchCrmMorningBrief();
      if (result.ok) {
        setBrief(result.data);
        setError(null);
      } else {
        setError(result.error);
        setBrief(null);
      }
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="rounded-lg border border-[#3ecf8e]/20 bg-gradient-to-br from-[#0a0a0a] to-[#0f1a14] p-5 ring-1 ring-[#3ecf8e]/10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3ecf8e]">
            Gemini AI · Morning brief
          </p>
          <h2 className="mt-1 text-sm font-medium text-white">
            {brief?.headline ?? (isPending ? "Analysing pipeline…" : "Command brief")}
          </h2>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={isPending}
          className="rounded-md border border-[#2a2a2a] px-2.5 py-1 text-[11px] text-zinc-400 transition-colors hover:border-[#3ecf8e]/40 hover:text-white disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <p className="text-sm text-amber-300">{error}</p>
      ) : brief ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-zinc-300">{brief.summary}</p>
          <p className="text-xs text-zinc-500">{brief.pipelineInsight}</p>

          {brief.topPriorities.length > 0 ? (
            <ul className="space-y-2">
              {brief.topPriorities.map((item, i) => (
                <li
                  key={`${item.leadName}-${i}`}
                  className="flex items-start gap-3 rounded-md border border-[#1f1f1f] bg-[#141414] px-3 py-2.5"
                >
                  <span
                    className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                      item.urgency === "high"
                        ? "bg-red-500/20 text-red-300"
                        : item.urgency === "medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-zinc-500/20 text-zinc-400"
                    }`}
                  >
                    {item.urgency}
                  </span>
                  <div className="min-w-0">
                    {item.leadId ? (
                      <Link
                        href={`/crm/leads/${item.leadId}`}
                        className="text-sm font-medium text-white hover:text-[#3ecf8e]"
                      >
                        {item.leadName}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium text-white">{item.leadName}</p>
                    )}
                    <p className="mt-0.5 text-xs text-zinc-500">{item.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {brief.complianceFlags.length > 0 ? (
            <div className="rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                Compliance flags
              </p>
              <ul className="mt-1 space-y-1">
                {brief.complianceFlags.map((flag) => (
                  <li key={flag} className="text-xs text-amber-200/90">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : isPending ? (
        <p className="text-sm text-zinc-500">Generating your pipeline brief…</p>
      ) : null}
    </section>
  );
}
