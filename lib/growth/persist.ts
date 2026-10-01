import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import type { GrowthSnapshot } from "./types";

export function growthSnapshotFilePath(): string {
  const explicit = process.env.GROWTH_SNAPSHOT_PATH?.trim();
  if (explicit) return explicit;
  if (process.env.VERCEL) {
    return path.join("/tmp", "growth-attribution-snapshot.json");
  }
  return path.join(process.cwd(), "data", "growth-attribution-snapshot.json");
}

export function emptyGrowthSnapshot(): GrowthSnapshot {
  return { version: 1, touches: [], influence: [], journeys: [] };
}

export function migrateGrowthSnapshot(payload: unknown): GrowthSnapshot {
  if (!payload || typeof payload !== "object") return emptyGrowthSnapshot();
  const row = payload as Partial<GrowthSnapshot>;
  return {
    version: 1,
    touches: Array.isArray(row.touches) ? row.touches : [],
    influence: Array.isArray(row.influence) ? row.influence : [],
    journeys: Array.isArray(row.journeys) ? row.journeys : [],
  };
}

export async function loadGrowthSnapshot(
  filePath = growthSnapshotFilePath()
): Promise<GrowthSnapshot | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    return migrateGrowthSnapshot(JSON.parse(raw));
  } catch {
    return null;
  }
}

export async function saveGrowthSnapshot(
  payload: GrowthSnapshot,
  filePath = growthSnapshotFilePath()
): Promise<void> {
  const migrated = migrateGrowthSnapshot(structuredClone(payload));
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(migrated, null, 2), "utf8");
}
