/**
 * Public /calculators hub — curated per Albert CRM export (2026-06-18).
 *
 * Policy: include calculators where keep=true OR Albert's notes explicitly say
 * "keep public" / "should remain". Hide everything else until rebuilt per notes.
 * Individual calculator routes remain live for SEO/bookmarks; hub is the curated front door.
 */

export type HubCalculator = {
  embedId: string;
  sectionId: string;
  sectionTitle: string;
  sectionQuestion?: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  leadsTo: string;
  href: string;
  featured?: boolean;
  leadsToAccent?: boolean;
};

export const PUBLIC_HUB_EMBED_IDS = [
  "retirement-reality",
  "retirement-shortfall",
  "future-value",
  "wealth-building",
] as const;

export const HUB_SECTIONS = {
  retirement: {
    id: "retirement-planning",
    title: "Retirement & Wealth Planning",
    question: "How much capital do I need — and am I on track to get there?",
  },
  inflation: {
    id: "purchasing-power",
    title: "Purchasing Power & Inflation",
    question: "What is inflation doing to my money over time?",
  },
} as const;

export const HUB_CALCULATORS: HubCalculator[] = [
  {
    embedId: "retirement-reality",
    sectionId: HUB_SECTIONS.retirement.id,
    sectionTitle: HUB_SECTIONS.retirement.title,
    sectionQuestion: HUB_SECTIONS.retirement.question,
    tag: "Capital Required",
    title: "Retirement Reality Calculator",
    description:
      "Estimate the lump sum capital required at retirement to fund your target monthly income (after tax) from retirement until life expectancy.",
    bullets: [
      "Income in today's money, inflated to retirement",
      "Capital required at retirement date",
      "Sensitivity to lower investment returns",
      "Lump sum at retirement — not monthly contributions",
    ],
    leadsTo: "Retirement income planning and structured capital conversations.",
    href: "/retirement",
    featured: true,
    leadsToAccent: true,
  },
  {
    embedId: "retirement-shortfall",
    sectionId: HUB_SECTIONS.retirement.id,
    sectionTitle: HUB_SECTIONS.retirement.title,
    sectionQuestion: HUB_SECTIONS.retirement.question,
    tag: "Readiness & Gap",
    title: "Retirement Readiness Calculator",
    description:
      "Compare required retirement capital against projected savings, estimate your shortfall, and see the monthly contribution that may close the gap.",
    bullets: [
      "Future income required at retirement",
      "Projected value of current savings",
      "Capital shortfall estimate",
      "Starting contribution required",
    ],
    leadsTo: "Retirement annuities, preservation funds, and contribution planning.",
    href: "/retirement-readiness",
    leadsToAccent: true,
  },
  {
    embedId: "wealth-building",
    sectionId: HUB_SECTIONS.retirement.id,
    sectionTitle: HUB_SECTIONS.retirement.title,
    sectionQuestion: HUB_SECTIONS.retirement.question,
    tag: "Wealth Modeller",
    title: "AS Brokers Wealth Building Calculator",
    description:
      "General-purpose compound growth for investments, retirement savings, business growth, or financial freedom — any growth rate, monthly contributions, annual increases.",
    bullets: [
      "No artificial growth caps",
      "Multi-currency display",
      "Total invested vs growth earned",
      "Business, investment & retirement scenarios",
    ],
    leadsTo: "Wealth accumulation and financial freedom planning.",
    href: "/wealth-building-calculator",
    leadsToAccent: true,
  },
  {
    embedId: "future-value",
    sectionId: HUB_SECTIONS.inflation.id,
    sectionTitle: HUB_SECTIONS.inflation.title,
    sectionQuestion: HUB_SECTIONS.inflation.question,
    tag: "Educational",
    title: "Inflation Impact Calculator",
    description:
      "See how inflation erodes purchasing power over time — one of the strongest educational tools for understanding why growth must beat inflation.",
    bullets: [
      "Purchasing power lost over time",
      "Future cost vs remaining buying power",
      "Why nominal returns mislead",
      "Inflation-beating strategies",
    ],
    leadsTo: "Growth-oriented investments and inflation-aware planning.",
    href: "/cost-of-inflation-over-time",
    featured: true,
    leadsToAccent: true,
  },
];

export function getHubCalculatorsBySection(sectionId: string): HubCalculator[] {
  return HUB_CALCULATORS.filter((c) => c.sectionId === sectionId);
}
