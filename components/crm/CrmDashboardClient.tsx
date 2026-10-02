"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useCrm } from "@/components/crm/CrmContext";
import { SERVICE_LABELS } from "@/lib/crm/types";

const MODULES = [
  {
    href: "/studio/blog/workspace",
    label: "Insights",
    description: "Write and publish articles for the Insights pages.",
    cta: "Open Insights",
  },
  {
    href: "/studio/courses",
    label: "Courses",
    description: "Build Clarity Track courses and see who signed up.",
    cta: "Open Courses",
  },
  {
    href: "/studio/newsletter",
    label: "Newsletter",
    description: "Create weekly editions and manage subscribers.",
    cta: "Open Newsletter",
  },
] as const;

function statusLabel(status: string) {
  return status.replace(/_/g, " ");
}

export function CrmDashboardClient() {
  const { role, visibleLeads } = useCrm();

  const newLeads = useMemo(
    () => visibleLeads.filter((lead) => lead.status === "new").slice(0, 8),
    [visibleLeads]
  );
  const recentLeads = useMemo(() => visibleLeads.slice(0, 8), [visibleLeads]);
  const leadsToShow = newLeads.length > 0 ? newLeads : recentLeads;
  const showingNew = newLeads.length > 0;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
          AS Brokers · FSP 17273
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl">
          Home
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#52525b]">
          {role === "admin"
            ? "Create content, then handle enquiries. Insights, Courses, and Newsletter first — leads stay visible below."
            : "Your day: publish Insights, Courses, or Newsletter, then follow up on leads."}
        </p>
      </header>

      <section aria-label="Create">
        <h2 className="text-sm font-semibold text-[#1D1D1F]">What do you want to work on?</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {MODULES.map((mod) => (
            <li key={mod.href}>
              <Link
                href={mod.href}
                className="flex h-full flex-col rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm transition-colors hover:border-[#006B6B]/40 hover:bg-[#FAFFFE]"
              >
                <p className="text-lg font-semibold tracking-tight text-[#1D1D1F]">{mod.label}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#52525b]">
                  {mod.description}
                </p>
                <p className="mt-4 text-sm font-medium text-[#0057B8]">{mod.cta} →</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Leads" className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#1D1D1F]">
              {showingNew ? "New leads" : "Recent leads"}
            </h2>
            <p className="mt-1 text-sm text-[#71717a]">
              {showingNew
                ? "People who just enquired — pick one up."
                : "No brand-new leads right now. Here are the latest."}
            </p>
          </div>
          <Link
            href="/crm/leads"
            className="rounded-xl bg-[#006B6B] px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            All leads
          </Link>
        </div>

        {leadsToShow.length === 0 ? (
          <p className="mt-6 text-sm text-[#71717a]">No leads yet.</p>
        ) : (
          <ul className="mt-5 divide-y divide-[#EFEFEA]">
            {leadsToShow.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/crm/leads/${lead.id}`}
                  className="flex items-center justify-between gap-3 py-3.5 transition-colors hover:bg-[#FAFAF8]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#1D1D1F]">{lead.name}</p>
                    <p className="truncate text-xs text-[#71717a]">
                      {SERVICE_LABELS[lead.service_category] ?? lead.intent ?? lead.email}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg border border-[#E5E5E5] bg-[#FAFAF8] px-2 py-0.5 text-[11px] capitalize text-[#52525b]">
                    {statusLabel(lead.status)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-center text-xs text-[#A1A1AA]">
        Need WhatsApp?{" "}
        <Link href="/crm/whatsapp" className="font-medium text-[#0057B8] hover:underline">
          Open inbox
        </Link>
      </p>
    </div>
  );
}
