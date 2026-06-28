"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCrm } from "@/components/crm/CrmContext";
import {
  KANBAN_COLUMNS,
  SERVICE_LABELS,
  type CrmCorrespondence,
  type CrmTask,
} from "@/lib/crm/types";
import { computeConversionRate, getCrmStatsFromLeads } from "@/lib/crm/utils";

const CHANNEL_LABEL: Record<string, string> = {
  email: "Email",
  whatsapp: "WhatsApp",
  portal: "Portal",
  note: "Note",
};

function formatCorrespondenceTime(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function StatCard({
  label,
  value,
  hint,
  href,
  hintHref,
}: {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  hintHref?: string;
}) {
  const content = (
    <>
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-white">{value}</p>
      {hint &&
        (hintHref ? (
          <Link
            href={hintHref}
            onClick={(e) => e.stopPropagation()}
            className="mt-1 inline-block text-[11px] text-zinc-600 transition-colors hover:text-[#3ecf8e]"
          >
            {hint}
          </Link>
        ) : (
          <p className="mt-1 text-[11px] text-zinc-600">{hint}</p>
        ))}
    </>
  );

  const className =
    "group block rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5 transition-colors hover:border-[#3ecf8e]/40 hover:bg-[#0f0f0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3ecf8e]/60";

  if (href) {
    return (
      <Link href={href} className={className} title={`Open ${label.toLowerCase()}`}>
        {content}
      </Link>
    );
  }

  return <div className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">{content}</div>;
}

function StageCard({ label, count, status }: { label: string; count: number; status: string }) {
  return (
    <Link
      href={`/crm/leads?status=${status}`}
      className="group block rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-4 text-center transition-colors hover:border-[#3ecf8e]/40 hover:bg-[#0f0f0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3ecf8e]/60"
      title={`View ${label} leads`}
    >
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600 group-hover:text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-white">{count}</p>
    </Link>
  );
}

export function CrmDashboardClient({
  openTasks,
  clientCount,
  tasksDueToday,
  recentCorrespondence,
}: {
  openTasks: number;
  clientCount: number;
  tasksDueToday: CrmTask[];
  recentCorrespondence: CrmCorrespondence[];
}) {
  const { role, visibleLeads } = useCrm();

  const stats = useMemo(
    () => getCrmStatsFromLeads(visibleLeads, openTasks, clientCount),
    [visibleLeads, openTasks, clientCount]
  );
  const recentLeads = useMemo(() => visibleLeads.slice(0, 6), [visibleLeads]);
  const conversionRate = useMemo(() => computeConversionRate(visibleLeads), [visibleLeads]);

  const activePipeline =
    stats.byStatus.new +
    stats.byStatus.contacted +
    stats.byStatus.qualified +
    stats.byStatus.proposal;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">FSP 17273</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {role === "admin"
              ? "Full pipeline visibility across all advisors."
              : "Your assigned leads, tasks, and messages."}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/crm/whatsapp"
            className="rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-[#3a3a3a] hover:text-white"
          >
            WhatsApp inbox
          </Link>
          <Link
            href="/crm/kanban"
            className="rounded-md bg-[#3ecf8e] px-3 py-1.5 text-xs font-medium text-black transition-opacity hover:opacity-90"
          >
            Open Kanban
          </Link>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total leads" value={stats.totalLeads} href="/crm/leads" />
        <StatCard label="Active pipeline" value={activePipeline} href="/crm/kanban" />
        <StatCard label="Open tasks" value={stats.openTasks} href="/crm/tasks" />
        <StatCard
          label="Win rate"
          value={`${conversionRate}%`}
          hint={`${stats.clients} client${stats.clients === 1 ? "" : "s"}`}
          href="/crm/leads?status=won"
          hintHref="/crm/clients"
        />
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {KANBAN_COLUMNS.map((col) => (
          <StageCard
            key={col.status}
            label={col.label}
            count={stats.byStatus[col.status]}
            status={col.status}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Tasks due today</h2>
            <Link href="/crm/tasks" className="text-xs text-zinc-500 hover:text-zinc-300">
              View all
            </Link>
          </div>
          <ul className="space-y-2">
            {tasksDueToday.length === 0 ? (
              <li className="text-sm text-zinc-500">Nothing due today.</li>
            ) : (
              tasksDueToday.map((task) => (
                <li
                  key={task.id}
                  className="rounded-md border border-[#1f1f1f] bg-[#141414] px-3 py-2.5 text-sm text-zinc-300"
                >
                  {task.title}
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Recent messages</h2>
            <Link href="/crm/whatsapp" className="text-xs text-zinc-500 hover:text-zinc-300">
              WhatsApp
            </Link>
          </div>
          <ul className="space-y-3">
            {recentCorrespondence.length === 0 ? (
              <li className="text-sm text-zinc-500">No recent correspondence.</li>
            ) : (
              recentCorrespondence.map((item) => (
                <li key={item.id} className="border-b border-[#1a1a1a] pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-zinc-200">{item.from}</span>
                    <span className="shrink-0 text-[10px] uppercase text-zinc-600">
                      {CHANNEL_LABEL[item.channel]}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{item.body}</p>
                  <time className="mt-1 block text-[10px] text-zinc-600" dateTime={item.sentAt}>
                    {formatCorrespondenceTime(item.sentAt)}
                  </time>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Recent leads</h2>
            <Link href="/crm/leads" className="text-xs text-zinc-500 hover:text-zinc-300">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-[#1a1a1a]">
            {recentLeads.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/crm/leads/${lead.id}`}
                  className="flex items-center justify-between gap-3 py-3 transition-colors hover:opacity-80"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-200">{lead.name}</p>
                    <p className="truncate text-xs text-zinc-600">
                      {SERVICE_LABELS[lead.service_category]}
                    </p>
                  </div>
                  <span className="shrink-0 rounded border border-[#2a2a2a] px-1.5 py-0.5 text-[10px] tabular-nums text-zinc-400">
                    {lead.lead_score}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
