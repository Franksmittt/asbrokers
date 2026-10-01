/**
 * Growth attribution store — touches, journeys, influence ledger.
 * File-backed snapshot (same pattern as Newsletter / Course Studio).
 */

import { newId } from "@/lib/courses/ids";
import type { CourseRecord, CourseStudent } from "@/lib/courses/types";
import type { LeadAttribution } from "@/lib/attribution";
import type { ServiceCategory } from "@/lib/crm/types";

import { getChampion, normalizePromoterRef, type CourseChampion } from "./champions";
import { resolveCourseServiceCategory } from "./course-service";
import {
  emptyGrowthSnapshot,
  loadGrowthSnapshot,
  saveGrowthSnapshot,
} from "./persist";
import {
  INFLUENCE_ENGAGEMENT_THRESHOLD,
  INFLUENCE_POINTS,
  type AttributionTouch,
  type ChampionKey,
  type ConversionEventType,
  type GrowthSnapshot,
  type InfluenceLedgerEntry,
  type InfluenceReason,
  type LearningJourney,
} from "./types";

type GrowthGlobal = {
  __asbGrowthStore?: GrowthSnapshot;
  __asbGrowthHydrated?: boolean;
  __asbGrowthHydratePromise?: Promise<void> | null;
  __asbGrowthPersistEnabled?: boolean;
};

const globalForGrowth = globalThis as GrowthGlobal;

function persistEnabled(): boolean {
  return globalForGrowth.__asbGrowthPersistEnabled !== false;
}

function snap(): GrowthSnapshot {
  const value = globalForGrowth.__asbGrowthStore;
  if (!value) throw new Error("Growth store used before ensureGrowthStore().");
  return value;
}

async function persistIfEnabled(): Promise<void> {
  if (!persistEnabled()) return;
  await saveGrowthSnapshot(snap());
}

export async function ensureGrowthStore(): Promise<void> {
  if (globalForGrowth.__asbGrowthHydrated) return;
  if (!globalForGrowth.__asbGrowthHydratePromise) {
    globalForGrowth.__asbGrowthHydratePromise = (async () => {
      const loaded = persistEnabled() ? await loadGrowthSnapshot() : null;
      globalForGrowth.__asbGrowthStore = loaded ?? emptyGrowthSnapshot();
      globalForGrowth.__asbGrowthHydrated = true;
    })();
  }
  await globalForGrowth.__asbGrowthHydratePromise;
}

function nowIso(): string {
  return new Date().toISOString();
}

export type EnrollmentAttributionInput = {
  student: CourseStudent;
  course: CourseRecord;
  isNewEnrollment: boolean;
  promoterRef?: string | null;
  attribution?: LeadAttribution;
  progressPercent?: number;
};

export async function recordCourseEnrollmentAttribution(
  input: EnrollmentAttributionInput
): Promise<{ touch: AttributionTouch; journey: LearningJourney } | null> {
  await ensureGrowthStore();
  if (!input.isNewEnrollment) {
    // Still refresh journey progress if provided
    if (typeof input.progressPercent === "number") {
      await updateJourneyProgress(
        input.student.id,
        input.course.id,
        input.progressPercent
      );
    }
    return null;
  }

  const championKey = normalizePromoterRef(input.promoterRef);
  const serviceCategory = resolveCourseServiceCategory(input.course);
  const visitorKey = input.student.id;

  // First-touch sourced: if student already has any journey with sourcedBy, keep that
  const priorSourced = snap().journeys.find((j) => j.studentId === input.student.id && j.sourcedBy);

  const touch: AttributionTouch = {
    id: newId("tch"),
    visitorKey,
    studentId: input.student.id,
    studentEmail: input.student.email,
    promoterRef: championKey,
    courseId: input.course.id,
    courseSlug: input.course.slug,
    courseTitle: input.course.title,
    serviceCategory,
    utm_source: input.attribution?.utm_source,
    utm_medium: input.attribution?.utm_medium,
    utm_campaign: input.attribution?.utm_campaign,
    channel: inferChannel(input.attribution, championKey),
    landing: input.attribution?.landing ?? `/learn/${input.course.slug}`,
    eventType: "enrolled",
    label: championKey
      ? `Enrolled via ${getChampion(championKey)?.firstName ?? championKey}'s link`
      : `Enrolled in ${input.course.title}`,
    meta: {
      gclid: input.attribution?.gclid,
      fbclid: input.attribution?.fbclid,
    },
    createdAt: nowIso(),
  };
  snap().touches.push(touch);

  const journey: LearningJourney = {
    id: newId("jrn"),
    studentId: input.student.id,
    studentEmail: input.student.email,
    studentName: `${input.student.firstName} ${input.student.surname}`.trim(),
    courseId: input.course.id,
    courseSlug: input.course.slug,
    courseTitle: input.course.title,
    serviceCategory,
    sourcedBy: priorSourced?.sourcedBy ?? championKey,
    progressPercent: 0,
    influenceQualified: false,
    enrolledAt: nowIso(),
    updatedAt: nowIso(),
    lastEventAt: nowIso(),
  };
  snap().journeys.push(journey);

  // Influence: sourced enrollment credit to the promoter on THIS enrollment (if any)
  if (championKey) {
    await addInfluencePoints({
      championKey,
      reason: "sourced_enrollment",
      studentId: input.student.id,
      studentEmail: input.student.email,
      courseId: input.course.id,
      courseSlug: input.course.slug,
      touchId: touch.id,
      note: `Sourced enrollment: ${input.course.title}`,
    });
  }

  await persistIfEnabled();
  return { touch, journey };
}

export async function recordProgressInfluence(input: {
  student: CourseStudent;
  course: CourseRecord;
  progressPercent: number;
  eventType: ConversionEventType;
  label: string;
}): Promise<void> {
  await ensureGrowthStore();
  const journey = await updateJourneyProgress(
    input.student.id,
    input.course.id,
    input.progressPercent
  );
  if (!journey) return;

  const touch: AttributionTouch = {
    id: newId("tch"),
    visitorKey: input.student.id,
    studentId: input.student.id,
    studentEmail: input.student.email,
    promoterRef: journey.sourcedBy,
    courseId: input.course.id,
    courseSlug: input.course.slug,
    courseTitle: input.course.title,
    serviceCategory: journey.serviceCategory,
    eventType: input.eventType,
    label: input.label,
    createdAt: nowIso(),
  };
  snap().touches.push(touch);

  const championKey = journey.sourcedBy;
  if (!championKey) {
    await persistIfEnabled();
    return;
  }

  if (
    input.progressPercent >= INFLUENCE_ENGAGEMENT_THRESHOLD &&
    !journey.influenceQualified
  ) {
    journey.influenceQualified = true;
    await addInfluencePoints({
      championKey,
      reason: "engaged_25",
      studentId: input.student.id,
      studentEmail: input.student.email,
      courseId: input.course.id,
      courseSlug: input.course.slug,
      touchId: touch.id,
      note: `Engaged ≥${INFLUENCE_ENGAGEMENT_THRESHOLD}% in ${input.course.title}`,
    });
  }

  if (input.eventType === "course_completed") {
    await addInfluencePoints({
      championKey,
      reason: "course_completed",
      studentId: input.student.id,
      studentEmail: input.student.email,
      courseId: input.course.id,
      courseSlug: input.course.slug,
      touchId: touch.id,
      note: `Completed ${input.course.title}`,
    });
  }

  if (input.eventType === "offer_clicked") {
    await addInfluencePoints({
      championKey,
      reason: "offer_clicked",
      studentId: input.student.id,
      studentEmail: input.student.email,
      courseId: input.course.id,
      courseSlug: input.course.slug,
      touchId: touch.id,
      note: `Offer clicked in ${input.course.title}`,
    });
  }

  await persistIfEnabled();
}

async function updateJourneyProgress(
  studentId: string,
  courseId: string,
  progressPercent: number
): Promise<LearningJourney | undefined> {
  await ensureGrowthStore();
  const journey = snap().journeys.find(
    (j) => j.studentId === studentId && j.courseId === courseId
  );
  if (!journey) return undefined;
  journey.progressPercent = Math.max(journey.progressPercent, Math.min(100, progressPercent));
  journey.updatedAt = nowIso();
  journey.lastEventAt = nowIso();
  return journey;
}

async function addInfluencePoints(input: {
  championKey: ChampionKey;
  reason: InfluenceReason;
  studentId?: string;
  studentEmail?: string;
  courseId?: string;
  courseSlug?: string;
  touchId?: string;
  note?: string;
  points?: number;
}): Promise<InfluenceLedgerEntry | null> {
  await ensureGrowthStore();
  const points = input.points ?? INFLUENCE_POINTS[input.reason];
  if (!points && input.reason !== "manual_adjustment") return null;

  // Dedupe: same champion + reason + student + course
  const dup = snap().influence.find(
    (row) =>
      row.championKey === input.championKey &&
      row.reason === input.reason &&
      row.studentId === input.studentId &&
      row.courseId === input.courseId &&
      row.status !== "revoked"
  );
  if (dup) return dup;

  const entry: InfluenceLedgerEntry = {
    id: newId("inf"),
    championKey: input.championKey,
    points,
    reason: input.reason,
    studentId: input.studentId,
    studentEmail: input.studentEmail,
    courseId: input.courseId,
    courseSlug: input.courseSlug,
    touchId: input.touchId,
    note: input.note,
    status: "pending",
    createdAt: nowIso(),
  };
  snap().influence.push(entry);
  return entry;
}

function inferChannel(
  attribution: LeadAttribution | undefined,
  championKey: ChampionKey | undefined
): string {
  if (championKey) return "champion_link";
  if (attribution?.gclid) return "google_ads";
  if (attribution?.fbclid) return "facebook_ads";
  if (attribution?.utm_source) return attribution.utm_source;
  return "organic";
}

export async function listTouchesForStudent(studentIdOrEmail: string): Promise<AttributionTouch[]> {
  await ensureGrowthStore();
  const q = studentIdOrEmail.toLowerCase();
  return snap()
    .touches.filter(
      (t) =>
        t.studentId === studentIdOrEmail ||
        t.studentEmail?.toLowerCase() === q ||
        t.visitorKey === studentIdOrEmail
    )
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function listJourneysForChampion(key: ChampionKey): Promise<LearningJourney[]> {
  await ensureGrowthStore();
  return snap()
    .journeys.filter((j) => j.sourcedBy === key)
    .sort((a, b) => b.lastEventAt.localeCompare(a.lastEventAt));
}

export async function listAllJourneys(): Promise<LearningJourney[]> {
  await ensureGrowthStore();
  return [...snap().journeys].sort((a, b) => b.lastEventAt.localeCompare(a.lastEventAt));
}

export async function listInfluenceForChampion(key: ChampionKey): Promise<InfluenceLedgerEntry[]> {
  await ensureGrowthStore();
  return snap()
    .influence.filter((row) => row.championKey === key)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function sumInfluencePoints(
  key: ChampionKey,
  statuses: Array<InfluenceLedgerEntry["status"]> = ["pending", "approved", "paid"]
): Promise<number> {
  const rows = await listInfluenceForChampion(key);
  return rows
    .filter((row) => statuses.includes(row.status))
    .reduce((sum, row) => sum + row.points, 0);
}

export async function getFirmInfluenceSummary(): Promise<
  Array<{ champion: CourseChampion; points: number; journeys: number; pending: number }>
> {
  await ensureGrowthStore();
  const { COURSE_CHAMPION_LIST } = await import("./champions");
  const result = [];
  for (const champion of COURSE_CHAMPION_LIST) {
    if (champion.key === "developer") continue;
    const points = await sumInfluencePoints(champion.key);
    const journeys = snap().journeys.filter((j) => j.sourcedBy === champion.key).length;
    const pending = snap().influence.filter(
      (i) => i.championKey === champion.key && i.status === "pending"
    ).length;
    result.push({ champion, points, journeys, pending });
  }
  return result.sort((a, b) => b.points - a.points);
}

export async function approveInfluenceEntry(id: string): Promise<boolean> {
  await ensureGrowthStore();
  const row = snap().influence.find((i) => i.id === id);
  if (!row) return false;
  row.status = "approved";
  await persistIfEnabled();
  return true;
}

export type TeacherPipelineCard = {
  journey: LearningJourney;
  stage: "learning" | "stuck" | "hand_raiser" | "engaged";
};

export async function getTeacherPipeline(key: ChampionKey): Promise<TeacherPipelineCard[]> {
  const journeys = await listJourneysForChampion(key);
  const offerTouches = new Set(
    snap()
      .touches.filter((t) => t.eventType === "offer_clicked" && t.studentId)
      .map((t) => `${t.studentId}:${t.courseId}`)
  );

  return journeys.map((journey) => {
    const ageMs = Date.now() - new Date(journey.lastEventAt).getTime();
    const stuck = journey.progressPercent > 0 && journey.progressPercent < 100 && ageMs > 1000 * 60 * 60 * 24 * 3;
    const handRaiser = offerTouches.has(`${journey.studentId}:${journey.courseId}`);
    let stage: TeacherPipelineCard["stage"] = "learning";
    if (handRaiser) stage = "hand_raiser";
    else if (journey.influenceQualified || journey.progressPercent >= INFLUENCE_ENGAGEMENT_THRESHOLD) {
      stage = "engaged";
    } else if (stuck) stage = "stuck";
    return { journey, stage };
  });
}

export async function resetGrowthStoreForTests(): Promise<void> {
  globalForGrowth.__asbGrowthStore = emptyGrowthSnapshot();
  globalForGrowth.__asbGrowthHydrated = true;
  globalForGrowth.__asbGrowthHydratePromise = null;
  await persistIfEnabled();
}

export async function seedGrowthDemoData(): Promise<{ journeys: number; influence: number }> {
  await ensureGrowthStore();
  // Idempotent-ish: only seed if empty
  if (snap().journeys.length > 0) {
    return { journeys: snap().journeys.length, influence: snap().influence.length };
  }

  const { upsertStudent, listPublishedCourses, ensureEnrollment, getStudentCourseState } = await import(
    "@/lib/courses/store"
  );
  const courses = await listPublishedCourses();
  const primary = courses[0];
  if (!primary) return { journeys: 0, influence: 0 };

  const lerato = await upsertStudent({
    firstName: "Lerato",
    surname: "Molefe",
    email: "lerato.demo+growth@asbrokers.test",
    privacyConsent: true,
    marketingConsent: true,
  });
  const thabo = await upsertStudent({
    firstName: "Thabo",
    surname: "Dlamini",
    email: "thabo.demo+growth@asbrokers.test",
    privacyConsent: true,
    marketingConsent: true,
  });
  const aisha = await upsertStudent({
    firstName: "Aisha",
    surname: "Naidoo",
    email: "aisha.demo+growth@asbrokers.test",
    privacyConsent: true,
    marketingConsent: true,
  });

  // Monique sources Lerato (medical-adjacent path — still primary course in seed)
  await ensureEnrollment(lerato.id, primary.id);
  await recordCourseEnrollmentAttribution({
    student: lerato,
    course: primary,
    isNewEnrollment: true,
    promoterRef: "monique",
    attribution: {
      utm_source: "whatsapp",
      utm_medium: "champion",
      utm_campaign: "monique-medical",
      landing: `/learn/${primary.slug}`,
      capturedAt: nowIso(),
    },
  });
  await recordProgressInfluence({
    student: lerato,
    course: primary,
    progressPercent: 40,
    eventType: "engaged",
    label: "Completed early lessons (influence threshold)",
  });

  // Johnny sources Thabo via business interest
  await ensureEnrollment(thabo.id, primary.id);
  await recordCourseEnrollmentAttribution({
    student: thabo,
    course: primary,
    isNewEnrollment: true,
    promoterRef: "johnny",
    attribution: {
      utm_source: "facebook",
      utm_medium: "paid",
      utm_campaign: "business-insurance",
      fbclid: "demo_fbclid_thabo",
      landing: `/learn/${primary.slug}`,
      capturedAt: nowIso(),
    },
  });
  await recordProgressInfluence({
    student: thabo,
    course: primary,
    progressPercent: 100,
    eventType: "course_completed",
    label: "Completed course",
  });
  await recordProgressInfluence({
    student: thabo,
    course: primary,
    progressPercent: 100,
    eventType: "offer_clicked",
    label: "Clicked final offer CTA",
  });

  // Organic Aisha (no champion) — firm first-touch only
  await ensureEnrollment(aisha.id, primary.id);
  await recordCourseEnrollmentAttribution({
    student: aisha,
    course: primary,
    isNewEnrollment: true,
    promoterRef: null,
    attribution: {
      utm_source: "google",
      utm_medium: "cpc",
      gclid: "demo_gclid_aisha",
      landing: `/learn/${primary.slug}`,
      capturedAt: nowIso(),
    },
  });

  void getStudentCourseState;
  return { journeys: snap().journeys.length, influence: snap().influence.length };
}

// Re-export types used by UI
export type { AttributionTouch, LearningJourney, InfluenceLedgerEntry, ServiceCategory };
