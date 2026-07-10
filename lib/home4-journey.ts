/**
 * Warm, public-facing homepage data.
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

export const HOME4_GOAL_CARDS: GoalCard[] = [
  {
    id: "retirement",
    title: "I'm planning for retirement",
    badge: "Retire",
    description: "Clarity on capital, income, and whether your money will last.",
    href: "/retirement-planning",
    links: [
      { label: "Retirement Survival Blueprint", href: "/retirement-survival-blueprint" },
      { label: "Retirement calculators", href: "/calculators" },
      { label: "Full retirement hub", href: "/retirement" },
      { label: "Retirement articles", href: "/insights" },
    ],
    accent: "teal",
    image: "/images/home4-goal-retire-16x9.png",
  },
  {
    id: "investments",
    title: "I need investments",
    badge: "Invest",
    description: "Wealth building, tax-free savings, and Everest solutions.",
    href: "/investments",
    links: [
      { label: "Everest Wealth products", href: "/everest-wealth" },
      { label: "Planning for retirement", href: "/retirement-planning" },
      { label: "Investment calculators", href: "/calculators" },
      { label: "Investment insights", href: "/insights" },
    ],
    accent: "blue",
    image: "/images/home4-import/card1.png",
  },
  {
    id: "insurance",
    title: "I need insurance",
    badge: "Insure",
    description: "Personal protection, health cover, assets, and business risk.",
    href: "/insurance",
    links: [
      { label: "Personal insurance", href: "/solutions/personal-insurance" },
      { label: "Medical aid & gap", href: "/solutions/medical-aid" },
      { label: "Life cover", href: "/solutions/life-insurance" },
      { label: "Business insurance", href: "/solutions/business-insurance" },
    ],
    accent: "orange",
    image: "/images/home4-goal-insure-16x9.png",
  },
  {
    id: "estate",
    title: "I need estate planning",
    badge: "Estate",
    description: "Wills, trusts, duty, and legacy outcomes for your family.",
    href: "/estate-planning",
    links: [
      { label: "Wills & trusts", href: "/legacy-readiness-checklist" },
      { label: "Planning tools", href: "/calculators" },
      { label: "Business succession", href: "/solutions/business-life" },
      { label: "Legacy guides", href: "/insights" },
    ],
    accent: "gold",
    image: "/images/home4-goal-estate-16x9.png",
  },
];

export const HOME4_CALCULATOR_TILES: CalculatorTile[] = [
  {
    label: "Run Out of Capital Test",
    description: "Will your retirement savings last your lifetime?",
    href: "/calculators/asset-004-life-of-capital",
    image: "/images/calculators-capital-lifespan-4x3.jpg",
  },
  {
    label: "Retirement Reality",
    description: "See where you stand today and what gap remains.",
    href: "/retirement",
    image: "/images/home-actuarial-engine-16x9.jpg",
  },
  {
    label: "Living Annuity",
    description: "Model drawdowns, income, and sustainability.",
    href: "/calculators",
    image: "/images/living-annuity-inset-1x1.jpg",
  },
  {
    label: "Estate Duty",
    description: "Estimate duty and plan for a smoother transfer.",
    href: "/calculators",
    image: "/images/estate-duty-calculator-inset-1x1.jpg",
  },
];

export const HOME4_JOURNEY_STAGES: FunnelStage[] = [
  {
    step: "01",
    title: "Education",
    description: "Retirement, estate, Everest, and insurance — explained in plain English.",
    href: "/insights",
    cta: "Read articles",
    accent: "teal",
  },
  {
    step: "02",
    title: "Calculator",
    description: "Model income, longevity, and estate duty before you commit to a plan.",
    href: "/calculators",
    cta: "Open calculators",
    accent: "blue",
  },
  {
    step: "03",
    title: "Understanding",
    description: "See how we diagnose, design, implement, and review your plan over time.",
    href: "/about",
    cta: "How we work",
    accent: "gold",
  },
  {
    step: "04",
    title: "Advice",
    description: "Licensed independent review with FSP 17273 — Krugersdorp and the West Rand.",
    href: "/contact",
    cta: "Book a consultation",
    accent: "advice",
  },
];

export const HOME4_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Albert helped us untangle the living annuity properly. First time someone explained the numbers without making me feel stupid.",
    who: "Susan M.",
    where: "Randpark Ridge",
    photo: "/images/home4-why-independence-4x3.jpg",
  },
  {
    quote:
      "Retirement felt like a mountain. Albert broke it into small steps. We're actually on track now.",
    who: "Michelle B.",
    where: "Wilropark",
    photo: "/images/home4-goal-retire-16x9.png",
  },
  {
    quote:
      "Local, independent, no call-centre nonsense. Exactly what we wanted from an FSP.",
    who: "Johan & Karen T.",
    where: "Muldersdrift",
    photo: "/images/home4-why-independence-4x3.jpg",
  },
];

export const HOME4_TRUST_BADGES = [
  "FSP 17273",
  "Category 1.8",
  "25+ years independent",
  "Krugersdorp · West Rand",
] as const;
