"use server";

import {
  businessRiskReviewsToCsv,
  listBusinessRiskReviews,
  type BusinessRiskReviewFilters,
} from "@/lib/business-risk/repository";

export async function exportBusinessRiskReviewsCsv(filters: BusinessRiskReviewFilters): Promise<string> {
  const rows = await listBusinessRiskReviews(filters);
  return businessRiskReviewsToCsv(rows);
}

export async function fetchBusinessRiskReviews(filters: BusinessRiskReviewFilters) {
  return listBusinessRiskReviews(filters);
}
