"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  captureCampaignLead,
  logCampaignWeekActivity,
  type GoalMutationResult,
} from "@/app/actions/crm-goals";
import { KRUGERSDORP_AREA_OPTIONS } from "@/lib/crm/area";
import { mondayOfWeek, type CampaignProgress, type CampaignWeeklyLog } from "@/lib/crm/goals";
import type { CrmLead } from "@/lib/crm/types";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { formatLeadStatus } from "@/lib/crm/utils";
import { cn } from "@/lib/utils";

const PACE_CLASS: Record<CampaignProgress["pace"], string> = {
  ahead: "text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/30",
  on_track: "text-[#3ecf8e] bg-[#3ecf8e]/10 border-[#3ecf8e]/30",
  behind: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  at_risk: "text-red-300 bg-red-500/15 border-red-500/30",
};

const FUNNEL_ROWS: Array<{
  key: keyof CampaignProgress["funnel"]["targets"];
  label: string;
}> = [
  { key: "outreach", label: "Warm outreach" },
  { key: "conversations", label: "Conversations" },
  { key: "needsAnalyses", label: "Needs analyses" },
  { key: "quotes", label: "Quotes issued" },
  { key: "binds", label: "Bound clients" },
];

function initialMutation(): GoalMutationResult | null {
  return null;
}

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        min={type === "number" ? 0 : undefined}
        className="mt-1 w-full rounded-md border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#3ecf8e]/50 focus:outline-none"
      />
    </label>
  );
}

export function CrmGoalsClient({
  progress,
  matchingLeads,
  weeklyLogs,
}: {
  progress: CampaignProgress;
  matchingLeads: CrmLead[];
  weeklyLogs: CampaignWeeklyLog[];
}) {
  const { campaign } = progress;
  const [weekState, weekAction, weekPending] = useActionState(
    async (_prev: GoalMutationResult | null, formData: FormData) => logCampaignWeekActivity(formData),
    initialMutation()
  );
  const [captureState, captureAction, capturePending] = useActionState(
    async (_prev: GoalMutationResult | null, formData: FormData) => captureCampaignLead(formData),
    initialMutation()
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
            Owner goal · FSP 17273
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">{campaign.title}</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {campaign.ownerName} · {campaign.areaLabel} · {campaign.startDate} → {campaign.endDate}
          </p>
        </div>
        <span
          className={cn(
            "w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
            PACE_CLASS[progress.pace]
          )}
        >
          {progress.paceLabel}
        </span>
      </header>

      <section className="rounded-lg border border-[#3ecf8e]/20 bg-gradient-to-br from-[#0a0a0a] to-[#0f1a14] p-6 ring-1 ring-[#3ecf8e]/10">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs text-zinc-500">Bound clients</p>
            <p className="mt-1 text-4xl font-semibold tabular-nums text-white">
              {progress.won}
              <span className="text-xl text-zinc-500">/{campaign.targetClients}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Days remaining</p>
            <p className="mt-1 text-4xl font-semibold tabular-nums text-white">{progress.daysRemaining}</p>
            <p className="mt-1 text-xs text-zinc-500">
              Week {progress.weekNumber} of {progress.totalWeeks}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Pace check</p>
            <p className="mt-1 text-4xl font-semibold tabular-nums text-white">{progress.expectedWonByNow}</p>
            <p className="mt-1 text-xs text-zinc-500">expected won by today</p>
          </div>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#1a1a1a]">
          <div className="h-full rounded-full bg-[#3ecf8e]" style={{ width: `${progress.percentComplete}%` }} />
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Active campaign pipeline: {progress.activePipeline}. Keep 8+ cards in Qualified or Proposal.
        </p>
      </section>

      <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <h2 className="text-sm font-medium text-white">Reverse funnel</h2>
        <p className="mt-1 text-xs text-zinc-500">
          10 binds needs about 25 quotes, 36 needs analyses, 80 conversations, and 229 warm touches.
        </p>
        <ul className="mt-4 space-y-3">
          {FUNNEL_ROWS.map((row) => {
            const actual = progress.funnel.actuals[row.key];
            const target = progress.funnel.targets[row.key];
            const pct = Math.min(100, Math.round((actual / Math.max(1, target)) * 100));
            return (
              <li key={row.key}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{row.label}</span>
                  <span className="tabular-nums text-white">
                    {actual}/{target}
                  </span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#1a1a1a]">
                  <div className="h-full rounded-full bg-[#3ecf8e]/80" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
          <h2 className="text-sm font-medium text-white">This week’s activity</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Targets: {campaign.weeklyTargets.outreach} outreach · {campaign.weeklyTargets.conversations}{" "}
            conversations · {campaign.weeklyTargets.needsAnalyses} needs analyses · {campaign.weeklyTargets.quotes}{" "}
            quotes · {campaign.weeklyTargets.binds} bind
          </p>
          <form action={weekAction} className="mt-4 grid grid-cols-2 gap-3">
            <input
              type="hidden"
              name="weekStart"
              value={progress.thisWeek.logged?.weekStart ?? mondayOfWeek(progress.now)}
            />
            <Field
              name="outreach"
              label="Outreach"
              type="number"
              defaultValue={progress.thisWeek.logged?.outreach ?? 0}
              required
            />
            <Field
              name="conversations"
              label="Conversations"
              type="number"
              defaultValue={progress.thisWeek.logged?.conversations ?? 0}
              required
            />
            <Field
              name="needsAnalyses"
              label="Needs analyses"
              type="number"
              defaultValue={progress.thisWeek.logged?.needsAnalyses ?? 0}
              required
            />
            <Field
              name="quotes"
              label="Quotes"
              type="number"
              defaultValue={progress.thisWeek.logged?.quotes ?? 0}
              required
            />
            <label className="col-span-2 block">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Notes</span>
              <textarea
                name="notes"
                rows={2}
                defaultValue={progress.thisWeek.logged?.notes ?? ""}
                className="mt-1 w-full rounded-md border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-sm text-white focus:border-[#3ecf8e]/50 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={weekPending}
              className="col-span-2 rounded-md bg-[#3ecf8e] px-3 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              {weekPending ? "Saving…" : "Save this week"}
            </button>
            {weekState && !weekState.ok ? (
              <p className="col-span-2 text-xs text-amber-300">{weekState.error}</p>
            ) : null}
            {weekState?.ok ? (
              <p className="col-span-2 text-xs text-[#3ecf8e]">Week logged.</p>
            ) : null}
          </form>
          {weeklyLogs.length > 0 ? (
            <ul className="mt-4 space-y-1 border-t border-[#1f1f1f] pt-3 text-xs text-zinc-500">
              {weeklyLogs.slice(-4).map((log) => (
                <li key={log.weekStart} className="tabular-nums">
                  Week of {log.weekStart}: {log.outreach} outreach · {log.conversations} conversations
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
          <h2 className="text-sm font-medium text-white">Capture a Krugersdorp business</h2>
          <p className="mt-1 text-xs text-zinc-500">
            After every warm conversation, the contact lands here with area tagged so it counts.
          </p>
          <form action={captureAction} className="mt-4 space-y-3">
            <Field name="fullName" label="Contact name" required />
            <Field name="phone" label="Phone" required />
            <Field name="company" label="Business name" required />
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Area</span>
              <select
                name="area"
                defaultValue="Krugersdorp"
                className="mt-1 w-full rounded-md border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-sm text-white focus:border-[#3ecf8e]/50 focus:outline-none"
              >
                {KRUGERSDORP_AREA_OPTIONS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>
            <Field name="notes" label="Note (optional)" />
            <button
              type="submit"
              disabled={capturePending}
              className="w-full rounded-md bg-[#3ecf8e] px-3 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              {capturePending ? "Saving…" : "Add to pipeline"}
            </button>
            {captureState && !captureState.ok ? (
              <p className="text-xs text-amber-300">{captureState.error}</p>
            ) : null}
            {captureState?.ok ? <p className="text-xs text-[#3ecf8e]">Lead added to Kanban.</p> : null}
          </form>
        </section>
      </div>

      <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <h2 className="text-sm font-medium text-white">How the 10 will be won</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {campaign.sourceMix.map((source) => (
            <li key={source.id} className="rounded-md border border-[#1f1f1f] bg-[#141414] p-4">
              <p className="text-xs font-semibold text-white">
                {source.targetClients} clients · {source.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{source.how}</p>
            </li>
          ))}
        </ul>
        <ol className="mt-5 list-decimal space-y-2 pl-4 text-sm text-zinc-300">
          {campaign.playbook.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">{campaign.complianceNote}</p>
      </section>

      <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">Campaign pipeline</h2>
          <Link href="/crm/kanban" className="text-xs text-zinc-500 hover:text-zinc-300">
            Open Kanban
          </Link>
        </div>
        {matchingLeads.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No Krugersdorp commercial leads in the window yet. Capture one above or tag area on an existing lead.
          </p>
        ) : (
          <ul className="divide-y divide-[#1a1a1a]">
            {matchingLeads.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/crm/leads/${lead.id}`}
                  className="flex items-center justify-between gap-3 py-3 hover:opacity-80"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{lead.name}</p>
                    <p className="truncate text-xs text-zinc-500">
                      {lead.company ?? SERVICE_LABELS[lead.service_category]}
                      {lead.area ? ` · ${lead.area}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-zinc-400">{formatLeadStatus(lead.status)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
