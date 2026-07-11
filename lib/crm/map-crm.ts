import { mapDbLeadToCrmLead } from "@/lib/crm/map-lead";
import type {
  CorrespondenceChannel,
  CrmClient,
  CrmCorrespondence,
  CrmGlobalNote,
  CrmReminder,
  CrmTask,
} from "@/lib/crm/types";
import type {
  correspondence,
  crmLeads,
  crmTasks,
  globalNotes,
  leadReminders,
} from "@/lib/db/schema";

export function mapDbCorrespondence(
  row: typeof correspondence.$inferSelect,
  leadName: string,
  staffLabel: string
): CrmCorrespondence {
  const channel = row.channel as CorrespondenceChannel;
  const senderType = row.senderType as CrmCorrespondence["senderType"];
  let from = "System";
  if (senderType === "client") from = leadName;
  else if (senderType === "staff") from = staffLabel;

  return {
    id: row.id,
    leadId: row.leadId,
    channel,
    from,
    body: row.messageBody,
    sentAt: row.createdAt.toISOString(),
    senderType,
  };
}

export function mapDbReminder(row: typeof leadReminders.$inferSelect): CrmReminder {
  return {
    id: row.id,
    leadId: row.leadId,
    title: row.title,
    dueDate: row.dueDate.toISOString(),
    isCompleted: row.isCompleted,
  };
}

export function mapDbTask(row: typeof crmTasks.$inferSelect): CrmTask {
  return {
    id: row.id,
    title: row.title,
    dueDate: row.dueDate ? row.dueDate.toISOString().slice(0, 10) : ", ",
    leadId: row.leadId ?? undefined,
    assignedAdvisorId: row.assigneeId,
    completed: row.status === "completed",
  };
}

export function mapDbGlobalNote(row: typeof globalNotes.$inferSelect): CrmGlobalNote {
  return {
    id: row.id,
    content: row.content,
    timestamp: row.createdAt.toISOString(),
    authorId: row.authorId,
  };
}

export function mapDbLeadToClient(row: typeof crmLeads.$inferSelect): CrmClient {
  const lead = mapDbLeadToCrmLead(row);
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    service_category: lead.service_category,
    aum: lead.estimatedCapital,
    assignedAdvisorId: lead.assignedAdvisorId,
    convertedFromLeadId: lead.id,
  };
}
