import "server-only";

import { desc } from "drizzle-orm";

import type { SerializableNotebookNote } from "@/lib/client-studio/notebook-types";
import { getDb, studioNotebookNotes } from "@/lib/db";

/** Initial notebook rows for Insights studio workspace (authenticated layout only). */
export async function fetchNotebookNotesInitial(): Promise<SerializableNotebookNote[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const rows = await db.select().from(studioNotebookNotes).orderBy(desc(studioNotebookNotes.updatedAt));
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      body: r.body,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
  } catch {
    // `studio_notebook_notes` may not exist until `db push` / migration on this environment.
    return [];
  }
}
