/**
 * Warm, public-facing homepage data.
 * Conversion priority: Everest + education/calculators first; other pillars remain visible.
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
  photo: string;
};

/** Four equal cards: same link count, similar description length, Explore → card.href hub. */
export const HOME4_GOAL_CARDS: GoalCard[] = [
  {
    id: "investments",
    title: "Structured income & Everest",
    badge: "Invest · Everest",
    description:
      "Category 1.8 education on targeted preference-share profiles, with calculators and constraints first.",
    href: "/everest-wealth",
    links: [
      { label: "12.8% income calculator", href: "/calculators/asset-010-everest-128-income" },
      { label: "Everest Wealth hub", href: "/everest-wealth" },
      { label: "Understanding Everest", href: "/everest-wealth/about" },
    ],
    accent: "blue",
    image: "/images/everest-copper-industrial-4x3.jpg",
  },
  {
    id: "retirement",
    title: "Retirement planning",
    badge: "Retire",
    description:
      "Clarity on capital, income longevity, and whether your savings can fund the years ahead.",
    href: "/retirement-planning",
    links: [
      { label: "Retirement Survival Blueprint", href: "/retirement-survival-blueprint" },
      { label: "Retirement calculators", href: "/calculators#retirement" },
      { label: "Retirement planning hub", href: "/retirement-planning" },
    ],
    accent: "teal",
    image: "/images/calculators-capital-lifespan-4x3.jpg",
  },
  {
    id: "insurance",
    title: "Insurance & medical",
    badge: "Insure",
    description:
      "Personal protection, medical aid and gap, assets, and commercial risk for the balance sheet.",
    href: "/insurance",
    links: [
      { label: "Medical aid & gap", href: "/solutions/medical-aid" },
      { label: "Risk architecture hub", href: "/insurance" },
      { label: "Average Clause calculator", href: "/calculators/asset-015-average-clause" },
    ],
    accent: "orange",
    image: "/images/risk-arch-commercial.png",
  },
  {
    id: "estate",
    title: "Estate planning",
    badge: "Estate",
    description:
      "Wills, trusts, duty, and estate liquidity so heirs are not forced into a fire sale.",
    href: "/estate-planning",
    links: [
      { label: "Legacy Readiness Checklist", href: "/legacy-readiness-checklist" },
      { label: "Estate duty calculator", href: "/calculators/asset-007-estate-duty" },
      { label: "Estate planning hub", href: "/estate-planning" },
    ],
    accent: "gold",
    image: "/images/risk-arch-estate.png",
  },
];

export const HOME4_CALCULATOR_TILES: CalculatorTile[] = [
  {
    label: "12.8% Strategic Income",
    description: "Illustrate targeted monthly income from Everest Class A. Educational only.",
    href: "/calculators/asset-010-everest-128-income",
    image: "/images/everest-suite-hero-16x9.jpg",
  },
  {
    label: "Retirement Reality Check",
    description: "See where you stand today and what capital gap remains.",
    href: "/calculators/asset-002-retirement-reality-check",
    image: "/images/home-actuarial-engine-16x9.jpg",
  },
  {
    label: "Income vs Growth",
    description: "Compare Everest income profiles against compounding growth.",
    href: "/calculators/asset-013-everest-income-vs-growth",
    image: "/images/everest-copper-industrial-4x3.jpg",
  },
  {
    label: "Estate Duty",
    description: "Estimate duty and executor pressure, then engineer liquidity.",
    href: "/calculators/asset-007-estate-duty",
    image: "/images/risk-arch-estate.png",
  },
];

export const HOME4_JOURNEY_STAGES: FunnelStage[] = [
  {
    step: "01",
    title: "Educate",
    description: "Everest, retirement maths, tax, and risk explained in plain English.",
    href: "/insights",
    cta: "Read insights",
    accent: "teal",
  },
  {
    step: "02",
    title: "Calculate",
    description: "Albert's ASSET tools for income, longevity, and estate before any sales call.",
    href: "/calculators",
    cta: "Open calculators",
    accent: "blue",
  },
  {
    step: "03",
    title: "Understand Everest",
    description: "Structure, constraints, and Category 1.8. Regulation before yield.",
    href: "/everest-wealth",
    cta: "Everest hub",
    accent: "gold",
  },
  {
    step: "04",
    title: "Capital assessment",
    description: "Licensed FSP 17273 review when your numbers say it is time.",
    href: "/contact?source=home_journey",
    cta: "Book assessment",
    accent: "advice",
  },
];

export const HOME4_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Albert helped us untangle the living annuity properly. First time someone explained the numbers without making me feel stupid.",
    who: "Susan M.",
    where: "Randpark Ridge",
    photo: "/images/about-krugersdorp-trust-16x9.jpg",
  },
  {
    quote:
      "Retirement felt like a mountain. Albert broke it into small steps. We're actually on track now.",
    who: "Michelle B.",
    where: "Wilropark",
    photo: "/images/calculators-capital-lifespan-4x3.jpg",
  },
  {
    quote:
      "Local, independent, no call-centre nonsense. Exactly what we wanted from an FSP.",
    who: "Johan & Karen T.",
    where: "Muldersdrift",
    photo: "/images/about-fiduciary-plaque-4x3.jpg",
  },
];

export const HOME4_TRUST_BADGES = [
  "FSP 17273",
  "Category 1.8",
  "25+ years independent",
  "Krugersdorp · West Rand",
] as const;
