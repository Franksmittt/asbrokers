import "server-only";

import { getDb } from "@/lib/db";
import {
  getClientInsightPostById,
  getPublishedClientInsightPostBySlug,
  listAllClientInsightPosts,
} from "@/lib/client-studio/client-insight-db";
import { clientInsightPosts } from "@/lib/db";

export type StudioPostRow = typeof clientInsightPosts.$inferSelect;

export async function listAllStudioPosts(): Promise<StudioPostRow[]> {
  const db = getDb();
  if (!db) return [];
  return listAllClientInsightPosts(db);
}

export async function getStudioPostById(id: string): Promise<StudioPostRow | null> {
  const db = getDb();
  if (!db) return null;
  return getClientInsightPostById(db, id);
}

export async function getPublishedStudioPostBySlug(
  slug: string,
  locale: string
): Promise<StudioPostRow | null> {
  const db = getDb();
  if (!db) return null;
  return getPublishedClientInsightPostBySlug(db, slug, locale);
}
