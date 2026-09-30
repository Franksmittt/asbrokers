import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { eq, sql } from "drizzle-orm";

import { courseStudioSnapshot, getDb } from "@/lib/db";
import { isPostgresConnectionError } from "@/lib/db/pg-error-chain";

import { sanitizeCourseCalculatorId } from "./calculators";
import { newId } from "./ids";
import {
  emptyClarityProfile,
  type ClarityPointLedgerEntry,
  type StudentClarityProfile,
} from "./clarity-track";
import type {
  CourseEnrollment,
  CourseEvent,
  CourseRecord,
  CourseStaffAlert,
  CourseStudent,
  LessonComment,
  LessonProgress,
  LessonResponse,
  StudentPortalConfig,
  StudentPromoSlide,
} from "./types";

export const COURSE_STUDIO_SNAPSHOT_ID = "default";

export const DEFAULT_STUDENT_PORTAL_CONFIG: StudentPortalConfig = {
  promoSlides: [
    {
      id: "promo_business_insurance",
      title: "Protect the business that funds your freedom",
      body: "Ask Albert for a business insurance review — shops, practices, fleets and commercial risks.",
      ctaLabel: "Request a review",
      ctaHref: "/solutions/business-insurance",
      enabled: true,
    },
    {
      id: "promo_retirement",
      title: "Is your retirement income on track?",
      body: "Use our planning tools, then book a conversation when you want personal numbers checked.",
      ctaLabel: "Explore retirement",
      ctaHref: "/retirement-planning",
      enabled: true,
    },
  ],
};

export type CourseStudioSnapshot = {
  version: 1;
  courses: CourseRecord[];
  students: CourseStudent[];
  enrollments: CourseEnrollment[];
  progress: LessonProgress[];
  responses: LessonResponse[];
  comments: LessonComment[];
  events: CourseEvent[];
  staffAlerts: CourseStaffAlert[];
  portalConfig: StudentPortalConfig;
  clarityProfiles: StudentClarityProfile[];
  clarityLedger: ClarityPointLedgerEntry[];
};

export function courseStudioSnapshotFilePath(): string {
  const explicit = process.env.COURSE_STUDIO_SNAPSHOT_PATH?.trim();
  if (explicit) return explicit;
  if (process.env.VERCEL) {
    return path.join("/tmp", "course-studio-snapshot.json");
  }
  return path.join(process.cwd(), "data", "course-studio-snapshot.json");
}

function migratePromoSlides(value: unknown): StudentPromoSlide[] {
  if (!Array.isArray(value)) return DEFAULT_STUDENT_PORTAL_CONFIG.promoSlides.map((row) => ({ ...row }));
  return value
    .filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === "object")
    .map((row, index) => ({
      id: typeof row.id === "string" && row.id ? row.id : newId("promo"),
      title: typeof row.title === "string" ? row.title : `Promo ${index + 1}`,
      body: typeof row.body === "string" ? row.body : "",
      ctaLabel: typeof row.ctaLabel === "string" ? row.ctaLabel : "Learn more",
      ctaHref: typeof row.ctaHref === "string" ? row.ctaHref : "/contact",
      enabled: row.enabled !== false,
    }));
}

export function migrateCourseStudioSnapshot(
  payload: Omit<
    CourseStudioSnapshot,
    "comments" | "staffAlerts" | "portalConfig" | "clarityProfiles" | "clarityLedger"
  > & {
    comments?: LessonComment[];
    staffAlerts?: CourseStaffAlert[];
    portalConfig?: Partial<StudentPortalConfig> | null;
    clarityProfiles?: StudentClarityProfile[];
    clarityLedger?: ClarityPointLedgerEntry[];
  }
): CourseStudioSnapshot {
  const next: CourseStudioSnapshot = {
    ...payload,
    comments: Array.isArray(payload.comments) ? payload.comments : [],
    staffAlerts: Array.isArray(payload.staffAlerts) ? payload.staffAlerts : [],
    portalConfig: {
      promoSlides: migratePromoSlides(payload.portalConfig?.promoSlides),
    },
    clarityProfiles: Array.isArray(payload.clarityProfiles) ? payload.clarityProfiles : [],
    clarityLedger: Array.isArray(payload.clarityLedger) ? payload.clarityLedger : [],
  };
  // Ensure every student has a clarity profile shell.
  for (const student of next.students) {
    if (!next.clarityProfiles.some((row) => row.studentId === student.id)) {
      next.clarityProfiles.push(emptyClarityProfile(student.id));
    }
  }
  for (const course of next.courses) {
    if (course.access !== "free" && course.access !== "paid") course.access = "free";
    if (course.priceZar === undefined) course.priceZar = null;
    if (typeof course.accessNote !== "string") course.accessNote = "";
    for (const lesson of course.lessons) {
      for (const block of lesson.blocks) {
        if (block.type === "calculator") {
          block.calculatorId = sanitizeCourseCalculatorId(block.calculatorId);
        }
      }
    }
  }
  for (const enrollment of next.enrollments) {
    if (
      enrollment.paymentStatus !== "not_required" &&
      enrollment.paymentStatus !== "pending" &&
      enrollment.paymentStatus !== "granted"
    ) {
      enrollment.paymentStatus = "not_required";
    }
  }
  for (const response of next.responses) {
    if (response.instructorReply === undefined) response.instructorReply = null;
    if (response.instructorRepliedAt === undefined) response.instructorRepliedAt = null;
  }
  for (const comment of next.comments) {
    if (comment.instructorReply === undefined) comment.instructorReply = null;
    if (comment.instructorRepliedAt === undefined) comment.instructorRepliedAt = null;
  }
  return next;
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
