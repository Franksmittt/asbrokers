/**
 * Public /calculators hub catalog: domains, problem blurbs, featured starters.
 * Single source for the grid hub (ASSET 001–017).
 */

import {
  CALCULATOR_REGISTRY,
  formatPublicCalculatorTitle,
  type CalculatorRegistryEntry,
} from "@/lib/calculators/registry";
import { calculatorPagePath } from "@/lib/calculators/page-path";

export type HubCalculator = {
  id: string;
  assetCode: string;
  title: string;
  href: string;
  /** One-line problem the tool answers (client-facing). */
  problem: string;
};

export type HubDomain = {
  id: string;
  label: string;
  /** Short section lead for the domain. */
  lead: string;
  ids: readonly string[];
  everestDisclosure?: boolean;
};

/** Problem-led blurbs keyed by registry id. */
export const HUB_CALCULATOR_PROBLEMS: Record<string, string> = {
  "asset-001-retirement-growth":
    "What growth rate do you need to hit your retirement capital target?",
  "asset-002-retirement-reality-check":
    "Will your capital last, and how big is the shortfall today?",
  "asset-003-retirement-premium":
    "What monthly contribution closes the retirement gap?",
  "asset-004-life-of-capital":
    "How long will a capital pot last at your chosen drawdown?",
  "asset-005-future-value":
    "What is inflation doing to future purchasing power?",
  "asset-006-income-tax": "Estimate SARS income tax on your figures (illustrative).",
  "asset-007-estate-duty":
    "What estate duty and executor fees may apply to an estate?",
  "asset-008-estate-reduction":
    "How donation strategies can ease estate pressure within SARS limits.",
  "asset-009-everest-142-income":
    "Model targeted monthly income from the 14.2% Everest profile.",
  "asset-010-everest-128-income":
    "Model targeted monthly income from the 12.8% Everest profile.",
  "asset-011-everest-128-vs-142":
    "Compare 12.8% vs 14.2% targeted income profiles side by side.",
  "asset-012-strategic-growth":
    "Illustrate Everest strategic growth portfolio maths over time.",
  "asset-013-everest-income-vs-growth":
    "Income profiles versus compounding growth, educational only.",
  "asset-014-living-annuity":
    "Model living annuity income within the 2.5% to 17.5% drawdown band.",
  "asset-015-average-clause":
    "How underinsurance can reduce a claim when the average clause applies.",
  "asset-016-growth-comparison":
    "See how different growth rates change long-term capital outcomes.",
  "asset-017-personal-goal":
    "Map a personal capital goal to time, contributions, and growth.",
};

/**
 * Domain order: Everest/investments first (growth engine), then the problems
 * clients most often bring (retirement, estate, tax, insurance).
 */
export const HUB_DOMAINS: readonly HubDomain[] = [
  {
    id: "investments",
    label: "Investments & Everest",
    lead: "Structured income and growth maths for Everest Wealth preference-share profiles, plus general growth and inflation tools.",
    ids: [
      "asset-010-everest-128-income",
      "asset-009-everest-142-income",
      "asset-011-everest-128-vs-142",
      "asset-012-strategic-growth",
      "asset-013-everest-income-vs-growth",
      "asset-016-growth-comparison",
      "asset-017-personal-goal",
      "asset-005-future-value",
    ],
    everestDisclosure: true,
  },
  {
    id: "retirement",
    label: "Retirement",
    lead: "Longevity, shortfall, contribution, and living annuity tools so you test assumptions before product talk.",
    ids: [
      "asset-002-retirement-reality-check",
      "asset-001-retirement-growth",
      "asset-003-retirement-premium",
      "asset-004-life-of-capital",
      "asset-014-living-annuity",
    ],
  },
  {
    id: "estate",
    label: "Estate & legacy",
    lead: "Duty, executor fees, and donation-based reduction illustrations within SARS annual limits.",
    ids: ["asset-007-estate-duty", "asset-008-estate-reduction"],
  },
  {
    id: "tax",
    label: "Tax",
    lead: "Illustrative income tax estimates using current SARS brackets.",
    ids: ["asset-006-income-tax"],
  },
  {
    id: "insurance",
    label: "Insurance",
    lead: "Underinsurance risk when the average clause applies to a property claim.",
    ids: ["asset-015-average-clause"],
  },
] as const;

/** Featured “start here” strip, conversion-critical starters. */
export const HUB_FEATURED_IDS = [
  "asset-010-everest-128-income",
  "asset-002-retirement-reality-check",
  "asset-007-estate-duty",
] as const;

function stripBrand(title: string): string {
  return title.replace(/^AS Brokers\s+/i, "");
}

function toHubCalculator(entry: CalculatorRegistryEntry): HubCalculator {
  return {
    id: entry.id,
    assetCode: entry.assetCode,
    title: stripBrand(formatPublicCalculatorTitle(entry)),
    href: calculatorPagePath(entry.id),
    problem:
      HUB_CALCULATOR_PROBLEMS[entry.id] ??
      "Illustrative educational calculator. Not personalised advice.",
  };
}

export const HUB_CALCULATORS: HubCalculator[] = CALCULATOR_REGISTRY.map(toHubCalculator);

export function getHubCalculatorById(id: string): HubCalculator | undefined {
  return HUB_CALCULATORS.find((c) => c.id === id);
}

export function getHubFeaturedCalculators(): HubCalculator[] {
  return HUB_FEATURED_IDS.map((id) => getHubCalculatorById(id)).filter(
    (c): c is HubCalculator => Boolean(c)
  );
}

export function getHubDomainCalculators(domain: HubDomain): HubCalculator[] {
  return domain.ids
    .map((id) => getHubCalculatorById(id))
    .filter((c): c is HubCalculator => Boolean(c));
}
