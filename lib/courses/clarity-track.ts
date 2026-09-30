/**
 * Clarity Track — dignified adult gamification for AS Brokers learners.
 * Insight Points, weekly Momentum (with monthly grace), named tiers, badges.
 */

export const CLARITY_POINT_VALUES = {
  lesson_completed: 50,
  reflection_submitted: 100,
  calculator_used: 25,
  course_completed: 200,
  offer_engaged: 15,
} as const;

export type ClarityPointReason = keyof typeof CLARITY_POINT_VALUES;

export const CLARITY_TIERS = [
  {
    id: "foundation",
    label: "Foundation",
    minPoints: 0,
    blurb: "You have started building a clearer picture of your money life.",
  },
  {
    id: "clarity",
    label: "Clarity",
    minPoints: 200,
    blurb: "Your learning is turning into a sharper personal framework.",
  },
  {
    id: "confidence",
    label: "Confidence",
    minPoints: 500,
    blurb: "You are practising the habits that support sound decisions.",
  },
  {
    id: "freedom",
    label: "Freedom",
    minPoints: 1000,
    blurb: "You are building the understanding that supports lasting freedom.",
  },
] as const;

export type ClarityTierId = (typeof CLARITY_TIERS)[number]["id"];

export const CLARITY_BADGES = [
  {
    id: "first_steps",
    label: "First Steps",
    description: "Completed your first lesson on the Clarity Track.",
  },
  {
    id: "reflective_thinker",
    label: "Reflective Thinker",
    description: "Submitted a written reflection in a lesson.",
  },
  {
    id: "retirement_ready",
    label: "Retirement Ready",
    description: "Completed the retirement education course.",
  },
  {
    id: "consistency_champion",
    label: "Consistency Champion",
    description: "Kept Momentum alive for 4 weeks.",
  },
  {
    id: "numbers_curious",
    label: "Numbers Curious",
    description: "Used a financial calculator inside a lesson.",
  },
  {
    id: "course_finisher",
    label: "Course Finisher",
    description: "Finished a full course from start to end.",
  },
] as const;

export type ClarityBadgeId = (typeof CLARITY_BADGES)[number]["id"];

/** Living Wealth Canvas prompts — goals & philosophy, not product advice. */
export const WEALTH_CANVAS_PROMPTS = [
  {
    id: "step_back_age",
    label: "When do you hope to step back from full-time work?",
    placeholder: "e.g. Around 60, or when the business can run without me…",
  },
  {
    id: "legacy_goal",
    label: "What is your primary legacy goal?",
    placeholder: "e.g. Leave the family home debt-free, fund education…",
  },
  {
    id: "money_worry",
    label: "What money worry keeps you up at night?",
    placeholder: "e.g. Outliving my capital, medical costs…",
  },
  {
    id: "freedom_means",
    label: "What would financial freedom look like for you?",
    placeholder: "e.g. Choosing my hours, travelling once a year…",
  },
] as const;

export type WealthCanvasPromptId = (typeof WEALTH_CANVAS_PROMPTS)[number]["id"];

export type ClarityPointLedgerEntry = {
  id: string;
  studentId: string;
  points: number;
  reason: ClarityPointReason;
  courseId: string | null;
  lessonId: string | null;
  createdAt: string;
  /** Prevent double-awarding the same action. */
  dedupeKey: string;
};

export type StudentClarityProfile = {
  studentId: string;
  insightPoints: number;
  momentumWeeks: number;
  lastActiveWeekKey: string | null;
  momentumSavesRemaining: number;
  momentumSavesMonthKey: string | null;
  badgeIds: ClarityBadgeId[];
  showOnTopAchievers: boolean;
  canvasAnswers: Partial<Record<WealthCanvasPromptId, string>>;
  updatedAt: string;
};

export function emptyClarityProfile(studentId: string, now = new Date()): StudentClarityProfile {
  return {
    studentId,
    insightPoints: 0,
    momentumWeeks: 0,
    lastActiveWeekKey: null,
    momentumSavesRemaining: 1,
    momentumSavesMonthKey: monthKey(now),
    badgeIds: [],
    showOnTopAchievers: false,
    canvasAnswers: {},
    updatedAt: now.toISOString(),
  };
}

/** ISO-like week key YYYY-Www (Monday-based). */
export function weekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function monthKey(date = new Date()): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function previousWeekKey(key: string): string {
  const match = /^(\d{4})-W(\d{2})$/.exec(key);
  if (!match) return key;
  const year = Number(match[1]);
  const week = Number(match[2]);
  if (week > 1) return `${year}-W${String(week - 1).padStart(2, "0")}`;
  return `${year - 1}-W52`;
}

export function tierForPoints(points: number): (typeof CLARITY_TIERS)[number] {
  let current: (typeof CLARITY_TIERS)[number] = CLARITY_TIERS[0]!;
  for (const tier of CLARITY_TIERS) {
    if (points >= tier.minPoints) current = tier;
  }
  return current;
}

export function nextTier(points: number): (typeof CLARITY_TIERS)[number] | null {
  const current = tierForPoints(points);
  const index = CLARITY_TIERS.findIndex((tier) => tier.id === current.id);
  return CLARITY_TIERS[index + 1] ?? null;
}

export function topPerformerScore(insightPoints: number, momentumWeeks: number): number {
  return Math.round(insightPoints * 0.6 + momentumWeeks * 40 * 0.4);
}

export type MomentumApplyResult = {
  profile: StudentClarityProfile;
  usedSave: boolean;
  reset: boolean;
};

/** Apply a meaningful activity to Momentum (weekly streak + monthly grace). */
export function applyMomentum(profile: StudentClarityProfile, at = new Date()): MomentumApplyResult {
  const next = { ...profile, badgeIds: [...profile.badgeIds] };
  const currentWeek = weekKey(at);
  const currentMonth = monthKey(at);

  if (next.momentumSavesMonthKey !== currentMonth) {
    next.momentumSavesMonthKey = currentMonth;
    next.momentumSavesRemaining = 1;
  }

  if (next.lastActiveWeekKey === currentWeek) {
    next.updatedAt = at.toISOString();
    return { profile: next, usedSave: false, reset: false };
  }

  let usedSave = false;
  let reset = false;

  if (!next.lastActiveWeekKey) {
    next.momentumWeeks = 1;
  } else if (previousWeekKey(currentWeek) === next.lastActiveWeekKey) {
    next.momentumWeeks += 1;
  } else if (next.momentumSavesRemaining > 0) {
    // One-week (or longer) gap: spend the monthly save and keep the streak alive.
    next.momentumSavesRemaining -= 1;
    next.momentumWeeks = Math.max(1, next.momentumWeeks);
    usedSave = true;
  } else {
    next.momentumWeeks = 1;
    reset = true;
  }

  next.lastActiveWeekKey = currentWeek;
  next.updatedAt = at.toISOString();

  if (next.momentumWeeks >= 4 && !next.badgeIds.includes("consistency_champion")) {
    next.badgeIds.push("consistency_champion");
  }

  return { profile: next, usedSave, reset };
}

export function badgeMeta(id: ClarityBadgeId) {
  return CLARITY_BADGES.find((badge) => badge.id === id) ?? null;
}
