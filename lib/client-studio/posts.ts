import "server-only";

import { getDb } from "@/lib/db";
import {
  getClientInsightPostById,
  getPublishedClientInsightPostBySlug,
  listAllClientInsightPosts,
  listPublishedClientInsightPosts,
} from "@/lib/client-studio/client-insight-db";
import {
  getPublishedStudioPostBySlugViaSupabase,
  listAllStudioPostsViaSupabase,
  listPublishedStudioPostsViaSupabase,
} from "@/lib/client-studio/studio-posts-supabase";
import { clientInsightPosts } from "@/lib/db";
import { collectErrorText, isPostgresConnectionError } from "@/lib/db/pg-error-chain";
import { getSupabaseService } from "@/lib/supabase/server";

export type StudioPostRow = typeof clientInsightPosts.$inferSelect;

export type StudioPostsListResult = {
  rows: StudioPostRow[];
  loadError: string | null;
};

export async function listAllStudioPosts(): Promise<StudioPostsListResult> {
  const db = getDb();
  if (db) {
    try {
      const rows = await listAllClientInsightPosts(db);
      return { rows, loadError: null };
    } catch (e) {
      console.warn("[studio posts] Postgres list failed, trying Supabase REST:", collectErrorText(e));
    }
  }

  if (!getSupabaseService()) {
    return { rows: [], loadError: null };
  }

  try {
    const rows = await listAllStudioPostsViaSupabase();
    return { rows, loadError: null };
  } catch (e) {
    const loadError = isPostgresConnectionError(e)
      ? "Saved posts could not be loaded right now. Restart npm run dev and try again."
      : "Could not load saved posts from Supabase.";
    console.warn("[studio posts] Supabase list failed:", collectErrorText(e));
    return { rows: [], loadError };
  }
}

export async function listPublishedStudioPosts(): Promise<StudioPostRow[]> {
  const db = getDb();
  if (db) {
    try {
      return await listPublishedClientInsightPosts(db);
    } catch (e) {
      console.warn(
        "[studio posts] Postgres published list failed, trying Supabase REST:",
        collectErrorText(e)
      );
    }
  }

  if (!getSupabaseService()) return [];

  try {
    return await listPublishedStudioPostsViaSupabase();
  } catch (e) {
    console.warn("[studio posts] Supabase published list failed:", collectErrorText(e));
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
  if (db) {
    try {
      return await getPublishedClientInsightPostBySlug(db, slug, locale);
    } catch (e) {
      console.warn(
        "[studio posts] Postgres published slug lookup failed, trying Supabase REST:",
        collectErrorText(e)
      );
    }
  }

  if (!getSupabaseService()) return null;

  try {
    return await getPublishedStudioPostBySlugViaSupabase(slug, locale);
  } catch (e) {
    console.warn("[studio posts] Supabase published slug lookup failed:", collectErrorText(e));
    return null;
  }
}
