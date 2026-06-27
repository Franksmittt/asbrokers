"use server";

import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { forbidden } from "next/navigation";
import { z } from "zod";

import {
  mapDbCorrespondence,
  mapDbGlobalNote,
  mapDbLeadToClient,
  mapDbReminder,
  mapDbTask,
} from "@/lib/crm/map-crm";
import { mapDbLeadToCrmLead } from "@/lib/crm/map-lead";
import { staffDisplayName, canAccessCrmRole, crmRoleFromUser } from "@/lib/crm/session";
import type {
  CrmClient,
  CrmCorrespondence,
  CrmGlobalNote,
  CrmLead,
  CrmTask,
  LeadDetails,
  LeadStatus,
} from "@/lib/crm/types";
import {
  correspondence,
  crmLeads,
  crmTasks,
  getDb,
  globalNotes,
  leadReminders,
} from "@/lib/db";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
]);

async function requireCrmUser() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    forbidden();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    forbidden();
  }

  const role = crmRoleFromUser(user);
  if (!canAccessCrmRole(role)) {
    forbidden();
  }

  return { user, role };
}

async function assertLeadAccess(leadId: string) {
  const { user, role } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return null;
  }

  const [row] = await db
    .select()
    .from(crmLeads)
    .where(eq(crmLeads.id, leadId))
    .limit(1);

  if (!row) {
    return null;
  }

  if (role === "staff" && row.assignedAdvisor !== user.id) {
    return null;
  }

  return { user, role, row };
}

function leadScopeFilter(userId: string, role: "admin" | "staff") {
  return role === "staff" ? eq(crmLeads.assignedAdvisor, userId) : undefined;
}

/** Fetch pipeline leads — staff see assigned only; admin sees all. */
export async function getLeads(): Promise<CrmLead[]> {
  const { user, role } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  try {
    const scope = leadScopeFilter(user.id, role);
    const rows = scope
      ? await db.select().from(crmLeads).where(scope)
      : await db.select().from(crmLeads);

    return rows.map(mapDbLeadToCrmLead);
  } catch (error) {
    console.error("[CRM] getLeads failed:", error);
    return [];
  }
}

export async function getLeadById(leadId: string): Promise<CrmLead | null> {
  const parsed = z.string().uuid().safeParse(leadId);
  if (!parsed.success) {
    return null;
  }

  const access = await assertLeadAccess(leadId);
  if (!access) {
    return null;
  }

  return mapDbLeadToCrmLead(access.row);
}

export async function getLeadDetails(leadId: string): Promise<LeadDetails | null> {
  const parsed = z.string().uuid().safeParse(leadId);
  if (!parsed.success) {
    return null;
  }

  const access = await assertLeadAccess(leadId);
  if (!access) {
    return null;
  }

  const db = getDb();
  if (!db) {
    return null;
  }

  const lead = mapDbLeadToCrmLead(access.row);
  const staffLabel = staffDisplayName(access.user);

  const [correspondenceRows, reminderRows, taskRows] = await Promise.all([
    db
      .select()
      .from(correspondence)
      .where(eq(correspondence.leadId, leadId))
      .orderBy(asc(correspondence.createdAt)),
    db
      .select()
      .from(leadReminders)
      .where(and(eq(leadReminders.leadId, leadId), eq(leadReminders.isCompleted, false)))
      .orderBy(asc(leadReminders.dueDate)),
    db
      .select()
      .from(crmTasks)
      .where(eq(crmTasks.leadId, leadId))
      .orderBy(asc(crmTasks.dueDate)),
  ]);

  return {
    lead,
    correspondence: correspondenceRows.map((row) =>
      mapDbCorrespondence(row, lead.name, staffLabel)
    ),
    reminders: reminderRows.map(mapDbReminder),
    tasks: taskRows.map(mapDbTask),
  };
}

export async function getGlobalNotes(): Promise<CrmGlobalNote[]> {
  await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  const rows = await db
    .select()
    .from(globalNotes)
    .orderBy(desc(globalNotes.createdAt));

  return rows.map(mapDbGlobalNote);
}

export async function getTasks(): Promise<CrmTask[]> {
  const { user, role } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  const rows =
    role === "staff"
      ? await db.select().from(crmTasks).where(eq(crmTasks.assigneeId, user.id))
      : await db.select().from(crmTasks);

  return rows.map(mapDbTask);
}

export async function getClients(): Promise<CrmClient[]> {
  const { user, role } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  const rows =
    role === "staff"
      ? await db
          .select()
          .from(crmLeads)
          .where(and(eq(crmLeads.assignedAdvisor, user.id), eq(crmLeads.pipelineStatus, "won")))
      : await db.select().from(crmLeads).where(eq(crmLeads.pipelineStatus, "won"));

  return rows.map(mapDbLeadToClient);
}

export async function getClientById(clientId: string): Promise<CrmClient | null> {
  const parsed = z.string().uuid().safeParse(clientId);
  if (!parsed.success) {
    return null;
  }

  const access = await assertLeadAccess(clientId);
  if (!access || access.row.pipelineStatus !== "won") {
    return null;
  }

  return mapDbLeadToClient(access.row);
}

export async function getRecentCorrespondence(
  limit = 3,
  leadIds?: string[]
): Promise<CrmCorrespondence[]> {
  const { user, role } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  let scopedLeadIds = leadIds;
  if (!scopedLeadIds?.length) {
    const scope = leadScopeFilter(user.id, role);
    const leadRows = scope
      ? await db.select({ id: crmLeads.id }).from(crmLeads).where(scope)
      : await db.select({ id: crmLeads.id }).from(crmLeads);
    scopedLeadIds = leadRows.map((row) => row.id);
  }

  if (scopedLeadIds.length === 0) {
    return [];
  }

  const rows = await db
    .select()
    .from(correspondence)
    .where(inArray(correspondence.leadId, scopedLeadIds))
    .orderBy(desc(correspondence.createdAt))
    .limit(limit);

  const leadNameById = new Map<string, string>();
  const leadRows = await db
    .select()
    .from(crmLeads)
    .where(inArray(crmLeads.id, scopedLeadIds));
  for (const lead of leadRows) {
    leadNameById.set(lead.id, mapDbLeadToCrmLead(lead).name);
  }

  const staffLabel = staffDisplayName(user);
  return rows.map((row) =>
    mapDbCorrespondence(row, leadNameById.get(row.leadId) ?? "Client", staffLabel)
  );
}

export type MutationResult = { ok: true } | { ok: false; error: string };

export async function addGlobalNote(content: string): Promise<MutationResult> {
  const trimmed = content.trim();
  if (!trimmed) {
    return { ok: false, error: "Note cannot be empty." };
  }

  const { user } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  await db.insert(globalNotes).values({
    content: trimmed,
    authorId: user.id,
  });

  return { ok: true };
}

export async function addReminder(
  leadId: string,
  title: string,
  dueDate: string
): Promise<MutationResult> {
  const idParsed = z.string().uuid().safeParse(leadId);
  if (!idParsed.success) {
    return { ok: false, error: "Invalid lead." };
  }

  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return { ok: false, error: "Reminder title is required." };
  }

  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) {
    return { ok: false, error: "Invalid due date." };
  }

  const access = await assertLeadAccess(leadId);
  if (!access) {
    return { ok: false, error: "Lead not found or access denied." };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  await db.insert(leadReminders).values({
    leadId,
    title: trimmedTitle,
    dueDate: due,
  });

  return { ok: true };
}

export async function addTask(
  leadId: string,
  title: string,
  dueDate: string,
  assigneeId: string
): Promise<MutationResult> {
  const leadParsed = z.string().uuid().safeParse(leadId);
  const assigneeParsed = z.string().uuid().safeParse(assigneeId);
  if (!leadParsed.success || !assigneeParsed.success) {
    return { ok: false, error: "Invalid lead or assignee." };
  }

  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return { ok: false, error: "Task title is required." };
  }

  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) {
    return { ok: false, error: "Invalid due date." };
  }

  const access = await assertLeadAccess(leadId);
  if (!access) {
    return { ok: false, error: "Lead not found or access denied." };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  await db.insert(crmTasks).values({
    leadId,
    title: trimmedTitle,
    dueDate: due,
    assigneeId,
    status: "open",
  });

  return { ok: true };
}

export type UpdateLeadStatusResult = MutationResult;

/** Persist kanban drag-and-drop pipeline status. */
export async function updateLeadStatus(
  leadId: string,
  newStatus: LeadStatus
): Promise<UpdateLeadStatusResult> {
  const statusParsed = leadStatusSchema.safeParse(newStatus);
  if (!statusParsed.success) {
    return { ok: false, error: "Invalid pipeline status." };
  }

  const idParsed = z.string().uuid().safeParse(leadId);
  if (!idParsed.success) {
    return { ok: false, error: "Invalid lead." };
  }

  const { user, role } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  const where =
    role === "staff"
      ? and(eq(crmLeads.id, leadId), eq(crmLeads.assignedAdvisor, user.id))
      : eq(crmLeads.id, leadId);

  const updated = await db
    .update(crmLeads)
    .set({ pipelineStatus: statusParsed.data })
    .where(where)
    .returning({ id: crmLeads.id });

  if (updated.length === 0) {
    return { ok: false, error: "Lead not found or access denied." };
  }

  return { ok: true };
}

export async function completeTask(taskId: string): Promise<MutationResult> {
  const parsed = z.string().uuid().safeParse(taskId);
  if (!parsed.success) {
    return { ok: false, error: "Invalid task." };
  }

  const { user, role } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  const where =
    role === "staff"
      ? and(eq(crmTasks.id, taskId), eq(crmTasks.assigneeId, user.id))
      : eq(crmTasks.id, taskId);

  const updated = await db
    .update(crmTasks)
    .set({ status: "completed" })
    .where(where)
    .returning({ id: crmTasks.id });

  if (updated.length === 0) {
    return { ok: false, error: "Task not found or access denied." };
  }

  return { ok: true };
}
