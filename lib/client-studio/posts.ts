import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { clientInsightPosts, getDb } from "@/lib/db";

export type StudioPostRow = typeof clientInsightPosts.$inferSelect;

export async function listAllStudioPosts(): Promise<StudioPostRow[]> {
  const db = getDb();
  if (!db) return [];
  return db.select().from(clientInsightPosts).orderBy(desc(clientInsightPosts.updatedAt));
}

export async function getStudioPostById(id: string): Promise<StudioPostRow | null> {
  const db = getDb();
  if (!db) return null;
  const rows = await db.select().from(clientInsightPosts).where(eq(clientInsightPosts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getPublishedStudioPostBySlug(
  slug: string,
  locale: string
): Promise<StudioPostRow | null> {
  const db = getDb();
  if (!db) return null;
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
  const row = rows[0];
  if (!row?.bodyHtmlPublished) return null;
  return row;
}
