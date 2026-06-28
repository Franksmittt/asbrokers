import type { CrmStaffPermissions } from "@/lib/crm/permissions";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "won"
  | "lost";

export type ServiceCategory =
  | "retirement_everest"
  | "short_term_business"
  | "estate_business"
  | "short_term_personal"
  | "life_personal"
  | "medical_wellness"
  | "claims";

export type CorrespondenceChannel = "whatsapp" | "email" | "portal";

export type CrmRole = "admin" | "staff";

export type LeadFunnelData = {
  assessment: string;
  score: string;
  keyRisk: string;
  capital: string;
};

export type CrmLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  intent: string;
  service_category: ServiceCategory;
  lead_score: number;
  assignedAdvisorId: string;
  company?: string;
  capitalHint?: string;
  estimatedCapital: number;
  funnelData: LeadFunnelData;
};

export type CrmGlobalNote = {
  id: string;
  content: string;
  timestamp: string;
  authorId: string;
};

export type CrmReminder = {
  id: string;
  leadId: string;
  title: string;
  dueDate: string;
  isCompleted: boolean;
};

export type CrmClient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_category: ServiceCategory;
  aum: number;
  assignedAdvisorId: string;
  convertedFromLeadId?: string;
};

export type CrmCorrespondence = {
  id: string;
  leadId?: string;
  channel: CorrespondenceChannel;
  from: string;
  body: string;
  sentAt: string;
  senderType: "client" | "staff" | "system";
};

export type CrmTask = {
  id: string;
  title: string;
  dueDate: string;
  leadId?: string;
  assignedAdvisorId: string;
  completed: boolean;
};

export type LeadDetails = {
  lead: CrmLead;
  correspondence: CrmCorrespondence[];
  reminders: CrmReminder[];
  tasks: CrmTask[];
};

export const KANBAN_COLUMNS: { status: LeadStatus; label: string }[] = [
  { status: "new", label: "New" },
  { status: "contacted", label: "Contacted" },
  { status: "qualified", label: "Qualified" },
  { status: "proposal", label: "Proposal" },
  { status: "won", label: "Won" },
  { status: "lost", label: "Lost" },
];

export type WhatsAppInboxRow = {
  lead: CrmLead;
  lastMessage: CrmCorrespondence | null;
  messageCount: number;
};

export type CrmStaffUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: CrmRole;
  isActive: boolean;
  permissions: CrmStaffPermissions;
  createdAt: string;
  lastSignInAt: string | null;
  invitePending: boolean;
};

export const SERVICE_LABELS: Record<ServiceCategory, string> = {
  retirement_everest: "Retirement & Everest",
  short_term_business: "Short-Term Business",
  estate_business: "Estate & Business",
  short_term_personal: "Short-Term Personal",
  life_personal: "Life Personal",
  medical_wellness: "Medical & Wellness",
  claims: "Claims",
};
