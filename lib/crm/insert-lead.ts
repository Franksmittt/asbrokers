import "server-only";

import { inferCampaignStamp } from "@/lib/crm/campaign-stamp";
import { applyAutoAdvisorRoute } from "@/lib/crm/lead-metadata";
import type { ServiceCategory } from "@/lib/crm/types";
import { crmLeads, getDb } from "@/lib/db";

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
    const serviceCategory = input.serviceCategory ?? "retirement_everest";
    const stamp = inferCampaignStamp({
      serviceCategory,
      sourceFunnel: input.sourceFunnel,
      rawPayload: input.rawPayload,
    });
    const rawPayload = {
      ...input.rawPayload,
      ...(stamp.area ? { area: stamp.area } : {}),
      ...(stamp.campaignId ? { campaignId: stamp.campaignId } : {}),
    };

    const [row] = await db
      .insert(crmLeads)
      .values({
        sourceFunnel: input.sourceFunnel,
        serviceCategory,
        leadScore: input.leadScore ?? 0,
        pipelineStatus: input.pipelineStatus ?? "new",
        rawPayload,
      })
      .returning({ id: crmLeads.id });

    const leadId = row?.id ?? null;
    if (leadId) {
      void applyAutoAdvisorRoute(leadId, serviceCategory as ServiceCategory, {
        area: stamp.area,
        krugersdorpCommercial: stamp.isKrugersdorpCommercial,
      });
    }

    return leadId;
  } catch (error) {
    console.error("[CRM] insertCrmLead failed:", error);
    return null;
  }
}
