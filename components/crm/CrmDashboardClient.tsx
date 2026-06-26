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

function ConversionRing({ percent }: { percent: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#008080"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums tracking-[-0.03em] text-white">
          {percent}%
        </span>
        <span className="text-[10px] uppercase tracking-wider text-gray-400">Win rate</span>
      </div>
    </div>
  );
}

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

/**
 * Samsung One UI: top ~1/3 = viewing (hero metrics), bottom ~2/3 = interaction widgets.
 * Spacing locked to 4px baseline (gap-4, gap-8, p-4, p-6, p-8).
 */
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
  const recentLeads = useMemo(() => visibleLeads.slice(0, 5), [visibleLeads]);
  const conversionRate = useMemo(() => computeConversionRate(visibleLeads), [visibleLeads]);

  const activePipeline =
    stats.byStatus.new +
    stats.byStatus.contacted +
    stats.byStatus.qualified +
    stats.byStatus.proposal;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col">
      {/* ——— VIEWING AREA (One UI top third) ——— */}
      <section className="flex min-h-[32vh] flex-col justify-end gap-8 pb-8">
        <header>
          <p className="trust-hallmark mb-4 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            FSP 17273 · Nightography pipeline
          </p>
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
            CRM Dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-100">
            {role === "admin"
              ? "Owner view — full pipeline visibility across all advisors."
              : "Staff view — your assigned leads, tasks, and correspondence."}
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[2rem] bg-shark p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Total leads
            </p>
            <p className="mt-4 text-5xl font-bold tabular-nums tracking-[-0.03em] text-white sm:text-6xl">
              {stats.totalLeads}
            </p>
          </div>
          <div className="rounded-[2rem] rim-light p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Active pipeline
            </p>
            <p className="mt-4 text-5xl font-bold tabular-nums tracking-[-0.03em] text-cinematic-teal sm:text-6xl">
              {activePipeline}
            </p>
          </div>
          <div className="rounded-[2rem] rim-light p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Open tasks
            </p>
            <p className="mt-4 text-5xl font-bold tabular-nums tracking-[-0.03em] text-white sm:text-6xl">
              {stats.openTasks}
            </p>
          </div>
          <div className="flex items-center justify-between rounded-[2rem] rim-light p-6 sm:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Clients
              </p>
              <p className="mt-4 text-5xl font-bold tabular-nums tracking-[-0.03em] text-white sm:text-6xl">
                {stats.clients}
              </p>
            </div>
            <ConversionRing percent={conversionRate} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {KANBAN_COLUMNS.map((col) => (
            <div
              key={col.status}
              className="rounded-[2rem] bg-shark/90 px-4 py-6 text-center ring-1 ring-white/5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {col.label}
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums tracking-[-0.03em] text-white sm:text-4xl">
                {stats.byStatus[col.status]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— INTERACTION AREA (One UI bottom two-thirds) ——— */}
      <section className="flex flex-1 flex-col gap-8 border-t border-white/10 pt-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <section className="rim-light rounded-[2rem] p-6 lg:col-span-4 lg:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-white">Tasks due today</h2>
              <Link
                href="/crm/tasks"
                className="text-xs font-semibold text-cinematic-teal hover:text-white"
              >
                All →
              </Link>
            </div>
            <ul className="space-y-4">
              {tasksDueToday.length === 0 ? (
                <li className="text-sm text-gray-100">No tasks due today.</li>
              ) : (
                tasksDueToday.map((task) => (
                  <li
                    key={task.id}
                    className="rounded-2xl bg-shark px-4 py-4 text-sm text-gray-100"
                  >
                    {task.title}
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="rim-light rounded-[2rem] p-6 lg:col-span-4 lg:p-8">
            <h2 className="mb-4 text-xl font-bold tracking-[-0.03em] text-white">
              Recent correspondence
            </h2>
            <ul className="space-y-4">
              {recentCorrespondence.map((item) => (
                <li key={item.id} className="rounded-2xl bg-shark p-4">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-white">{item.from}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      {CHANNEL_LABEL[item.channel]}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-100">{item.body}</p>
                  <time className="mt-2 block text-[10px] text-gray-400" dateTime={item.sentAt}>
                    {formatCorrespondenceTime(item.sentAt)}
                  </time>
                </li>
              ))}
            </ul>
          </section>

          <section className="rim-light rounded-[2rem] p-6 lg:col-span-4 lg:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-white">Recent leads</h2>
              <Link
                href="/crm/kanban"
                className="text-xs font-semibold text-cinematic-teal hover:text-white"
              >
                Kanban →
              </Link>
            </div>
            <ul className="divide-y divide-white/5">
              {recentLeads.map((lead) => (
                <li key={lead.id}>
                  <Link
                    href={`/crm/leads/${lead.id}`}
                    className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-white/5"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">{lead.name}</p>
                      <p className="truncate text-xs text-gray-100">
                        {SERVICE_LABELS[lead.service_category]}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-supernova-gold/20 px-2 py-1 text-[10px] font-bold tabular-nums text-supernova-gold">
                      {lead.lead_score}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}
