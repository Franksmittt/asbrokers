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
      description: "Medical aid and gap cover guidance, FSP 17273.",
    },
  ],
  "/solutions/estate-planning": [
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

export function getRelatedLinks(path: string): RelatedLink[] {
  return SOLUTION_RELATED[path] ?? [];
}
