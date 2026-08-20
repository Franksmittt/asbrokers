"use server";

import { revalidatePath } from "next/cache";

import { getLeads } from "@/app/actions/crm";
import { ALBERT_KRUGERSDORP_BIZ_CAMPAIGN, mondayOfWeek, scoreCampaignProgress } from "@/lib/crm/goals";
import { getCampaignWeeklyLogs, upsertCampaignWeeklyLog } from "@/lib/crm/goal-store";
import { insertCrmLead } from "@/lib/crm/insert-lead";
import { mergeLeadRawPayload } from "@/lib/crm/lead-metadata";
import { requireCrmAccess } from "@/lib/crm/staff-access";
import {
  campaignLeadCaptureSchema,
  campaignWeeklyLogSchema,
  leadAreaTagSchema,
} from "@/lib/validations/crm-goals";

export type GoalMutationResult = { ok: true } | { ok: false; error: string };

export async function getAlbertKrugersdorpGoalBoard() {
  await requireCrmAccess();
  const [leads, weeklyLogs] = await Promise.all([
    getLeads(),
    getCampaignWeeklyLogs(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.id),
  ]);
  const progress = scoreCampaignProgress(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN, leads, { weeklyLogs });
  const matchingLeads = leads.filter((lead) => progress.matchingLeadIds.includes(lead.id));
  return { progress, matchingLeads, weeklyLogs };
}

export async function logCampaignWeekActivity(formData: FormData): Promise<GoalMutationResult> {
  await requireCrmAccess();
  const parsed = campaignWeeklyLogSchema.safeParse({
    weekStart: String(formData.get("weekStart") ?? mondayOfWeek(new Date())),
    outreach: formData.get("outreach"),
    conversations: formData.get("conversations"),
    needsAnalyses: formData.get("needsAnalyses"),
    quotes: formData.get("quotes"),
    notes: String(formData.get("notes") ?? ""),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the weekly numbers." };
  }

  const saved = await upsertCampaignWeeklyLog(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.id, {
    weekStart: parsed.data.weekStart,
    outreach: parsed.data.outreach,
    conversations: parsed.data.conversations,
    needsAnalyses: parsed.data.needsAnalyses,
    quotes: parsed.data.quotes,
    notes: parsed.data.notes || undefined,
  });
  if (!saved) {
    return {
      ok: false,
      error: "Could not save this week’s activity. Confirm the goals table is migrated.",
    };
  }

  revalidatePath("/crm");
  revalidatePath("/crm/goals");
  revalidatePath("/crm/executive");
  return { ok: true };
}

export async function captureCampaignLead(formData: FormData): Promise<GoalMutationResult> {
  await requireCrmAccess();
  const parsed = campaignLeadCaptureSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    area: formData.get("area") || "Krugersdorp",
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the contact details." };
  }

  const leadId = await insertCrmLead({
    sourceFunnel: "campaign_capture",
    serviceCategory: "short_term_business",
    leadScore: 48,
    rawPayload: {
      name: parsed.data.fullName,
      phone: parsed.data.phone,
      company: parsed.data.company,
      area: parsed.data.area,
      intent: "Krugersdorp business insurance campaign",
      campaignId: ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.id,
      notes: parsed.data.notes || undefined,
    },
  });

  if (!leadId) {
    return { ok: false, error: "Could not save the lead. Try again or add them from the contact form." };
  }

  revalidatePath("/crm");
  revalidatePath("/crm/goals");
  revalidatePath("/crm/kanban");
  revalidatePath("/crm/leads");
  return { ok: true };
}

export async function tagLeadArea(formData: FormData): Promise<GoalMutationResult> {
  await requireCrmAccess();
  const parsed = leadAreaTagSchema.safeParse({
    leadId: formData.get("leadId"),
    area: formData.get("area"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please choose an area." };
  }

  const stampCampaign =
    parsed.data.area.toLowerCase().includes("krugersdorp") ||
    parsed.data.area.toLowerCase().includes("west rand");

  const ok = await mergeLeadRawPayload(parsed.data.leadId, {
    area: parsed.data.area,
    ...(stampCampaign ? { campaignId: ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.id } : {}),
  });
  if (!ok) {
    return { ok: false, error: "Could not tag this lead." };
  }

  revalidatePath("/crm");
  revalidatePath("/crm/goals");
  revalidatePath(`/crm/leads/${parsed.data.leadId}`);
  return { ok: true };
}
