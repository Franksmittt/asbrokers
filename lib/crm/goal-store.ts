import "server-only";

import { eq } from "drizzle-orm";

import {
  ALBERT_KRUGERSDORP_BIZ_CAMPAIGN,
  type CampaignWeeklyLog,
} from "@/lib/crm/goals";
import { crmAdvisorGoals, getDb } from "@/lib/db";

function parseWeeklyLog(value: unknown): CampaignWeeklyLog[] {
  if (!Array.isArray(value)) return [];
  return value.filter((row): row is CampaignWeeklyLog => {
    if (!row || typeof row !== "object") return false;
    const item = row as Record<string, unknown>;
    return (
      typeof item.weekStart === "string" &&
      typeof item.outreach === "number" &&
      typeof item.conversations === "number" &&
      typeof item.needsAnalyses === "number" &&
      typeof item.quotes === "number"
    );
  });
}

async function ensureCampaignRow() {
  const db = getDb();
  if (!db) return null;
  const campaign = ALBERT_KRUGERSDORP_BIZ_CAMPAIGN;

  try {
    const [existing] = await db
      .select()
      .from(crmAdvisorGoals)
      .where(eq(crmAdvisorGoals.slug, campaign.id))
      .limit(1);
    if (existing) return existing;

    const [created] = await db
      .insert(crmAdvisorGoals)
      .values({
        slug: campaign.id,
        title: campaign.title,
        ownerAdvisorId: campaign.ownerAdvisorId,
        ownerName: campaign.ownerName,
        serviceCategory: campaign.serviceCategory,
        areaLabel: campaign.areaLabel,
        targetCount: campaign.targetClients,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        status: "active",
        weeklyLog: [],
      })
      .returning();
    return created ?? null;
  } catch (error) {
    console.error("[CRM] ensureCampaignRow failed:", error);
    return null;
  }
}

export async function getCampaignWeeklyLogs(slug: string): Promise<CampaignWeeklyLog[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const row = slug === ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.id ? await ensureCampaignRow() : null;
    if (row) return parseWeeklyLog(row.weeklyLog);

    const [existing] = await db
      .select()
      .from(crmAdvisorGoals)
      .where(eq(crmAdvisorGoals.slug, slug))
      .limit(1);
    return existing ? parseWeeklyLog(existing.weeklyLog) : [];
  } catch (error) {
    console.error("[CRM] getCampaignWeeklyLogs failed:", error);
    return [];
  }
}

export async function upsertCampaignWeeklyLog(
  slug: string,
  entry: CampaignWeeklyLog
): Promise<CampaignWeeklyLog[] | null> {
  const db = getDb();
  if (!db) return null;

  const row = slug === ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.id ? await ensureCampaignRow() : null;
  if (!row) return null;

  const current = parseWeeklyLog(row.weeklyLog);
  const next = [...current.filter((item) => item.weekStart !== entry.weekStart), entry].sort((a, b) =>
    a.weekStart.localeCompare(b.weekStart)
  );

  try {
    await db
      .update(crmAdvisorGoals)
      .set({ weeklyLog: next, updatedAt: new Date() })
      .where(eq(crmAdvisorGoals.id, row.id));
    return next;
  } catch (error) {
    console.error("[CRM] upsertCampaignWeeklyLog failed:", error);
    return null;
  }
}
