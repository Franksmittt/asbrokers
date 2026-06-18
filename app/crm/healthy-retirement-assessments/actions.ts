"use server";

import {
  healthyRetirementAssessmentsToCsv,
  listHealthyRetirementAssessments,
  type HealthyRetirementFilters,
} from "@/lib/healthy-retirement/repository";

export async function exportHealthyRetirementCsv(filters: HealthyRetirementFilters): Promise<string> {
  const rows = await listHealthyRetirementAssessments(filters);
  return healthyRetirementAssessmentsToCsv(rows);
}

export async function fetchHealthyRetirementAssessments(filters: HealthyRetirementFilters) {
  return listHealthyRetirementAssessments(filters);
}
