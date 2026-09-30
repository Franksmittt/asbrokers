import "server-only";

import { desc, eq } from "drizzle-orm";

import { mapDbLeadToCrmLead } from "@/lib/crm/map-lead";
import type { CrmLead } from "@/lib/crm/types";
import { crmLeads, getDb } from "@/lib/db";

/** List CRM leads for a single source funnel, newest first. */
export async function listLeadsBySourceFunnel(sourceFunnel: string): Promise<CrmLead[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const rows = await db
      .select()
      .from(crmLeads)
      .where(eq(crmLeads.sourceFunnel, sourceFunnel))
      .orderBy(desc(crmLeads.createdAt));
    return rows.map(mapDbLeadToCrmLead);
  } catch (error) {
    console.error(`[CRM] listLeadsBySourceFunnel(${sourceFunnel}) failed:`, error);
    return [];
  }
}
