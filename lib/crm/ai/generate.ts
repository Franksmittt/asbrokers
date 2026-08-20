import "server-only";

import { generateText } from "ai";

import { ALBERT_KRUGERSDORP_BIZ_CAMPAIGN, campaignPromptSnapshot, scoreCampaignProgress } from "@/lib/crm/goals";
import type { CrmLead } from "@/lib/crm/types";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { getRagContext } from "@/lib/db/rag";

import { CRM_AI_SYSTEM_BASE, crmGeminiModel, isGeminiConfigured } from "./client";
import {
  crmMorningBriefSchema,
  executiveAiReportSchema,
  kanbanPrioritiesSchema,
  leadAiInsightSchema,
  leadReplyDraftSchema,
  threadSentimentSchema,
  preMeetingBriefSchema,
  type CrmMorningBrief,
  type ExecutiveAiReport,
  type KanbanPriorities,
  type LeadAiInsight,
  type LeadReplyDraft,
  type ThreadSentiment,
  type PreMeetingBrief,
} from "./schemas";
import { generateCrmStructured } from "./structured";

function leadSnapshot(lead: CrmLead): string {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Status: ${lead.status}`,
    `Intent: ${lead.intent}`,
    `Service: ${SERVICE_LABELS[lead.service_category]}`,
    `Lead score: ${lead.lead_score}`,
    lead.capitalHint ? `Capital hint: ${lead.capitalHint}` : null,
    lead.estimatedCapital > 0 ? `Estimated capital: R${lead.estimatedCapital.toLocaleString("en-ZA")}` : null,
    `Funnel assessment: ${lead.funnelData.assessment}`,
    `Funnel risk: ${lead.funnelData.keyRisk}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function pipelineSnapshot(leads: CrmLead[]): string {
  return leads
    .slice(0, 30)
    .map(
      (l) =>
        `[${l.id}] ${l.name} | ${l.status} | score ${l.lead_score} | ${SERVICE_LABELS[l.service_category]} | ${l.intent}${l.recommendedAdvisorName ? ` | advisor: ${l.recommendedAdvisorName}` : ""}${l.aiPriorityScore ? ` | AI priority ${l.aiPriorityScore}` : ""}`
    )
    .join("\n");
}

async function safeRagContext(query: string, limit = 3): Promise<string> {
  try {
    const result = await Promise.race([
      getRagContext(query, limit),
      new Promise<string>((resolve) => {
        setTimeout(() => resolve(""), 4000);
      }),
    ]);
    return result ?? "";
  } catch {
    return "";
  }
}

export async function answerCrmDashboardQuestion(
  question: string,
  leads: CrmLead[],
  stats: {
    totalLeads: number;
    activePipeline: number;
    clients: number;
    conversionRate: number;
    byStatus: Record<string, number>;
  }
): Promise<string | null> {
  if (!isGeminiConfigured()) return null;

  const rag = await safeRagContext(`${question} Everest FAIS retirement pipeline`, 3);

  const { text } = await generateText({
    model: crmGeminiModel(),
    system: `${CRM_AI_SYSTEM_BASE}

You are Albert's CRM co-pilot on the dashboard. Answer questions about leads, pipeline,
priorities, and next actions. Reference lead names and IDs from the data below only.
If asked who to call first, use lead score, status, and AI priority. Keep answers concise
(3–6 sentences unless a list is requested).`,
    prompt: `Albert's question: ${question}

Pipeline stats:
- Total leads: ${stats.totalLeads}
- Active pipeline: ${stats.activePipeline}
- Clients (won): ${stats.clients}
- Win rate: ${stats.conversionRate}%
- By status: ${JSON.stringify(stats.byStatus)}

Leads (id in brackets, use for /crm/leads/[id] links mentally):
${pipelineSnapshot(leads) || "No leads in pipeline yet."}

Compliance reference:
${rag || "[No RAG context]"}`,
  });

  return text.trim() || null;
}

export async function generateCrmMorningBrief(leads: CrmLead[]): Promise<CrmMorningBrief | null> {
  if (!isGeminiConfigured() || leads.length === 0) return null;

  const topLeads = [...leads]
    .sort((a, b) => b.lead_score - a.lead_score)
    .slice(0, 12)
    .map(
      (l) =>
        `- [${l.id}] ${l.name} | ${l.status} | score ${l.lead_score} | ${SERVICE_LABELS[l.service_category]} | ${l.intent}`
    )
    .join("\n");

  const rag = await safeRagContext("Everest Wealth retirement pipeline prioritization FSP compliance", 3);

  const object = await generateCrmStructured(crmMorningBriefSchema, {
    system: CRM_AI_SYSTEM_BASE,
    prompt: `Generate a morning command brief for AS Brokers staff based on today's pipeline.

${campaignPromptSnapshot(scoreCampaignProgress(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN, leads))}

If the Krugersdorp business-insurance goal is behind pace, put a campaign next action in topPriorities.

Pipeline snapshot (${leads.length} visible leads):
${topLeads}

Status counts: ${JSON.stringify(
      leads.reduce(
        (acc, l) => {
          acc[l.status] = (acc[l.status] ?? 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      )
    )}

Reference context:
${rag || "[No RAG context]"}

Include leadId when referencing a specific lead from the list above.`,
    jsonShape: `{
  "headline": "string (max 200 chars)",
  "summary": "string (max 800 chars)",
  "topPriorities": [{ "leadName": "string", "leadId": "uuid optional", "reason": "string", "urgency": "high"|"medium"|"low" }],
  "pipelineInsight": "string",
  "complianceFlags": ["string"]
}`,
  });

  return object;
}

export async function generateLeadAiInsight(
  lead: CrmLead,
  threadSummary: string
): Promise<LeadAiInsight | null> {
  if (!isGeminiConfigured()) return null;

  const rag = await safeRagContext(
    `${lead.intent} ${SERVICE_LABELS[lead.service_category]} Everest estate retirement`,
    4
  );

  const object = await generateCrmStructured(leadAiInsightSchema, {
    system: CRM_AI_SYSTEM_BASE,
    prompt: `Analyse this lead for an AS Brokers advisor preparing a follow-up.

${leadSnapshot(lead)}

Recent correspondence summary:
${threadSummary || "No messages yet."}

Compliance / product reference:
${rag || "[No RAG context]"}`,
    jsonShape: `{
  "executiveSummary": "string",
  "aiPriorityScore": 1-100,
  "nextBestAction": "string",
  "suggestedTalkingPoints": ["string"],
  "complianceNote": "string",
  "recommendedAdvisorFocus": "string"
}`,
  });

  return object;
}

export async function generateLeadReplyDraft(
  lead: CrmLead,
  threadSummary: string,
  channel: "whatsapp" | "email"
): Promise<LeadReplyDraft | null> {
  if (!isGeminiConfigured()) return null;

  const object = await generateCrmStructured(leadReplyDraftSchema, {
    system: CRM_AI_SYSTEM_BASE,
    prompt: `Draft a ${channel} reply from AS Brokers (FSP 17273) to this lead.
First name: ${lead.name.split(" ")[0]}
Intent: ${lead.intent}
Service line: ${SERVICE_LABELS[lead.service_category]}

Thread context:
${threadSummary || "First outreach, no prior messages."}

Keep under 120 words. Professional South African English. No guaranteed returns.`,
    jsonShape: `{
  "draft": "string (message body)",
  "tone": "professional"|"warm"|"urgent",
  "channelNote": "string"
}`,
  });

  return object;
}

export type ExecutiveStatsInput = {
  totalLeads: number;
  activePipeline: number;
  clients: number;
  conversionRate: number;
  byStatus: Record<string, number>;
  byService: Record<string, number>;
  topLeads: CrmLead[];
};

export async function generateExecutiveReport(stats: ExecutiveStatsInput): Promise<ExecutiveAiReport | null> {
  if (!isGeminiConfigured()) return null;

  const rag = await safeRagContext("AS Brokers business growth conversion Everest pipeline", 3);

  const object = await generateCrmStructured(executiveAiReportSchema, {
    system: CRM_AI_SYSTEM_BASE,
    prompt: `Owner-level executive briefing for Albert Schuurman (AS Brokers CC).

Metrics:
- Total leads: ${stats.totalLeads}
- Active pipeline: ${stats.activePipeline}
- Clients (won): ${stats.clients}
- Win rate: ${stats.conversionRate}%
- By status: ${JSON.stringify(stats.byStatus)}
- By service: ${JSON.stringify(stats.byService)}

Top leads:
${stats.topLeads
  .slice(0, 8)
  .map((l) => `- ${l.name}: ${l.status}, score ${l.lead_score}, ${l.intent}`)
  .join("\n")}

${campaignPromptSnapshot(scoreCampaignProgress(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN, stats.topLeads))}
Include the Krugersdorp business-insurance goal in weekFocus when behind pace.

Context:
${rag || "[No RAG context]"}`,
    jsonShape: `{
  "headline": "string",
  "narrative": "string",
  "strengths": ["string"],
  "risks": ["string"],
  "weekFocus": ["string"],
  "forecastNote": "string"
}`,
  });

  return object;
}

/** Lightweight one-line priority label for Kanban badges. */
export async function generateLeadPriorityLabel(lead: CrmLead): Promise<string | null> {
  if (!isGeminiConfigured()) return null;
  try {
    const { text } = await generateText({
      model: crmGeminiModel(),
      system: CRM_AI_SYSTEM_BASE,
      prompt: `In 6 words or fewer, why should an advisor prioritise this lead today?
${lead.name} | ${lead.status} | score ${lead.lead_score} | ${lead.intent}
Reply with ONLY the label, no punctuation at end.`,
    });
    return text.trim().slice(0, 48) || null;
  } catch {
    return null;
  }
}

/** Batch prioritise visible Kanban leads in one Gemini call. */
export async function generateKanbanPriorities(leads: CrmLead[]): Promise<KanbanPriorities | null> {
  if (!isGeminiConfigured() || leads.length === 0) return null;

  const active = leads.filter((l) => l.status !== "won" && l.status !== "lost").slice(0, 25);
  if (active.length === 0) return null;

  const list = active
    .map(
      (l) =>
        `id=${l.id} | ${l.name} | ${l.status} | score=${l.lead_score} | ${SERVICE_LABELS[l.service_category]} | ${l.intent}`
    )
    .join("\n");

  const object = await generateCrmStructured(kanbanPrioritiesSchema, {
    system: CRM_AI_SYSTEM_BASE,
    prompt: `Rank these CRM pipeline leads by urgency for AS Brokers advisors today.
Return priorityScore 1-100 and a shortLabel (max 6 words) per lead.

Leads:
${list}`,
    jsonShape: `{
  "priorities": [{ "leadId": "uuid string from list", "priorityScore": 1-100, "shortLabel": "string max 48 chars" }]
}`,
  });

  return object;
}

export async function analyzeThreadSentiment(
  lead: CrmLead,
  threadSummary: string
): Promise<ThreadSentiment | null> {
  if (!isGeminiConfigured()) return null;
  if (!threadSummary.trim()) {
    return {
      overall: "neutral",
      summary: "No messages yet, first outreach pending.",
      suggestedTone: "warm",
    };
  }

  const object = await generateCrmStructured(threadSentimentSchema, {
    system: CRM_AI_SYSTEM_BASE,
    prompt: `Analyse client sentiment for this lead thread. Lead: ${lead.name}, intent: ${lead.intent}

Messages:
${threadSummary}`,
    jsonShape: `{
  "overall": "positive"|"neutral"|"concerned"|"urgent",
  "summary": "string",
  "suggestedTone": "professional"|"warm"|"reassuring"|"urgent"
}`,
  });

  return object;
}

/** Structured pre-meeting brief for advisor client consultations. */
export async function generatePreMeetingBrief(
  lead: CrmLead,
  threadSummary: string,
  staffName: string
): Promise<PreMeetingBrief | null> {
  if (!isGeminiConfigured()) return null;

  const rag = await safeRagContext(
    `${lead.intent} ${SERVICE_LABELS[lead.service_category]} FAIS suitability Everest`,
    4
  );

  const object = await generateCrmStructured(preMeetingBriefSchema, {
    system: CRM_AI_SYSTEM_BASE,
    prompt: `Prepare a pre-meeting brief for ${staffName} (AS Brokers FSP 17273) before meeting this lead.

${leadSnapshot(lead)}

Correspondence summary:
${threadSummary || "No prior messages."}

Reference:
${rag || "[No RAG context]"}

Include FAIS suitability checks. Flag Amethyst drawdown if above 17.5%. No guaranteed return claims.`,
    jsonShape: `{
  "meetingTitle": "string",
  "clientSnapshot": "string",
  "objectives": ["string"],
  "talkingPoints": ["string"],
  "complianceChecklist": ["string"],
  "suggestedAgenda": ["string"]
}`,
  });

  return object;
}
