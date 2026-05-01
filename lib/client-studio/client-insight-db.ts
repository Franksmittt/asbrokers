import "server-only";

import { and, desc, eq } from "drizzle-orm";

import type { Db } from "@/lib/db";
import { clientInsightPosts } from "@/lib/db";
import { isMissingCalculatorColumnsError } from "@/lib/db/pg-error-chain";

export type ClientInsightPostRow = typeof clientInsightPosts.$inferSelect;

/** Columns that exist before optional calculator_name / calculator_code migration. */
const LEGACY_COLUMNS = {
  id: clientInsightPosts.id,
  slug: clientInsightPosts.slug,
  locale: clientInsightPosts.locale,
  title: clientInsightPosts.title,
  excerpt: clientInsightPosts.excerpt,
  bodyHtml: clientInsightPosts.bodyHtml,
  bodyHtmlPublished: clientInsightPosts.bodyHtmlPublished,
  status: clientInsightPosts.status,
  metaTitle: clientInsightPosts.metaTitle,
  metaDescription: clientInsightPosts.metaDescription,
  publishedAt: clientInsightPosts.publishedAt,
  createdAt: clientInsightPosts.createdAt,
  updatedAt: clientInsightPosts.updatedAt,
} as const;

type LegacyRow = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  excerpt: string | null;
  bodyHtml: string;
  bodyHtmlPublished: string | null;
  status: string;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function withNullCalculators(row: LegacyRow): ClientInsightPostRow {
  return { ...row, calculatorName: null, calculatorCode: null };
}

let hasCalculatorColumns: boolean | null = null;

export async function listAllClientInsightPosts(db: Db): Promise<ClientInsightPostRow[]> {
  if (hasCalculatorColumns === false) {
    const rows = await db
      .select(LEGACY_COLUMNS)
      .from(clientInsightPosts)
      .orderBy(desc(clientInsightPosts.updatedAt));
    return rows.map(withNullCalculators);
  }
  try {
    const rows = await db.select().from(clientInsightPosts).orderBy(desc(clientInsightPosts.updatedAt));
    hasCalculatorColumns = true;
    return rows;
  } catch (e) {
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const rows = await db
      .select(LEGACY_COLUMNS)
      .from(clientInsightPosts)
      .orderBy(desc(clientInsightPosts.updatedAt));
    return rows.map(withNullCalculators);
  }
}

export async function listPublishedClientInsightPosts(db: Db): Promise<ClientInsightPostRow[]> {
  if (hasCalculatorColumns === false) {
    const rows = await db
      .select(LEGACY_COLUMNS)
      .from(clientInsightPosts)
      .where(eq(clientInsightPosts.status, "published"))
      .orderBy(desc(clientInsightPosts.publishedAt));
    return rows.map(withNullCalculators);
  }
  try {
    const rows = await db
      .select()
      .from(clientInsightPosts)
      .where(eq(clientInsightPosts.status, "published"))
      .orderBy(desc(clientInsightPosts.publishedAt));
    hasCalculatorColumns = true;
    return rows;
  } catch (e) {
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const rows = await db
      .select(LEGACY_COLUMNS)
      .from(clientInsightPosts)
      .where(eq(clientInsightPosts.status, "published"))
      .orderBy(desc(clientInsightPosts.publishedAt));
    return rows.map(withNullCalculators);
  }
}

export async function getClientInsightPostById(db: Db, id: string): Promise<ClientInsightPostRow | null> {
  if (hasCalculatorColumns === false) {
    const rows = await db
      .select(LEGACY_COLUMNS)
      .from(clientInsightPosts)
      .where(eq(clientInsightPosts.id, id))
      .limit(1);
    return rows[0] ? withNullCalculators(rows[0]) : null;
  }
  try {
    const rows = await db.select().from(clientInsightPosts).where(eq(clientInsightPosts.id, id)).limit(1);
    hasCalculatorColumns = true;
    return rows[0] ?? null;
  } catch (e) {
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const rows = await db
      .select(LEGACY_COLUMNS)
      .from(clientInsightPosts)
      .where(eq(clientInsightPosts.id, id))
      .limit(1);
    return rows[0] ? withNullCalculators(rows[0]) : null;
  }
}

export async function getPublishedClientInsightPostBySlug(
  db: Db,
  slug: string,
  locale: string
): Promise<ClientInsightPostRow | null> {
  if (hasCalculatorColumns === false) {
    const rows = await db
      .select(LEGACY_COLUMNS)
      .from(clientInsightPosts)
      .where(
        and(
          eq(clientInsightPosts.slug, slug),
          eq(clientInsightPosts.locale, locale),
          eq(clientInsightPosts.status, "published")
        )
      )
      .limit(1);
    const row = rows[0];
    if (!row?.bodyHtmlPublished) return null;
    return withNullCalculators(row);
  }
  try {
    const rows = await db
      .select()
      .from(clientInsightPosts)
      .where(
        and(
          eq(clientInsightPosts.slug, slug),
          eq(clientInsightPosts.locale, locale),
          eq(clientInsightPosts.status, "published")
        )
      )
      .limit(1);
    hasCalculatorColumns = true;
    const row = rows[0];
    if (!row?.bodyHtmlPublished) return null;
    return row;
  } catch (e) {
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const rows = await db
      .select(LEGACY_COLUMNS)
      .from(clientInsightPosts)
      .where(
        and(
          eq(clientInsightPosts.slug, slug),
          eq(clientInsightPosts.locale, locale),
          eq(clientInsightPosts.status, "published")
        )
      )
      .limit(1);
    const row = rows[0];
    if (!row?.bodyHtmlPublished) return null;
    return withNullCalculators(row);
  }
}

type WritablePostFields = {
  title: string;
  slug: string;
  locale: "en" | "af";
  excerpt: string | null;
  bodyHtml: string;
  metaTitle: string | null;
  metaDescription: string | null;
  calculatorName: string | null;
  calculatorCode: string | null;
};

export async function updateClientInsightPostCompat(
  db: Db,
  id: string,
  v: WritablePostFields,
  updatedAt: Date
): Promise<void> {
  const base = {
    title: v.title,
    slug: v.slug,
    locale: v.locale,
    excerpt: v.excerpt,
    bodyHtml: v.bodyHtml,
    metaTitle: v.metaTitle,
    metaDescription: v.metaDescription,
    updatedAt,
  };
  const withCalc = {
    ...base,
    calculatorName: v.calculatorName,
    calculatorCode: v.calculatorCode,
  };
  if (hasCalculatorColumns === false) {
    await db.update(clientInsightPosts).set(base).where(eq(clientInsightPosts.id, id));
    return;
  }
  if (hasCalculatorColumns === true) {
    await db.update(clientInsightPosts).set(withCalc).where(eq(clientInsightPosts.id, id));
    return;
  }
  try {
    await db.update(clientInsightPosts).set(withCalc).where(eq(clientInsightPosts.id, id));
    hasCalculatorColumns = true;
  } catch (e) {
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    await db.update(clientInsightPosts).set(base).where(eq(clientInsightPosts.id, id));
  }
}

export async function insertClientInsightPostCompat(
  db: Db,
  v: WritablePostFields,
  updatedAt: Date
): Promise<string> {
  const base = {
    title: v.title,
    slug: v.slug,
    locale: v.locale,
    excerpt: v.excerpt,
    bodyHtml: v.bodyHtml,
    metaTitle: v.metaTitle,
    metaDescription: v.metaDescription,
    status: "draft" as const,
    updatedAt,
  };
  const withCalc = {
    ...base,
    calculatorName: v.calculatorName,
    calculatorCode: v.calculatorCode,
  };
  if (hasCalculatorColumns === false) {
    const inserted = await db.insert(clientInsightPosts).values(base).returning({ id: clientInsightPosts.id });
    const newId = inserted[0]?.id;
    if (!newId) throw new Error("Insert returned no id");
    return newId;
  }
  if (hasCalculatorColumns === true) {
    const inserted = await db.insert(clientInsightPosts).values(withCalc).returning({ id: clientInsightPosts.id });
    const newId = inserted[0]?.id;
    if (!newId) throw new Error("Insert returned no id");
    return newId;
  }
  try {
    const inserted = await db.insert(clientInsightPosts).values(withCalc).returning({ id: clientInsightPosts.id });
    hasCalculatorColumns = true;
    const newId = inserted[0]?.id;
    if (!newId) throw new Error("Insert returned no id");
    return newId;
  } catch (e) {
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const inserted = await db.insert(clientInsightPosts).values(base).returning({ id: clientInsightPosts.id });
    const newId = inserted[0]?.id;
    if (!newId) throw new Error("Insert returned no id");
    return newId;
  }
}
