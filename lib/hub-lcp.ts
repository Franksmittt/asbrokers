/** LCP hero sources for primary hub pages — keep in sync with PageView HERO_IMAGE constants. */
export const HUB_LCP_IMAGES: Record<string, string> = {
  "/": "/images/home4-why-independence-4x3.jpg",
  "/retirement": "/images/home4-goal-retire-16x9.png",
  "/retirement-planning": "/images/home4-goal-retire-16x9.png",
  "/everest-wealth": "/images/home4-import/card1.png",
  "/investments": "/images/home4-import/card1.png",
  "/insurance": "/images/home4-goal-insure-16x9.png",
  "/estate-planning": "/images/home4-goal-estate-16x9.png",
  "/insights": "/images/home4-why-independence-4x3.jpg",
  "/about": "/images/home4-why-independence-4x3.jpg",
  "/contact": "/images/home4-why-independence-4x3.jpg",
  "/calculators": "/images/calculators-education-16x9.jpg",
};

/** Responsive `sizes` for full-bleed hub heroes (mobile LCP). */
export const HUB_HERO_SIZES = "(max-width: 768px) 100vw, 1280px";

/** Grid / split-layout hero band (e.g. retirement header image). */
export const HUB_SPLIT_HERO_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px";
