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

/** Four equal cards: insurance first (business-owner priority), then retirement, investments, estate. */
export const HOME4_GOAL_CARDS: GoalCard[] = [
  {
    id: "insurance",
    title: "Business & personal insurance",
    badge: "Insure",
    description:
      "One uninsured event, such as a fire, a lawsuit, or the death of a key partner, can end a business. We review, place, and manage commercial and personal cover across the market on your behalf.",
    href: "/solutions/business-insurance",
    links: [
      { label: "Business insurance", href: "/solutions/business-insurance" },
      { label: "Besigheidsversekering Krugersdorp", href: "/besigheidsversekering-krugersdorp" },
      { label: "Start a Business Risk Review", href: "/business-risk-review" },
    ],
    accent: "orange",
    image: "/images/home-card-insurance.webp",
  },
  {
    id: "retirement",
    title: "Retirement planning",
    badge: "Retire",
    description:
      "Capital that runs out before you do is a risk most people discover too late. We help you understand the gap, build a plan, and review it annually so the numbers keep working.",
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
    id: "investments",
    // CONTAINMENT 2026-07-22: Everest hub/product links frozen. Original href: /everest-wealth
    title: "Investments & capital",
    badge: "Invest",
    description:
      "Growing capital and protecting purchasing power require clear thinking, not guesswork. We provide independent Category 1.8 advice matched to your actual circumstances.",
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
    id: "estate",
    title: "Estate planning",
    badge: "Estate",
    description:
      "An estate without a clear structure becomes a burden for the people you leave behind. We help you understand your obligations, structure your affairs, and put the right cover in place.",
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
    image: "/images/home-tile-reality-check-640.webp",
  },
  {
    label: "Retirement Growth Rate",
    description: "Illustrate a growth rate required for a capital goal under your inputs.",
    href: "/calculators/asset-001-retirement-growth",
    image: "/images/home-tile-growth-rate-640.webp",
  },
  {
    label: "Life of Capital",
    description: "Illustrate how long capital may last under chosen assumptions.",
    href: "/calculators/asset-004-life-of-capital",
    image: "/images/home-tile-life-of-capital-640.webp",
  },
  {
    label: "Future Value",
    description: "Illustrate how inflation can change purchasing power over time.",
    href: "/calculators/asset-005-future-value",
    image: "/images/home-tile-future-value-640.webp",
  },
];

export const HOME4_JOURNEY_STAGES: FunnelStage[] = [
  {
    step: "01",
    title: "Tell us about your situation",
    description:
      "Share the shape of your business, your existing cover, and the risks that keep you up at night. No forms, no jargon, just a conversation.",
    href: "/contact?source=home_journey_start",
    cta: "Start the conversation",
    accent: "teal",
  },
  {
    step: "02",
    title: "We survey the market",
    description:
      "We run a proper needs analysis and compare offerings across the commercial market, including Santam, Bryte, King Price, and others, to find the right structure at the right price.",
    href: "/business-risk-review",
    cta: "See how it works",
    accent: "blue",
  },
  {
    step: "03",
    title: "Structured cover, placed",
    description:
      "After the needs analysis we recommend, place, and document your cover, so you know exactly what is covered, what is excluded, and what it costs.",
    href: "/contact?source=home_journey_review",
    cta: "Get a risk review",
    accent: "gold",
  },
  {
    step: "04",
    title: "Annual review & claims advocacy",
    description:
      "We review your cover every year, adjust for business changes, and stand with you when a claim arises, not just at inception.",
    href: "/contact?source=home_journey",
    cta: "Request a review",
    accent: "advice",
  },
];

export const HOME4_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Albert reviewed our commercial portfolio and identified gaps we didn't know existed. We restructured the cover and saved significantly at renewal.",
    who: "Pieter V.",
    where: "Roodepoort",
    initial: "P",
  },
  {
    quote:
      "We needed buy-and-sell cover after taking on a business partner. Albert sorted the structure quickly and made sure it matched our shareholder agreement.",
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
