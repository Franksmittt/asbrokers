"use server";

import { revalidatePath } from "next/cache";

import { getLeads, getLeadDetails } from "@/app/actions/crm";
import { canUseCrmAi } from "@/lib/crm/ai-access";
import { logCrmAiAction } from "@/lib/crm/ai/audit";
import { runAlbertCrmAgent } from "@/lib/crm/ai/agent-chat";
import { isGeminiConfigured } from "@/lib/crm/ai/client";
import {
  analyzeThreadSentiment,
  generateCrmMorningBrief,
  generateExecutiveReport,
  generateKanbanPriorities,
  generateLeadAiInsight,
  generateLeadReplyDraft,
  generatePreMeetingBrief,
  type ExecutiveStatsInput,
} from "@/lib/crm/ai/generate";
import type {
  CrmMorningBrief,
  ExecutiveAiReport,
  KanbanPriorities,
  LeadAiInsight,
  LeadReplyDraft,
  PreMeetingBrief,
  ThreadSentiment,
} from "@/lib/crm/ai/schemas";
import { mergeLeadRawPayload } from "@/lib/crm/lead-metadata";
import { resolveCrmIdentity } from "@/lib/crm/resolve-session";
import { isAdminRole } from "@/lib/crm/session";
import { requireCrmAccess } from "@/lib/crm/staff-access";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { computeConversionRate, getCrmStatsFromLeads } from "@/lib/crm/utils";
import { crmAiAuditLog, getDb } from "@/lib/db";
import { desc } from "drizzle-orm";
import { z } from "zod";

export type CrmAiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: "not_configured" | "forbidden" | "not_found" };

function threadSummary(messages: { from: string; body: string; channel: string }[]): string {
  if (messages.length === 0) return "";
  return messages
    .slice(-8)
    .map((m) => `[${m.channel}] ${m.from}: ${m.body.slice(0, 200)}`)
    .join("\n");
}

async function requireAlbertAiAccess() {
  const identity = await resolveCrmIdentity();
  if (!identity || !canUseCrmAi(identity)) {
    return null;
  }
  return identity;
}

export async function fetchCrmMorningBrief(): Promise<CrmAiResult<CrmMorningBrief>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  if (!isGeminiConfigured()) {
    return { ok: false, error: "Gemini API is not configured.", code: "not_configured" };
  }

  try {
    const leads = await getLeads();
    const brief = await generateCrmMorningBrief(leads);
    if (!brief) {
      return { ok: false, error: "Could not generate brief." };
    }
    void logCrmAiAction({
      staffUserId: access.user.id,
      actionType: "morning_brief",
      summary: brief.headline,
    });
    return { ok: true, data: brief };
  } catch (error) {
    console.error("[CRM AI] morning brief:", error);
    return { ok: false, error: "AI brief temporarily unavailable." };
  }
}

export async function fetchLeadAiInsight(leadId: string): Promise<CrmAiResult<LeadAiInsight>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  if (!isGeminiConfigured()) {
    return { ok: false, error: "Gemini API is not configured.", code: "not_configured" };
  }

  const details = await getLeadDetails(leadId);
  if (!details) {
    return { ok: false, error: "Lead not found.", code: "not_found" };
  }

  try {
    const insight = await generateLeadAiInsight(
      details.lead,
      threadSummary(
        details.correspondence.map((m) => ({
          from: m.from,
          body: m.body,
          channel: m.channel,
        }))
      )
    );
    if (!insight) {
      return { ok: false, error: "Could not generate insight." };
    }
    void mergeLeadRawPayload(leadId, {
      aiPriorityLabel: insight.nextBestAction.slice(0, 48),
      aiPriorityScore: insight.aiPriorityScore,
    });
    void logCrmAiAction({
      staffUserId: access.user.id,
      actionType: "lead_insight",
      leadId,
      summary: insight.executiveSummary.slice(0, 200),
    });
    return { ok: true, data: insight };
  } catch (error) {
    console.error("[CRM AI] lead insight:", error);
    return { ok: false, error: "AI insight temporarily unavailable." };
  }
}

export async function fetchLeadReplyDraft(
  leadId: string,
  channel: "whatsapp" | "email" = "whatsapp"
): Promise<CrmAiResult<LeadReplyDraft>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  if (!isGeminiConfigured()) {
    return { ok: false, error: "Gemini API is not configured.", code: "not_configured" };
  }

  const details = await getLeadDetails(leadId);
  if (!details) {
    return { ok: false, error: "Lead not found.", code: "not_found" };
  }

  try {
    const draft = await generateLeadReplyDraft(
      details.lead,
      threadSummary(
        details.correspondence.map((m) => ({
          from: m.from,
          body: m.body,
          channel: m.channel,
        }))
      ),
      channel
    );
    if (!draft) {
      return { ok: false, error: "Could not generate draft." };
    }
    void logCrmAiAction({
      staffUserId: access.user.id,
      actionType: "reply_draft",
      leadId,
      summary: `${channel} draft · ${draft.tone}`,
    });
    return { ok: true, data: draft };
  } catch (error) {
    console.error("[CRM AI] reply draft:", error);
    return { ok: false, error: "AI draft temporarily unavailable." };
  }
}

export async function fetchExecutiveAiReport(): Promise<CrmAiResult<ExecutiveAiReport>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  if (!isGeminiConfigured()) {
    return { ok: false, error: "Gemini API is not configured.", code: "not_configured" };
  }

  try {
    const leads = await getLeads();
    const stats = getCrmStatsFromLeads(leads, 0, leads.filter((l) => l.status === "won").length);
    const activePipeline =
      stats.byStatus.new +
      stats.byStatus.contacted +
      stats.byStatus.qualified +
      stats.byStatus.proposal;

    const byService = leads.reduce(
      (acc, l) => {
        const label = SERVICE_LABELS[l.service_category];
        acc[label] = (acc[label] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const input: ExecutiveStatsInput = {
      totalLeads: stats.totalLeads,
      activePipeline,
      clients: stats.clients,
      conversionRate: computeConversionRate(leads),
      byStatus: stats.byStatus as Record<string, number>,
      byService,
      topLeads: [...leads].sort((a, b) => b.lead_score - a.lead_score),
    };

    const report = await generateExecutiveReport(input);
    if (!report) {
      return { ok: false, error: "Could not generate report." };
    }
    void logCrmAiAction({
      staffUserId: access.user.id,
      actionType: "executive_report",
      summary: report.headline,
    });
    return { ok: true, data: report };
  } catch (error) {
    console.error("[CRM AI] executive report:", error);
    return { ok: false, error: "Executive AI report temporarily unavailable." };
  }
}

/** Gemini batch prioritisation — persists scores to raw_payload (safe merge). */
export async function refreshKanbanAiPriorities(): Promise<CrmAiResult<KanbanPriorities>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  if (!isGeminiConfigured()) {
    return { ok: false, error: "Gemini API is not configured.", code: "not_configured" };
  }

  try {
    const leads = await getLeads();
    const result = await generateKanbanPriorities(leads);
    if (!result) {
      return { ok: false, error: "Could not prioritise pipeline." };
    }

    await Promise.all(
      result.priorities.map((p) =>
        mergeLeadRawPayload(p.leadId, {
          aiPriorityLabel: p.shortLabel,
          aiPriorityScore: p.priorityScore,
          aiPriorityUpdatedAt: new Date().toISOString(),
        })
      )
    );

    void logCrmAiAction({
      staffUserId: access.user.id,
      actionType: "kanban_priorities",
      summary: `Prioritised ${result.priorities.length} leads`,
    });

    revalidatePath("/crm/kanban");
    revalidatePath("/crm");
    return { ok: true, data: result };
  } catch (error) {
    console.error("[CRM AI] kanban priorities:", error);
    return { ok: false, error: "AI prioritisation temporarily unavailable." };
  }
}

export async function fetchThreadSentiment(leadId: string): Promise<CrmAiResult<ThreadSentiment>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  if (!isGeminiConfigured()) {
    return { ok: false, error: "Gemini API is not configured.", code: "not_configured" };
  }

  const details = await getLeadDetails(leadId);
  if (!details) {
    return { ok: false, error: "Lead not found.", code: "not_found" };
  }

  try {
    const sentiment = await analyzeThreadSentiment(
      details.lead,
      threadSummary(
        details.correspondence.map((m) => ({
          from: m.from,
          body: m.body,
          channel: m.channel,
        }))
      )
    );
    if (!sentiment) {
      return { ok: false, error: "Could not analyse thread." };
    }
    void logCrmAiAction({
      staffUserId: access.user.id,
      actionType: "thread_sentiment",
      leadId,
      summary: `${sentiment.overall}: ${sentiment.summary.slice(0, 120)}`,
    });
    return { ok: true, data: sentiment };
  } catch (error) {
    console.error("[CRM AI] thread sentiment:", error);
    return { ok: false, error: "Sentiment analysis temporarily unavailable." };
  }
}

export async function fetchAiPrioritizedLeadIds(): Promise<CrmAiResult<string[]>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  const leads = await getLeads();
  const sorted = [...leads].sort((a, b) => {
    const aAi = a.aiPriorityScore ?? 0;
    const bAi = b.aiPriorityScore ?? 0;
    if (bAi !== aAi) return bAi - aAi;
    const statusWeight: Record<string, number> = {
      proposal: 40,
      qualified: 35,
      contacted: 25,
      new: 20,
      won: 0,
      lost: 0,
    };
    return (
      b.lead_score +
      (statusWeight[b.status] ?? 0) -
      (a.lead_score + (statusWeight[a.status] ?? 0))
    );
  });
  return { ok: true, data: sorted.map((l) => l.id) };
}

const dashboardQuestionSchema = z.object({
  question: z.string().trim().min(2).max(800),
});

export async function askCrmDashboardQuestion(
  question: string
): Promise<CrmAiResult<{ answer: string; actionsTaken: string[] }>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  if (!isGeminiConfigured()) {
    return { ok: false, error: "Gemini API is not configured.", code: "not_configured" };
  }

  const parsed = dashboardQuestionSchema.safeParse({ question });
  if (!parsed.success) {
    return { ok: false, error: "Enter a question (2–800 characters)." };
  }

  try {
    const leads = await getLeads();
    const stats = getCrmStatsFromLeads(leads, 0, leads.filter((l) => l.status === "won").length);
    const activePipeline =
      stats.byStatus.new +
      stats.byStatus.contacted +
      stats.byStatus.qualified +
      stats.byStatus.proposal;

    const result = await runAlbertCrmAgent(parsed.data.question, leads, {
      totalLeads: stats.totalLeads,
      activePipeline,
      clients: stats.clients,
      conversionRate: computeConversionRate(leads),
      byStatus: stats.byStatus as Record<string, number>,
    });

    if (!result) {
      return { ok: false, error: "Could not generate an answer." };
    }

    void logCrmAiAction({
      staffUserId: access.user.id,
      actionType: "dashboard_chat",
      summary: `${parsed.data.question.slice(0, 80)} → ${result.answer.slice(0, 80)}`,
    });

    revalidatePath("/crm");
    revalidatePath("/crm/kanban");

    return {
      ok: true,
      data: { answer: result.answer, actionsTaken: result.actionsTaken },
    };
  } catch (error) {
    console.error("[CRM AI] dashboard chat:", error);
    return { ok: false, error: "AI assistant temporarily unavailable." };
  }
}

export async function fetchPreMeetingBrief(leadId: string): Promise<CrmAiResult<PreMeetingBrief>> {
  const access = await requireAlbertAiAccess();
  if (!access) {
    return { ok: false, error: "AI assistant is available to Albert only.", code: "forbidden" };
  }
  if (!isGeminiConfigured()) {
    return { ok: false, error: "Gemini API is not configured.", code: "not_configured" };
  }

  const details = await getLeadDetails(leadId);
  if (!details) {
    return { ok: false, error: "Lead not found.", code: "not_found" };
  }

  const staffName =
    (access.user.user_metadata?.full_name as string | undefined)?.trim() ||
    access.user.email?.split("@")[0] ||
    "Advisor";

  try {
    const brief = await generatePreMeetingBrief(
      details.lead,
      threadSummary(
        details.correspondence.map((m) => ({
          from: m.from,
          body: m.body,
          channel: m.channel,
        }))
      ),
      staffName
    );
    if (!brief) {
      return { ok: false, error: "Could not generate brief." };
    }
    void logCrmAiAction({
      staffUserId: access.user.id,
      actionType: "pre_meeting_brief",
      leadId,
      summary: brief.meetingTitle,
    });
    return { ok: true, data: brief };
  } catch (error) {
    console.error("[CRM AI] pre-meeting brief:", error);
    return { ok: false, error: "Pre-meeting brief temporarily unavailable." };
  }
}

export type CrmAiAuditEntry = {
  id: string;
  actionType: string;
  summary: string | null;
  leadId: string | null;
  createdAt: string;
};

export async function fetchRecentAiAuditLog(
  limit = 15
): Promise<CrmAiResult<CrmAiAuditEntry[]>> {
  const access = await requireCrmAccess();
  if (!isAdminRole(access.role)) {
    return { ok: false, error: "Admin access required.", code: "forbidden" };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database unavailable." };
  }

  try {
    const rows = await db
      .select()
      .from(crmAiAuditLog)
      .orderBy(desc(crmAiAuditLog.createdAt))
      .limit(Math.min(limit, 50));

    return {
      ok: true,
      data: rows.map((row) => ({
        id: row.id,
        actionType: row.actionType,
        summary: row.summary,
        leadId: row.leadId,
        createdAt: row.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("[CRM AI] audit log fetch:", error);
    return { ok: false, error: "Could not load AI activity." };
  }
}
