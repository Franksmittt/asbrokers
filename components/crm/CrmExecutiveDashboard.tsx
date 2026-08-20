"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";

import { fetchExecutiveAiReport } from "@/app/actions/crm-ai";
import { CrmAiActivityFeed } from "@/components/crm/CrmAiActivityFeed";
import { CrmCampaignBanner } from "@/components/crm/CrmCampaignBanner";
import { useCrm } from "@/components/crm/CrmContext";
import type { ExecutiveAiReport } from "@/lib/crm/ai/schemas";
import { ALBERT_KRUGERSDORP_BIZ_CAMPAIGN, scoreCampaignProgress } from "@/lib/crm/goals";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { computeConversionRate, getCrmStatsFromLeads } from "@/lib/crm/utils";

export function CrmExecutiveDashboard() {
  const { visibleLeads, canUseAi } = useCrm();
  const [report, setReport] = useState<ExecutiveAiReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const stats = useMemo(() => {
    const clients = visibleLeads.filter((l) => l.status === "won").length;
    return getCrmStatsFromLeads(visibleLeads, 0, clients);
  }, [visibleLeads]);

  const conversionRate = useMemo(() => computeConversionRate(visibleLeads), [visibleLeads]);

  const campaignProgress = useMemo(
    () => scoreCampaignProgress(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN, visibleLeads),
    [visibleLeads]
  );

  const serviceMix = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const lead of visibleLeads) {
      const label = SERVICE_LABELS[lead.service_category];
      counts[label] = (counts[label] ?? 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [visibleLeads]);

  const loadReport = () => {
    startTransition(async () => {
      const result = await fetchExecutiveAiReport();
      if (result.ok) {
        setReport(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    });
  };

  useEffect(() => {
    if (canUseAi) loadReport();
  }, [canUseAi]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">Owner command centre</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">Executive dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          AI-powered pipeline intelligence for Albert · FSP 17273
        </p>
      </header>

      <CrmCampaignBanner progress={campaignProgress} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total leads", value: stats.totalLeads },
          { label: "Win rate", value: `${conversionRate}%` },
          { label: "Clients", value: stats.clients },
          {
            label: "Active pipeline",
            value:
              stats.byStatus.new +
              stats.byStatus.contacted +
              stats.byStatus.qualified +
              stats.byStatus.proposal,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5"
          >
            <p className="text-xs text-zinc-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
          <h2 className="text-sm font-medium text-white">Service mix</h2>
          <ul className="mt-4 space-y-2">
            {serviceMix.map(([label, count]) => (
              <li key={label} className="flex justify-between text-sm">
                <span className="text-zinc-400">{label}</span>
                <span className="tabular-nums text-white">{count}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
          <h2 className="text-sm font-medium text-white">Pipeline stages</h2>
          <ul className="mt-4 space-y-2">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <li key={status} className="flex justify-between text-sm">
                <Link href={`/crm/leads?status=${status}`} className="capitalize text-zinc-400 hover:text-[#3ecf8e]">
                  {status}
                </Link>
                <span className="tabular-nums text-white">{count}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {canUseAi ? (
      <section className="rounded-lg border border-[#3ecf8e]/20 bg-gradient-to-br from-[#0a0a0a] to-[#0f1a14] p-6 ring-1 ring-[#3ecf8e]/10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3ecf8e]">
              Gemini AI executive report
            </p>
            <h2 className="mt-1 text-lg font-medium text-white">
              {report?.headline ?? "Generating owner briefing…"}
            </h2>
          </div>
          <button
            type="button"
            onClick={loadReport}
            disabled={isPending}
            className="rounded-md border border-[#2a2a2a] px-3 py-1.5 text-xs text-zinc-400 hover:text-white disabled:opacity-50"
          >
            Refresh AI
          </button>
        </div>

        {error ? <p className="text-sm text-amber-300">{error}</p> : null}

        {report ? (
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-zinc-300">{report.narrative}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase text-[#3ecf8e]">Strengths</p>
                <ul className="mt-2 space-y-1">
                  {report.strengths.map((s) => (
                    <li key={s} className="text-xs text-zinc-400">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-amber-400">Risks</p>
                <ul className="mt-2 space-y-1">
                  {report.risks.map((r) => (
                    <li key={r} className="text-xs text-zinc-400">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-zinc-500">This week focus</p>
              <ul className="mt-2 space-y-1">
                {report.weekFocus.map((w) => (
                  <li key={w} className="text-sm text-white">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-zinc-500">{report.forecastNote}</p>
          </div>
        ) : isPending ? (
          <p className="text-sm text-zinc-500">Analysing business metrics…</p>
        ) : null}
      </section>
      ) : null}

      <CrmAiActivityFeed />
    </div>
  );
}
