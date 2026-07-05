import { z } from "zod";

export const crmMorningBriefSchema = z.object({
  headline: z.string().max(200),
  summary: z.string().max(800),
  topPriorities: z
    .array(
      z.object({
        leadName: z.string(),
        leadId: z.string().optional(),
        reason: z.string().max(300),
        urgency: z.enum(["high", "medium", "low"]),
      })
    )
    .max(5),
  pipelineInsight: z.string().max(400),
  complianceFlags: z.array(z.string().max(200)).max(3),
});

export type CrmMorningBrief = z.infer<typeof crmMorningBriefSchema>;

export const leadAiInsightSchema = z.object({
  executiveSummary: z.string().max(500),
  aiPriorityScore: z.number().int().min(1).max(100),
  nextBestAction: z.string().max(300),
  suggestedTalkingPoints: z.array(z.string().max(200)).max(4),
  complianceNote: z.string().max(300),
  recommendedAdvisorFocus: z.string().max(200),
});

export type LeadAiInsight = z.infer<typeof leadAiInsightSchema>;

export const leadReplyDraftSchema = z.object({
  draft: z.string().max(1200),
  tone: z.enum(["professional", "warm", "urgent"]),
  channelNote: z.string().max(200),
});

export type LeadReplyDraft = z.infer<typeof leadReplyDraftSchema>;

export const kanbanPrioritiesSchema = z.object({
  priorities: z
    .array(
      z.object({
        leadId: z.string().min(1),
        priorityScore: z.number().int().min(1).max(100),
        shortLabel: z.string().max(48),
      })
    )
    .max(30),
});

export type KanbanPriorities = z.infer<typeof kanbanPrioritiesSchema>;

export const threadSentimentSchema = z.object({
  overall: z.enum(["positive", "neutral", "concerned", "urgent"]),
  summary: z.string().max(300),
  suggestedTone: z.enum(["professional", "warm", "reassuring", "urgent"]),
});

export type ThreadSentiment = z.infer<typeof threadSentimentSchema>;

export const executiveAiReportSchema = z.object({
  headline: z.string().max(200),
  narrative: z.string().max(1000),
  strengths: z.array(z.string().max(200)).max(4),
  risks: z.array(z.string().max(200)).max(4),
  weekFocus: z.array(z.string().max(200)).max(3),
  forecastNote: z.string().max(400),
});

export type ExecutiveAiReport = z.infer<typeof executiveAiReportSchema>;

export const preMeetingBriefSchema = z.object({
  meetingTitle: z.string().max(120),
  clientSnapshot: z.string().max(500),
  objectives: z.array(z.string().max(200)).max(4),
  talkingPoints: z.array(z.string().max(200)).max(5),
  complianceChecklist: z.array(z.string().max(200)).max(4),
  suggestedAgenda: z.array(z.string().max(150)).max(6),
  printFooter: z.string().max(200).optional(),
});

export type PreMeetingBrief = z.infer<typeof preMeetingBriefSchema>;
