import "server-only";

import { and, desc, eq, gte, ilike, lte, or } from "drizzle-orm";

import { getDb, healthyRetirementAssessments, type HealthyRetirementAssessment } from "@/lib/db";
import type { HealthyRetirementAnswers } from "@/lib/healthy-retirement/questions";

export async function insertHealthyRetirementAssessment(data: {
  firstName: string;
  email: string;
  phone?: string;
  answers: HealthyRetirementAnswers;
  healthScore: number;
  healthGap: number;
  scoreBand: string;
}): Promise<string | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db
    .insert(healthyRetirementAssessments)
    .values({
      firstName: data.firstName,
      email: data.email,
      phone: data.phone ?? null,
      answers: data.answers,
      healthScore: data.healthScore,
      healthGap: data.healthGap,
      scoreBand: data.scoreBand,
    })
    .returning({ id: healthyRetirementAssessments.id });

  return row?.id ?? null;
}

export async function getHealthyRetirementAssessmentById(
  id: string
): Promise<HealthyRetirementAssessment | null> {
  const db = getDb();
  if (!db) return null;
  const [row] = await db
    .select()
    .from(healthyRetirementAssessments)
    .where(eq(healthyRetirementAssessments.id, id))
    .limit(1);
  return row ?? null;
}

export type HealthyRetirementFilters = {
  query?: string;
  band?: string;
  fromDate?: string;
  toDate?: string;
};

export async function listHealthyRetirementAssessments(
  filters: HealthyRetirementFilters = {}
): Promise<HealthyRetirementAssessment[]> {
  const db = getDb();
  if (!db) return [];

  const conditions = [];

  if (filters.query?.trim()) {
    const q = `%${filters.query.trim()}%`;
    conditions.push(
      or(
        ilike(healthyRetirementAssessments.firstName, q),
        ilike(healthyRetirementAssessments.email, q),
        ilike(healthyRetirementAssessments.phone, q)
      )
    );
  }
  if (filters.band && filters.band !== "all") {
    conditions.push(eq(healthyRetirementAssessments.scoreBand, filters.band));
  }
  if (filters.fromDate) {
    conditions.push(gte(healthyRetirementAssessments.createdAt, new Date(`${filters.fromDate}T00:00:00`)));
  }
  if (filters.toDate) {
    conditions.push(lte(healthyRetirementAssessments.createdAt, new Date(`${filters.toDate}T23:59:59`)));
  }

  const where = conditions.length ? and(...conditions) : undefined;
  try {
    return await db
      .select()
      .from(healthyRetirementAssessments)
      .where(where)
      .orderBy(desc(healthyRetirementAssessments.createdAt))
      .limit(500);
  } catch (error) {
    console.error("[CRM] listHealthyRetirementAssessments failed:", error);
    return [];
  }
}

export function healthyRetirementAssessmentsToCsv(rows: HealthyRetirementAssessment[]): string {
  const header = "id,first_name,email,phone,health_score,health_gap,score_band,source,created_at";
  const lines = rows.map((row) =>
    [
      row.id,
      csvEscape(row.firstName),
      csvEscape(row.email),
      csvEscape(row.phone ?? ""),
      row.healthScore,
      row.healthGap,
      csvEscape(row.scoreBand),
      csvEscape(row.source),
      row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
    ].join(",")
  );
  return [header, ...lines].join("\n");
}

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
