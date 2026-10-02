"use client";

import Link from "next/link";

import type { CrmClient } from "@/lib/crm/types";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { formatAdvisorLabel, formatPipelineCurrency } from "@/lib/crm/utils";

export function CrmClientsClient({ clients }: { clients: CrmClient[] }) {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1D1D1F]">Clients</h1>
        <p className="mt-2 text-sm text-[#52525b]">Converted relationships</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {clients.length === 0 ? (
          <p className="text-sm text-[#71717a]">No converted clients yet.</p>
        ) : (
          clients.map((client) => (
            <Link
              key={client.id}
              href={`/crm/clients/${client.id}`}
              className="block rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm transition-colors hover:border-[#006B6B]/35"
            >
              <h2 className="text-lg font-semibold text-[#1D1D1F]">{client.name}</h2>
              <p className="mt-1 text-sm text-[#52525b]">
                {SERVICE_LABELS[client.service_category]}
              </p>
              <p className="mt-4 text-2xl font-semibold tabular-nums text-[#006B6B]">
                {formatPipelineCurrency(client.aum)}
              </p>
              <p className="mt-2 text-xs text-[#71717a]">
                Advisor · {formatAdvisorLabel(client.assignedAdvisorId)}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
