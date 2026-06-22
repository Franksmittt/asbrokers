import type { RelatedLink } from "@/components/seo/RelatedContent";

export const SOLUTION_RELATED: Record<string, RelatedLink[]> = {
  "/solutions/personal-insurance": [
    {
      href: "/solutions/life-insurance",
      title: "Life & disability cover",
      description: "Death, disability, and income protection for families and professionals.",
    },
    {
      href: "/premium-increase-calculator",
      title: "Premium increase calculator",
      description: "Compare long-term cost of escalating life premiums.",
    },
    {
      href: "/contact",
      title: "Book a review",
      description: "Independent short-term insurance advice in Krugersdorp.",
    },
  ],
  "/solutions/business-insurance": [
    {
      href: "/solutions/business-life",
      title: "Business life & key person",
      description: "Buy-and-sell, key person, and loan account cover.",
    },
    {
      href: "/business-risk-review",
      title: "Business risk review",
      description: "Free gap analysis for commercial insurance.",
    },
    {
      href: "/contact",
      title: "Commercial review",
      description: "Structured risk architecture for Gauteng businesses.",
    },
  ],
  "/solutions/life-insurance": [
    {
      href: "/solutions/personal-insurance",
      title: "Short-term personal cover",
      description: "Home, motor, and personal asset protection.",
    },
    {
      href: "/premium-increase-calculator",
      title: "Premium increase calculator",
      description: "Model escalating life premiums over time.",
    },
    {
      href: "/income-in-retirement",
      title: "Income in retirement",
      description: "How long retirement capital may last with drawdowns.",
    },
  ],
  "/solutions/business-life": [
    {
      href: "/solutions/business-insurance",
      title: "Business short-term insurance",
      description: "Property, liability, BI, and fleet cover.",
    },
    {
      href: "/solutions/estate-planning",
      title: "Estate & succession planning",
      description: "Wills, trusts, and business continuity.",
    },
    {
      href: "/contact",
      title: "Key person review",
      description: "Align buy-and-sell funding with shareholder agreements.",
    },
  ],
  "/solutions/medical-aid": [
    {
      href: "/healthy-retirement-blueprint",
      title: "Healthy retirement blueprint",
      description: "Health pillar assessment for retirement planning.",
    },
    {
      href: "/solutions/personal-insurance",
      title: "Personal insurance",
      description: "Gap cover works alongside medical scheme membership.",
    },
    {
      href: "/contact",
      title: "Scheme comparison",
      description: "Medical aid and gap cover guidance — FSP 17273.",
    },
  ],
  "/solutions/estate-planning": [
    {
      href: "/estate-duty-calculator",
      title: "Estate duty calculator",
      description: "Estimate duty and executor fees on your estate.",
    },
    {
      href: "/annual-estate-reduction-strategy",
      title: "Annual estate reduction",
      description: "Use R100k/R200k donation allowances over time.",
    },
    {
      href: "/legacy-readiness-checklist",
      title: "Legacy readiness checklist",
      description: "Identify gaps in wills, trusts, and liquidity.",
    },
  ],
};

export const CALCULATOR_RELATED: Record<string, RelatedLink[]> = {
  "/estate-duty-calculator": [
    { href: "/annual-estate-reduction-strategy", title: "Annual estate reduction", description: "Donation strategy calculator." },
    { href: "/solutions/estate-planning", title: "Estate planning services", description: "Wills, trusts, and structuring." },
    { href: "/contact", title: "Estate review", description: "Book a structured estate conversation." },
  ],
  "/income-in-retirement": [
    { href: "/retirement", title: "Retirement Reality Calculator", description: "Capital required at retirement." },
    { href: "/everest-amethyst-living-annuity", title: "Amethyst living annuity", description: "Drawdown 2.5%–17.5% education." },
    { href: "/calculators", title: "All calculators", description: "Curated retirement and wealth tools." },
  ],
  "/income-tax-calculator": [
    { href: "/retirement", title: "Retirement Reality", description: "Model capital needs with your tax rate." },
    { href: "/wealth-building-calculator", title: "Wealth building", description: "Long-term capital growth illustration." },
    { href: "/calculators", title: "Calculator hub", description: "Educational planning tools." },
  ],
  "/cost-of-inflation-over-time": [
    { href: "/retirement-readiness", title: "Retirement readiness", description: "Shortfall and contribution planning." },
    { href: "/calculators", title: "Calculator hub", description: "Inflation and retirement tools." },
    { href: "/everest-wealth", title: "Everest Wealth", description: "Structured yield education." },
  ],
  "/wealth-building-calculator": [
    { href: "/everest-strategic-growth-145", title: "14.5% Strategic Growth", description: "Compound growth product education." },
    { href: "/calculators", title: "Calculator hub", description: "Wealth and retirement calculators." },
    { href: "/contact", title: "Capital review", description: "Structured wealth engineering call." },
  ],
  "/premium-increase-calculator": [
    { href: "/solutions/life-insurance", title: "Life insurance", description: "Personal life and disability cover." },
    { href: "/solutions/business-life", title: "Business life cover", description: "Key person and buy-and-sell funding." },
    { href: "/contact", title: "Policy review", description: "Compare escalating premium structures." },
  ],
  "/immediate-higher-income-calculator": [
    { href: "/everest-128-product", title: "12.8% Strategic Income", description: "Compare with 14.2% Onyx Income+." },
    { href: "/everest-wealth", title: "Everest Wealth hub", description: "All voluntary yield products." },
    { href: "/contact", title: "Income planning", description: "Match product to your cash-flow need." },
  ],
  "/annual-estate-reduction-strategy": [
    { href: "/estate-duty-calculator", title: "Estate duty calculator", description: "Duty and executor cost estimate." },
    { href: "/solutions/estate-planning", title: "Estate planning", description: "Wills, trusts, and donations." },
    { href: "/legacy-readiness-checklist", title: "Legacy checklist", description: "Free readiness assessment." },
  ],
};

export function getRelatedLinks(path: string): RelatedLink[] {
  return SOLUTION_RELATED[path] ?? CALCULATOR_RELATED[path] ?? [];
}
