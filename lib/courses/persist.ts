import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { eq, sql } from "drizzle-orm";

import { courseStudioSnapshot, getDb } from "@/lib/db";
import { isPostgresConnectionError } from "@/lib/db/pg-error-chain";

import { sanitizeCourseCalculatorId } from "./calculators";
import type {
  CourseEnrollment,
  CourseEvent,
  CourseRecord,
  CourseStudent,
  LessonComment,
  LessonProgress,
  LessonResponse,
} from "./types";

export const COURSE_STUDIO_SNAPSHOT_ID = "default";

export type CourseStudioSnapshot = {
  version: 1;
  courses: CourseRecord[];
  students: CourseStudent[];
  enrollments: CourseEnrollment[];
  progress: LessonProgress[];
  responses: LessonResponse[];
  comments: LessonComment[];
  events: CourseEvent[];
};

export function courseStudioSnapshotFilePath(): string {
  const explicit = process.env.COURSE_STUDIO_SNAPSHOT_PATH?.trim();
  if (explicit) return explicit;
  if (process.env.VERCEL) {
    return path.join("/tmp", "course-studio-snapshot.json");
  }
  return path.join(process.cwd(), "data", "course-studio-snapshot.json");
}

export function migrateCourseStudioSnapshot(payload: CourseStudioSnapshot): CourseStudioSnapshot {
  if (!Array.isArray(payload.comments)) {
    payload.comments = [];
  }
  for (const course of payload.courses) {
    for (const lesson of course.lessons) {
      for (const block of lesson.blocks) {
        if (block.type === "calculator") {
          block.calculatorId = sanitizeCourseCalculatorId(block.calculatorId);
        }
      }
    }
  }
  for (const response of payload.responses) {
    if (response.instructorReply === undefined) response.instructorReply = null;
    if (response.instructorRepliedAt === undefined) response.instructorRepliedAt = null;
  }
  for (const comment of payload.comments) {
    if (comment.instructorReply === undefined) comment.instructorReply = null;
    if (comment.instructorRepliedAt === undefined) comment.instructorRepliedAt = null;
  }
  return payload;
}

function isSnapshot(value: unknown): value is CourseStudioSnapshot {
  if (!value || typeof value !== "object") return false;
  const row = value as CourseStudioSnapshot & { comments?: LessonComment[] };
  return (
    row.version === 1 &&
    Array.isArray(row.courses) &&
    Array.isArray(row.students) &&
    Array.isArray(row.enrollments) &&
    Array.isArray(row.progress) &&
    Array.isArray(row.responses) &&
    Array.isArray(row.events)
  );
}

async function loadFromFile(filePath: string): Promise<CourseStudioSnapshot | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!isSnapshot(parsed)) return null;
    return migrateCourseStudioSnapshot(parsed);
  } catch {
    return null;
  }
}

async function saveToFile(filePath: string, payload: CourseStudioSnapshot): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
}

async function ensureSnapshotTable(): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS course_studio_snapshot (
      id text PRIMARY KEY,
      payload jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

async function loadFromDb(): Promise<CourseStudioSnapshot | null> {
  const db = getDb();
  if (!db) return null;
  try {
    await ensureSnapshotTable();
    const rows = await db
      .select()
      .from(courseStudioSnapshot)
      .where(eq(courseStudioSnapshot.id, COURSE_STUDIO_SNAPSHOT_ID))
      .limit(1);
    const payload = rows[0]?.payload;
    if (!isSnapshot(payload)) return null;
    return migrateCourseStudioSnapshot(payload);
  } catch (error) {
    if (isPostgresConnectionError(error)) return null;
    console.error("[courses] failed to load studio snapshot from database:", error);
    return null;
  }
}

async function saveToDb(payload: CourseStudioSnapshot): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await ensureSnapshotTable();
    const updatedAt = new Date();
    await db
      .insert(courseStudioSnapshot)
      .values({
        id: COURSE_STUDIO_SNAPSHOT_ID,
        payload,
        updatedAt,
      })
      .onConflictDoUpdate({
        target: courseStudioSnapshot.id,
        set: { payload, updatedAt },
      });
  } catch (error) {
    if (isPostgresConnectionError(error)) return;
    console.error("[courses] failed to save studio snapshot to database:", error);
  }
}

export async function loadCourseSnapshot(
  filePath = courseStudioSnapshotFilePath()
): Promise<CourseStudioSnapshot | null> {
  if (filePath !== courseStudioSnapshotFilePath()) {
    return loadFromFile(filePath);
  }
  const fromDb = await loadFromDb();
  if (fromDb) return fromDb;
  return loadFromFile(filePath);
}

export async function saveCourseSnapshot(
  payload: CourseStudioSnapshot,
  filePath = courseStudioSnapshotFilePath()
): Promise<void> {
  const migrated = migrateCourseStudioSnapshot(structuredClone(payload));
  await saveToFile(filePath, migrated);
  if (filePath === courseStudioSnapshotFilePath()) {
    await saveToDb(migrated);
  }
}
