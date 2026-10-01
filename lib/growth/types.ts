/**
 * Education-led growth: Sourced vs Influenced dual ledger.
 * Influence points are an internal KPI bonus track — NOT FAIS product commission splits.
 */

import type { ServiceCategory } from "@/lib/crm/types";

export type ChampionKey =
  | "albert"
  | "johnny"
  | "petro"
  | "monique"
  | "shanel"
  | "developer";

export type InfluenceReason =
  | "sourced_enrollment"
  | "engaged_25"
  | "course_completed"
  | "offer_clicked"
  | "discovery_booked"
  | "manual_adjustment";

export type ConversionEventType =
  | "link_clicked"
  | "account_created"
  | "enrolled"
  | "lesson_completed"
  | "engaged"
  | "course_completed"
  | "offer_clicked"
  | "discovery_booked"
  | "product_activated";

export type AttributionTouch = {
  id: string;
  /** Anonymous visitor or student id once known */
  visitorKey: string;
  studentId?: string;
  studentEmail?: string;
  promoterRef?: ChampionKey;
  courseId?: string;
  courseSlug?: string;
  courseTitle?: string;
  serviceCategory?: ServiceCategory | string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  channel?: string;
  landing?: string;
  eventType: ConversionEventType;
  /** Human label for timeline UI */
  label: string;
  meta?: Record<string, unknown>;
  createdAt: string;
};

export type InfluenceLedgerEntry = {
  id: string;
  championKey: ChampionKey;
  points: number;
  reason: InfluenceReason;
  studentId?: string;
  studentEmail?: string;
  courseId?: string;
  courseSlug?: string;
  touchId?: string;
  note?: string;
  /** pending → approved → paid | revoked */
  status: "pending" | "approved" | "paid" | "revoked";
  createdAt: string;
};

export type LearningJourney = {
  id: string;
  studentId: string;
  studentEmail: string;
  studentName: string;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  serviceCategory: ServiceCategory | string;
  /** First-touch promoter (sourced) — sticky */
  sourcedBy?: ChampionKey;
  progressPercent: number;
  influenceQualified: boolean;
  enrolledAt: string;
  updatedAt: string;
  lastEventAt: string;
};

export type GrowthSnapshot = {
  version: 1;
  touches: AttributionTouch[];
  influence: InfluenceLedgerEntry[];
  journeys: LearningJourney[];
};

/** Points policy (v1 simple) */
export const INFLUENCE_POINTS: Record<InfluenceReason, number> = {
  sourced_enrollment: 10,
  engaged_25: 15,
  course_completed: 25,
  offer_clicked: 20,
  discovery_booked: 40,
  manual_adjustment: 0,
};

/** Minimum course progress (%) to count as Influence (not just awareness). */
export const INFLUENCE_ENGAGEMENT_THRESHOLD = 25;
