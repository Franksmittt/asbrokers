"use client";

import Link from "next/link";

import type { CrmClient } from "@/lib/crm/types";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { formatAdvisorLabel, formatPipelineCurrency } from "@/lib/crm/utils";

export function CrmClientsClient({ clients }: { clients: CrmClient[] }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Clients</h1>
        <p className="mt-2 text-sm text-gray-100">Converted relationships — pipeline won</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {clients.length === 0 ? (
          <p className="text-sm text-gray-400">No converted clients yet.</p>
        ) : (
          clients.map((client) => (
            <Link
              key={client.id}
              href={`/crm/clients/${client.id}`}
              className="block rounded-[2rem] bg-shark p-6 transition-colors hover:ring-1 hover:ring-cinematic-teal/30"
            >
              <h2 className="text-lg font-semibold text-white">{client.name}</h2>
              <p className="mt-1 text-sm text-gray-100">
                {SERVICE_LABELS[client.service_category]}
              </p>
              <p className="mt-4 text-2xl font-bold tabular-nums text-cinematic-teal">
                {formatPipelineCurrency(client.aum)}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Advisor · {formatAdvisorLabel(client.assignedAdvisorId)}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
