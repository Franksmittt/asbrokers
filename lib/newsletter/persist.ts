import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { eq, sql } from "drizzle-orm";

import { getDb, newsletterStudioSnapshot } from "@/lib/db";
import { isPostgresConnectionError } from "@/lib/db/pg-error-chain";

import type { NewsletterEdition } from "./types";

export const NEWSLETTER_STUDIO_SNAPSHOT_ID = "default";

export type NewsletterStudioSnapshot = {
  version: 1;
  editions: NewsletterEdition[];
};

export function newsletterStudioSnapshotFilePath(): string {
  const explicit = process.env.NEWSLETTER_STUDIO_SNAPSHOT_PATH?.trim();
  if (explicit) return explicit;
  if (process.env.VERCEL) {
    return path.join("/tmp", "newsletter-studio-snapshot.json");
  }
  return path.join(process.cwd(), "data", "newsletter-studio-snapshot.json");
}

function normalizeEdition(edition: NewsletterEdition): NewsletterEdition {
  const status =
    edition.status === "draft" ||
    edition.status === "scheduled" ||
    edition.status === "published" ||
    edition.status === "sent" ||
    edition.status === "archived"
      ? edition.status
      : "draft";
  return {
    ...edition,
    status,
    subjectLine: edition.subjectLine ?? "",
    previewText: edition.previewText ?? "",
    articleOfTheWeek: edition.articleOfTheWeek ?? {
      title: "",
      intro: "",
      whyItMatters: "",
      articleHref: "",
    },
    watchChallenge: edition.watchChallenge ?? {
      challengeHref: "/financial-freedom-community",
      vitalityHref: "/contact?topic=vitality",
    },
    courses: edition.courses ?? { availableCourses: [] },
    sectionContent: Array.isArray(edition.sectionContent) ? edition.sectionContent : [],
  };
}

export function migrateNewsletterSnapshot(
  payload: Partial<NewsletterStudioSnapshot> | NewsletterEdition[]
): NewsletterStudioSnapshot {
  if (Array.isArray(payload)) {
    return { version: 1, editions: payload.map(normalizeEdition) };
  }
  return {
    version: 1,
    editions: (Array.isArray(payload.editions) ? payload.editions : []).map(normalizeEdition),
  };
}

function isSnapshot(value: unknown): value is NewsletterStudioSnapshot {
  if (!value || typeof value !== "object") return false;
  const row = value as NewsletterStudioSnapshot;
  return row.version === 1 && Array.isArray(row.editions);
}

async function loadFromFile(filePath: string): Promise<NewsletterStudioSnapshot | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!isSnapshot(parsed)) return null;
    return migrateNewsletterSnapshot(parsed);
  } catch {
    return null;
  }
}

async function saveToFile(filePath: string, payload: NewsletterStudioSnapshot): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
}

async function ensureSnapshotTable(): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS newsletter_studio_snapshot (
      id text PRIMARY KEY,
      payload jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

async function loadFromDb(): Promise<NewsletterStudioSnapshot | null> {
  const db = getDb();
  if (!db) return null;
  try {
    await ensureSnapshotTable();
    const rows = await db
      .select()
      .from(newsletterStudioSnapshot)
      .where(eq(newsletterStudioSnapshot.id, NEWSLETTER_STUDIO_SNAPSHOT_ID))
      .limit(1);
    const payload = rows[0]?.payload;
    if (!isSnapshot(payload)) return null;
    return migrateNewsletterSnapshot(payload);
  } catch (error) {
    if (isPostgresConnectionError(error)) return null;
    console.error("[newsletter] failed to load studio snapshot from database:", error);
    return null;
  }
}

async function saveToDb(payload: NewsletterStudioSnapshot): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await ensureSnapshotTable();
    const updatedAt = new Date();
    await db
      .insert(newsletterStudioSnapshot)
      .values({
        id: NEWSLETTER_STUDIO_SNAPSHOT_ID,
        payload,
        updatedAt,
      })
      .onConflictDoUpdate({
        target: newsletterStudioSnapshot.id,
        set: { payload, updatedAt },
      });
  } catch (error) {
    if (isPostgresConnectionError(error)) return;
    console.error("[newsletter] failed to save studio snapshot to database:", error);
  }
}

export async function loadNewsletterSnapshot(
  filePath = newsletterStudioSnapshotFilePath()
): Promise<NewsletterStudioSnapshot | null> {
  if (filePath !== newsletterStudioSnapshotFilePath()) {
    return loadFromFile(filePath);
  }
  const fromDb = await loadFromDb();
  if (fromDb) return fromDb;
  return loadFromFile(filePath);
}

export async function saveNewsletterSnapshot(
  payload: NewsletterStudioSnapshot,
  filePath = newsletterStudioSnapshotFilePath()
): Promise<void> {
  const migrated = migrateNewsletterSnapshot(structuredClone(payload));
  await saveToFile(filePath, migrated);
  if (filePath === newsletterStudioSnapshotFilePath()) {
    await saveToDb(migrated);
  }
}
