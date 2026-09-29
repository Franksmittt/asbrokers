/**
 * Single source of truth for public site navigation.
 * Maps AS Brokers pillars (Health · Wealth · Legacy · Business) to live funnels.
 */

import {
  PLANNING_TOOL_OFFERS,
  getOfferPriceLabel,
  type Pillar,
} from "@/lib/planning-tools-offers";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  priceLabel?: string;
};

export type PillarFunnel = NavLink & {
  pillar: Pillar;
};

/** Core lead magnets / assessments, Albert's four-pillar funnel entry points. */
export const PILLAR_FUNNELS: PillarFunnel[] = [
  {
    pillar: PLANNING_TOOL_OFFERS["healthy-retirement"].pillar,
    label: PLANNING_TOOL_OFFERS["healthy-retirement"].title,
    description: PLANNING_TOOL_OFFERS["healthy-retirement"].navDescription,
    href: PLANNING_TOOL_OFFERS["healthy-retirement"].href,
    priceLabel: getOfferPriceLabel(PLANNING_TOOL_OFFERS["healthy-retirement"]),
  },
  {
    pillar: PLANNING_TOOL_OFFERS["retirement-survival"].pillar,
    label: PLANNING_TOOL_OFFERS["retirement-survival"].title,
    description: PLANNING_TOOL_OFFERS["retirement-survival"].navDescription,
    href: PLANNING_TOOL_OFFERS["retirement-survival"].href,
    priceLabel: getOfferPriceLabel(PLANNING_TOOL_OFFERS["retirement-survival"]),
  },
  {
    pillar: PLANNING_TOOL_OFFERS["legacy-checklist"].pillar,
    label: PLANNING_TOOL_OFFERS["legacy-checklist"].title,
    description: PLANNING_TOOL_OFFERS["legacy-checklist"].navDescription,
    href: PLANNING_TOOL_OFFERS["legacy-checklist"].href,
    priceLabel: getOfferPriceLabel(PLANNING_TOOL_OFFERS["legacy-checklist"]),
  },
  {
    pillar: PLANNING_TOOL_OFFERS["business-risk"].pillar,
    label: PLANNING_TOOL_OFFERS["business-risk"].title,
    description: PLANNING_TOOL_OFFERS["business-risk"].navDescription,
    href: PLANNING_TOOL_OFFERS["business-risk"].href,
    priceLabel: getOfferPriceLabel(PLANNING_TOOL_OFFERS["business-risk"]),
  },
];

export const PILLAR_HUB: NavLink = {
  label: "Health · Wealth · Legacy",
  href: "/legacy-conversations",
  description: "Overview of all three pillars",
};

export type NavGroup = {
  label: string;
  children: NavLink[];
};

export type PrimaryNavItem = NavLink | NavGroup;

export function isNavGroup(item: PrimaryNavItem): item is NavGroup {
  return "children" in item;
}

/**
 * Compact primary header: two dropdowns + About.
 * Contact stays a separate CTA button.
 */
export const PRIMARY_NAV: PrimaryNavItem[] = [
  {
    label: "Services",
    children: [
      // Core focus 2026-07-25: business insurance leads the site.
      {
        label: "Business Insurance",
        href: "/solutions/business-insurance",
        description: "Cover for shops, practices, fleets, and commercial risks",
      },
      {
        label: "Insurance & Risk",
        href: "/insurance",
        description: "Personal and short-term risk advice",
      },
      // CONTAINMENT 2026-07-22: Everest Wealth nav frozen. Restore href: "/everest-wealth"
      // { label: "Everest Wealth", href: "/everest-wealth", description: "..." },
      {
        label: "Retirement",
        href: "/retirement-planning",
        description: "Income planning and longevity readiness",
      },
      {
        label: "Investments",
        href: "/investments",
        description: "Portfolio and wealth-building options",
      },
      {
        label: "Estate",
        href: "/estate-planning",
        description: "Wills, duty, and legacy structuring",
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        label: "Calculators",
        href: "/calculators",
        description: "Illustrative planning tools",
      },
      {
        label: "Courses",
        href: "/learn",
        description: "Self-paced learning with Albert",
      },
      {
        label: "Insights",
        href: "/insights",
        description: "Articles and practical guidance",
      },
    ],
  },
  { label: "About", href: "/about" },
];

/** Flat list of every primary-nav destination (for sitemaps, audits, mobile flatteners). */
export const PRIMARY_NAV_LINKS: NavLink[] = PRIMARY_NAV.flatMap((item) =>
  isNavGroup(item) ? item.children : [item]
);

/** Mega-footer: goal-led service links. */
export const FOOTER_HOW_WE_HELP: NavLink[] = [
  // Core focus 2026-07-25: business insurance leads the site.
  { label: "Business Insurance", href: "/solutions/business-insurance" },
  { label: "Besigheidsversekering Krugersdorp", href: "/besigheidsversekering-krugersdorp" },
  { label: "Business Risk Review", href: "/business-risk-review" },
  { label: "Insurance & Risk", href: "/insurance" },
  // CONTAINMENT 2026-07-22: Everest Wealth footer frozen. Restore href: "/everest-wealth"
  // { label: "Everest Wealth", href: "/everest-wealth" },
  { label: "Investments", href: "/investments" },
  { label: "Retirement planning", href: "/retirement-planning" },
  { label: "Estate Planning", href: "/estate-planning" },
];

/** Mega-footer: education and tools. */
export const FOOTER_RESOURCES: NavLink[] = [
  { label: "Weekly Newsletter", href: "/newsletter" },
  { label: "Insights", href: "/insights" },
  { label: "Courses", href: "/learn" },
  { label: "Calculators", href: "/calculators" },
  { label: "Financial Health Quiz", href: "/quiz" },
  // CONTAINMENT 2026-07-22: Everest footer resources frozen.
  // Restore: { label: "Everest Wealth", href: "/everest-wealth" },
  // Restore: { label: "Understanding Everest", href: "/everest-wealth/about" },
  { label: "Educational assistant", href: "/chat" },
];

/** Mega-footer: company and legal. */
export const FOOTER_COMPANY: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Meet the Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Complaints Procedure", href: "/complaints" },
  { label: "Regulatory & Compliance", href: "/regulatory-compliance" },
];

/** @deprecated Use FOOTER_HOW_WE_HELP / FOOTER_RESOURCES / FOOTER_COMPANY */
export const FOOTER_EXPLORE: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Calculators", href: "/calculators" },
  { label: "Solutions", href: "/insurance" },
  { label: "Insights", href: "/insights" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Contact", href: "/contact" },
];

/** @deprecated Legal links live in FOOTER_COMPANY */
export const FOOTER_LEGAL: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Complaints", href: "/complaints" },
  { label: "Conflict of interest", href: "/conflict-of-interest" },
  { label: "Compliance", href: "/regulatory-compliance" },
  { label: "Cookies", href: "/manage-cookies" },
];

/** Paths that belong to the Planning tools dropdown (for active state). */
export const PLANNING_TOOLS_PATHS = [
  PILLAR_HUB.href,
  ...PILLAR_FUNNELS.map((f) => f.href),
];

export function isPlanningToolsPath(pathname: string): boolean {
  return PLANNING_TOOLS_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
