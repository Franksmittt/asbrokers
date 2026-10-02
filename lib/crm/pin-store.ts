/**
 * Persisted CRM PIN overrides + consumed reset-token ids.
 * DB-first (same pattern as Newsletter Studio), file fallback for local/dev.
 */

import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { sql } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { isPostgresConnectionError } from "@/lib/db/pg-error-chain";
import {
  CRM_TEAM_MEMBERS,
  getTeamMember,
  lookupCrmPinUser,
  type CrmTeamMember,
  type CrmTeamMemberKey,
} from "@/lib/crm/team-members";

const SNAPSHOT_ID = "default";

export type CrmPinSnapshot = {
  version: 1;
  /** memberKey → sha256 hex of PIN */
  pinHashes: Record<string, string>;
  /** Consumed reset token ids (jti) */
  usedResetTokens: string[];
};

type GlobalPin = {
  __asbCrmPinSnapshot?: CrmPinSnapshot;
  __asbCrmPinHydrated?: boolean;
  __asbCrmPinHydratePromise?: Promise<void> | null;
};

const globalForPin = globalThis as GlobalPin;

function emptySnapshot(): CrmPinSnapshot {
  return { version: 1, pinHashes: {}, usedResetTokens: [] };
}

export function hashCrmPin(pin: string): string {
  return createHash("sha256").update(pin.trim(), "utf8").digest("hex");
}

export function crmPinSnapshotFilePath(): string {
  const explicit = process.env.CRM_PIN_OVERRIDES_PATH?.trim();
  if (explicit) return explicit;
  if (process.env.VERCEL) {
    return path.join("/tmp", "crm-pin-overrides.json");
  }
  return path.join(process.cwd(), "data", "crm-pin-overrides.json");
}

function isSnapshot(value: unknown): value is CrmPinSnapshot {
  if (!value || typeof value !== "object") return false;
  const row = value as CrmPinSnapshot;
  return (
    row.version === 1 &&
    typeof row.pinHashes === "object" &&
    row.pinHashes !== null &&
    Array.isArray(row.usedResetTokens)
  );
}

async function loadFromFile(filePath: string): Promise<CrmPinSnapshot | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isSnapshot(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function saveToFile(filePath: string, payload: CrmPinSnapshot): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
}

async function ensureSnapshotTable(): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS crm_pin_overrides_snapshot (
      id text PRIMARY KEY,
      payload jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

async function loadFromDb(): Promise<CrmPinSnapshot | null> {
  const db = getDb();
  if (!db) return null;
  try {
    await ensureSnapshotTable();
    const result = await db.execute(sql`
      SELECT payload FROM crm_pin_overrides_snapshot WHERE id = ${SNAPSHOT_ID} LIMIT 1
    `);
    const rows = (result as { rows?: Array<{ payload?: unknown }> }).rows ?? [];
    const payload = rows[0]?.payload;
    return isSnapshot(payload) ? payload : null;
  } catch (error) {
    if (isPostgresConnectionError(error)) return null;
    console.error("[crm-pin] failed to load overrides from database:", error);
    return null;
  }
}

async function saveToDb(payload: CrmPinSnapshot): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await ensureSnapshotTable();
    await db.execute(sql`
      INSERT INTO crm_pin_overrides_snapshot (id, payload, updated_at)
      VALUES (${SNAPSHOT_ID}, ${JSON.stringify(payload)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE
      SET payload = EXCLUDED.payload, updated_at = now()
    `);
  } catch (error) {
    if (isPostgresConnectionError(error)) return;
    console.error("[crm-pin] failed to save overrides to database:", error);
  }
}

async function loadSnapshot(): Promise<CrmPinSnapshot> {
  const fromDb = await loadFromDb();
  if (fromDb) return fromDb;
  const fromFile = await loadFromFile(crmPinSnapshotFilePath());
  return fromFile ?? emptySnapshot();
}

async function saveSnapshot(payload: CrmPinSnapshot): Promise<void> {
  globalForPin.__asbCrmPinSnapshot = payload;
  await saveToDb(payload);
  await saveToFile(crmPinSnapshotFilePath(), payload);
}

export async function ensureCrmPinStore(): Promise<CrmPinSnapshot> {
  if (globalForPin.__asbCrmPinHydrated && globalForPin.__asbCrmPinSnapshot) {
    return globalForPin.__asbCrmPinSnapshot;
  }
  if (!globalForPin.__asbCrmPinHydratePromise) {
    globalForPin.__asbCrmPinHydratePromise = (async () => {
      globalForPin.__asbCrmPinSnapshot = await loadSnapshot();
      globalForPin.__asbCrmPinHydrated = true;
    })().finally(() => {
      globalForPin.__asbCrmPinHydratePromise = null;
    });
  }
  await globalForPin.__asbCrmPinHydratePromise;
  return globalForPin.__asbCrmPinSnapshot ?? emptySnapshot();
}

export async function setCrmPinOverride(memberKey: CrmTeamMemberKey, pin: string): Promise<void> {
  const snap = await ensureCrmPinStore();
  const next: CrmPinSnapshot = {
    version: 1,
    pinHashes: { ...snap.pinHashes, [memberKey]: hashCrmPin(pin) },
    usedResetTokens: snap.usedResetTokens.slice(-200),
  };
  await saveSnapshot(next);
}

export async function markResetTokenUsed(jti: string): Promise<void> {
  const snap = await ensureCrmPinStore();
  if (snap.usedResetTokens.includes(jti)) return;
  const next: CrmPinSnapshot = {
    version: 1,
    pinHashes: { ...snap.pinHashes },
    usedResetTokens: [...snap.usedResetTokens, jti].slice(-200),
  };
  await saveSnapshot(next);
}

export async function isResetTokenUsed(jti: string): Promise<boolean> {
  const snap = await ensureCrmPinStore();
  return snap.usedResetTokens.includes(jti);
}

/**
 * Resolve staff from a PIN: prefer stored overrides, then env bootstrap PINs.
 * If an override exists for a member, their env PIN no longer authenticates.
 */
export async function resolveCrmPinUser(pin: string): Promise<CrmTeamMember | null> {
  const trimmed = pin.trim();
  if (!/^\d{5}$/.test(trimmed)) return null;

  const snap = await ensureCrmPinStore();
  const hash = hashCrmPin(trimmed);

  for (const [key, storedHash] of Object.entries(snap.pinHashes)) {
    if (storedHash === hash) {
      const member = getTeamMember(key);
      if (member) return member;
    }
  }

  const fromEnv = lookupCrmPinUser(trimmed);
  if (!fromEnv) return null;
  // Env PIN disabled once that member has set an override.
  if (snap.pinHashes[fromEnv.key]) return null;
  return fromEnv;
}

export function memberHasBootstrapOrOverridePin(
  memberKey: CrmTeamMemberKey,
  snap: CrmPinSnapshot
): boolean {
  if (snap.pinHashes[memberKey]) return true;
  return Boolean(CRM_TEAM_MEMBERS[memberKey]?.pin);
}
