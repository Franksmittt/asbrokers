"use server";

import {
  legacyChecklistLeadsToCsv,
  listLegacyChecklistLeadsFiltered,
  type LegacyChecklistLeadFilters,
} from "@/lib/legacy-checklist/repository";

export async function exportLegacyChecklistLeadsCsv(filters: LegacyChecklistLeadFilters): Promise<string> {
  const rows = await listLegacyChecklistLeadsFiltered(filters);
  return legacyChecklistLeadsToCsv(rows);
}

export async function fetchLegacyChecklistLeads(filters: LegacyChecklistLeadFilters) {
  return listLegacyChecklistLeadsFiltered(filters);
}
