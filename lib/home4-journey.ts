/**
 * Warm, public-facing homepage data for /home4 (Version 4 strategy).
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
};

export type Testimonial = {
  quote: string;
  who: string;
  where: string;
  photo: string;
};

export const HOME4_UTILITY_AUDIENCES: JourneyLink[] = [
  { label: "Personal", href: "/home4" },
  { label: "Business", href: "/solutions/business-insurance" },
  { label: "Corporate", href: "/contact" },
];

export const HOME4_GOAL_CARDS: GoalCard[] = [
  {
    id: "retirement",
    title: "I'm planning for retirement",
    badge: "Retire",
    description: "Clarity on capital, income, and whether your money will last.",
    href: "/retirement",
    links: [
      { label: "Retirement calculators", href: "/calculators#retirement-planning" },
      { label: "Living annuities", href: "/everest-amethyst-living-annuity" },
      { label: "Preservation & two-pot", href: "/retirement-readiness" },
      { label: "Retirement articles", href: "/insights" },
    ],
    accent: "teal",
    image: "/images/retirement-inset-1x1.jpg",
  },
  {
    id: "investments",
    title: "I need investments",
    badge: "Invest",
    description: "Wealth building, tax-free savings, and Everest solutions.",
    href: "/everest-wealth",
    links: [
      { label: "Everest Wealth", href: "/everest-wealth" },
      { label: "Tax-free planning", href: "/wealth-building-calculator" },
      { label: "Before retirement", href: "/retirement-readiness" },
      { label: "Investment calculators", href: "/calculators" },
    ],
    accent: "blue",
    image: "/images/home-yield-continuity-4x3.jpg",
  },
  {
    id: "insurance",
    title: "I need insurance",
    badge: "Insure",
    description: "Personal protection, health cover, assets, and business risk.",
    href: "/solutions/personal-insurance",
    links: [
      { label: "Personal insurance", href: "/solutions/personal-insurance" },
      { label: "Medical aid & gap", href: "/solutions/medical-aid" },
      { label: "Life cover", href: "/solutions/life-insurance" },
      { label: "Business insurance", href: "/solutions/business-insurance" },
    ],
    accent: "orange",
    image: "/images/solutions-hero-16x9.jpg",
  },
  {
    id: "estate",
    title: "I need estate planning",
    badge: "Estate",
    description: "Wills, trusts, duty, and legacy outcomes for your family.",
    href: "/solutions/estate-planning",
    links: [
      { label: "Wills & trusts", href: "/solutions/estate-planning" },
      { label: "Estate duty calculator", href: "/estate-duty-calculator" },
      { label: "Business succession", href: "/solutions/business-life" },
      { label: "Legacy guides", href: "/insights" },
    ],
    accent: "gold",
    image: "/images/estate-duty-calculator-inset-1x1.jpg",
  },
];

export const HOME4_CALCULATOR_TILES: CalculatorTile[] = [
  {
    label: "Run Out of Capital Test",
    description: "Will your retirement savings last your lifetime?",
    href: "/income-in-retirement",
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
    href: "/everest-amethyst-living-annuity",
    image: "/images/living-annuity-inset-1x1.jpg",
  },
  {
    label: "Estate Duty",
    description: "Estimate duty and plan for a smoother transfer.",
    href: "/estate-duty-calculator",
    image: "/images/estate-duty-calculator-inset-1x1.jpg",
  },
];

export const HOME4_JOURNEY_STAGES: FunnelStage[] = [
  {
    step: "01",
    title: "Education",
    description: "Start with plain-language guides that explain the trade-offs.",
    href: "/insights",
    cta: "Read articles",
  },
  {
    step: "02",
    title: "Calculator",
    description: "Run the numbers yourself — illustrative, transparent, no pressure.",
    href: "/calculators",
    cta: "Open calculators",
  },
  {
    step: "03",
    title: "Understanding",
    description: "Connect the dots between your goals, risks, and options.",
    href: "/how-we-work",
    cta: "How we work",
  },
  {
    step: "04",
    title: "Advice",
    description: "When you're ready, speak with a licensed independent adviser.",
    href: "/contact",
    cta: "Book a consultation",
  },
];

export const HOME4_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Albert helped us untangle the living annuity properly. First time someone explained the numbers without making me feel stupid.",
    who: "Susan M.",
    where: "Randpark Ridge",
    photo: "/images/contact-trust.jpg",
  },
  {
    quote:
      "Retirement felt like a mountain. Albert broke it into small steps. We're actually on track now.",
    who: "Michelle B.",
    where: "Wilropark",
    photo: "/images/retirement-inset-1x1.jpg",
  },
  {
    quote:
      "Local, independent, no call-centre nonsense. Exactly what we wanted from an FSP.",
    who: "Johan & Karen T.",
    where: "Muldersdrift",
    photo: "/images/about-krugersdorp-trust-16x9.jpg",
  },
];

export const HOME4_TRUST_BADGES = [
  "FSP 17273",
  "Category 1.8",
  "25+ years independent",
  "Krugersdorp · West Rand",
] as const;
