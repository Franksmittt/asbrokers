import type { CrmLead, LeadStatus } from "@/lib/crm/types";

export type CrmDashboardStats = {
  totalLeads: number;
  byStatus: Record<LeadStatus, number>;
  openTasks: number;
  clients: number;
};

export function getCrmStats(visibleLeads: CrmLead[], openTasks: number, clients: number): CrmDashboardStats {
  const byStatus = {
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal: 0,
    won: 0,
    lost: 0,
  } satisfies Record<LeadStatus, number>;

  for (const lead of visibleLeads) {
    byStatus[lead.status] += 1;
  }

  return {
    totalLeads: visibleLeads.length,
    byStatus,
    openTasks,
    clients,
  };
}
