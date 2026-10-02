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
    <section className="rounded-lg border border-[#A7F3D0] bg-gradient-to-br from-white to-[#ECFDF5] p-5 ring-1 ring-[#A7F3D0]/60">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#006B6B]">
            Gemini AI · Morning brief
          </p>
          <h2 className="mt-1 text-sm font-medium text-[#1D1D1F]">
            {brief?.headline ?? (isPending ? "Analysing pipeline…" : "Command brief")}
          </h2>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={isPending}
          className="rounded-md border border-[#E5E5E5] px-2.5 py-1 text-[11px] text-[#52525b] transition-colors hover:border-[#006B6B]/35 hover:text-[#1D1D1F] disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <p className="text-sm text-amber-900">{error}</p>
      ) : brief ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-[#3F3F46]">{brief.summary}</p>
          <p className="text-xs text-[#52525b]">{brief.pipelineInsight}</p>

          {brief.topPriorities.length > 0 ? (
            <ul className="space-y-2">
              {brief.topPriorities.map((item, i) => (
                <li
                  key={`${item.leadName}-${i}`}
                  className="flex items-start gap-3 rounded-md border border-[#E5E5E5] bg-[#FAFAF8] px-3 py-2.5"
                >
                  <span
                    className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                      item.urgency === "high"
                        ? "bg-red-100 text-red-800"
                        : item.urgency === "medium"
                          ? "bg-amber-500/20 text-amber-900"
                          : "bg-[#F0F0EE] text-[#52525b]"
                    }`}
                  >
                    {item.urgency}
                  </span>
                  <div className="min-w-0">
                    {item.leadId ? (
                      <Link
                        href={`/crm/leads/${item.leadId}`}
                        className="text-sm font-medium text-[#1D1D1F] hover:text-[#006B6B]"
                      >
                        {item.leadName}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium text-[#1D1D1F]">{item.leadName}</p>
                    )}
                    <p className="mt-0.5 text-xs text-[#52525b]">{item.reason}</p>
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
                  <li key={flag} className="text-xs text-amber-900/90">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : isPending ? (
        <p className="text-sm text-[#52525b]">Generating your pipeline brief…</p>
      ) : null}
    </section>
  );
}
