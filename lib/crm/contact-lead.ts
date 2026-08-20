import type { ServiceCategory } from "@/lib/crm/types";

const TOPIC_TO_SERVICE: Record<string, ServiceCategory> = {
  everest: "retirement_everest",
  medical_gap: "medical_wellness",
  medical: "medical_wellness",
  gap: "medical_wellness",
  wellness: "medical_wellness",
  short_business: "short_term_business",
  short_personal: "short_term_personal",
  life_business: "life_personal",
  life_personal: "life_personal",
  will: "estate_business",
  trust: "estate_business",
  estate: "estate_business",
  general: "short_term_business",
};

export function serviceCategoryFromContactTopics(topics: string[]): ServiceCategory {
  for (const topic of topics) {
    const mapped = TOPIC_TO_SERVICE[topic];
    if (mapped) return mapped;
  }
  return "short_term_business";
}

export function contactLeadScore(topics: string[], capitalAmount?: number): number {
  let score = 10;
  if (capitalAmount && capitalAmount > 1_000_000) score += 20;
  if (topics.some((t) => t === "short_business" || t === "trust")) score += 15;
  return score;
}

/**
 * Pre-select contact topics from ?source=. The public site leads with business
 * insurance, so homepage and nav CTAs must not default to Everest/retirement.
 */
export function defaultContactTopicsFromSource(source: string): string[] {
  const s = source.trim().toLowerCase();
  if (!s) return ["short_business"];
  if (s.includes("medical") || s.includes("discovery") || s.includes("gap")) return ["medical_gap"];
  if (s.includes("estate") || s.includes("legacy") || s.includes("will") || s.includes("trust")) {
    return ["estate"];
  }
  if (
    s.includes("everest") ||
    s.includes("calculator") ||
    s.includes("retirement") ||
    s.includes("invest")
  ) {
    return ["everest"];
  }
  return ["short_business"];
}
