import "server-only";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  addTask,
  getLeadById,
  getTasks,
  updateLeadStatus,
} from "@/app/actions/crm";
import { sendWhatsAppMessage } from "@/app/actions/whatsapp";
import { mergeLeadRawPayload } from "@/lib/crm/lead-metadata";
import {
  CRM_TEAM_MEMBERS,
  getTeamMember,
  resolveTeamMemberByNameFragment,
  type CrmTeamMember,
} from "@/lib/crm/team-members";
import type { LeadStatus } from "@/lib/crm/types";
import { crmLeads, crmTasks, getDb, leadReminders } from "@/lib/db";

export type AgentActionResult = {
  ok: boolean;
  message: string;
};

const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
]);

function revalidateCrm() {
  revalidatePath("/crm");
  revalidatePath("/crm/kanban");
  revalidatePath("/crm/leads");
  revalidatePath("/crm/tasks");
}

function resolveMember(input: string): CrmTeamMember | null {
  return getTeamMember(input) ?? resolveTeamMemberByNameFragment(input);
}

export async function agentMoveLeadStatus(
  leadId: string,
  status: LeadStatus
): Promise<AgentActionResult> {
  const parsed = leadStatusSchema.safeParse(status);
  if (!parsed.success) {
    return { ok: false, message: "Invalid pipeline status." };
  }

  const lead = await getLeadById(leadId);
  if (!lead) {
    return { ok: false, message: "Lead not found." };
  }

  const result = await updateLeadStatus(leadId, parsed.data);
  if (!result.ok) {
    return { ok: false, message: result.error ?? "Could not update status." };
  }

  revalidateCrm();
  return {
    ok: true,
    message: `Moved ${lead.name} to ${parsed.data.replace("_", " ")} on the Kanban.`,
  };
}

export async function agentDelegateLead(
  leadId: string,
  memberRef: string,
  options?: { createFollowUpTask?: boolean; taskTitle?: string; dueDateIso?: string }
): Promise<AgentActionResult> {
  const member = resolveMember(memberRef);
  if (!member) {
    return { ok: false, message: `Could not find team member matching "${memberRef}".` };
  }

  const lead = await getLeadById(leadId);
  if (!lead) {
    return { ok: false, message: "Lead not found." };
  }

  await mergeLeadRawPayload(leadId, {
    delegatedAdvisorId: member.id,
    delegatedAdvisorName: member.name,
    recommendedAdvisorName: member.name,
    delegatedAt: new Date().toISOString(),
    delegatedBy: CRM_TEAM_MEMBERS.albert.name,
  });

  const db = getDb();
  if (db && member.id === CRM_TEAM_MEMBERS.albert.id) {
    try {
      await db
        .update(crmLeads)
        .set({ assignedAdvisor: member.id })
        .where(eq(crmLeads.id, leadId));
    } catch {
      /* FK may fail for test users without auth.users row */
    }
  }

  let taskNote = "";
  if (options?.createFollowUpTask !== false) {
    const title =
      options?.taskTitle?.trim() ||
      `Follow up: ${lead.name} (${lead.intent.slice(0, 60)})`;
    const due = options?.dueDateIso ?? new Date(Date.now() + 86400000).toISOString();
    const taskResult = await agentCreateTaskForMember(leadId, member, title, due);
    if (taskResult.ok) taskNote = ` ${taskResult.message}`;
  }

  revalidateCrm();
  return {
    ok: true,
    message: `Delegated ${lead.name} to ${member.name}.${taskNote}`,
  };
}

async function agentCreateTaskForMember(
  leadId: string,
  member: CrmTeamMember,
  title: string,
  dueDateIso: string
): Promise<AgentActionResult> {
  const prefix = member.key === "albert" ? "" : `[For ${member.name}] `;
  const assigneeId = CRM_TEAM_MEMBERS.albert.id;
  const result = await addTask(leadId, `${prefix}${title}`, dueDateIso, assigneeId);
  if (!result.ok) {
    return { ok: false, message: result.error ?? "Could not create task." };
  }
  revalidateCrm();
  return {
    ok: true,
    message: `Task created for ${member.name}: "${prefix}${title}".`,
  };
}

export async function agentCreateTask(
  leadId: string,
  memberRef: string,
  title: string,
  dueDateIso: string
): Promise<AgentActionResult> {
  const member = resolveMember(memberRef);
  if (!member) {
    return { ok: false, message: `Could not find team member matching "${memberRef}".` };
  }
  return agentCreateTaskForMember(leadId, member, title, dueDateIso);
}

export async function agentRescheduleTask(
  taskId: string,
  dueDateIso: string
): Promise<AgentActionResult> {
  const parsedId = z.string().uuid().safeParse(taskId);
  const due = new Date(dueDateIso);
  if (!parsedId.success || Number.isNaN(due.getTime())) {
    return { ok: false, message: "Invalid task or date." };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, message: "Database is not configured." };
  }

  const updated = await db
    .update(crmTasks)
    .set({ dueDate: due })
    .where(eq(crmTasks.id, taskId))
    .returning({ id: crmTasks.id, title: crmTasks.title });

  if (updated.length === 0) {
    return { ok: false, message: "Task not found." };
  }

  revalidateCrm();
  return {
    ok: true,
    message: `Rescheduled "${updated[0]!.title}" to ${due.toLocaleString("en-ZA")}.`,
  };
}

export async function agentRescheduleReminder(
  reminderId: string,
  dueDateIso: string
): Promise<AgentActionResult> {
  const parsedId = z.string().uuid().safeParse(reminderId);
  const due = new Date(dueDateIso);
  if (!parsedId.success || Number.isNaN(due.getTime())) {
    return { ok: false, message: "Invalid reminder or date." };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, message: "Database is not configured." };
  }

  const updated = await db
    .update(leadReminders)
    .set({ dueDate: due })
    .where(eq(leadReminders.id, reminderId))
    .returning({ id: leadReminders.id, title: leadReminders.title });

  if (updated.length === 0) {
    return { ok: false, message: "Reminder not found." };
  }

  revalidateCrm();
  return {
    ok: true,
    message: `Moved reminder "${updated[0]!.title}" to ${due.toLocaleString("en-ZA")}.`,
  };
}

export async function agentSendWhatsApp(
  leadId: string,
  message: string
): Promise<AgentActionResult> {
  const text = message.trim();
  if (!text) {
    return { ok: false, message: "Message cannot be empty." };
  }

  const lead = await getLeadById(leadId);
  if (!lead) {
    return { ok: false, message: "Lead not found." };
  }

  const result = await sendWhatsAppMessage(leadId, text);
  if (!result.ok) {
    return {
      ok: false,
      message: result.error ?? "WhatsApp is not configured or send failed.",
    };
  }

  revalidateCrm();
  revalidatePath(`/crm/leads/${leadId}`);
  return { ok: true, message: `WhatsApp sent to ${lead.name}.` };
}

export async function getAgentScheduleSnapshot(): Promise<string> {
  const db = getDb();
  if (!db) return "No schedule data.";

  const tasks = await getTasks();
  const openTasks = tasks.filter((t) => !t.completed).slice(0, 20);

  const reminders = await db
    .select()
    .from(leadReminders)
    .where(eq(leadReminders.isCompleted, false))
    .limit(20);

  const taskLines = openTasks.map(
    (t) =>
      `task id=${t.id} | ${t.title} | due ${t.dueDate} | leadId=${t.leadId ?? "none"}`
  );
  const reminderLines = reminders.map(
    (r) => `reminder id=${r.id} | ${r.title} | due ${r.dueDate.toISOString()} | leadId=${r.leadId}`
  );

  return [
    "Open tasks:",
    taskLines.length ? taskLines.join("\n") : "(none)",
    "",
    "Open reminders:",
    reminderLines.length ? reminderLines.join("\n") : "(none)",
  ].join("\n");
}

export function suggestDelegationForLead(lead: {
  name: string;
  service_category: string;
  intent: string;
}): string {
  const cat = lead.service_category;
  if (
    cat === "short_term_business" ||
    cat === "estate_business" ||
    cat === "life_personal"
  ) {
    return `Business/personal insurance lead, consider delegating ${lead.name} to Johnny Farinha (johnny).`;
  }
  if (cat === "retirement_everest") {
    return `${lead.name} is retirement/Everest, Albert or senior advisor follow-up recommended.`;
  }
  return `Review ${lead.name} and assign to the best-fit advisor from the roster.`;
}
