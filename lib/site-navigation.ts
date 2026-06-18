/**
 * Single source of truth for public site navigation.
 * Maps AS Brokers pillars (Health · Wealth · Legacy · Business) to live funnels.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type PillarFunnel = NavLink & {
  pillar: "Health" | "Wealth" | "Legacy" | "Business";
};

/** Core lead magnets / assessments — Albert's four-pillar funnel entry points. */
export const PILLAR_FUNNELS: PillarFunnel[] = [
  {
    pillar: "Health",
    label: "Healthy Retirement Blueprint™",
    description: "Retirement Health Gap™ assessment",
    href: "/healthy-retirement-blueprint",
  },
  {
    pillar: "Wealth",
    label: "Retirement Survival Blueprint™",
    description: "Financial Freedom Score™ & Freedom Gap™",
    href: "/retirement-survival-blueprint",
  },
  {
    pillar: "Legacy",
    label: "Legacy Readiness Checklist™",
    description: "Estate planning gap review",
    href: "/legacy-readiness-checklist",
  },
  {
    pillar: "Business",
    label: "Business Risk Review™",
    description: "Business insurance gap analysis",
    href: "/business-risk-review",
  },
];

export const PILLAR_HUB: NavLink = {
  label: "Health · Wealth · Legacy",
  href: "/legacy-conversations",
  description: "Overview of all three pillars",
};

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
  { label: "Calculators", href: "/calculators" },
  { label: "Solutions", href: "/solutions" },
  { label: "Insights", href: "/insights" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Complaints", href: "/complaints" },
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
