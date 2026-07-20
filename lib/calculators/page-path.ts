/** Public marketing URL for an ASSET calculator (full page with nav, copy, embed). */
const PUBLIC_PATH_BY_ID: Record<string, string> = {
  /** SEO-friendly slug retained for “Estate Duty Calculator” search intent. */
  "asset-007-estate-duty": "/calculators/estate-duty-calculator",
};

const SLUG_TO_REGISTRY_ID: Record<string, string> = {
  "estate-duty-calculator": "asset-007-estate-duty",
};

export function calculatorPagePath(id: string): string {
  return PUBLIC_PATH_BY_ID[id] ?? `/calculators/${id}`;
}

/** Resolve pretty SEO slugs back to registry ids. */
export function resolveCalculatorSlug(slug: string): string {
  return SLUG_TO_REGISTRY_ID[slug] ?? slug;
}
