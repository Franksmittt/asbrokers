"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getClientStudioSession } from "@/lib/client-studio/session";
import type { SerializableNotebookNote } from "@/lib/client-studio/notebook-types";
import { getDb, studioNotebookNotes } from "@/lib/db";

const noteSchema = z.object({
  title: z.string().max(320).default(""),
  body: z.string().max(120_000).default(""),
});

async function requireStudioSession() {
  if (!(await getClientStudioSession())) {
    throw new Error("Not signed in.");
  }
}

export async function listStudioNotebookNotes(): Promise<
  { ok: true; notes: SerializableNotebookNote[] } | { ok: false; error: string }
> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired — sign in again." };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not connected." };
  }

  try {
    const rows = await db
      .select()
      .from(studioNotebookNotes)
      .orderBy(desc(studioNotebookNotes.updatedAt));

    return {
      ok: true,
      notes: rows.map((r) => ({
        id: r.id,
        title: r.title,
        body: r.body,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })),
    };
  } catch {
    return {
      ok: false,
      error:
        "Notebook storage is not ready yet. Ask your developer to run the database update (notebook table), then try again.",
    };
  }
}

export async function saveStudioNotebookNote(
  id: string | null,
  raw: z.infer<typeof noteSchema>
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired — sign in again." };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not connected." };
  }

  const parsed = noteSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const v = parsed.data;
  const now = new Date();

  try {
    if (id) {
      const existing = await db
        .select({ id: studioNotebookNotes.id })
        .from(studioNotebookNotes)
        .where(eq(studioNotebookNotes.id, id))
        .limit(1);
      if (!existing[0]) return { ok: false, error: "Note not found." };
      await db
        .update(studioNotebookNotes)
        .set({
          title: v.title.trim() || "",
          body: v.body,
          updatedAt: now,
        })
        .where(eq(studioNotebookNotes.id, id));
      revalidatePath("/studio/blog/workspace");
      return { ok: true, id };
    }

    const inserted = await db
      .insert(studioNotebookNotes)
      .values({
        title: v.title.trim() || "",
        body: v.body,
        updatedAt: now,
      })
      .returning({ id: studioNotebookNotes.id });
    const newId = inserted[0]?.id;
    if (!newId) return { ok: false, error: "Could not create note." };
    revalidatePath("/studio/blog/workspace");
    return { ok: true, id: newId };
  } catch {
    return { ok: false, error: "Could not save note." };
  }
}

export async function deleteStudioNotebookNote(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired — sign in again." };
  }

  const db = getDb();
  if (!db) return { ok: false, error: "Database is not connected." };

  try {
    await db.delete(studioNotebookNotes).where(eq(studioNotebookNotes.id, id));
    revalidatePath("/studio/blog/workspace");
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not delete note." };
  }
}
