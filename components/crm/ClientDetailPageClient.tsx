"use client";

import { notFound } from "next/navigation";

import { ClientDetailView } from "@/components/crm/ClientDetailView";
import type { CrmClient } from "@/lib/crm/types";

export function ClientDetailPageClient({ client }: { client: CrmClient | null }) {
  if (!client) notFound();
  return <ClientDetailView client={client} />;
}
