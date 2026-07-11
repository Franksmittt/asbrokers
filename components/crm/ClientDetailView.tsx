"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft } from "@/components/icons";
import { useCrm } from "@/components/crm/CrmContext";
import type { CrmClient } from "@/lib/crm/types";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { formatAdvisorLabel, formatPipelineCurrency } from "@/lib/crm/utils";
import { getChartData, holdings } from "@/lib/mock-portal";

const PortalDashboardCharts = dynamic(
  () =>
    import("@/components/portal/PortalDashboardCharts").then((m) => m.PortalDashboardCharts),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 w-full animate-pulse rounded-[2rem] bg-shark/50 sm:h-80" />
    ),
  }
);

/** client-001 maps to Margaret van der Berg portal mock; others use same chart for demo. */
function getClientChartData(clientId: string) {
  if (clientId === "client-001") return getChartData();
  return getChartData();
}

function getClientHoldings(clientId: string) {
  if (clientId === "client-001") return holdings;
  return holdings.slice(0, 2);
}

export function ClientDetailView({ client }: { client: CrmClient }) {
  const { role, staffId } = useCrm();
  const chartData = useMemo(() => getClientChartData(client.id), [client.id]);
  const clientHoldings = useMemo(() => getClientHoldings(client.id), [client.id]);

  const canView =
    role === "admin" || client.assignedAdvisorId === staffId;

  if (!canView) {
    return (
      <div className="rounded-[2rem] rim-light p-8 text-center">
        <p className="text-lg font-semibold text-white">Client not in your view</p>
        <p className="mt-2 text-sm text-gray-100">
          Switch to Admin in the sidebar role switcher to view this relationship.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href="/crm/clients"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-100 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to clients
      </Link>

      <div className="grid min-h-[calc(100vh-10rem)] grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left Bento, client profile + holdings */}
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-[2rem] bg-shark p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Client</p>
            <h1 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-white">{client.name}</h1>
            <p className="mt-2 text-sm text-cinematic-teal">{SERVICE_LABELS[client.service_category]}</p>
            <p className="mt-4 text-3xl font-bold tabular-nums tracking-[-0.03em] text-white">
              {formatPipelineCurrency(client.aum)}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-400">Assets under advice</p>
          </section>

          <section className="rim-light rounded-[2rem] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Contact</p>
            <p className="mt-2 text-sm text-gray-100">{client.email}</p>
            <p className="text-sm text-gray-100">{client.phone}</p>
            <p className="mt-4 text-xs text-gray-400">
              Advisor · <span className="text-gray-100">{formatAdvisorLabel(client.assignedAdvisorId)}</span>
            </p>
          </section>

          <section className="rim-light rounded-[2rem] p-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Holdings snapshot
            </p>
            <ul className="space-y-3">
              {clientHoldings.map((h) => (
                <li
                  key={h.id}
                  className="flex items-center justify-between gap-4 rounded-xl bg-shark px-3 py-3"
                >
                  <p className="text-xs text-gray-100">{h.name}</p>
                  <p className="shrink-0 text-xs font-bold tabular-nums text-[#008080]">
                    {formatPipelineCurrency(h.value)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right, portal-aligned wealth charts */}
        <section className="rim-light rounded-[2rem] p-6 lg:col-span-3 lg:p-8">
          <header className="mb-6">
            <h2 className="text-xl font-bold tracking-[-0.03em] text-white">Wealth snapshot</h2>
            <p className="mt-1 text-xs text-gray-400">
              Same income & drawdown view as the client portal, cumulative performance
            </p>
          </header>
          <div className="mb-4 flex gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cinematic-teal" />
              Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-samsung-blue" />
              Drawdown
            </span>
          </div>
          <PortalDashboardCharts data={chartData} />
        </section>
      </div>
    </div>
  );
}
