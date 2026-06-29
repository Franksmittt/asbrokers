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

/** Core lead magnets / assessments — Albert's four-pillar funnel entry points. */
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

/** Simplified nav for /home2 and /home3 journey homepage previews. */
export const HOME2_PRIMARY_NAV: NavLink[] = [
  { label: "Retirement", href: "/retirement" },
  { label: "Investments", href: "/everest-wealth" },
  { label: "Insurance", href: "/solutions/personal-insurance" },
  { label: "Estate Planning", href: "/solutions/estate-planning" },
  { label: "Learn", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Primary header links (excluding dropdown). */
export const PRIMARY_NAV: NavLink[] = [
  { label: "Calculators", href: "/calculators" },
  { label: "Solutions", href: "/solutions" },
  { label: "Insights", href: "/insights" },
  { label: "How we work", href: "/how-we-work" },
];

/** Compact footer explore links. */
export const FOOTER_EXPLORE: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Calculators", href: "/calculators" },
  { label: "The Lab", href: "/lab" },
  { label: "Solutions", href: "/solutions" },
  { label: "Insights", href: "/insights" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Contact", href: "/contact" },
];

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
