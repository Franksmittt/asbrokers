import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { ensureClientInsightPostSchema } from "@/lib/client-studio/client-insight-schema";
import type { Db } from "@/lib/db";
import { clientInsightPosts } from "@/lib/db";
import { isMissingCalculatorColumnsError, isMissingCategoriesColumnError } from "@/lib/db/pg-error-chain";
import { resolveInsightCategories } from "@/lib/insights/insightCategories";

export type ClientInsightPostRow = typeof clientInsightPosts.$inferSelect;

/** Columns before optional calculator/hero migrations. */
const CORE_LEGACY_COLUMNS = {
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

const LEGACY_COLUMNS_WITH_CATEGORIES = {
  ...CORE_LEGACY_COLUMNS,
  categories: clientInsightPosts.categories,
} as const;

type CoreLegacyRow = {
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

type LegacyRow = CoreLegacyRow & {
  categories?: unknown;
};

function withNullCalculators(row: LegacyRow): ClientInsightPostRow {
  return {
    ...row,
    categories: resolveInsightCategories(
      row.categories,
      row.bodyHtml,
      row.bodyHtmlPublished
    ) as ClientInsightPostRow["categories"],
    calculatorName: null,
    calculatorCode: null,
    heroImageUrl: null,
  };
}

let hasCalculatorColumns: boolean | null = null;
let hasCategoriesColumn: boolean | null = null;

async function prepareSchemaBestEffort(db: Db): Promise<void> {
  try {
    await ensureClientInsightPostSchema(db);
    hasCalculatorColumns = true;
    hasCategoriesColumn = true;
  } catch {
    // Legacy fallbacks below keep the studio usable when the DB role cannot run DDL.
  }
}

function mapFullRow(row: ClientInsightPostRow): ClientInsightPostRow {
  return {
    ...row,
    categories: resolveInsightCategories(
      row.categories,
      row.bodyHtml,
      row.bodyHtmlPublished
    ) as ClientInsightPostRow["categories"],
  };
}

async function selectLegacyRows(
  db: Db,
  options?: { where?: ReturnType<typeof and>; orderBy?: ReturnType<typeof desc> }
): Promise<LegacyRow[]> {
  const columns = hasCategoriesColumn === false ? CORE_LEGACY_COLUMNS : LEGACY_COLUMNS_WITH_CATEGORIES;
  let query = db.select(columns).from(clientInsightPosts).$dynamic();
  if (options?.where) query = query.where(options.where);
  if (options?.orderBy) query = query.orderBy(options.orderBy);
  return (await query) as LegacyRow[];
}

export async function listAllClientInsightPosts(db: Db): Promise<ClientInsightPostRow[]> {
  await prepareSchemaBestEffort(db);
  if (hasCalculatorColumns === false) {
    const rows = await selectLegacyRows(db, { orderBy: desc(clientInsightPosts.updatedAt) });
    return rows.map(withNullCalculators);
  }
  try {
    const rows = await db.select().from(clientInsightPosts).orderBy(desc(clientInsightPosts.updatedAt));
    hasCalculatorColumns = true;
    hasCategoriesColumn = true;
    return rows.map(mapFullRow);
  } catch (e) {
    if (isMissingCategoriesColumnError(e)) {
      hasCategoriesColumn = false;
      const rows = await selectLegacyRows(db, { orderBy: desc(clientInsightPosts.updatedAt) });
      return rows.map(withNullCalculators);
    }
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const rows = await selectLegacyRows(db, { orderBy: desc(clientInsightPosts.updatedAt) });
    return rows.map(withNullCalculators);
  }
}

export async function listPublishedClientInsightPosts(db: Db): Promise<ClientInsightPostRow[]> {
  await prepareSchemaBestEffort(db);
  const publishedWhere = eq(clientInsightPosts.status, "published");
  if (hasCalculatorColumns === false) {
    const rows = await selectLegacyRows(db, {
      where: publishedWhere,
      orderBy: desc(clientInsightPosts.publishedAt),
    });
    return rows.map(withNullCalculators);
  }
  try {
    const rows = await db
      .select()
      .from(clientInsightPosts)
      .where(publishedWhere)
      .orderBy(desc(clientInsightPosts.publishedAt));
    hasCalculatorColumns = true;
    hasCategoriesColumn = true;
    return rows.map(mapFullRow);
  } catch (e) {
    if (isMissingCategoriesColumnError(e)) {
      hasCategoriesColumn = false;
      const rows = await selectLegacyRows(db, {
        where: publishedWhere,
        orderBy: desc(clientInsightPosts.publishedAt),
      });
      return rows.map(withNullCalculators);
    }
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const rows = await selectLegacyRows(db, {
      where: publishedWhere,
      orderBy: desc(clientInsightPosts.publishedAt),
    });
    return rows.map(withNullCalculators);
  }
}

export async function getClientInsightPostById(db: Db, id: string): Promise<ClientInsightPostRow | null> {
  await prepareSchemaBestEffort(db);
  const idWhere = eq(clientInsightPosts.id, id);
  if (hasCalculatorColumns === false) {
    const rows = await selectLegacyRows(db, { where: idWhere });
    return rows[0] ? withNullCalculators(rows[0]) : null;
  }
  try {
    const rows = await db.select().from(clientInsightPosts).where(idWhere).limit(1);
    hasCalculatorColumns = true;
    hasCategoriesColumn = true;
    return rows[0] ? mapFullRow(rows[0]) : null;
  } catch (e) {
    if (isMissingCategoriesColumnError(e)) {
      hasCategoriesColumn = false;
      const rows = await selectLegacyRows(db, { where: idWhere });
      return rows[0] ? withNullCalculators(rows[0]) : null;
    }
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const rows = await selectLegacyRows(db, { where: idWhere });
    return rows[0] ? withNullCalculators(rows[0]) : null;
  }
}

export async function getPublishedClientInsightPostBySlug(
  db: Db,
  slug: string,
  locale: string
): Promise<ClientInsightPostRow | null> {
  await prepareSchemaBestEffort(db);
  const slugWhere = and(
    eq(clientInsightPosts.slug, slug),
    eq(clientInsightPosts.locale, locale),
    eq(clientInsightPosts.status, "published")
  );
  if (hasCalculatorColumns === false) {
    const rows = await selectLegacyRows(db, { where: slugWhere });
    const row = rows[0];
    if (!row?.bodyHtmlPublished) return null;
    return withNullCalculators(row);
  }
  try {
    const rows = await db.select().from(clientInsightPosts).where(slugWhere).limit(1);
    hasCalculatorColumns = true;
    hasCategoriesColumn = true;
    const row = rows[0];
    if (!row?.bodyHtmlPublished) return null;
    return mapFullRow(row);
  } catch (e) {
    if (isMissingCategoriesColumnError(e)) {
      hasCategoriesColumn = false;
      const rows = await selectLegacyRows(db, { where: slugWhere });
      const row = rows[0];
      if (!row?.bodyHtmlPublished) return null;
      return withNullCalculators(row);
    }
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const rows = await selectLegacyRows(db, { where: slugWhere });
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
  categories: string[];
  bodyHtml: string;
  metaTitle: string | null;
  metaDescription: string | null;
  heroImageUrl: string | null;
  calculatorName: string | null;
  calculatorCode: string | null;
};

export async function updateClientInsightPostCompat(
  db: Db,
  id: string,
  v: WritablePostFields,
  updatedAt: Date
): Promise<void> {
  await prepareSchemaBestEffort(db);
  const core = {
    title: v.title,
    slug: v.slug,
    locale: v.locale,
    excerpt: v.excerpt,
    bodyHtml: v.bodyHtml,
    metaTitle: v.metaTitle,
    metaDescription: v.metaDescription,
    updatedAt,
  };
  const base =
    hasCategoriesColumn === false
      ? core
      : { ...core, categories: v.categories as unknown };
  const withCalc = {
    ...base,
    heroImageUrl: v.heroImageUrl,
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
    hasCategoriesColumn = true;
  } catch (e) {
    if (isMissingCategoriesColumnError(e)) {
      hasCategoriesColumn = false;
      const { categories: _categories, ...baseWithoutCategories } = base as typeof base & {
        categories?: unknown;
      };
      await db.update(clientInsightPosts).set(baseWithoutCategories).where(eq(clientInsightPosts.id, id));
      return;
    }
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
  await prepareSchemaBestEffort(db);
  const core = {
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
  const base =
    hasCategoriesColumn === false
      ? core
      : { ...core, categories: v.categories as unknown };
  const withCalc = {
    ...base,
    heroImageUrl: v.heroImageUrl,
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
    hasCategoriesColumn = true;
    const newId = inserted[0]?.id;
    if (!newId) throw new Error("Insert returned no id");
    return newId;
  } catch (e) {
    if (isMissingCategoriesColumnError(e)) {
      hasCategoriesColumn = false;
      const inserted = await db.insert(clientInsightPosts).values(core).returning({ id: clientInsightPosts.id });
      const newId = inserted[0]?.id;
      if (!newId) throw new Error("Insert returned no id");
      return newId;
    }
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    const inserted = await db.insert(clientInsightPosts).values(base).returning({ id: clientInsightPosts.id });
    const newId = inserted[0]?.id;
    if (!newId) throw new Error("Insert returned no id");
    return newId;
  }
}

export async function publishClientInsightPostCompat(
  db: Db,
  id: string,
  bodyHtmlPublished: string,
  heroImageUrl: string,
  publishedAt: Date
): Promise<void> {
  await prepareSchemaBestEffort(db);
  const core = {
    status: "published" as const,
    bodyHtmlPublished,
    publishedAt,
    updatedAt: publishedAt,
  };
  const withHero = {
    ...core,
    heroImageUrl,
  };

  if (hasCalculatorColumns === false) {
    await db.update(clientInsightPosts).set(core).where(eq(clientInsightPosts.id, id));
    return;
  }
  if (hasCalculatorColumns === true) {
    await db.update(clientInsightPosts).set(withHero).where(eq(clientInsightPosts.id, id));
    return;
  }
  try {
    await db.update(clientInsightPosts).set(withHero).where(eq(clientInsightPosts.id, id));
    hasCalculatorColumns = true;
  } catch (e) {
    if (!isMissingCalculatorColumnsError(e)) throw e;
    hasCalculatorColumns = false;
    await db.update(clientInsightPosts).set(core).where(eq(clientInsightPosts.id, id));
  }
}
