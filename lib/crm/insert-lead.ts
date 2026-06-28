import "server-only";

import { crmLeads, getDb } from "@/lib/db";
import type { ServiceCategory } from "@/lib/crm/types";

export type InsertCrmLeadInput = {
  sourceFunnel: string;
  serviceCategory?: ServiceCategory | string;
  leadScore?: number;
  pipelineStatus?: string;
  rawPayload: Record<string, unknown>;
};

/** Non-blocking CRM pipeline insert; returns lead id or null when DB unavailable. */
export async function insertCrmLead(input: InsertCrmLeadInput): Promise<string | null> {
  const db = getDb();
  if (!db) return null;

  try {
    const [row] = await db
      .insert(crmLeads)
      .values({
        sourceFunnel: input.sourceFunnel,
        serviceCategory: input.serviceCategory ?? "retirement_everest",
        leadScore: input.leadScore ?? 0,
        pipelineStatus: input.pipelineStatus ?? "new",
        rawPayload: input.rawPayload,
      })
      .returning({ id: crmLeads.id });

    return row?.id ?? null;
  } catch (error) {
    console.error("[CRM] insertCrmLead failed:", error);
    return null;
  }
}
