/**
 * CRM data layer: Supabase when configured, else mock.
 * Same types and logical API as lib/mock-crm.ts for drop-in replacement.
 */

import { getSupabaseService, isSupabaseConfigured } from "@/lib/supabase/server";
import type { LeadStatus, ServiceCategory } from "@/lib/mock-crm";
import {
  SERVICE_LABELS,
  MOCK_LEADS,
  MOCK_CLIENTS,
  MOCK_TASKS,
  MOCK_CORRESPONDENCE,
  MOCK_NOTES,
  MOCK_STAFF,
  MOCK_HOUSEHOLDS,
  getLeadsForAdvisor as mockGetLeadsForAdvisor,
  getClientsForAdvisor as mockGetClientsForAdvisor,
  getLeadsByService as mockGetLeadsByService,
  getLeadById as mockGetLeadById,
  getClientById as mockGetClientById,
  getClientByLeadId as mockGetClientByLeadId,
  getTasksForAdvisor as mockGetTasksForAdvisor,
  getTasksForLead as mockGetTasksForLead,
  getTasksForClient as mockGetTasksForClient,
  getCorrespondenceForLead as mockGetCorrespondenceForLead,
  getCorrespondenceForClient as mockGetCorrespondenceForClient,
  getNotesForLead as mockGetNotesForLead,
  getNotesForClient as mockGetNotesForClient,
  getCrmStats as mockGetCrmStats,
  getPipelineByService as mockGetPipelineByService,
  getStaffPerformance as mockGetStaffPerformance,
  getHighPriorityLeads as mockGetHighPriorityLeads,
} from "@/lib/mock-crm";
import type { MockLead, MockClient, MockTask, MockCorrespondence, MockNote } from "@/lib/mock-crm";

// Re-export types and constants for consumers
export type { MockLead, MockClient, MockTask, MockCorrespondence, MockNote };
export type { LeadStatus, ServiceCategory };
export { SERVICE_LABELS };

function mapRowToLead(row: Record<string, unknown>, advisorName: string, householdName?: string): MockLead {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    phone: (row.phone as string) ?? "",
    intent: (row.intent as string) ?? "",
    source: (row.source as string) ?? "",
    status: row.status as LeadStatus,
    fitScore: (row.fit_score as number) ?? 0,
    engagementScore: (row.engagement_score as number) ?? 0,
    assignedAdvisorId: row.assigned_advisor_id as string,
    assignedAdvisorName: advisorName,
    serviceCategory: row.service_category as ServiceCategory,
    householdId: row.household_id as string | undefined,
    householdName,
    createdAt: (row.created_at as string)?.slice(0, 10) ?? "",
    lastActivity: (row.last_activity_at as string)?.slice(0, 10) ?? "",
  };
}

function mapRowToClient(row: Record<string, unknown>, advisorName: string, householdName?: string): MockClient {
  return {
    id: row.id as string,
    leadId: (row.lead_id as string) ?? "",
    name: row.name as string,
    email: row.email as string,
    phone: (row.phone as string) ?? "",
    assignedAdvisorId: row.assigned_advisor_id as string,
    assignedAdvisorName: advisorName,
    advisorWhatsApp: row.advisor_whats_app as string | undefined,
    services: (row.services as ServiceCategory[]) ?? [],
    householdId: row.household_id as string | undefined,
    householdName,
    convertedAt: (row.converted_at as string)?.slice(0, 10) ?? "",
  };
}

function mapRowToTask(row: Record<string, unknown>, assignedToName: string): MockTask {
  return {
    id: row.id as string,
    leadId: row.lead_id as string | undefined,
    clientId: row.client_id as string | undefined,
    title: row.title as string,
    dueDate: (row.due_date as string) ?? "",
    assignedToId: row.assigned_to_id as string,
    assignedToName,
    completed: (row.completed as boolean) ?? false,
    createdAt: (row.created_at as string)?.slice(0, 10) ?? "",
  };
}

export async function getLeadsForAdvisor(advisorId: string): Promise<MockLead[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetLeadsForAdvisor(advisorId);

  const { data: leadRows, error: leadErr } = await supabase
    .from("leads")
    .select("*")
    .eq("assigned_advisor_id", advisorId)
    .order("last_activity_at", { ascending: false });

  if (leadErr || !leadRows?.length) {
    if (leadErr) console.error("crm-data getLeadsForAdvisor", leadErr);
    return [];
  }

  const staffMap = await getStaffNameMap(supabase);
  const householdMap = await getHouseholdNameMap(supabase);

  return (leadRows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    const advisorName = staffMap[row.assigned_advisor_id as string] ?? "";
    const householdName = householdMap[row.household_id as string];
    return mapRowToLead(row, advisorName, householdName);
  });
}

export async function getAllLeads(): Promise<MockLead[]> {
  const supabase = getSupabaseService();
  if (!supabase) return MOCK_LEADS;

  const { data: leadRows, error } = await supabase
    .from("leads")
    .select("*")
    .order("last_activity_at", { ascending: false });

  if (error || !leadRows?.length) {
    if (error) console.error("crm-data getAllLeads", error);
    return [];
  }

  const staffMap = await getStaffNameMap(supabase);
  const householdMap = await getHouseholdNameMap(supabase);

  return (leadRows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    const advisorName = staffMap[row.assigned_advisor_id as string] ?? "";
    const householdName = householdMap[row.household_id as string];
    return mapRowToLead(row, advisorName, householdName);
  });
}

async function getStaffNameMap(supabase: ReturnType<typeof getSupabaseService>) {
  if (!supabase) return {} as Record<string, string>;
  const { data } = await supabase.from("staff").select("id, name");
  const map: Record<string, string> = {};
  (data ?? []).forEach((r: { id: string; name: string }) => { map[r.id] = r.name; });
  return map;
}

async function getHouseholdNameMap(supabase: ReturnType<typeof getSupabaseService>) {
  if (!supabase) return {} as Record<string, string>;
  const { data } = await supabase.from("households").select("id, name");
  const map: Record<string, string> = {};
  (data ?? []).forEach((r: { id: string; name: string }) => { map[r.id] = r.name; });
  return map;
}

export async function getClientsForAdvisor(advisorId: string): Promise<MockClient[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetClientsForAdvisor(advisorId);

  const { data: rows, error } = await supabase
    .from("clients")
    .select("*")
    .eq("assigned_advisor_id", advisorId)
    .order("converted_at", { ascending: false });

  if (error || !rows?.length) {
    if (error) console.error("crm-data getClientsForAdvisor", error);
    return [];
  }

  const staffMap = await getStaffNameMap(supabase);
  const householdMap = await getHouseholdNameMap(supabase);

  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    const advisorName = staffMap[row.assigned_advisor_id as string] ?? "";
    const householdName = householdMap[row.household_id as string];
    return mapRowToClient(row, advisorName, householdName);
  });
}

export async function getAllClients(): Promise<MockClient[]> {
  const supabase = getSupabaseService();
  if (!supabase) return MOCK_CLIENTS;

  const { data: rows, error } = await supabase.from("clients").select("*").order("converted_at", { ascending: false });
  if (error || !rows?.length) {
    if (error) console.error("crm-data getAllClients", error);
    return [];
  }
  const staffMap = await getStaffNameMap(supabase);
  const householdMap = await getHouseholdNameMap(supabase);
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    const advisorName = staffMap[row.assigned_advisor_id as string] ?? "";
    const householdName = householdMap[row.household_id as string];
    return mapRowToClient(row, advisorName, householdName);
  });
}

/** Filter leads by service (pass through for both Supabase and mock). */
export function getLeadsByService(leads: MockLead[], service?: ServiceCategory): MockLead[] {
  return mockGetLeadsByService(leads, service);
}

export async function getLeadById(id: string): Promise<MockLead | undefined> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetLeadById(id);

  const { data: row, error } = await supabase.from("leads").select("*").eq("id", id).single();
  if (error || !row) return undefined;
  const staffMap = await getStaffNameMap(supabase);
  const householdMap = await getHouseholdNameMap(supabase);
  return mapRowToLead(
    row as Record<string, unknown>,
    staffMap[(row as Record<string, unknown>).assigned_advisor_id as string] ?? "",
    householdMap[(row as Record<string, unknown>).household_id as string]
  );
}

export async function getClientById(id: string): Promise<MockClient | undefined> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetClientById(id);

  const { data: row, error } = await supabase.from("clients").select("*").eq("id", id).single();
  if (error || !row) return undefined;
  const staffMap = await getStaffNameMap(supabase);
  const householdMap = await getHouseholdNameMap(supabase);
  return mapRowToClient(
    row as Record<string, unknown>,
    staffMap[(row as Record<string, unknown>).assigned_advisor_id as string] ?? "",
    householdMap[(row as Record<string, unknown>).household_id as string]
  );
}

export async function getClientByLeadId(leadId: string): Promise<MockClient | undefined> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetClientByLeadId(leadId);
  const { data: row, error } = await supabase.from("clients").select("*").eq("lead_id", leadId).maybeSingle();
  if (error || !row) return undefined;
  const staffMap = await getStaffNameMap(supabase);
  const householdMap = await getHouseholdNameMap(supabase);
  return mapRowToClient(
    row as Record<string, unknown>,
    staffMap[(row as Record<string, unknown>).assigned_advisor_id as string] ?? "",
    householdMap[(row as Record<string, unknown>).household_id as string]
  );
}

export async function getAllTasks(): Promise<MockTask[]> {
  const supabase = getSupabaseService();
  if (!supabase) return MOCK_TASKS;
  const { data: rows, error } = await supabase.from("tasks").select("*").order("due_date", { ascending: true, nullsFirst: false });
  if (error || !rows?.length) return [];
  const staffMap = await getStaffNameMap(supabase);
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    return mapRowToTask(row, staffMap[row.assigned_to_id as string] ?? "");
  });
}

export async function getTasksForAdvisor(advisorId: string): Promise<MockTask[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetTasksForAdvisor(advisorId);

  const { data: rows, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("assigned_to_id", advisorId)
    .order("due_date", { ascending: true, nullsFirst: false });

  if (error || !rows?.length) {
    if (error) console.error("crm-data getTasksForAdvisor", error);
    return [];
  }
  const staffMap = await getStaffNameMap(supabase);
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    return mapRowToTask(row, staffMap[row.assigned_to_id as string] ?? "");
  });
}

export async function getTasksForLead(leadId: string): Promise<MockTask[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetTasksForLead(leadId);
  const { data: rows, error } = await supabase.from("tasks").select("*").or(`lead_id.eq.${leadId},client_id.eq.${leadId}`).order("due_date", { ascending: true, nullsFirst: false });
  if (error || !rows?.length) return [];
  const staffMap = await getStaffNameMap(supabase);
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    return mapRowToTask(row, staffMap[row.assigned_to_id as string] ?? "");
  });
}

export async function getTasksForClient(clientId: string): Promise<MockTask[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetTasksForClient(clientId);
  const { data: rows, error } = await supabase.from("tasks").select("*").eq("client_id", clientId);
  if (error || !rows?.length) return [];
  const staffMap = await getStaffNameMap(supabase);
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    return mapRowToTask(row, staffMap[row.assigned_to_id as string] ?? "");
  });
}

export async function getCorrespondenceForLead(leadId: string): Promise<MockCorrespondence[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetCorrespondenceForLead(leadId);
  const { data: rows, error } = await supabase.from("correspondence").select("*").eq("lead_id", leadId).order("created_at", { ascending: true });
  if (error || !rows?.length) return [];
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    return {
      id: row.id as string,
      leadId: row.lead_id as string,
      clientId: row.client_id as string | undefined,
      from: (row.from_type as string) as "lead" | "client" | "advisor",
      fromName: row.from_name as string,
      fromStaffId: row.from_staff_id as string | undefined,
      body: row.body as string,
      at: (row.created_at as string) ?? "",
      channel: row.channel as "portal" | "email" | "whatsapp",
    };
  });
}

export async function getCorrespondenceForClient(clientId: string): Promise<MockCorrespondence[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetCorrespondenceForClient(clientId);
  const { data: rows, error } = await supabase.from("correspondence").select("*").eq("client_id", clientId).order("created_at", { ascending: true });
  if (error || !rows?.length) return [];
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    return {
      id: row.id as string,
      leadId: row.lead_id as string,
      clientId: row.client_id as string | undefined,
      from: (row.from_type as string) as "lead" | "client" | "advisor",
      fromName: row.from_name as string,
      fromStaffId: row.from_staff_id as string | undefined,
      body: row.body as string,
      at: (row.created_at as string) ?? "",
      channel: row.channel as "portal" | "email" | "whatsapp",
    };
  });
}

export async function getNotesForLead(leadId: string): Promise<MockNote[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetNotesForLead(leadId);
  const { data: rows, error } = await supabase.from("notes").select("*").eq("lead_id", leadId).order("created_at", { ascending: false });
  if (error || !rows?.length) return [];
  const staffMap = await getStaffNameMap(supabase);
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    return {
      id: row.id as string,
      leadId: row.lead_id as string | undefined,
      clientId: row.client_id as string | undefined,
      authorId: row.author_id as string,
      authorName: staffMap[row.author_id as string] ?? "",
      body: row.body as string,
      at: (row.created_at as string) ?? "",
    };
  });
}

export async function getNotesForClient(clientId: string): Promise<MockNote[]> {
  const supabase = getSupabaseService();
  if (!supabase) return mockGetNotesForClient(clientId);
  const { data: rows, error } = await supabase.from("notes").select("*").eq("client_id", clientId).order("created_at", { ascending: false });
  if (error || !rows?.length) return [];
  const staffMap = await getStaffNameMap(supabase);
  return (rows as unknown[]).map((r) => {
    const row = r as Record<string, unknown>;
    return {
      id: row.id as string,
      leadId: row.lead_id as string | undefined,
      clientId: row.client_id as string | undefined,
      authorId: row.author_id as string,
      authorName: staffMap[row.author_id as string] ?? "",
      body: row.body as string,
      at: (row.created_at as string) ?? "",
    };
  });
}

export async function getCrmStats(advisorId?: string) {
  if (isSupabaseConfigured()) {
    const leads = advisorId ? await getLeadsForAdvisor(advisorId) : await getAllLeads();
    const byStatus = leads.reduce(
      (acc, l) => {
        acc[l.status] = (acc[l.status] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return {
      total: leads.length,
      new: byStatus.new ?? 0,
      contacted: byStatus.contacted ?? 0,
      qualified: byStatus.qualified ?? 0,
      proposal: byStatus.proposal ?? 0,
      closedWon: byStatus.closed_won ?? 0,
      closedLost: byStatus.closed_lost ?? 0,
    };
  }
  return mockGetCrmStats(advisorId);
}

export async function getPipelineByService() {
  if (!isSupabaseConfigured()) return mockGetPipelineByService();
  const leads = await getAllLeads();
  const byService: Record<string, { new: number; contacted: number; qualified: number; proposal: number; won: number; lost: number }> = {};
  for (const lead of leads) {
    if (!byService[lead.serviceCategory]) {
      byService[lead.serviceCategory] = { new: 0, contacted: 0, qualified: 0, proposal: 0, won: 0, lost: 0 };
    }
    const s = lead.serviceCategory;
    if (lead.status === "closed_won") byService[s].won++;
    else if (lead.status === "closed_lost") byService[s].lost++;
    else byService[s][lead.status]++;
  }
  return Object.entries(byService).map(([service, counts]) => ({
    service: SERVICE_LABELS[service as ServiceCategory],
    ...counts,
    total: counts.new + counts.contacted + counts.qualified + counts.proposal + counts.won + counts.lost,
  }));
}

export async function getStaffPerformance() {
  if (!isSupabaseConfigured()) return mockGetStaffPerformance();
  const staffMap = await (async () => {
    const supabase = getSupabaseService();
    if (!supabase) return {};
    const { data } = await supabase.from("staff").select("id, name");
    const m: Record<string, string> = {};
    (data ?? []).forEach((r: { id: string; name: string }) => { m[r.id] = r.name; });
    return m;
  })();
  const leads = await getAllLeads();
  const clients = await getAllClients();
  const byStaff: Record<string, { name: string; leads: number; clients: number }> = {};
  for (const [id, name] of Object.entries(staffMap)) {
    byStaff[id] = { name, leads: 0, clients: 0 };
  }
  for (const l of leads) {
    if (byStaff[l.assignedAdvisorId]) byStaff[l.assignedAdvisorId].leads++;
  }
  for (const c of clients) {
    if (byStaff[c.assignedAdvisorId]) byStaff[c.assignedAdvisorId].clients++;
  }
  return Object.entries(byStaff).map(([id, data]) => ({ id, ...data }));
}

export async function getHighPriorityLeads(threshold = 80) {
  if (!isSupabaseConfigured()) return mockGetHighPriorityLeads(threshold);
  const leads = await getAllLeads();
  return leads
    .filter((l) => l.fitScore >= threshold || l.engagementScore >= threshold)
    .sort((a, b) => b.fitScore + b.engagementScore - (a.fitScore + a.engagementScore))
    .slice(0, 10);
}

/** Update lead status (Kanban drag). Persists to Supabase when configured. */
export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseService();
  if (!supabase) {
    // Mock: no persistence; caller can still update local state
    return { ok: true };
  }
  const { error } = await supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", leadId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export { MOCK_STAFF, MOCK_HOUSEHOLDS };
