import "server-only";

import { eq } from "drizzle-orm";

import {
  getClientInsightPostById,
  insertClientInsightPostCompat,
  updateClientInsightPostCompat,
  type ClientInsightPostRow,
} from "@/lib/client-studio/client-insight-db";
import {
  deleteStudioPostViaSupabase,
  insertStudioPostViaSupabase,
  publishStudioPostViaSupabase,
  revertStudioPostToDraftViaSupabase,
  updatePublishedStudioPostBodyViaSupabase,
  updateStudioPostViaSupabase,
  type WritableStudioPostFields,
} from "@/lib/client-studio/studio-posts-supabase";
import { clientInsightPosts, getDb } from "@/lib/db";
import { isPostgresConnectionError } from "@/lib/db/pg-error-chain";

export async function loadStudioPostForActions(id: string): Promise<ClientInsightPostRow | null> {
  const db = getDb();
  if (db) {
    try {
      return await getClientInsightPostById(db, id);
    } catch (e) {
      if (!isPostgresConnectionError(e)) throw e;
    }
  }
  const { getStudioPostByIdViaSupabase } = await import("@/lib/client-studio/studio-posts-supabase");
  return getStudioPostByIdViaSupabase(id);
}

export async function insertStudioPostForActions(
  writable: WritableStudioPostFields,
  updatedAt: Date
): Promise<string> {
  const db = getDb();
  if (db) {
    try {
      return await insertClientInsightPostCompat(db, writable, updatedAt);
    } catch (e) {
      if (!isPostgresConnectionError(e)) throw e;
    }
  }
  return insertStudioPostViaSupabase(writable, updatedAt);
}

export async function updateStudioPostForActions(
  id: string,
  writable: WritableStudioPostFields,
  updatedAt: Date
): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await updateClientInsightPostCompat(db, id, writable, updatedAt);
      return;
    } catch (e) {
      if (!isPostgresConnectionError(e)) throw e;
    }
  }
  await updateStudioPostViaSupabase(id, writable, updatedAt);
}

export async function updatePublishedStudioPostBodyForActions(
  id: string,
  bodyHtmlPublished: string,
  updatedAt: Date
): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await db
        .update(clientInsightPosts)
        .set({
          bodyHtmlPublished,
          updatedAt,
        })
        .where(eq(clientInsightPosts.id, id));
      return;
    } catch (e) {
      if (!isPostgresConnectionError(e)) throw e;
    }
  }
  await updatePublishedStudioPostBodyViaSupabase(id, bodyHtmlPublished, updatedAt);
}

export async function publishStudioPostForActions(
  id: string,
  bodyHtmlPublished: string,
  heroImageUrl: string,
  publishedAt: Date
): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await db
        .update(clientInsightPosts)
        .set({
          status: "published",
          bodyHtmlPublished,
          heroImageUrl,
          publishedAt,
          updatedAt: publishedAt,
        })
        .where(eq(clientInsightPosts.id, id));
      return;
    } catch (e) {
      if (!isPostgresConnectionError(e)) throw e;
    }
  }
  await publishStudioPostViaSupabase(id, bodyHtmlPublished, heroImageUrl, publishedAt);
}

export async function revertStudioPostToDraftForActions(id: string, updatedAt: Date): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await db
        .update(clientInsightPosts)
        .set({
          status: "draft",
          bodyHtmlPublished: null,
          publishedAt: null,
          updatedAt,
        })
        .where(eq(clientInsightPosts.id, id));
      return;
    } catch (e) {
      if (!isPostgresConnectionError(e)) throw e;
    }
  }
  await revertStudioPostToDraftViaSupabase(id, updatedAt);
}

export async function deleteStudioPostForActions(id: string): Promise<void> {
  const db = getDb();
  if (db) {
    try {
      await db.delete(clientInsightPosts).where(eq(clientInsightPosts.id, id));
      return;
    } catch (e) {
      if (!isPostgresConnectionError(e)) throw e;
    }
  }
  await deleteStudioPostViaSupabase(id);
}
