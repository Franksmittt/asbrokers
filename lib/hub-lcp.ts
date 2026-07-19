/** LCP hero sources for primary hub pages, keep in sync with PageView HERO_IMAGE constants. */
export const HUB_LCP_IMAGES: Record<string, string> = {
  "/": "/images/home-lcp.webp",
  "/retirement": "/images/retirement-planning-hero-16x9.webp",
  "/retirement-planning": "/images/retirement-planning-hero-16x9.webp",
  "/everest-wealth": "/images/everest-wealth-hero-16x9-480.webp",
  "/investments": "/images/investments-hero-16x9.webp",
  "/insurance": "/images/insurance-hero-16x9.webp",
  "/estate-planning": "/images/estate-planning-hero-16x9.webp",
  "/insights": "/images/insights-hero-16x9.webp",
  "/about": "/images/about-hero.webp",
  "/calculators": "/images/calculators-hub-16x9.webp",
  "/contact": "/images/contact-trust.jpg",
  "/everest-128-product": "/images/home4-import/card1.jpg",
  "/immediate-higher-income-calculator": "/images/home4-import/card1.jpg",
  "/everest-strategic-growth-145": "/images/home4-import/card3.jpg",
  "/everest-amethyst-living-annuity": "/images/home4-goal-retire-16x9.jpg",
  "/everest-wealth/about": "/images/everest-copper-industrial-4x3.jpg",
  "/income-in-retirement": "/images/home4-goal-retire-16x9.jpg",
  "/cost-of-inflation-over-time": "/images/home4-import/card3.jpg",
  "/income-tax-calculator": "/images/home4-import/card1.jpg",
  "/estate-duty-calculator": "/images/home4-goal-estate-16x9.jpg",
  "/annual-estate-reduction-strategy": "/images/home4-goal-estate-16x9.jpg",
  "/premium-increase-calculator": "/images/home4-goal-insure-16x9.jpg",
};

/** Responsive `sizes` for full-bleed hub heroes (mobile LCP). */
export const HUB_HERO_SIZES = "(max-width: 768px) 100vw, 1280px";

/** Grid / split-layout hero band (e.g. retirement header image). */
export const HUB_SPLIT_HERO_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px";

/**
 * ASSET calculator landing split heroes.
 * Sources are ~400×300 WebP (images.unoptimized: true — no on-the-fly resize).
 * Desktop column ~381px; mobile stacks to full content width.
 */
export const CALC_SPLIT_HERO_SIZES = "(max-width: 768px) 100vw, 381px";

/** Keep Image + HubLcpPreload quality in lockstep (mismatched quality double-fetches). */
export const CALC_SPLIT_HERO_QUALITY = 78;
