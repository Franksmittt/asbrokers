export const INSIGHT_CATEGORIES = [
  { value: "short_term_business", label: "Short Term Business" },
  { value: "short_term_personal", label: "Short Term Personal" },
  { value: "life_insurance_business", label: "Life Insurance Business" },
  { value: "life_insurance_personal", label: "Life Insurance Personal" },
  { value: "estate_planning", label: "Estate Planning" },
  { value: "investments", label: "Investments" },
  { value: "retirement_planning", label: "Retirement Planning" },
  { value: "health_wellness", label: "Health & Wellness" },
  { value: "financial_freedom", label: "Financial Freedom" },
  { value: "medical_aid", label: "Medical Aid" },
  { value: "last_will_testament", label: "Last Will & Testament" },
  { value: "trust_structure", label: "Trust Structure" },
] as const;

export type InsightCategoryValue = (typeof INSIGHT_CATEGORIES)[number]["value"];

export const INSIGHT_CATEGORY_VALUES = INSIGHT_CATEGORIES.map((c) => c.value) as InsightCategoryValue[];

export const INSIGHT_CATEGORY_LABEL_BY_VALUE: Record<InsightCategoryValue, string> = Object.fromEntries(
  INSIGHT_CATEGORIES.map((c) => [c.value, c.label])
) as Record<InsightCategoryValue, string>;

export const UNCATEGORIZED_VALUE = "__uncategorized__" as const;

