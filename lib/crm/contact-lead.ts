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
  general: "retirement_everest",
};

export function serviceCategoryFromContactTopics(topics: string[]): ServiceCategory {
  for (const topic of topics) {
    const mapped = TOPIC_TO_SERVICE[topic];
    if (mapped) return mapped;
  }
  return "retirement_everest";
}

export function contactLeadScore(topics: string[], capitalAmount?: number): number {
  let score = 10;
  if (capitalAmount && capitalAmount > 1_000_000) score += 20;
  if (topics.some((t) => t === "short_business" || t === "trust")) score += 15;
  return score;
}
