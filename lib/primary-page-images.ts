import { normalizePath } from "@/lib/seo";

/** Primary hero/inset image per indexable route — feeds ImageObject in @graph (Phase 7.5). */
export const PAGE_PRIMARY_IMAGES: Record<string, string> = {
  "/": "/opengraph-image",
  "/about": "/images/home4-why-independence-4x3.jpg",
  "/calculators": "/images/calculators-hub-16x9.jpg",
  "/contact": "/images/contact-trust.jpg",
  "/everest-wealth": "/images/everest-suite-hero-16x9.jpg",
  "/everest-wealth/about": "/images/everest-suite-hero-16x9.jpg",
  "/how-we-work": "/images/about-fiduciary-plaque-4x3.jpg",
  "/insurance": "/images/home4-goal-insure-16x9.png",
  "/insights": "/images/home4-why-independence-4x3.jpg",
  "/regulatory-compliance": "/images/regulatory-compliance-inset-1x1.jpg",
  "/retirement": "/images/retirement-inset-1x1.jpg",
  "/solutions": "/images/solutions-hero-16x9.jpg",
  "/estate-planning": "/images/home4-goal-estate-16x9.png",
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
