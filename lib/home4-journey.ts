/**
 * Warm, public-facing homepage data.
 * Compliance 2026-07-24: education + contact first; no named-product promotion.
 */

export type JourneyLink = { label: string; href: string };

export type GoalCard = {
  id: string;
  title: string;
  badge: string;
  description: string;
  href: string;
  links: JourneyLink[];
  accent: "teal" | "blue" | "orange" | "gold";
  image: string;
};

export type CalculatorTile = {
  label: string;
  description: string;
  href: string;
  image: string;
};

export type FunnelStage = {
  step: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  accent: "teal" | "blue" | "gold" | "advice";
};

export type Testimonial = {
  quote: string;
  who: string;
  where: string;
  /** First letter shown in avatar when no photo is used. */
  initial: string;
};

/** Four equal cards: same link count, similar description length, Explore → card.href hub. */
export const HOME4_GOAL_CARDS: GoalCard[] = [
  {
    id: "investments",
    // CONTAINMENT 2026-07-22: Everest hub/product links frozen. Original href: /everest-wealth
    title: "Investments & retirement capital",
    badge: "Invest",
    description:
      "Factual investment information and Category 1.8 advice services. Product-specific calculators remain under review.",
    href: "/investments",
    links: [
      { label: "Investments hub", href: "/investments" },
      { label: "Educational calculators", href: "/calculators" },
      { label: "Request a needs analysis", href: "/contact?source=home_investments" },
    ],
    accent: "blue",
    image: "/images/home-card-investments.webp",
  },
  {
    id: "retirement",
    title: "Retirement planning",
    badge: "Retire",
    description:
      "Educational framing on capital, income longevity, and retirement planning questions before advice.",
    href: "/retirement-planning",
    links: [
      { label: "Retirement Survival Blueprint", href: "/retirement-survival-blueprint" },
      { label: "Educational calculators", href: "/calculators" },
      { label: "Retirement planning hub", href: "/retirement-planning" },
    ],
    accent: "teal",
    image: "/images/home-card-retirement.webp",
  },
  {
    id: "insurance",
    title: "Insurance & medical",
    badge: "Insure",
    description:
      "Information on personal protection, medical schemes, gap cover, and commercial risk concepts.",
    href: "/insurance",
    links: [
      { label: "Medical aid & gap", href: "/solutions/medical-aid" },
      { label: "Discovery Health", href: "/solutions/discovery-health" },
      { label: "Insurance hub", href: "/insurance" },
      // CONTAINMENT 2026-07-22: underinsurance calculator frozen
      // { label: "Underinsurance calculator", href: "/calculators/underinsurance-calculator" },
    ],
    accent: "orange",
    image: "/images/home-card-insurance.webp",
  },
  {
    id: "estate",
    title: "Estate planning",
    badge: "Estate",
    description:
      "Educational information on wills, trusts, estate duty concepts, and estate liquidity planning.",
    href: "/estate-planning",
    links: [
      { label: "Legacy Readiness Checklist", href: "/legacy-readiness-checklist" },
      // CONTAINMENT 2026-07-22: estate duty calculator frozen
      // { label: "Estate duty calculator", href: "/calculators/estate-duty-calculator" },
      { label: "Estate planning hub", href: "/estate-planning" },
    ],
    accent: "gold",
    image: "/images/home-card-estate.webp",
  },
];

export const HOME4_CALCULATOR_TILES: CalculatorTile[] = [
  // CONTAINMENT 2026-07-22: product calculators frozen. Restore asset-010 / asset-013 / estate-duty after approval.
  {
    label: "Retirement Reality Check",
    description: "Illustrative view of a capital gap based on assumptions you enter.",
    href: "/calculators/asset-002-retirement-reality-check",
    image: "/images/home-actuarial-engine-16x9.jpg",
  },
  {
    label: "Retirement Growth Rate",
    description: "Illustrate a growth rate required for a capital goal under your inputs.",
    href: "/calculators/asset-001-retirement-growth",
    image: "/images/home-calc-128-income-16x10.jpg",
  },
  {
    label: "Life of Capital",
    description: "Illustrate how long capital may last under chosen assumptions.",
    href: "/calculators/asset-004-life-of-capital",
    image: "/images/home-calc-income-vs-growth-16x10.jpg",
  },
  {
    label: "Future Value",
    description: "Illustrate how inflation can change purchasing power over time.",
    href: "/calculators/asset-005-future-value",
    image: "/images/risk-arch-estate.jpg",
  },
];

export const HOME4_JOURNEY_STAGES: FunnelStage[] = [
  {
    step: "01",
    title: "Educate",
    description: "Read factual articles on retirement maths, tax concepts, and risk in plain English.",
    href: "/insights",
    cta: "Read insights",
    accent: "teal",
  },
  {
    step: "02",
    title: "Calculate",
    description: "Use educational calculators for capital, longevity, and growth assumptions before advice.",
    href: "/calculators",
    cta: "Open calculators",
    accent: "blue",
  },
  {
    // CONTAINMENT 2026-07-22: Everest stage frozen. Original href: /everest-wealth
    step: "03",
    title: "Prepare questions",
    description: "Gather your figures and questions before speaking with an authorised representative.",
    href: "/contact?source=home_journey_review",
    cta: "Contact us",
    accent: "gold",
  },
  {
    step: "04",
    title: "Needs analysis",
    description: "Request a Financial Needs Analysis with AS Brokers CC, FSP 17273, for personal advice.",
    href: "/contact?source=home_journey",
    cta: "Request assessment",
    accent: "advice",
  },
];

export const HOME4_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Albert helped us understand the living annuity numbers clearly. First time someone explained them without making me feel lost.",
    who: "Susan M.",
    where: "Randpark Ridge",
    initial: "S",
  },
  {
    quote:
      "Retirement felt overwhelming. Albert broke the questions into smaller steps we could work through.",
    who: "Michelle B.",
    where: "Wilropark",
    initial: "M",
  },
  {
    quote:
      "Local and independent. We wanted an authorised FSP we could speak to directly, not a call centre.",
    who: "Johan & Karen T.",
    where: "Muldersdrift",
    initial: "J",
  },
];

export const HOME4_TRUST_BADGES = [
  "FSP 17273",
  "Category 1.8",
  "25+ years independent",
  "Krugersdorp · West Rand",
] as const;
