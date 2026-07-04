import { normalizePath } from "@/lib/seo";

/** Primary hero/inset image per indexable route — feeds ImageObject in @graph (Phase 7.5). */
export const PAGE_PRIMARY_IMAGES: Record<string, string> = {
  "/": "/opengraph-image",
  "/about": "/images/home4-why-independence-4x3.jpg",
  "/calculators": "/images/calculators-hub-16x9.jpg",
  "/contact": "/images/contact-trust.jpg",
  "/cost-of-inflation-over-time": "/images/inflation-cost-inset-1x1.jpg",
  "/estate-duty-calculator": "/images/estate-duty-calculator-inset-1x1.jpg",
  "/everest-128-product": "/images/everest-128-inset-1x1.jpg",
  "/everest-amethyst-living-annuity": "/images/living-annuity-inset-1x1.jpg",
  "/everest-strategic-growth-145": "/images/everest-growth-145-inset-1x1.jpg",
  "/everest-wealth": "/images/everest-suite-hero-16x9.jpg",
  "/everest-wealth/about": "/images/everest-suite-hero-16x9.jpg",
  "/how-we-work": "/images/about-fiduciary-plaque-4x3.jpg",
  "/insurance": "/images/home4-goal-insure-16x9.png",
  "/immediate-higher-income-calculator": "/images/living-annuity-inset-1x1.jpg",
  "/income-in-retirement": "/images/income-retirement-inset-1x1.jpg",
  "/income-tax-calculator": "/images/income-tax-calculator-inset-1x1.jpg",
  "/insights": "/images/home4-why-independence-4x3.jpg",
  "/lab": "/images/lab-inset-1x1.jpg",
  "/premium-increase-calculator": "/images/premium-calculator-inset-1x1.jpg",
  "/regulatory-compliance": "/images/regulatory-compliance-inset-1x1.jpg",
  "/retirement": "/images/retirement-inset-1x1.jpg",
  "/retirement-readiness": "/images/living-annuity-inset-1x1.jpg",
  "/solutions": "/images/solutions-hero-16x9.jpg",
  "/solutions/estate-planning": "/images/home4-goal-estate-16x9.png",
  "/wealth-building-calculator": "/images/calculators-inset-1x1.jpg",
  "/annual-estate-reduction-strategy": "/images/annual-estate-reduction-inset-1x1.jpg",
  "/business-risk-review": "/images/business-insurance-inset-1x1.jpg",
  "/legacy-readiness-checklist": "/images/about-selective-inset-1x1.jpg",
  "/healthy-retirement-blueprint": "/images/calculators-education-16x9.jpg",
  "/retirement-survival-blueprint": "/images/calculators-capital-lifespan-4x3.jpg",
};

export function getPrimaryPageImage(path: string): string | undefined {
  if (path.startsWith("/insights/") && path !== "/insights") {
    return "/images/og-default.jpg";
  }
  return PAGE_PRIMARY_IMAGES[normalizePath(path)];
}
