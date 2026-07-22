/**
 * AS Brokers Website & Calculator Compliance Containment
 * Effective: 2026-07-22
 *
 * Temporary regulatory containment. Do not treat as permanent IA redesign.
 * Restricted paths return HTTP 302 to /calculators (temporary holding page).
 */

/** Educational calculators that may remain public during review (with notices). */
export const CONTAINMENT_ALLOWED_CALCULATOR_IDS = [
  "asset-001-retirement-growth",
  "asset-002-retirement-reality-check",
  "asset-003-retirement-premium",
  "asset-004-life-of-capital",
  "asset-005-future-value",
  "asset-016-growth-comparison",
  "asset-017-personal-goal",
] as const;

export type ContainmentAllowedCalculatorId =
  (typeof CONTAINMENT_ALLOWED_CALCULATOR_IDS)[number];

/** High-risk / legislation-dependent / product-specific calculators — not publicly accessible. */
export const CONTAINMENT_RESTRICTED_CALCULATOR_IDS = [
  "asset-006-income-tax",
  "asset-007-estate-duty",
  "asset-008-estate-reduction",
  "asset-009-everest-142-income",
  "asset-010-everest-128-income",
  "asset-011-everest-128-vs-142",
  "asset-012-strategic-growth",
  "asset-013-everest-income-vs-growth",
  "asset-014-living-annuity",
  "asset-015-average-clause",
] as const;

/** Pretty-slug aliases that must also be restricted. */
export const CONTAINMENT_RESTRICTED_CALCULATOR_ALIASES = [
  "estate-duty-calculator",
  "underinsurance-calculator",
] as const;

/** Product / Everest surfaces — temporary 302 to holding page. */
export const CONTAINMENT_RESTRICTED_PRODUCT_PATHS = [
  "/everest-wealth",
  "/everest-wealth/about",
  "/everest-amethyst-living-annuity",
  "/everest-128-product",
  "/everest-strategic-growth-145",
  "/immediate-higher-income-calculator",
] as const;

/** Holding page for restricted calculator / product URLs (temporary redirect target). */
export const CONTAINMENT_HOLDING_PATH = "/calculators";

export const CONTAINMENT_EFFECTIVE_AT = "2026-07-22T06:43:00+02:00";

export const CONTAINMENT_REASON =
  "Regulatory containment: formula, factual, provider and compliance verification incomplete for product-specific and legislation-dependent calculators.";

export function isContainmentAllowedCalculatorId(id: string): boolean {
  return (CONTAINMENT_ALLOWED_CALCULATOR_IDS as readonly string[]).includes(id);
}

export function isRestrictedCalculatorPath(pathname: string): boolean {
  if (!pathname.startsWith("/calculators/")) return false;
  const slug = pathname.slice("/calculators/".length).replace(/\/$/, "");
  if (!slug || slug.includes("/")) return false;
  if ((CONTAINMENT_RESTRICTED_CALCULATOR_ALIASES as readonly string[]).includes(slug)) {
    return true;
  }
  if ((CONTAINMENT_RESTRICTED_CALCULATOR_IDS as readonly string[]).includes(slug)) {
    return true;
  }
  // Canonical IDs when pretty aliases are not used
  return (CONTAINMENT_RESTRICTED_CALCULATOR_IDS as readonly string[]).some(
    (id) => id === slug
  );
}

export function isRestrictedProductPath(pathname: string): boolean {
  return (CONTAINMENT_RESTRICTED_PRODUCT_PATHS as readonly string[]).some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export function isRestrictedEmbedPath(pathname: string): boolean {
  if (!pathname.startsWith("/embed-calculators/")) return false;
  const file = pathname.slice("/embed-calculators/".length);
  const restrictedEmbeds = [
    "asset-006-income-tax.html",
    "asset-007-estate-duty.html",
    "asset-008-estate-reduction.html",
    "asset-009-everest-142-income.html",
    "asset-010-everest-128-income.html",
    "asset-011-everest-128-vs-142.html",
    "asset-012-strategic-growth.html",
    "asset-013-everest-income-vs-growth.html",
    "asset-014-living-annuity.html",
    "asset-015-average-clause.html",
    "amethyst-living-annuity-illustration.html",
  ];
  return restrictedEmbeds.includes(file);
}

/** True when this request path must 302 to the holding page. */
export function isContainmentRestrictedPath(pathname: string): boolean {
  return (
    isRestrictedCalculatorPath(pathname) ||
    isRestrictedProductPath(pathname) ||
    isRestrictedEmbedPath(pathname)
  );
}

export const CALCULATOR_REVIEW_NOTICE_ABOVE_INPUT =
  "This calculator provides a general mathematical illustration based on the assumptions entered. It does not assess your complete financial circumstances, risk profile, tax position or product suitability. Results are not guarantees, quotations or personal financial recommendations.";

export const CALCULATOR_REVIEW_NOTICE_BELOW_RESULT =
  "This result is an estimate based on the assumptions shown. Actual outcomes may differ because of investment performance, fees, taxation, inflation, withdrawals and other personal circumstances.";

/**
 * Rewrite promotional hrefs that would deep-link restricted surfaces.
 * Prefer this over deleting link data permanently (restore after approval).
 */
export function containmentSafePublicHref(href: string): string {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  let pathname = href;
  let search = "";
  let hash = "";
  try {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      const url = new URL(href);
      pathname = url.pathname;
      search = url.search;
      hash = url.hash;
    } else {
      const hashIdx = href.indexOf("#");
      const searchIdx = href.indexOf("?");
      if (hashIdx >= 0) {
        hash = href.slice(hashIdx);
        pathname = href.slice(0, hashIdx);
      }
      if (searchIdx >= 0 && (hashIdx < 0 || searchIdx < hashIdx)) {
        const end = hashIdx >= 0 ? hashIdx : href.length;
        search = href.slice(searchIdx, end);
        pathname = href.slice(0, searchIdx);
      }
    }
  } catch {
    return CONTAINMENT_HOLDING_PATH;
  }

  pathname = pathname.replace(/\/$/, "") || "/";

  if (isContainmentRestrictedPath(pathname)) {
    return CONTAINMENT_HOLDING_PATH;
  }

  if (pathname === "/calculators" && hash.startsWith("#")) {
    const id = hash.slice(1);
    if ((CONTAINMENT_RESTRICTED_CALCULATOR_IDS as readonly string[]).includes(id)) {
      return CONTAINMENT_HOLDING_PATH;
    }
    if ((CONTAINMENT_RESTRICTED_CALCULATOR_ALIASES as readonly string[]).includes(id)) {
      return CONTAINMENT_HOLDING_PATH;
    }
  }

  return `${pathname}${search}${hash}`;
}