import "server-only";

import { and, desc, eq, gte, ilike, lte, or } from "drizzle-orm";

import { getDb, businessRiskReviews, type BusinessRiskReview } from "@/lib/db";

export async function insertBusinessRiskReview(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  coverageScore: number;
  totalItems: number;
  protectionPercent: number;
  gapCount: number;
  protectionBand: string;
  selectedCoverIds: string[];
  missingCoverIds: string[];
}): Promise<string | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db
    .insert(businessRiskReviews)
    .values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      industry: data.industry,
      coverageScore: data.coverageScore,
      totalItems: data.totalItems,
      protectionPercent: data.protectionPercent,
      gapCount: data.gapCount,
      protectionBand: data.protectionBand,
      selectedCoverIds: data.selectedCoverIds,
      missingCoverIds: data.missingCoverIds,
    })
    .returning({ id: businessRiskReviews.id });

  return row?.id ?? null;
}

export async function getBusinessRiskReviewById(id: string): Promise<BusinessRiskReview | null> {
  const db = getDb();
  if (!db) return null;
  const [row] = await db.select().from(businessRiskReviews).where(eq(businessRiskReviews.id, id)).limit(1);
  return row ?? null;
}

export type BusinessRiskReviewFilters = {
  query?: string;
  industry?: string;
  minScore?: number;
  maxScore?: number;
  fromDate?: string;
  toDate?: string;
};

export async function listBusinessRiskReviews(filters: BusinessRiskReviewFilters = {}): Promise<BusinessRiskReview[]> {
  const db = getDb();
  if (!db) return [];

  const conditions = [];

  if (filters.query?.trim()) {
    const q = `%${filters.query.trim()}%`;
    conditions.push(
      or(
        ilike(businessRiskReviews.name, q),
        ilike(businessRiskReviews.email, q),
        ilike(businessRiskReviews.company, q),
        ilike(businessRiskReviews.phone, q)
      )
    );
  }
  if (filters.industry && filters.industry !== "all") {
    conditions.push(eq(businessRiskReviews.industry, filters.industry));
  }
  if (typeof filters.minScore === "number") {
    conditions.push(gte(businessRiskReviews.coverageScore, filters.minScore));
  }
  if (typeof filters.maxScore === "number") {
    conditions.push(lte(businessRiskReviews.coverageScore, filters.maxScore));
  }
  if (filters.fromDate) {
    conditions.push(gte(businessRiskReviews.createdAt, new Date(filters.fromDate)));
  }
  if (filters.toDate) {
    conditions.push(lte(businessRiskReviews.createdAt, new Date(`${filters.toDate}T23:59:59`)));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  try {
    return await db
      .select()
      .from(businessRiskReviews)
      .where(whereClause)
      .orderBy(desc(businessRiskReviews.createdAt))
      .limit(500);
  } catch (error) {
    console.error("[CRM] listBusinessRiskReviews failed:", error);
    return [];
  }
}

export function businessRiskReviewsToCsv(rows: BusinessRiskReview[]): string {
  const header = [
    "id",
    "created_at",
    "name",
    "email",
    "phone",
    "company",
    "industry",
    "coverage_score",
    "total_items",
    "protection_percent",
    "gap_count",
    "protection_band",
    "selected_cover_ids",
    "missing_cover_ids",
  ];
  const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = rows.map((row) =>
    [
      row.id,
      row.createdAt.toISOString(),
      row.name,
      row.email,
      row.phone,
      row.company,
      row.industry,
      row.coverageScore,
      row.totalItems,
      row.protectionPercent,
      row.gapCount,
      row.protectionBand,
      JSON.stringify(row.selectedCoverIds),
      JSON.stringify(row.missingCoverIds),
    ]
      .map(escape)
      .join(",")
  );
  return [header.join(","), ...lines].join("\n");
}
