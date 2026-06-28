import { KANBAN_COLUMNS, type CrmLead, type LeadStatus } from "@/lib/crm/types";

export function formatLeadStatus(status: LeadStatus): string {
  return KANBAN_COLUMNS.find((c) => c.status === status)?.label ?? status;
}

export function formatPipelineCurrency(value: number): string {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `R ${grouped}`;
}

export function sumColumnCapital(leadsInColumn: CrmLead[]): number {
  return leadsInColumn.reduce((sum, lead) => sum + lead.estimatedCapital, 0);
}

export function sanitizeLeadPhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `27${digits.slice(1)}`;
  if (digits.startsWith("27")) return digits;
  return digits;
}

export function computeConversionRate(visibleLeads: CrmLead[]): number {
  const won = visibleLeads.filter((l) => l.status === "won").length;
  const closed = visibleLeads.filter((l) => l.status === "won" || l.status === "lost").length;
  if (closed === 0) return 0;
  return Math.round((won / closed) * 100);
}

export function getCrmStatsFromLeads(
  visibleLeads: CrmLead[],
  openTasks: number,
  clients: number
) {
  const byStatus = KANBAN_COLUMNS.reduce(
    (acc, col) => {
      acc[col.status] = visibleLeads.filter((l) => l.status === col.status).length;
      return acc;
    },
    {} as Record<LeadStatus, number>
  );
  return {
    totalLeads: visibleLeads.length,
    byStatus,
    openTasks,
    clients,
  };
}

export function formatAdvisorLabel(advisorId: string | null | undefined): string {
  if (!advisorId) return "Unassigned";
  return `Advisor · ${advisorId.slice(0, 8)}`;
}

/** Resolve kanban column status at screen coordinates using column bounds. */
export function resolveKanbanStatusAtPoint(point: {
  x: number;
  y: number;
}): LeadStatus | undefined {
  if (typeof document === "undefined") return undefined;

  const columns = document.querySelectorAll<HTMLElement>("[data-kanban-column]");
  for (const column of columns) {
    const rect = column.getBoundingClientRect();
    if (
      point.x >= rect.left &&
      point.x <= rect.right &&
      point.y >= rect.top &&
      point.y <= rect.bottom
    ) {
      return column.dataset.status as LeadStatus;
    }
  }
  return undefined;
}
