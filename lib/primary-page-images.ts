import { normalizePath } from "@/lib/seo";

/** Primary hero/inset image per indexable route — feeds ImageObject in @graph (Phase 7.5). */
export const PAGE_PRIMARY_IMAGES: Record<string, string> = {
  "/": "/opengraph-image",
  "/about": "/images/home4-why-independence-4x3.jpg",
  "/calculators": "/images/calculators-hub-16x9.jpg",
  "/contact": "/images/contact-trust.jpg",
  "/everest-wealth": "/images/everest-suite-hero-16x9.jpg",
  "/everest-wealth/about": "/images/home4-import/card1.png",
  "/everest-128-product": "/images/home4-import/card1.png",
  "/immediate-higher-income-calculator": "/images/home4-import/card1.png",
  "/everest-strategic-growth-145": "/images/home4-import/card3.png",
  "/everest-amethyst-living-annuity": "/images/home4-goal-retire-16x9.png",
  "/how-we-work": "/images/about-fiduciary-plaque-4x3.jpg",
  "/insurance": "/images/home4-goal-insure-16x9.png",
  "/insights": "/images/home4-why-independence-4x3.jpg",
  "/premium-increase-calculator": "/images/home4-goal-insure-16x9.png",
  "/income-in-retirement": "/images/home4-goal-retire-16x9.png",
  "/cost-of-inflation-over-time": "/images/home4-import/card3.png",
  "/income-tax-calculator": "/images/home4-import/card1.png",
  "/estate-duty-calculator": "/images/home4-goal-estate-16x9.png",
  "/annual-estate-reduction-strategy": "/images/home4-goal-estate-16x9.png",
  "/healthy-retirement-blueprint": "/images/home4-goal-retire-16x9.png",
  "/retirement-survival-blueprint": "/images/home4-goal-retire-16x9.png",
  "/business-risk-review": "/images/home4-goal-insure-16x9.png",
  "/legacy-readiness-checklist": "/images/home4-goal-estate-16x9.png",
  "/retirement": "/images/retirement-inset-1x1.jpg",
  "/solutions": "/images/solutions-hero-16x9.jpg",
  "/estate-planning": "/images/home4-goal-estate-16x9.png",
  "/regulatory-compliance": "/images/regulatory-compliance-inset-1x1.jpg",
};

export function getPrimaryPageImage(path: string): string | undefined {
  if (path.startsWith("/insights/") && path !== "/insights") {
    return "/images/og-default.jpg";
  }
  return PAGE_PRIMARY_IMAGES[normalizePath(path)];
}
