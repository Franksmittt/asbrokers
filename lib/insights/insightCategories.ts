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
  { value: "weekly_news_letter", label: "Weekly News Letter" },
] as const;

export type InsightCategoryValue = (typeof INSIGHT_CATEGORIES)[number]["value"];

export const INSIGHT_CATEGORY_VALUES = INSIGHT_CATEGORIES.map((c) => c.value) as InsightCategoryValue[];

export const INSIGHT_CATEGORY_LABEL_BY_VALUE: Record<InsightCategoryValue, string> = Object.fromEntries(
  INSIGHT_CATEGORIES.map((c) => [c.value, c.label])
) as Record<InsightCategoryValue, string>;

export const UNCATEGORIZED_VALUE = "__uncategorized__" as const;

const CATEGORY_VALUE_SET = new Set<string>(INSIGHT_CATEGORY_VALUES);
const BODY_CATEGORY_MARKER_RE = /<!--\s*studio_categories:(\[[\s\S]*?\])\s*-->/i;

/** Normalize DB/json shapes into validated category values. */
export function normalizeInsightCategories(value: unknown): InsightCategoryValue[] {
  let raw: unknown[] = [];
  if (Array.isArray(value)) {
    raw = value;
  } else if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) {
        raw = parsed;
      } else if (typeof parsed === "object" && parsed) {
        raw = Object.values(parsed);
      } else {
        raw = value
          .split(",")
          .map((part) => part.trim())
          .filter(Boolean);
      }
    } catch {
      raw = value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
    }
  } else if (value && typeof value === "object") {
    raw = Object.values(value as Record<string, unknown>);
  }
  const seen = new Set<InsightCategoryValue>();
  for (const entry of raw) {
    const candidate =
      typeof entry === "string"
        ? entry
        : entry && typeof entry === "object" && "value" in entry && typeof entry.value === "string"
          ? entry.value
          : "";
    if (!candidate || !CATEGORY_VALUE_SET.has(candidate)) continue;
    seen.add(candidate as InsightCategoryValue);
  }
  return [...seen];
}

function parseCategoryMarkerJson(raw: string): InsightCategoryValue[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return normalizeInsightCategories(parsed);
  } catch {
    return [];
  }
}

export function categoriesFromBodyHtmlMarker(html: string | null | undefined): InsightCategoryValue[] {
  if (!html) return [];
  const match = html.match(BODY_CATEGORY_MARKER_RE);
  if (!match?.[1]) return [];
  return parseCategoryMarkerJson(match[1]);
}

export function resolveInsightCategories(
  categoriesValue: unknown,
  bodyHtml?: string | null,
  bodyHtmlPublished?: string | null
): InsightCategoryValue[] {
  const normalized = normalizeInsightCategories(categoriesValue);
  if (normalized.length > 0) return normalized;
  const fromDraft = categoriesFromBodyHtmlMarker(bodyHtml);
  if (fromDraft.length > 0) return fromDraft;
  return categoriesFromBodyHtmlMarker(bodyHtmlPublished);
}

export function withEmbeddedCategoryMarker(
  html: string,
  categories: InsightCategoryValue[]
): string {
  const clean = html.replace(BODY_CATEGORY_MARKER_RE, "").trimEnd();
  if (categories.length === 0) return clean;
  const marker = `<!--studio_categories:${JSON.stringify(categories)}-->`;
  return `${clean}\n${marker}`;
}

