/** LCP hero sources for primary hub pages, keep in sync with PageView HERO_IMAGE constants. */
export const HUB_LCP_IMAGES: Record<string, string> = {
  "/": "/images/home-lcp.webp",
  "/retirement": "/images/home4-goal-retire-16x9.jpg",
  "/retirement-planning": "/images/home4-goal-retire-16x9.jpg",
  "/everest-wealth": "/images/everest-copper-industrial-4x3.jpg",
  "/investments": "/images/everest-suite-hero-16x9.jpg",
  "/insurance": "/images/risk-arch-commercial.jpg",
  "/estate-planning": "/images/risk-arch-estate.jpg",
  "/insights": "/images/home4-why-independence-4x3.jpg",
  "/about": "/images/home4-why-independence-4x3.jpg",
  "/contact": "/images/contact-trust.jpg",
  "/everest-128-product": "/images/home4-import/card1.png",
  "/immediate-higher-income-calculator": "/images/home4-import/card1.png",
  "/everest-strategic-growth-145": "/images/home4-import/card3.png",
  "/everest-amethyst-living-annuity": "/images/home4-goal-retire-16x9.jpg",
  "/everest-wealth/about": "/images/everest-copper-industrial-4x3.jpg",
  "/income-in-retirement": "/images/home4-goal-retire-16x9.jpg",
  "/cost-of-inflation-over-time": "/images/home4-import/card3.png",
  "/income-tax-calculator": "/images/home4-import/card1.png",
  "/estate-duty-calculator": "/images/home4-goal-estate-16x9.jpg",
  "/annual-estate-reduction-strategy": "/images/home4-goal-estate-16x9.jpg",
  "/premium-increase-calculator": "/images/home4-goal-insure-16x9.jpg",
};

/** Responsive `sizes` for full-bleed hub heroes (mobile LCP). */
export const HUB_HERO_SIZES = "(max-width: 768px) 100vw, 1280px";

/** Grid / split-layout hero band (e.g. retirement header image). */
export const HUB_SPLIT_HERO_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px";
