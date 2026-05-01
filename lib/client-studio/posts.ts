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
  try {
    return await listAllClientInsightPosts(db);
  } catch (e) {
    console.error("[studio posts] listAllStudioPosts failed:", e);
    return [];
  }
}

export async function getStudioPostById(id: string): Promise<StudioPostRow | null> {
  const db = getDb();
  if (!db) return null;
  try {
    return await getClientInsightPostById(db, id);
  } catch (e) {
    console.error("[studio posts] getStudioPostById failed:", e);
    return null;
  }
}

export async function getPublishedStudioPostBySlug(
  slug: string,
  locale: string
): Promise<StudioPostRow | null> {
  const db = getDb();
  if (!db) return null;
  try {
    return await getPublishedClientInsightPostBySlug(db, slug, locale);
  } catch (e) {
    console.error("[studio posts] getPublishedStudioPostBySlug failed:", e);
    return null;
  }
}
