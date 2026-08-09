import { normalizePath } from "@/lib/seo";

/** Primary hero/inset image per indexable route, feeds ImageObject in @graph (Phase 7.5). */
export const PAGE_PRIMARY_IMAGES: Record<string, string> = {
  "/": "/opengraph-image",
  "/about": "/images/about-hero.jpg",
  "/calculators": "/images/calculators-hub-16x9.jpg",
  "/contact": "/images/contact-trust.jpg",
  "/everest-wealth": "/images/everest-wealth-hero-16x9.webp",
  "/investments": "/images/investments-hero-16x9.jpg",
  "/everest-wealth/about": "/images/everest-copper-industrial-4x3.jpg",
  "/everest-128-product": "/images/home4-import/card1.jpg",
  "/immediate-higher-income-calculator": "/images/home4-import/card1.jpg",
  "/everest-strategic-growth-145": "/images/home4-import/card3.jpg",
  "/everest-amethyst-living-annuity": "/images/home4-goal-retire-16x9.jpg",
  "/how-we-work": "/images/about-fiduciary-plaque-4x3.jpg",
  "/insurance": "/images/insurance-hero-16x9.jpg",
  "/insights": "/images/insights-hero-16x9.jpg",
  // Static (non-Studio) insight pages only. Studio articles use heroImageUrl via resolveStudioInsightCoverImage.
  "/insights/semigration-retirement": "/images/home4-why-independence-4x3.jpg",
  "/premium-increase-calculator": "/images/home4-goal-insure-16x9.jpg",
  "/income-in-retirement": "/images/home4-goal-retire-16x9.jpg",
  "/cost-of-inflation-over-time": "/images/home4-import/card3.jpg",
  "/income-tax-calculator": "/images/home4-import/card1.jpg",
  "/estate-duty-calculator": "/images/home4-goal-estate-16x9.jpg",
  "/annual-estate-reduction-strategy": "/images/home4-goal-estate-16x9.jpg",
  "/healthy-retirement-blueprint": "/images/home4-goal-retire-16x9.jpg",
  "/retirement-survival-blueprint": "/images/home4-goal-retire-16x9.jpg",
  "/business-risk-review": "/images/home4-goal-insure-16x9.jpg",
  "/legacy-readiness-checklist": "/images/home4-goal-estate-16x9.jpg",
  "/retirement": "/images/retirement-inset-1x1.jpg",
  "/solutions": "/images/solutions-hero-16x9.jpg",
  "/solutions/medical-aid": "/images/risk-arch-medical.jpg",
  "/solutions/discovery-health": "/images/risk-arch-medical.webp",
  "/estate-planning": "/images/estate-planning-hero-16x9.jpg",
  "/retirement-planning": "/images/retirement-planning-hero-16x9.webp",
  "/regulatory-compliance": "/images/regulatory-compliance-inset-1x1.jpg",
};

export function getPrimaryPageImage(path: string): string | undefined {
  // Studio insight articles are not listed here on purpose: each post uses its own
  // heroImageUrl via resolveStudioInsightCoverImage (never the site OG card).
  return PAGE_PRIMARY_IMAGES[normalizePath(path)];
}
