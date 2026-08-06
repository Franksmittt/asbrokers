"use client";

import Link from "next/link";

import { ClientDetailView } from "@/components/crm/ClientDetailView";
import type { CrmClient } from "@/lib/crm/types";

export function ClientDetailPageClient({ client }: { client: CrmClient | null }) {
  if (!client) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
        <h1 className="text-xl font-semibold text-white">Client not found</h1>
        <p className="mt-2 text-sm text-white/65">
          This client may have been removed, or you do not have access to it.
        </p>
        <Link
          href="/crm/clients"
          className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
        >
          Browse clients
        </Link>
      </div>
    );
  }
  return <ClientDetailView client={client} />;
}
