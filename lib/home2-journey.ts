/**
 * Customer-journey data for /home2 — problem-first homepage preview.
 * Links map to live routes where they exist; hub pages can be added later.
 */

export type JourneyLink = { label: string; href: string };

export type JourneyCard = {
  id: string;
  title: string;
  bullets: JourneyLink[];
  cta: string;
  href: string;
  accent: "teal" | "gold" | "blue" | "orange";
};

export const HOME2_JOURNEY_CARDS: JourneyCard[] = [
  {
    id: "planning-retirement",
    title: "I'm planning for retirement",
    bullets: [
      { label: "Retirement calculators", href: "/calculators#retirement-planning" },
      { label: "Retirement articles", href: "/insights" },
      { label: "Retirement planning", href: "/retirement" },
      { label: "Living annuities", href: "/everest-amethyst-living-annuity" },
      { label: "Pension preservation", href: "/retirement-readiness" },
    ],
    cta: "Explore Retirement",
    href: "/retirement",
    accent: "teal",
  },
  {
    id: "already-retired",
    title: "I'm already retired",
    bullets: [
      { label: "Living annuity advice", href: "/everest-amethyst-living-annuity" },
      { label: "Retirement income", href: "/income-in-retirement" },
      { label: "Capital sustainability", href: "/income-in-retirement" },
      { label: "Drawdown reviews", href: "/retirement-survival-blueprint" },
      { label: "Estate planning", href: "/solutions/estate-planning" },
    ],
    cta: "Manage My Retirement",
    href: "/income-in-retirement",
    accent: "gold",
  },
  {
    id: "investments",
    title: "I need investments",
    bullets: [
      { label: "Before retirement", href: "/retirement-readiness" },
      { label: "After retirement", href: "/everest-amethyst-living-annuity" },
      { label: "Everest", href: "/everest-wealth" },
      { label: "Unit trusts", href: "/solutions" },
      { label: "Investment calculators", href: "/calculators#retirement-planning" },
    ],
    cta: "Explore Investments",
    href: "/everest-wealth",
    accent: "blue",
  },
  {
    id: "insurance",
    title: "I need insurance",
    bullets: [
      { label: "Medical Aid", href: "/solutions/medical-aid" },
      { label: "Gap Cover", href: "/solutions/medical-aid" },
      { label: "Personal Insurance", href: "/solutions/personal-insurance" },
      { label: "Business Insurance", href: "/solutions/business-insurance" },
      { label: "Life Insurance", href: "/solutions/life-insurance" },
    ],
    cta: "Protect My Family",
    href: "/solutions/personal-insurance",
    accent: "orange",
  },
];

export const HOME2_POPULAR_CALCULATORS: JourneyLink[] = [
  { label: "Run Out of Capital", href: "/income-in-retirement" },
  { label: "Retirement Reality", href: "/retirement" },
  { label: "Living Annuity", href: "/everest-amethyst-living-annuity" },
  { label: "Estate Duty", href: "/estate-duty-calculator" },
  { label: "Income Tax", href: "/income-tax-calculator" },
];

export const HOME2_RETIREMENT_ARTICLES = [
  {
    title: "Retirement Income in a High-Inflation World",
    excerpt: "Design drawdowns when inflation and rates are volatile.",
    publishedAt: "2025-01-12",
    slug: "retirement-income-inflation",
  },
  {
    title: "Semigration & Retirement Villages",
    excerpt: "Coastal and estate living is reshaping retirement planning.",
    publishedAt: "2025-02-15",
    slug: "semigration-retirement-villages",
  },
  {
    title: "Everest Targeted Returns: Navigating Volatility",
    excerpt: "Targeted return profiles for investors who want clearer terms.",
    publishedAt: "2025-02-08",
    slug: "everest-fixed-returns-volatility",
  },
] as const;

export type SolutionGroup = {
  title: string;
  href?: string;
  items: JourneyLink[];
};

export const HOME2_INVESTMENT_GROUPS: SolutionGroup[] = [
  {
    title: "Before Retirement",
    href: "/retirement-readiness",
    items: [
      { label: "Retirement Annuities", href: "/retirement-readiness" },
      { label: "Tax Free", href: "/wealth-building-calculator" },
      { label: "Preservation Funds", href: "/retirement-readiness" },
      { label: "Investment Planning", href: "/retirement" },
      { label: "Freedom Rate Calculator", href: "/wealth-building-calculator" },
      { label: "Growth Calculator", href: "/wealth-building-calculator" },
      { label: "Retirement Goal Calculator", href: "/retirement" },
    ],
  },
  {
    title: "After Retirement",
    href: "/income-in-retirement",
    items: [
      { label: "Living Annuities", href: "/everest-amethyst-living-annuity" },
      { label: "Income Planning", href: "/income-in-retirement" },
      { label: "Capital Sustainability", href: "/income-in-retirement" },
      { label: "Drawdown Reviews", href: "/retirement-survival-blueprint" },
      { label: "Life of Capital Calculator", href: "/income-in-retirement" },
      { label: "Inflation Calculator", href: "/cost-of-inflation-over-time" },
      { label: "Retirement Reality Calculator", href: "/retirement" },
    ],
  },
  {
    title: "Alternative Investments",
    href: "/everest-wealth",
    items: [
      { label: "Everest Wealth", href: "/everest-wealth" },
      { label: "Strategic Income 12.8%", href: "/everest-128-product" },
      { label: "Growth 14.5%", href: "/everest-strategic-growth-145" },
      { label: "Code 1.8 access", href: "/regulatory-compliance" },
    ],
  },
];

export const HOME2_INSURANCE_GROUPS: SolutionGroup[] = [
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
    title: "Home & Vehicles",
    href: "/solutions/personal-insurance",
    items: [
      { label: "Car", href: "/solutions/personal-insurance" },
      { label: "Household", href: "/solutions/personal-insurance" },
      { label: "Buildings", href: "/solutions/personal-insurance" },
      { label: "Personal possessions", href: "/solutions/personal-insurance" },
    ],
  },
  {
    title: "Business",
    href: "/solutions/business-insurance",
    items: [
      { label: "Commercial Insurance", href: "/solutions/business-insurance" },
      { label: "Business Interruption", href: "/solutions/business-insurance" },
      { label: "Key Person", href: "/solutions/business-life" },
      { label: "Buy & Sell", href: "/solutions/business-life" },
      { label: "Average Clause", href: "/solutions/business-insurance" },
      { label: "Risk Reviews", href: "/business-risk-review" },
    ],
  },
];

export const HOME2_ESTATE_GROUPS: SolutionGroup[] = [
  {
    title: "Estate outcomes",
    href: "/solutions/estate-planning",
    items: [
      { label: "Wills", href: "/solutions/estate-planning" },
      { label: "Trusts", href: "/solutions/estate-planning" },
      { label: "Estate Planning", href: "/solutions/estate-planning" },
      { label: "Business Succession", href: "/solutions/business-life" },
      { label: "Estate Duty", href: "/estate-duty-calculator" },
      { label: "Tax Planning", href: "/annual-estate-reduction-strategy" },
      { label: "Executor Planning", href: "/solutions/estate-planning" },
      { label: "Estate Calculators", href: "/estate-duty-calculator" },
    ],
  },
];

export const HOME2_ESTATE_QUICK = [
  { label: "Will", href: "/solutions/estate-planning" },
  { label: "Trust", href: "/solutions/estate-planning" },
  { label: "Estate Duty", href: "/estate-duty-calculator" },
  { label: "Legacy", href: "/legacy-readiness-checklist" },
] as const;
