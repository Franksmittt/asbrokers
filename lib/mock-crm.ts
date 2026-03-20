/**
 * Mock CRM data for development. Aligned with AS Brokers services and team.
 * Replace with Supabase/DB when backend is ready.
 */

export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "closed_won" | "closed_lost";

/** AS Brokers service categories (from solutions hub) */
export type ServiceCategory =
  | "retirement_everest"
  | "short_term_personal"
  | "short_term_business"
  | "life_personal"
  | "life_business"
  | "medical_wellness"
  | "estate_business"
  | "claims";

export const SERVICE_LABELS: Record<ServiceCategory, string> = {
  retirement_everest: "Retirement & Everest",
  short_term_personal: "Short-Term Personal",
  short_term_business: "Short-Term Business",
  life_personal: "Life (Personal)",
  life_business: "Life (Business)",
  medical_wellness: "Medical & Wellness",
  estate_business: "Estate & Business",
  claims: "Claims",
};

export interface MockHousehold {
  id: string;
  name: string;
}

export interface MockLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  intent: string;
  source: string;
  status: LeadStatus;
  fitScore: number;
  engagementScore: number;
  assignedAdvisorId: string;
  assignedAdvisorName: string;
  serviceCategory: ServiceCategory;
  householdId?: string;
  householdName?: string;
  createdAt: string;
  lastActivity: string;
}

/** Converted lead = client record in CRM (policies, documents) */
export interface MockClient {
  id: string;
  leadId: string;
  name: string;
  email: string;
  phone: string;
  assignedAdvisorId: string;
  assignedAdvisorName: string;
  advisorWhatsApp?: string;
  services: ServiceCategory[];
  householdId?: string;
  householdName?: string;
  convertedAt: string;
}

export interface MockCorrespondence {
  id: string;
  leadId: string;
  clientId?: string;
  from: "lead" | "client" | "advisor";
  fromName: string;
  fromStaffId?: string;
  body: string;
  at: string;
  channel: "portal" | "email" | "whatsapp";
}

export interface MockTask {
  id: string;
  leadId?: string;
  clientId?: string;
  title: string;
  dueDate: string;
  assignedToId: string;
  assignedToName: string;
  completed: boolean;
  createdAt: string;
}

export interface MockNote {
  id: string;
  leadId?: string;
  clientId?: string;
  authorId: string;
  authorName: string;
  body: string;
  at: string;
}

export interface MockStaff {
  id: string;
  name: string;
  role: string;
  routingIntent: string[];
  whatsApp?: string;
}

export const MOCK_HOUSEHOLDS: MockHousehold[] = [
  { id: "h1", name: "Botha family" },
  { id: "h2", name: "Van der Berg" },
];

export const MOCK_STAFF: MockStaff[] = [
  { id: "s1", name: "Albert Schuurman", role: "Manager & Key Individual", routingIntent: ["Strategic oversight", "Escalations", "Ultra HNW"], whatsApp: "0672429946" },
  { id: "s2", name: "Elize Schuurman", role: "Director & Head of Negotiations", routingIntent: ["Corporate claim disputes", "Underwriter negotiation"] },
  { id: "s3", name: "Corne Schuurman", role: "IT, Systems & Accounts", routingIntent: ["System alerts", "API integration", "Commission tracking"] },
  { id: "s4", name: "Monique Schuurman", role: "Operations Manager", routingIntent: ["Risk assessments", "Short-term insurance", "Renewals"] },
  { id: "s5", name: "Johnny Farinha", role: "Financial Advisor", routingIntent: ["Business development", "Domestic/commercial/life"], whatsApp: "0672429946" },
  { id: "s6", name: "Petro Vermeulen", role: "Technical Underwriter", routingIntent: ["Commercial underwriting", "Risk assessment"] },
  { id: "s7", name: "Shanel van Niekerk", role: "Specialized Claims Consultant", routingIntent: ["Domestic/commercial claims"] },
  { id: "s8", name: "Sharine van Vollenstee", role: "Medical Aid & Life Assistant", routingIntent: ["Medical aid", "Life onboarding", "Appointments"] },
];

export const MOCK_LEADS: MockLead[] = [
  {
    id: "l1",
    name: "Jan van der Berg",
    email: "jan.vdberg@example.co.za",
    phone: "082 123 4567",
    intent: "Everest Wealth 12.8% Strategic Income",
    source: "Calculator Hub",
    status: "qualified",
    fitScore: 88,
    engagementScore: 72,
    assignedAdvisorId: "s1",
    assignedAdvisorName: "Albert Schuurman",
    serviceCategory: "retirement_everest",
    createdAt: "2026-02-28",
    lastActivity: "2026-03-02",
  },
  {
    id: "l2",
    name: "Sarah Mbeki",
    email: "s.mbeki@example.co.za",
    phone: "083 234 5678",
    intent: "Commercial Liability Cover",
    source: "Contact form",
    status: "new",
    fitScore: 65,
    engagementScore: 45,
    assignedAdvisorId: "s6",
    assignedAdvisorName: "Petro Vermeulen",
    serviceCategory: "short_term_business",
    createdAt: "2026-03-01",
    lastActivity: "2026-03-01",
  },
  {
    id: "l3",
    name: "Pieter and Maria Botha",
    email: "botha.family@example.co.za",
    phone: "071 345 6789",
    intent: "Estate planning & semigration",
    source: "Financial Health Quiz",
    status: "proposal",
    fitScore: 92,
    engagementScore: 90,
    assignedAdvisorId: "s5",
    assignedAdvisorName: "Johnny Farinha",
    serviceCategory: "estate_business",
    householdId: "h1",
    householdName: "Botha family",
    createdAt: "2026-02-20",
    lastActivity: "2026-03-03",
  },
  {
    id: "l4",
    name: "Thabo Nkosi",
    email: "t.nkosi@example.co.za",
    phone: "084 456 7890",
    intent: "Life insurance onboarding",
    source: "Website",
    status: "contacted",
    fitScore: 70,
    engagementScore: 55,
    assignedAdvisorId: "s8",
    assignedAdvisorName: "Sharine van Vollenstee",
    serviceCategory: "life_personal",
    createdAt: "2026-02-25",
    lastActivity: "2026-03-01",
  },
  {
    id: "l5",
    name: "Linda Pretorius",
    email: "linda.p@example.co.za",
    phone: "072 567 8901",
    intent: "Amethyst Living Annuity quote",
    source: "Everest calculator",
    status: "new",
    fitScore: 85,
    engagementScore: 78,
    assignedAdvisorId: "s1",
    assignedAdvisorName: "Albert Schuurman",
    serviceCategory: "retirement_everest",
    createdAt: "2026-03-02",
    lastActivity: "2026-03-02",
  },
  {
    id: "l6",
    name: "Andries Fourie",
    email: "a.fourie@example.co.za",
    phone: "079 678 9012",
    intent: "Home and car insurance renewal",
    source: "Contact form",
    status: "contacted",
    fitScore: 60,
    engagementScore: 40,
    assignedAdvisorId: "s4",
    assignedAdvisorName: "Monique Schuurman",
    serviceCategory: "short_term_personal",
    createdAt: "2026-02-22",
    lastActivity: "2026-03-01",
  },
];

/** Clients = converted leads (closed_won) */
export const MOCK_CLIENTS: MockClient[] = [
  {
    id: "c1",
    leadId: "l1",
    name: "Jan van der Berg",
    email: "jan.vdberg@example.co.za",
    phone: "082 123 4567",
    assignedAdvisorId: "s1",
    assignedAdvisorName: "Albert Schuurman",
    advisorWhatsApp: "0672429946",
    services: ["retirement_everest"],
    householdId: "h2",
    householdName: "Van der Berg",
    convertedAt: "2026-02-15",
  },
];

export const MOCK_CORRESPONDENCE: MockCorrespondence[] = [
  { id: "cor1", leadId: "l1", clientId: "c1", from: "advisor", fromName: "Albert Schuurman", fromStaffId: "s1", body: "Jan, your 12.8% Strategic Income quote is ready. Please review the attached PDF and let me know when you’d like to discuss.", at: "2026-03-01T09:00:00", channel: "email" },
  { id: "cor2", leadId: "l1", clientId: "c1", from: "client", fromName: "Jan van der Berg", body: "Thanks Albert. Can we schedule a call Thursday 2pm?", at: "2026-03-01T14:15:00", channel: "portal" },
  { id: "cor3", leadId: "l1", clientId: "c1", from: "advisor", fromName: "Albert Schuurman", fromStaffId: "s1", body: "Thursday 2pm works. I’ll send a calendar invite. Any questions on the 120-day notice or loyalty bonus?", at: "2026-03-02T08:30:00", channel: "whatsapp" },
  { id: "cor4", leadId: "l3", from: "advisor", fromName: "Johnny Farinha", fromStaffId: "s5", body: "Pieter & Maria – estate plan draft sent. Let’s discuss semigration timeline and trust structure.", at: "2026-03-02T11:00:00", channel: "email" },
  { id: "cor5", leadId: "l4", from: "advisor", fromName: "Sharine van Vollenstee", fromStaffId: "s8", body: "Thabo, please upload your ID and proof of address in the portal for FICA. Link: [portal].", at: "2026-03-01T10:00:00", channel: "whatsapp" },
];

export const MOCK_TASKS: MockTask[] = [
  { id: "t1", leadId: "l1", clientId: "c1", title: "Send 12.8% quote and schedule call", dueDate: "2026-03-05", assignedToId: "s1", assignedToName: "Albert Schuurman", completed: true, createdAt: "2026-02-28" },
  { id: "t2", leadId: "l3", title: "Prepare estate plan proposal", dueDate: "2026-03-08", assignedToId: "s5", assignedToName: "Johnny Farinha", completed: false, createdAt: "2026-03-01" },
  { id: "t3", leadId: "l4", title: "Request FICA documents (ID, proof of address)", dueDate: "2026-03-04", assignedToId: "s8", assignedToName: "Sharine van Vollenstee", completed: false, createdAt: "2026-03-01" },
  { id: "t4", leadId: "l2", title: "Commercial liability risk assessment", dueDate: "2026-03-06", assignedToId: "s6", assignedToName: "Petro Vermeulen", completed: false, createdAt: "2026-03-01" },
  { id: "t5", clientId: "c1", title: "Annual review – Jan van der Berg", dueDate: "2026-04-01", assignedToId: "s1", assignedToName: "Albert Schuurman", completed: false, createdAt: "2026-03-02" },
];

export const MOCK_NOTES: MockNote[] = [
  { id: "n1", leadId: "l1", authorId: "s1", authorName: "Albert Schuurman", body: "High fit score – R1.2m ready for 12.8%. Prefers monthly income over growth. Discuss loyalty bonus at meeting.", at: "2026-03-01T09:30:00" },
  { id: "n2", leadId: "l3", authorId: "s5", authorName: "Johnny Farinha", body: "Semigration from JHB to Cape in 18 months. Estate >R8m. Need will update and trust restructure.", at: "2026-02-21T14:00:00" },
];

export function getLeadsByStatus(status: LeadStatus): MockLead[] {
  return MOCK_LEADS.filter((l) => l.status === status);
}

export function getLeadsForAdvisor(advisorId: string): MockLead[] {
  return MOCK_LEADS.filter((l) => l.assignedAdvisorId === advisorId);
}

export function getLeadById(id: string): MockLead | undefined {
  return MOCK_LEADS.find((l) => l.id === id);
}

export function getClientById(id: string): MockClient | undefined {
  return MOCK_CLIENTS.find((c) => c.id === id);
}

export function getClientByLeadId(leadId: string): MockClient | undefined {
  return MOCK_CLIENTS.find((c) => c.leadId === leadId);
}

export function getHouseholdById(id: string): MockHousehold | undefined {
  return MOCK_HOUSEHOLDS.find((h) => h.id === id);
}

export function getLeadsByHousehold(householdId: string): MockLead[] {
  return MOCK_LEADS.filter((l) => l.householdId === householdId);
}

export function getClientsByHousehold(householdId: string): MockClient[] {
  return MOCK_CLIENTS.filter((c) => c.householdId === householdId);
}

/** Filter leads by service category (pass undefined to skip filter) */
export function getLeadsByService(leads: MockLead[], service?: ServiceCategory): MockLead[] {
  if (!service) return leads;
  return leads.filter((l) => l.serviceCategory === service);
}

export function getClientsForAdvisor(advisorId: string): MockClient[] {
  return MOCK_CLIENTS.filter((c) => c.assignedAdvisorId === advisorId);
}

export function getCorrespondenceForLead(leadId: string): MockCorrespondence[] {
  return MOCK_CORRESPONDENCE.filter((c) => c.leadId === leadId).sort((a, b) => a.at.localeCompare(b.at));
}

export function getCorrespondenceForClient(clientId: string): MockCorrespondence[] {
  return MOCK_CORRESPONDENCE.filter((c) => c.clientId === clientId).sort((a, b) => a.at.localeCompare(b.at));
}

export function getTasksForLead(leadId: string): MockTask[] {
  return MOCK_TASKS.filter((t) => t.leadId === leadId || t.clientId === leadId);
}

export function getTasksForClient(clientId: string): MockTask[] {
  return MOCK_TASKS.filter((t) => t.clientId === clientId);
}

export function getTasksForAdvisor(advisorId: string): MockTask[] {
  return MOCK_TASKS.filter((t) => t.assignedToId === advisorId);
}

export function getNotesForLead(leadId: string): MockNote[] {
  return MOCK_NOTES.filter((n) => n.leadId === leadId).sort((a, b) => b.at.localeCompare(a.at));
}

export function getNotesForClient(clientId: string): MockNote[] {
  return MOCK_NOTES.filter((n) => n.clientId === clientId).sort((a, b) => b.at.localeCompare(a.at));
}

export function getCrmStats(advisorId?: string) {
  const leads = advisorId ? getLeadsForAdvisor(advisorId) : MOCK_LEADS;
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

export function getStaffById(id: string): MockStaff | undefined {
  return MOCK_STAFF.find((s) => s.id === id);
}

/** Executive: pipeline by service (for charts) */
export function getPipelineByService() {
  const byService: Record<string, { new: number; contacted: number; qualified: number; proposal: number; won: number; lost: number }> = {};
  for (const lead of MOCK_LEADS) {
    if (!byService[lead.serviceCategory]) {
      byService[lead.serviceCategory] = { new: 0, contacted: 0, qualified: 0, proposal: 0, won: 0, lost: 0 };
    }
    byService[lead.serviceCategory][lead.status === "closed_won" ? "won" : lead.status === "closed_lost" ? "lost" : lead.status]++;
  }
  return Object.entries(byService).map(([service, counts]) => ({
    service: SERVICE_LABELS[service as ServiceCategory],
    ...counts,
    total: counts.new + counts.contacted + counts.qualified + counts.proposal + counts.won + counts.lost,
  }));
}

/** Executive: staff performance (leads assigned, clients converted) */
export function getStaffPerformance() {
  const byStaff: Record<string, { name: string; leads: number; clients: number }> = {};
  for (const s of MOCK_STAFF) {
    byStaff[s.id] = { name: s.name, leads: 0, clients: 0 };
  }
  for (const l of MOCK_LEADS) {
    if (byStaff[l.assignedAdvisorId]) byStaff[l.assignedAdvisorId].leads++;
  }
  for (const c of MOCK_CLIENTS) {
    if (byStaff[c.assignedAdvisorId]) byStaff[c.assignedAdvisorId].clients++;
  }
  return Object.entries(byStaff).map(([id, data]) => ({ id, ...data }));
}

/** Executive: high-priority leads (high fit + engagement) */
export function getHighPriorityLeads(threshold = 80) {
  return MOCK_LEADS.filter((l) => l.fitScore >= threshold || l.engagementScore >= threshold)
    .sort((a, b) => (b.fitScore + b.engagementScore) - (a.fitScore + a.engagementScore))
    .slice(0, 10);
}
