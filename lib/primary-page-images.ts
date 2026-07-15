import { normalizePath } from "@/lib/seo";

/** Primary hero/inset image per indexable route, feeds ImageObject in @graph (Phase 7.5). */
export const PAGE_PRIMARY_IMAGES: Record<string, string> = {
  "/": "/opengraph-image",
  "/about": "/images/home4-why-independence-4x3.jpg",
  "/calculators": "/images/calculators-hub-16x9.jpg",
  "/contact": "/images/contact-trust.jpg",
  "/everest-wealth": "/images/everest-suite-hero-16x9.jpg",
  "/everest-wealth/about": "/images/everest-copper-industrial-4x3.jpg",
  "/everest-128-product": "/images/home4-import/card1.png",
  "/immediate-higher-income-calculator": "/images/home4-import/card1.png",
  "/everest-strategic-growth-145": "/images/home4-import/card3.png",
  "/everest-amethyst-living-annuity": "/images/home4-goal-retire-16x9.jpg",
  "/how-we-work": "/images/about-fiduciary-plaque-4x3.jpg",
  "/insurance": "/images/home4-goal-insure-16x9.jpg",
  "/insights": "/images/home4-why-independence-4x3.jpg",
  "/premium-increase-calculator": "/images/home4-goal-insure-16x9.jpg",
  "/income-in-retirement": "/images/home4-goal-retire-16x9.jpg",
  "/cost-of-inflation-over-time": "/images/home4-import/card3.png",
  "/income-tax-calculator": "/images/home4-import/card1.png",
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
  "/estate-planning": "/images/home4-goal-estate-16x9.jpg",
  "/retirement-planning": "/images/retirement-planning-hero-16x9.webp",
  "/regulatory-compliance": "/images/regulatory-compliance-inset-1x1.jpg",
};

export function getPrimaryPageImage(path: string): string | undefined {
  if (path.startsWith("/insights/") && path !== "/insights") {
    return "/images/og-default.jpg";
  }
  return PAGE_PRIMARY_IMAGES[normalizePath(path)];
}
