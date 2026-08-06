"use server";

import { and, asc, desc, eq, inArray, or, sql } from "drizzle-orm";
import { z } from "zod";

import {
  mapDbCorrespondence,
  mapDbGlobalNote,
  mapDbLeadToClient,
  mapDbReminder,
  mapDbTask,
} from "@/lib/crm/map-crm";
import { mapDbLeadToCrmLead } from "@/lib/crm/map-lead";
import { staffDisplayName } from "@/lib/crm/session";
import { requireCrmAccess } from "@/lib/crm/staff-access";
import type {
  CrmClient,
  CrmCorrespondence,
  CrmGlobalNote,
  CrmLead,
  CrmTask,
  LeadDetails,
  LeadStatus,
  WhatsAppInboxRow,
} from "@/lib/crm/types";
import {
  correspondence,
  crmLeads,
  crmTasks,
  getDb,
  globalNotes,
  leadReminders,
} from "@/lib/db";

const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
]);

async function requireCrmUser() {
  const access = await requireCrmAccess();
  return {
    user: access.user,
    role: access.role,
    canViewAllLeads: access.canViewAllLeads,
    canViewAllClients: access.canViewAllClients,
    permissions: access.permissions,
  };
}

async function assertLeadAccess(leadId: string) {
  const { user, role, canViewAllLeads } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return null;
  }

  try {
    const [row] = await db
      .select()
      .from(crmLeads)
      .where(eq(crmLeads.id, leadId))
      .limit(1);

    if (!row) {
      return null;
    }

    if (!canViewAllLeads) {
      const payload = (row.rawPayload ?? {}) as Record<string, unknown>;
      const delegatedId =
        typeof payload.delegatedAdvisorId === "string" ? payload.delegatedAdvisorId : "";
      if (row.assignedAdvisor !== user.id && delegatedId !== user.id) {
        return null;
      }
    }

    return { user, role, row };
  } catch (error) {
    console.error("[CRM] assertLeadAccess failed:", error);
    return null;
  }
}

function leadScopeFilter(userId: string, canViewAllLeads: boolean) {
  if (canViewAllLeads) return undefined;
  return or(
    eq(crmLeads.assignedAdvisor, userId),
    sql`${crmLeads.rawPayload}->>'delegatedAdvisorId' = ${userId}`
  );
}

async function withCrmDb<T>(label: string, fallback: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    console.error(`[CRM] ${label} failed:`, error);
    return fallback;
  }
}

/** Fetch pipeline leads, staff see assigned only; admin sees all. */
export async function getLeads(): Promise<CrmLead[]> {
  const { user, canViewAllLeads } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  try {
    const scope = leadScopeFilter(user.id, canViewAllLeads);
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

  return withCrmDb("getLeadDetails", null, async () => {
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
  });
}

export async function getGlobalNotes(): Promise<CrmGlobalNote[]> {
  const { permissions } = await requireCrmUser();
  if (!permissions.manageNotes) {
    return [];
  }
  const db = getDb();
  if (!db) {
    return [];
  }

  return withCrmDb("getGlobalNotes", [], async () => {
    const rows = await db
      .select()
      .from(globalNotes)
      .orderBy(desc(globalNotes.createdAt));
    return rows.map(mapDbGlobalNote);
  });
}

export async function getTasks(): Promise<CrmTask[]> {
  const { user, canViewAllLeads } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  return withCrmDb("getTasks", [], async () => {
    const rows = canViewAllLeads
      ? await db.select().from(crmTasks)
      : await db.select().from(crmTasks).where(eq(crmTasks.assigneeId, user.id));
    return rows.map(mapDbTask);
  });
}

export async function getClients(): Promise<CrmClient[]> {
  const { user, canViewAllClients } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  return withCrmDb("getClients", [], async () => {
    const rows = canViewAllClients
      ? await db.select().from(crmLeads).where(eq(crmLeads.pipelineStatus, "won"))
      : await db
          .select()
          .from(crmLeads)
          .where(and(eq(crmLeads.assignedAdvisor, user.id), eq(crmLeads.pipelineStatus, "won")));
    return rows.map(mapDbLeadToClient);
  });
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
  const { user, canViewAllLeads } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return [];
  }

  return withCrmDb("getRecentCorrespondence", [], async () => {
    let scopedLeadIds = leadIds;
    if (!scopedLeadIds?.length) {
      const scope = leadScopeFilter(user.id, canViewAllLeads);
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
  });
}

/** Leads with phone numbers + latest WhatsApp thread preview for inbox UI. */
export async function getWhatsAppInbox(): Promise<WhatsAppInboxRow[]> {
  const { user, canViewAllLeads, permissions } = await requireCrmUser();
  if (!permissions.manageWhatsApp) {
    return [];
  }
  const db = getDb();
  if (!db) {
    return [];
  }

  return withCrmDb("getWhatsAppInbox", [], async () => {
    const scope = leadScopeFilter(user.id, canViewAllLeads);
    const leadRows = scope
      ? await db.select().from(crmLeads).where(scope)
      : await db.select().from(crmLeads);

    const leads = leadRows
      .map(mapDbLeadToCrmLead)
      .filter((lead) => lead.phone.replace(/\D/g, "").length >= 9);

    if (leads.length === 0) {
      return [];
    }

    const leadIds = leads.map((l) => l.id);
    const staffLabel = staffDisplayName(user);

    const messageRows = await db
      .select()
      .from(correspondence)
      .where(
        and(inArray(correspondence.leadId, leadIds), eq(correspondence.channel, "whatsapp"))
      )
      .orderBy(desc(correspondence.createdAt));

    const lastByLead = new Map<string, (typeof messageRows)[number]>();
    const countByLead = new Map<string, number>();

    for (const row of messageRows) {
      countByLead.set(row.leadId, (countByLead.get(row.leadId) ?? 0) + 1);
      if (!lastByLead.has(row.leadId)) {
        lastByLead.set(row.leadId, row);
      }
    }

    const withMessages = leads
      .filter((lead) => lastByLead.has(lead.id))
      .map((lead) => {
        const lastRow = lastByLead.get(lead.id)!;
        return {
          lead,
          lastMessage: mapDbCorrespondence(lastRow, lead.name, staffLabel),
          messageCount: countByLead.get(lead.id) ?? 0,
        };
      })
      .sort((a, b) => {
        const aTime = a.lastMessage?.sentAt ?? "";
        const bTime = b.lastMessage?.sentAt ?? "";
        return bTime.localeCompare(aTime);
      });

    const withoutMessages = leads
      .filter((lead) => !lastByLead.has(lead.id))
      .map((lead) => ({
        lead,
        lastMessage: null as CrmCorrespondence | null,
        messageCount: 0,
      }));

    return [...withMessages, ...withoutMessages];
  });
}

export type MutationResult = { ok: true } | { ok: false; error: string };

export async function addGlobalNote(content: string): Promise<MutationResult> {
  const trimmed = content.trim();
  if (!trimmed) {
    return { ok: false, error: "Note cannot be empty." };
  }

  const { user, permissions } = await requireCrmUser();
  if (!permissions.manageNotes) {
    return { ok: false, error: "You do not have permission to add notes." };
  }
  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  try {
    await db.insert(globalNotes).values({
      content: trimmed,
      authorId: user.id,
    });
    return { ok: true };
  } catch (error) {
    console.error("[CRM] addGlobalNote failed:", error);
    return { ok: false, error: "Could not save note. Try again." };
  }
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

  try {
    await db.insert(leadReminders).values({
      leadId,
      title: trimmedTitle,
      dueDate: due,
    });
    return { ok: true };
  } catch (error) {
    console.error("[CRM] addReminder failed:", error);
    return { ok: false, error: "Could not save reminder. Try again." };
  }
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

  try {
    await db.insert(crmTasks).values({
      leadId,
      title: trimmedTitle,
      dueDate: due,
      assigneeId,
      status: "open",
    });
    return { ok: true };
  } catch (error) {
    console.error("[CRM] addTask failed:", error);
    return { ok: false, error: "Could not save task. Try again." };
  }
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

  const { user, canViewAllLeads } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  const where = !canViewAllLeads
    ? and(
        eq(crmLeads.id, leadId),
        or(
          eq(crmLeads.assignedAdvisor, user.id),
          sql`${crmLeads.rawPayload}->>'delegatedAdvisorId' = ${user.id}`
        )
      )
    : eq(crmLeads.id, leadId);

  try {
    const updated = await db
      .update(crmLeads)
      .set({ pipelineStatus: statusParsed.data })
      .where(where)
      .returning({ id: crmLeads.id });

    if (updated.length === 0) {
      return { ok: false, error: "Lead not found or access denied." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[CRM] updateLeadStatus failed:", error);
    return { ok: false, error: "Could not update status. Try again." };
  }
}

export async function completeTask(taskId: string): Promise<MutationResult> {
  const parsed = z.string().uuid().safeParse(taskId);
  if (!parsed.success) {
    return { ok: false, error: "Invalid task." };
  }

  const { user, canViewAllLeads } = await requireCrmUser();
  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  const where = !canViewAllLeads
    ? and(eq(crmTasks.id, taskId), eq(crmTasks.assigneeId, user.id))
    : eq(crmTasks.id, taskId);

  try {
    const updated = await db
      .update(crmTasks)
      .set({ status: "completed" })
      .where(where)
      .returning({ id: crmTasks.id });

    if (updated.length === 0) {
      return { ok: false, error: "Task not found or access denied." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[CRM] completeTask failed:", error);
    return { ok: false, error: "Could not complete task. Try again." };
  }
}
