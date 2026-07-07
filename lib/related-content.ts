import type { RelatedLink } from "@/components/seo/RelatedContent";

export const SOLUTION_RELATED: Record<string, RelatedLink[]> = {
  "/solutions/personal-insurance": [
    {
      href: "/solutions/life-insurance",
      title: "Life & disability cover",
      description: "Death, disability, and income protection for families and professionals.",
    },
    {
      href: "/calculators",
      title: "Planning calculators",
      description: "Illustrative tools for retirement, estate, and insurance.",
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
      href: "/calculators#asset-015-average-clause",
      title: "Average clause calculator",
      description: "See how underinsurance affects a claim payout.",
    },
    {
      href: "/calculators#asset-004-life-of-capital",
      title: "Life of capital",
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
      href: "/estate-planning",
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
      description: "Medical aid and gap cover guidance, FSP 17273.",
    },
  ],
  "/estate-planning": [
    {
      href: "/calculators#asset-007-estate-duty",
      title: "Estate duty calculator",
      description: "Estimate duty and executor fees on your estate.",
    },
    {
      href: "/calculators#asset-008-estate-reduction",
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

/** Primary hub pages — internal link topology (Phase 5.2). */
export const HUB_RELATED: Record<string, RelatedLink[]> = {
  "/": [
    {
      href: "/retirement-planning",
      title: "Retirement planning",
      description: "Capital, income, living annuities, and clarity on whether your money will last.",
    },
    {
      href: "/investments",
      title: "Investments hub",
      description: "Wealth building, life-stage guidance, and Everest yield education.",
    },
    {
      href: "/calculators",
      title: "Planning calculators",
      description: "Illustrative retirement, estate, tax, and insurance tools.",
    },
    {
      href: "/contact",
      title: "Book a consultation",
      description: "Independent FSP 17273 advice in Krugersdorp and the West Rand.",
    },
  ],
  "/retirement": [
    {
      href: "/retirement-planning",
      title: "Planning for retirement",
      description: "Pre-retirement clarity on capital, timeline, and growth needed.",
    },
    {
      href: "/calculators#asset-002-retirement-reality-check",
      title: "Retirement Reality Check",
      description: "See where you stand today and what gap remains.",
    },
    {
      href: "/calculators#asset-014-living-annuity",
      title: "Living Annuity Calculator",
      description: "Model drawdowns, income, and sustainability for Amethyst.",
    },
    {
      href: "/everest-wealth",
      title: "Everest Wealth investments",
      description: "Voluntary capital and living annuity structures for retirement.",
    },
    {
      href: "/insights",
      title: "Retirement insights",
      description: "Plain-language guides on income, tax, and longevity.",
    },
  ],
  "/retirement-planning": [
    {
      href: "/retirement-survival-blueprint",
      title: "Retirement Survival Blueprint",
      description: "5-step diagnostic and Financial Freedom Score™.",
    },
    {
      href: "/calculators#asset-002-retirement-reality-check",
      title: "Retirement Reality Check",
      description: "Compare desired income against projected capital.",
    },
    {
      href: "/retirement",
      title: "Full retirement hub",
      description: "Living annuities, drawdown tools, and post-retirement guidance.",
    },
    {
      href: "/contact",
      title: "Book a strategy call",
      description: "Independent Category 1.8 advice, FSP 17273.",
    },
  ],
  "/investments": [
    {
      href: "/everest-wealth",
      title: "Everest Wealth deep dive",
      description: "Product detail, comparison tables, and fiduciary notes.",
    },
    {
      href: "/retirement-planning",
      title: "Planning for retirement",
      description: "Pre-retirement accumulation and gap analysis tools.",
    },
    {
      href: "/calculators#asset-013-everest-income-vs-growth",
      title: "Income vs Growth comparison",
      description: "Compare Everest yield strategies side by side.",
    },
    {
      href: "/contact",
      title: "Book a strategy call",
      description: "Independent Category 1.8 investment advice, FSP 17273.",
    },
  ],
  "/everest-wealth": [
    {
      href: "/everest-wealth/about",
      title: "Understanding Everest",
      description: "How unlisted preference shares, tax routing, and liquidity work.",
    },
    {
      href: "/calculators#asset-013-everest-income-vs-growth",
      title: "Income vs Growth comparison",
      description: "Compare Everest income and growth scenarios side by side.",
    },
    {
      href: "/retirement",
      title: "Retirement hub",
      description: "Planning and living-annuity guidance for South Africans.",
    },
    {
      href: "/contact",
      title: "Investment strategy call",
      description: "Speak with an independent Category 1.8 adviser.",
    },
  ],
  "/insurance": [
    {
      href: "/solutions/personal-insurance",
      title: "Personal insurance",
      description: "Home, motor, and asset protection with independent advice.",
    },
    {
      href: "/solutions/medical-aid",
      title: "Medical aid & gap cover",
      description: "Health pillar structuring for families and professionals.",
    },
    {
      href: "/solutions/life-insurance",
      title: "Premium Liability Test",
      description: "Escalating vs level life premiums and expiring guarantees.",
    },
    {
      href: "/business-risk-review",
      title: "Business risk review",
      description: "Gap analysis for commercial and key-person cover.",
    },
  ],
  "/insights": [
    {
      href: "/retirement",
      title: "Retirement planning",
      description: "Hub for calculators, Amethyst, and retirement clarity.",
    },
    {
      href: "/how-we-work",
      title: "How we work",
      description: "Education first, advice when you are ready.",
    },
    {
      href: "/quiz",
      title: "Financial health quiz",
      description: "Quick assessment across health, wealth, and legacy pillars.",
    },
    {
      href: "/calculators",
      title: "Calculators",
      description: "Run the numbers before your next conversation.",
    },
  ],
  "/about": [
    {
      href: "/team",
      title: "Meet the team",
      description: "Albert, Johnny, and the specialists behind AS Brokers.",
    },
    {
      href: "/how-we-work",
      title: "How we work",
      description: "Independent, education-led advice without product-house bias.",
    },
    {
      href: "/regulatory-compliance",
      title: "Regulatory & compliance",
      description: "FSP 17273, FAIS, POPIA, and our compliance framework.",
    },
    {
      href: "/contact",
      title: "Contact us",
      description: "Book a consultation in Krugersdorp or via WhatsApp.",
    },
  ],
  "/contact": [
    {
      href: "/retirement",
      title: "Retirement planning",
      description: "Prepare questions on capital, drawdown, and living annuities.",
    },
    {
      href: "/investments",
      title: "Investments",
      description: "Wealth building, Everest yields, and life-stage investment guidance.",
    },
    {
      href: "/insurance",
      title: "Insurance & risk",
      description: "Medical aid, life cover, and business protection.",
    },
    {
      href: "/estate-planning",
      title: "Estate planning",
      description: "Wills, trusts, duty awareness, and succession.",
    },
  ],
  "/calculators": [
    {
      href: "/retirement-planning",
      title: "Planning for retirement",
      description: "Pre-retirement clarity on capital, timeline, and growth needed.",
    },
    {
      href: "/investments",
      title: "Investments hub",
      description: "Everest yields and wealth-building tools by life stage.",
    },
    {
      href: "/estate-planning",
      title: "Estate planning hub",
      description: "Wills, duty, liquidity, and legacy readiness.",
    },
    {
      href: "/contact",
      title: "Book an actuarial consultation",
      description: "Run your numbers live with FSP 17273.",
    },
  ],
};

export function getRelatedLinks(path: string): RelatedLink[] {
  return SOLUTION_RELATED[path] ?? HUB_RELATED[path] ?? [];
}
