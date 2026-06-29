/**
 * Education-first homepage data for /home3 (Version 3 strategy).
 */

export type JourneyLink = { label: string; href: string };

export type NavPillar = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  accent: "teal" | "gold" | "blue" | "orange" | "violet";
};

export type FunnelStep = {
  step: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export type SolutionGroup = {
  title: string;
  href?: string;
  items: JourneyLink[];
  journey?: JourneyLink[];
};

export const HOME3_PRIMARY_PILLARS: NavPillar[] = [
  {
    id: "retirement",
    title: "Retirement",
    subtitle: "Planning, income, sustainability — education before advice.",
    href: "/retirement",
    accent: "teal",
  },
  {
    id: "investments",
    title: "Investments",
    subtitle: "Before retirement, after retirement, and alternatives.",
    href: "/everest-wealth",
    accent: "blue",
  },
  {
    id: "insurance",
    title: "Insurance",
    subtitle: "Health, personal protection, assets, and business risk.",
    href: "/solutions/personal-insurance",
    accent: "orange",
  },
  {
    id: "estate",
    title: "Estate Planning",
    subtitle: "Wills, trusts, duty, and legacy outcomes.",
    href: "/solutions/estate-planning",
    accent: "gold",
  },
  {
    id: "learn",
    title: "Learn",
    subtitle: "Articles, guides, calculators, and resources.",
    href: "/insights",
    accent: "violet",
  },
];

export const HOME3_POPULAR_CALCULATORS: JourneyLink[] = [
  { label: "Retirement Reality", href: "/retirement" },
  { label: "Life of Capital", href: "/income-in-retirement" },
  { label: "Living Annuity", href: "/everest-amethyst-living-annuity" },
  { label: "Estate Duty", href: "/estate-duty-calculator" },
  { label: "Income Tax", href: "/income-tax-calculator" },
  { label: "Wealth Builder", href: "/wealth-building-calculator" },
];

export const HOME3_WORRY_QUESTIONS: JourneyLink[] = [
  { label: "Can I afford to retire?", href: "/retirement" },
  { label: "Will my money last?", href: "/income-in-retirement" },
  { label: "How much capital do I need?", href: "/retirement" },
  { label: "Retirement Reality Calculator", href: "/retirement" },
  { label: "Retirement Goal Calculator", href: "/retirement-readiness" },
  { label: "Freedom Rate Calculator", href: "/wealth-building-calculator" },
  { label: "Life of Capital Calculator", href: "/income-in-retirement" },
];

export const HOME3_RETIREMENT_FUNNEL: FunnelStep[] = [
  {
    step: "01",
    title: "Start with your question",
    description: "“Will my money last?” or “Can I afford to retire?” — name the worry first.",
    href: "/retirement-readiness",
    cta: "Retirement readiness",
  },
  {
    step: "02",
    title: "Run the numbers",
    description: "Use calculators to see where you stand — capital required, shortfall, and drawdown.",
    href: "/retirement",
    cta: "Retirement Reality Calculator",
  },
  {
    step: "03",
    title: "Read the guide",
    description: "Retirement articles that explain trade-offs without product jargon.",
    href: "/insights/retirement-income-inflation",
    cta: "Retirement income article",
  },
  {
    step: "04",
    title: "Watch & learn",
    description: "Blueprint and educational resources that build understanding before any recommendation.",
    href: "/healthy-retirement-blueprint",
    cta: "Healthy Retirement Blueprint",
  },
  {
    step: "05",
    title: "Book advice",
    description: "When you understand the problem, speak to an independent adviser — no call-centre queue.",
    href: "/contact",
    cta: "Book a consultation",
  },
];

export const HOME3_RETIREMENT_PATHS = [
  {
    title: "Planning for retirement",
    items: [
      { label: "How much do I need?", href: "/retirement" },
      { label: "Retirement calculators", href: "/calculators#retirement-planning" },
      { label: "Retirement planning", href: "/retirement" },
      { label: "Retirement articles", href: "/insights" },
      { label: "Retirement videos", href: "/insights" },
    ],
  },
  {
    title: "Already retired",
    items: [
      { label: "Living annuities", href: "/everest-amethyst-living-annuity" },
      { label: "Retirement income", href: "/income-in-retirement" },
      { label: "Drawdown reviews", href: "/retirement-survival-blueprint" },
      { label: "Retirement sustainability", href: "/income-in-retirement" },
      { label: "Inflation planning", href: "/cost-of-inflation-over-time" },
      { label: "Estate planning", href: "/solutions/estate-planning" },
    ],
  },
] as const;

const JOURNEY_STAGES: JourneyLink[] = [
  { label: "Calculators", href: "/calculators" },
  { label: "Articles", href: "/insights" },
  { label: "Education", href: "/how-we-work" },
  { label: "Advice", href: "/contact" },
];

export const HOME3_INVESTMENT_GROUPS: SolutionGroup[] = [
  {
    title: "Before Retirement",
    href: "/retirement-readiness",
    items: [
      { label: "Retirement Annuities", href: "/retirement-readiness" },
      { label: "Tax Free Investments", href: "/wealth-building-calculator" },
      { label: "Preservation Funds", href: "/retirement-readiness" },
      { label: "Wealth Building", href: "/wealth-building-calculator" },
      { label: "Investment Planning", href: "/retirement" },
    ],
    journey: JOURNEY_STAGES,
  },
  {
    title: "After Retirement",
    href: "/income-in-retirement",
    items: [
      { label: "Living Annuities", href: "/everest-amethyst-living-annuity" },
      { label: "Retirement Income", href: "/income-in-retirement" },
      { label: "Sustainable Drawdowns", href: "/retirement-survival-blueprint" },
      { label: "Alternative Investments", href: "/everest-wealth" },
      { label: "Income Planning", href: "/income-in-retirement" },
    ],
    journey: JOURNEY_STAGES,
  },
  {
    title: "Alternative Investments",
    href: "/everest-wealth",
    items: [
      { label: "Everest Wealth", href: "/everest-wealth" },
      { label: "Strategic Income 12.8%", href: "/everest-128-product" },
      { label: "Growth 14.5%", href: "/everest-strategic-growth-145" },
      { label: "Amethyst Living Annuity", href: "/everest-amethyst-living-annuity" },
    ],
    journey: JOURNEY_STAGES,
  },
];

export const HOME3_INSURANCE_GROUPS: SolutionGroup[] = [
  {
    title: "Health",
    href: "/solutions/medical-aid",
    items: [
      { label: "Medical Aid", href: "/solutions/medical-aid" },
      { label: "Gap Cover", href: "/solutions/medical-aid" },
      { label: "Vitality", href: "/contact" },
    ],
  },
  {
    title: "Personal Protection",
    href: "/solutions/personal-insurance",
    items: [
      { label: "Life Cover", href: "/solutions/life-insurance" },
      { label: "Disability", href: "/solutions/personal-insurance" },
      { label: "Income Protection", href: "/solutions/personal-insurance" },
      { label: "Severe Illness", href: "/solutions/personal-insurance" },
    ],
  },
  {
    title: "Personal Insurance",
    href: "/solutions/personal-insurance",
    items: [
      { label: "Vehicle", href: "/solutions/personal-insurance" },
      { label: "Household", href: "/solutions/personal-insurance" },
      { label: "Buildings", href: "/solutions/personal-insurance" },
      { label: "Personal possessions", href: "/solutions/personal-insurance" },
    ],
  },
  {
    title: "Business Insurance",
    href: "/solutions/business-insurance",
    items: [
      { label: "Commercial Insurance", href: "/solutions/business-insurance" },
      { label: "Business Interruption", href: "/solutions/business-insurance" },
      { label: "Key Person", href: "/solutions/business-life" },
      { label: "Buy & Sell", href: "/solutions/business-life" },
      { label: "Average Clause", href: "/solutions/business-insurance" },
      { label: "Business Risk Reviews", href: "/business-risk-review" },
    ],
  },
];

export const HOME3_ESTATE_ITEMS: JourneyLink[] = [
  { label: "Wills", href: "/solutions/estate-planning" },
  { label: "Trusts", href: "/solutions/estate-planning" },
  { label: "Estate Planning", href: "/solutions/estate-planning" },
  { label: "Estate Duty", href: "/estate-duty-calculator" },
  { label: "Business Succession", href: "/solutions/business-life" },
  { label: "Tax Planning", href: "/annual-estate-reduction-strategy" },
];

export const HOME3_ESTATE_JOURNEY: JourneyLink[] = [
  { label: "Estate calculators", href: "/estate-duty-calculator" },
  { label: "Educational articles", href: "/insights" },
  { label: "Advice", href: "/contact" },
];

export const HOME3_LEARN_HUB: JourneyLink[] = [
  { label: "Latest Articles", href: "/insights" },
  { label: "Retirement Guides", href: "/insights" },
  { label: "Investment Guides", href: "/insights" },
  { label: "Insurance Guides", href: "/insights" },
  { label: "Estate Planning Guides", href: "/insights" },
  { label: "Videos", href: "/insights" },
  { label: "Newsletters", href: "/contact" },
  { label: "Resource Library", href: "/calculators" },
];

export const HOME3_LATEST_ARTICLES = [
  {
    title: "Retirement Income in a High-Inflation World",
    excerpt: "Design drawdowns when inflation and rates are volatile.",
    publishedAt: "2025-01-12",
    slug: "retirement-income-inflation",
  },
  {
    title: "Estate Duty Reduction Strategies",
    excerpt: "Structure your estate so more wealth passes to the next generation.",
    publishedAt: "2025-01-28",
    slug: "estate-duty-reduction-strategies",
  },
  {
    title: "Semigration & Retirement Villages",
    excerpt: "How coastal and estate living is reshaping retirement planning.",
    publishedAt: "2025-02-15",
    slug: "semigration-retirement-villages",
  },
] as const;

export const HOME3_WHY_PILLARS = [
  {
    title: "100% independent",
    body: "We are not tied to a single product house. Advice is built around your goals — not sales quotas.",
  },
  {
    title: "Broader investment access",
    body: "Category 1.8 authorisation lets suitable clients access traditional and selected private-market solutions where appropriate.",
  },
  {
    title: "Calculator ecosystem",
    body: "Dozens of educational tools help you understand the problem before any product is discussed.",
  },
  {
    title: "Education first",
    body: "Articles, calculators, and blueprints come before recommendations. Advice integrates naturally into the journey.",
  },
  {
    title: "No product pushing",
    body: "Products appear only after you understand your situation. We guide questions, not pitches.",
  },
] as const;
