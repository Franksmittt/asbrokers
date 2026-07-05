import "server-only";

import { eq } from "drizzle-orm";

import { resolveAdvisorRoute } from "@/lib/crm/advisor-routing";
import type { ServiceCategory } from "@/lib/crm/types";
import { crmLeads, getDb } from "@/lib/db";

/** Safely merge keys into crm_leads.raw_payload without touching other columns. */
export async function mergeLeadRawPayload(
  leadId: string,
  patch: Record<string, unknown>
): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  try {
    const [row] = await db
      .select({ rawPayload: crmLeads.rawPayload })
      .from(crmLeads)
      .where(eq(crmLeads.id, leadId))
      .limit(1);

    if (!row) return false;

    const current =
      row.rawPayload && typeof row.rawPayload === "object" && !Array.isArray(row.rawPayload)
        ? (row.rawPayload as Record<string, unknown>)
        : {};

    await db
      .update(crmLeads)
      .set({ rawPayload: { ...current, ...patch } })
      .where(eq(crmLeads.id, leadId));

    return true;
  } catch (error) {
    console.error("[CRM] mergeLeadRawPayload failed:", error);
    return false;
  }
}

/** Auto-route new lead to the right advisor team member (non-destructive metadata + optional UUID). */
export async function applyAutoAdvisorRoute(
  leadId: string,
  serviceCategory: ServiceCategory | string
): Promise<void> {
  const db = getDb();
  if (!db) return;

  const route = resolveAdvisorRoute(serviceCategory);

  try {
    const [row] = await db
      .select({ rawPayload: crmLeads.rawPayload })
      .from(crmLeads)
      .where(eq(crmLeads.id, leadId))
      .limit(1);

    if (!row) return;

    const current =
      row.rawPayload && typeof row.rawPayload === "object" && !Array.isArray(row.rawPayload)
        ? (row.rawPayload as Record<string, unknown>)
        : {};

    const autoRoute = {
      advisorName: route.advisorName,
      reason: route.reason,
      routedAt: new Date().toISOString(),
    };

    await db
      .update(crmLeads)
      .set({
        rawPayload: { ...current, autoRoute, recommendedAdvisorName: route.advisorName },
        ...(route.authUserId ? { assignedAdvisor: route.authUserId } : {}),
      })
      .where(eq(crmLeads.id, leadId));
  } catch (error) {
    console.error("[CRM] applyAutoAdvisorRoute failed:", error);
  }
}
