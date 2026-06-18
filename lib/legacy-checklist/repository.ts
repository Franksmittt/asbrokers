import "server-only";

import { desc, eq, and, gte, lte, ilike, or } from "drizzle-orm";

import { getDb, legacyChecklistLeads, type LegacyChecklistLead } from "@/lib/db";

export async function insertLegacyChecklistLead(data: {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  age?: number;
  businessOwner?: "yes" | "no";
}): Promise<string | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db
    .insert(legacyChecklistLeads)
    .values({
      firstName: data.firstName,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      age: data.age ?? null,
      businessOwner: data.businessOwner ?? null,
    })
    .returning({ id: legacyChecklistLeads.id });

  return row?.id ?? null;
}

export async function getLegacyChecklistLeadById(id: string): Promise<LegacyChecklistLead | null> {
  const db = getDb();
  if (!db) return null;
  const [row] = await db.select().from(legacyChecklistLeads).where(eq(legacyChecklistLeads.id, id)).limit(1);
  return row ?? null;
}

export async function listLegacyChecklistLeads(): Promise<LegacyChecklistLead[]> {
  const db = getDb();
  if (!db) return [];
  return db.select().from(legacyChecklistLeads).orderBy(desc(legacyChecklistLeads.createdAt)).limit(500);
}

export type LegacyChecklistLeadFilters = {
  query?: string;
  businessOwner?: string;
  fromDate?: string;
  toDate?: string;
};

export async function listLegacyChecklistLeadsFiltered(
  filters: LegacyChecklistLeadFilters = {}
): Promise<LegacyChecklistLead[]> {
  const db = getDb();
  if (!db) return [];

  const conditions = [];

  if (filters.query?.trim()) {
    const q = `%${filters.query.trim()}%`;
    conditions.push(
      or(
        ilike(legacyChecklistLeads.firstName, q),
        ilike(legacyChecklistLeads.surname, q),
        ilike(legacyChecklistLeads.email, q),
        ilike(legacyChecklistLeads.phone, q)
      )
    );
  }
  if (filters.businessOwner && filters.businessOwner !== "all") {
    conditions.push(eq(legacyChecklistLeads.businessOwner, filters.businessOwner));
  }
  if (filters.fromDate) {
    conditions.push(gte(legacyChecklistLeads.createdAt, new Date(`${filters.fromDate}T00:00:00`)));
  }
  if (filters.toDate) {
    conditions.push(lte(legacyChecklistLeads.createdAt, new Date(`${filters.toDate}T23:59:59`)));
  }

  const where = conditions.length ? and(...conditions) : undefined;
  return db
    .select()
    .from(legacyChecklistLeads)
    .where(where)
    .orderBy(desc(legacyChecklistLeads.createdAt))
    .limit(500);
}

export function legacyChecklistLeadsToCsv(rows: LegacyChecklistLead[]): string {
  const header = "id,first_name,surname,email,phone,age,business_owner,source,created_at";
  const lines = rows.map((row) =>
    [
      row.id,
      csvEscape(row.firstName),
      csvEscape(row.surname),
      csvEscape(row.email),
      csvEscape(row.phone),
      row.age ?? "",
      row.businessOwner ?? "",
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
