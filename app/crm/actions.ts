"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  getLeadById,
  getClientById,
  getCorrespondenceForLead,
  getCorrespondenceForClient,
  getNotesForLead,
  getNotesForClient,
  getTasksForLead,
  getTasksForClient,
  updateLeadStatus as updateLeadStatusInDb,
  SERVICE_LABELS,
  type LeadStatus,
  type MockLead,
  type MockClient,
} from "@/lib/crm-data";

function buildSummary(type: "lead" | "client", entity: MockLead | MockClient, extra: string) {
  const name = entity.name;
  const email = "email" in entity ? entity.email : "";
  const phone = "phone" in entity ? entity.phone : "";
  const advisor = "assignedAdvisorName" in entity ? entity.assignedAdvisorName : "";
  const service = "serviceCategory" in entity
    ? SERVICE_LABELS[(entity as MockLead).serviceCategory]
    : (entity as MockClient).services.map((s) => SERVICE_LABELS[s]).join(", ");
  return `${type === "lead" ? "Lead" : "Client"}: ${name}\nEmail: ${email}\nPhone: ${phone}\nAdvisor: ${advisor}\nService(s): ${service}\n\n${extra}`;
}

export async function generateMeetingBrief(
  type: "lead" | "client",
  entityId: string
): Promise<{ ok: true; markdown: string } | { ok: false; error: string }> {
  try {
    const entity = type === "lead" ? await getLeadById(entityId) : await getClientById(entityId);
    if (!entity) return { ok: false, error: "Not found" };

    const correspondence =
      type === "lead"
        ? await getCorrespondenceForLead(entityId)
        : await getCorrespondenceForClient(entityId);
    const notes =
      type === "lead"
        ? await getNotesForLead(entityId)
        : await getNotesForClient(entityId);
    const tasks =
      type === "lead"
        ? await getTasksForLead(entityId)
        : await getTasksForClient(entityId);

    const lead = type === "lead" ? (entity as MockLead) : null;
    const client = type === "client" ? (entity as MockClient) : null;

    let extra = "";
    if (lead) {
      extra += `Intent: ${lead.intent}\nSource: ${lead.source}\nStatus: ${lead.status}\nFit: ${lead.fitScore} Engagement: ${lead.engagementScore}\n`;
    }
    if (client) {
      extra += `Converted: ${client.convertedAt}\n`;
    }
    extra += `\nLast correspondence: ${correspondence.slice(-3).map((c) => `${c.at}: ${c.fromName} (${c.channel}) – ${c.body.slice(0, 80)}...`).join("\n") || "None"}`;
    extra += `\n\nNotes: ${notes.slice(0, 3).map((n) => `${n.at} ${n.authorName}: ${n.body.slice(0, 100)}`).join("\n") || "None"}`;
    extra += `\n\nOpen tasks: ${tasks.filter((t) => !t.completed).map((t) => t.title).join("; ") || "None"}`;

    const summary = buildSummary(type, entity, extra);

    if (!process.env.OPENAI_API_KEY) {
      return {
        ok: true,
        markdown: `## Meeting brief (template – set OPENAI_API_KEY for AI)\n\n**${entity.name}**\n- Contact: ${"email" in entity ? entity.email : ""} / ${"phone" in entity ? entity.phone : ""}\n- Advisor: ${"assignedAdvisorName" in entity ? entity.assignedAdvisorName : ""}\n- Key context: See notes and correspondence tabs.\n- Suggested: Review open tasks and last 3 messages before the meeting.`,
      };
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are an assistant for AS Brokers (FSP 17273). Given CRM context about a lead or client, produce a short meeting brief in markdown: 2-3 sentence summary, 3-5 bullet talking points, and one suggested next action. Be concise and professional.`,
      prompt: `Produce a meeting brief for this ${type}:\n\n${summary}`,
    });

    return { ok: true, markdown: text };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to generate brief";
    return { ok: false, error: message };
  }
}

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<{ ok: boolean; error?: string }> {
  return updateLeadStatusInDb(leadId, status);
}
