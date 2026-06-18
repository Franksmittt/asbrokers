import type { HealthyRetirementAnswers } from "@/lib/healthy-retirement/questions";

export type HealthScoreBand =
  | "excellent"
  | "good"
  | "moderate-risk"
  | "high-risk"
  | "action-required";

export type HealthyRetirementScore = {
  score: number;
  gap: number;
  band: HealthScoreBand;
  bandLabel: string;
};

const AGE_POINTS: Record<string, number> = {
  "under-50": 10,
  "50-59": 9,
  "60-69": 7,
  "70+": 5,
};

const EXERCISE_POINTS: Record<string, number> = {
  "0": 0,
  "1-2": 5,
  "3-4": 8,
  "5+": 10,
};

const SLEEP_POINTS: Record<string, number> = {
  "less-than-6": 3,
  "6-7": 7,
  "7-8": 10,
  "more-than-8": 8,
};

const HEALTH_RATING_POINTS: Record<string, number> = {
  poor: 2,
  fair: 5,
  good: 8,
  excellent: 10,
};

const RETIREMENT_OUTLOOK_POINTS: Record<string, number> = {
  yes: 10,
  unsure: 5,
  no: 0,
};

function yesNoPoints(value: string, yesScore = 10, noScore = 0): number {
  return value === "yes" ? yesScore : noScore;
}

function awarenessPoints(value: string): number {
  return value === "yes" ? 10 : 3;
}

export function calculateHealthyRetirementScore(answers: HealthyRetirementAnswers): HealthyRetirementScore {
  const points = [
    AGE_POINTS[answers.age] ?? 0,
    EXERCISE_POINTS[answers.exerciseDays] ?? 0,
    yesNoPoints(answers.walk30Minutes),
    yesNoPoints(answers.smoke, 0, 10),
    SLEEP_POINTS[answers.sleepHours] ?? 0,
    yesNoPoints(answers.checkup12Months),
    awarenessPoints(answers.knowBloodPressure),
    awarenessPoints(answers.knowCholesterol),
    HEALTH_RATING_POINTS[answers.healthRating] ?? 0,
    RETIREMENT_OUTLOOK_POINTS[answers.retirement20Years] ?? 0,
  ];

  const score = Math.min(100, Math.max(0, points.reduce((sum, p) => sum + p, 0)));
  const gap = 100 - score;
  const { band, bandLabel } = getScoreBand(score);

  return { score, gap, band, bandLabel };
}

export function getScoreBand(score: number): { band: HealthScoreBand; bandLabel: string } {
  if (score >= 90) return { band: "excellent", bandLabel: "Excellent" };
  if (score >= 80) return { band: "good", bandLabel: "Good" };
  if (score >= 70) return { band: "moderate-risk", bandLabel: "Moderate Risk" };
  if (score >= 60) return { band: "high-risk", bandLabel: "High Risk" };
  return { band: "action-required", bandLabel: "Action Required" };
}

export function getBandColor(band: HealthScoreBand): string {
  switch (band) {
    case "excellent":
      return "#22c55e";
    case "good":
      return "#00549F";
    case "moderate-risk":
      return "#f59e0b";
    case "high-risk":
      return "#f97316";
    case "action-required":
      return "#ef4444";
  }
}
