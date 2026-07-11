import "server-only";

import { generateText, stepCountIs, tool } from "ai";
import { z } from "zod";

import { teamRosterForAiPrompt } from "@/lib/crm/team-members";
import type { CrmLead } from "@/lib/crm/types";
import { SERVICE_LABELS } from "@/lib/crm/types";

import { CRM_AI_SYSTEM_BASE, crmGeminiModel, isGeminiConfigured } from "./client";
import {
  agentCreateTask,
  agentDelegateLead,
  agentMoveLeadStatus,
  agentRescheduleReminder,
  agentRescheduleTask,
  agentSendWhatsApp,
  getAgentScheduleSnapshot,
  suggestDelegationForLead,
} from "./crm-agent-mutations";

function pipelineSnapshot(leads: CrmLead[]): string {
  return leads
    .slice(0, 30)
    .map(
      (l) =>
        `[${l.id}] ${l.name} | ${l.status} | score ${l.lead_score} | ${SERVICE_LABELS[l.service_category]} | ${l.intent}${l.recommendedAdvisorName ? ` | advisor: ${l.recommendedAdvisorName}` : ""}${l.delegatedAdvisorName ? ` | delegated: ${l.delegatedAdvisorName}` : ""}`
    )
    .join("\n");
}

export type AlbertAgentChatResult = {
  answer: string;
  actionsTaken: string[];
};

export async function runAlbertCrmAgent(
  question: string,
  leads: CrmLead[],
  stats: {
    totalLeads: number;
    activePipeline: number;
    clients: number;
    conversionRate: number;
    byStatus: Record<string, number>;
  }
): Promise<AlbertAgentChatResult | null> {
  if (!isGeminiConfigured()) return null;

  const schedule = await getAgentScheduleSnapshot();
  const actionsTaken: string[] = [];

  const leadStatusEnum = z.enum([
    "new",
    "contacted",
    "qualified",
    "proposal",
    "won",
    "lost",
  ]);

  const { text } = await generateText({
    model: crmGeminiModel(),
    system: `${CRM_AI_SYSTEM_BASE}

You are Albert Schuurman's personal CRM executive assistant on the dashboard.
You CAN take real actions when Albert asks, use tools to move Kanban stages, delegate leads,
create tasks, reschedule calls, and send WhatsApp messages.

Delegation guidance:
- Business insurance, commercial, estate, life personal → Johnny Farinha (johnny)
- Albert handles retirement/Everest and owner oversight
- Petro is admin/commercial underwriting, use for ops escalations, not primary sales handoff

When Albert asks to delegate or move a lead, use the appropriate tool then confirm clearly.
For business insurance leads, proactively suggest Johnny and offer to delegate if not done yet.
If WhatsApp is not configured, explain that and offer a draft instead.`,
    prompt: `Albert's message: ${question}

Team roster:
${teamRosterForAiPrompt()}

Pipeline stats:
- Total leads: ${stats.totalLeads}
- Active pipeline: ${stats.activePipeline}
- Clients: ${stats.clients}
- Win rate: ${stats.conversionRate}%
- By status: ${JSON.stringify(stats.byStatus)}

Leads (use exact id in brackets for tools):
${pipelineSnapshot(leads) || "No leads yet."}

Schedule (for rescheduling calls):
${schedule}`,
    tools: {
      moveLeadStatus: tool({
        description: "Move a lead to a new Kanban pipeline stage.",
        inputSchema: z.object({
          leadId: z.string().uuid(),
          status: leadStatusEnum,
        }),
        execute: async ({ leadId, status }) => {
          const result = await agentMoveLeadStatus(leadId, status);
          if (result.ok) actionsTaken.push(result.message);
          return result;
        },
      }),
      delegateLead: tool({
        description:
          "Delegate a lead to a team member (johnny, petro, albert). Creates a follow-up task by default.",
        inputSchema: z.object({
          leadId: z.string().uuid(),
          memberRef: z.string().describe("johnny, petro, albert, or partial name"),
          taskTitle: z.string().optional(),
          dueDateIso: z.string().optional().describe("ISO datetime for follow-up task"),
        }),
        execute: async ({ leadId, memberRef, taskTitle, dueDateIso }) => {
          const result = await agentDelegateLead(leadId, memberRef, {
            createFollowUpTask: true,
            taskTitle,
            dueDateIso,
          });
          if (result.ok) actionsTaken.push(result.message);
          return result;
        },
      }),
      createTask: tool({
        description: "Create a task assigned to a team member for a lead.",
        inputSchema: z.object({
          leadId: z.string().uuid(),
          memberRef: z.string(),
          title: z.string(),
          dueDateIso: z.string(),
        }),
        execute: async ({ leadId, memberRef, title, dueDateIso }) => {
          const result = await agentCreateTask(leadId, memberRef, title, dueDateIso);
          if (result.ok) actionsTaken.push(result.message);
          return result;
        },
      }),
      rescheduleTask: tool({
        description: "Reschedule an open task (e.g. move call from 10am to 12pm).",
        inputSchema: z.object({
          taskId: z.string().uuid(),
          dueDateIso: z.string(),
        }),
        execute: async ({ taskId, dueDateIso }) => {
          const result = await agentRescheduleTask(taskId, dueDateIso);
          if (result.ok) actionsTaken.push(result.message);
          return result;
        },
      }),
      rescheduleReminder: tool({
        description: "Reschedule a lead reminder / scheduled call.",
        inputSchema: z.object({
          reminderId: z.string().uuid(),
          dueDateIso: z.string(),
        }),
        execute: async ({ reminderId, dueDateIso }) => {
          const result = await agentRescheduleReminder(reminderId, dueDateIso);
          if (result.ok) actionsTaken.push(result.message);
          return result;
        },
      }),
      sendWhatsApp: tool({
        description: "Send a WhatsApp message to a lead (requires Meta API on server).",
        inputSchema: z.object({
          leadId: z.string().uuid(),
          message: z.string().max(1200),
        }),
        execute: async ({ leadId, message }) => {
          const result = await agentSendWhatsApp(leadId, message);
          if (result.ok) actionsTaken.push(result.message);
          return result;
        },
      }),
      suggestDelegation: tool({
        description: "Recommend who should own a lead based on service line (read-only).",
        inputSchema: z.object({
          leadId: z.string().uuid(),
        }),
        execute: async ({ leadId }) => {
          const lead = leads.find((l) => l.id === leadId);
          if (!lead) return { ok: false, message: "Lead not found in current pipeline." };
          return { ok: true, message: suggestDelegationForLead(lead) };
        },
      }),
    },
    stopWhen: stepCountIs(8),
  });

  return {
    answer: text.trim() || "Done.",
    actionsTaken,
  };
}
