/**
 * AS Brokers provider panel — factual disclosure of product suppliers and
 * partners per service category. FAIS Section 1(3)(a): names indicate
 * contractual / placement capability only, never endorsement, ranking, or
 * product recommendation. Providers are listed alphabetically within each
 * category (objective sorting — no suitability logic).
 *
 * COMPLIANCE: never add yields, targeted returns, premiums, or product-tier
 * tables to this file. Product specifics are discussed only during advice
 * after a Financial Needs Analysis.
 */

export type ProviderCategory = {
  id: string;
  /** Category display name. */
  title: string;
  /** Which audience group the category serves (drives page grouping). */
  group: "business" | "personal" | "wealth" | "fiduciary";
  /** Plain-language description of the client problem this category addresses. */
  problem: string;
  /** How AS Brokers helps (broker role — factual, no product claims). */
  brokerRole: string;
  /** Alphabetically sorted provider names. */
  providers: string[];
  /** Optional factual footnote (regulatory demarcation, scope, etc.). */
  note?: string;
};

export const PROVIDER_GROUPS = {
  business: "For your business",
  personal: "For you and your family",
  wealth: "Wealth, retirement & investments",
  fiduciary: "Estate, education & lifestyle",
} as const;

export const PROVIDER_PANEL: ProviderCategory[] = [
  // ── For your business ────────────────────────────────────────────────
  {
    id: "short-term-business",
    title: "Short-term business insurance",
    group: "business",
    problem:
      "Commercial property, liability, interruption, fleet, and crime risks — where one uninsured event can close the business.",
    brokerRole:
      "We survey the commercial market, review sums insured and policy wording, place cover, and manage renewals and claims.",
    providers: ["Albatros", "Bryte", "King Price", "Momentum", "Santam", "Strategic Insurance Solutions (SIS)"],
    note: "Complex or specialist risks are placed with niche underwriters where the risk profile requires it.",
  },
  {
    id: "farmer-insurance",
    title: "Farmer & agricultural insurance",
    group: "business",
    problem:
      "Crops, livestock, equipment, and weather-related losses need underwriters with real agricultural experience.",
    brokerRole:
      "We place agricultural risk with insurers that have actuarial depth in farming portfolios and support claims after weather events.",
    providers: ["Bryte", "King Price", "Santam", "Strategic Insurance Solutions (SIS)"],
  },
  {
    id: "life-business",
    title: "Business life assurance",
    group: "business",
    problem:
      "The death or disability of a partner or key person can leave the business without funding, or partners with an inherited co-owner they did not choose.",
    brokerRole:
      "We structure key person cover and buy-and-sell funding aligned to the shareholders' agreement, working with insurers and independent attorneys on the contracts.",
    providers: ["Brightrock", "Discovery", "Momentum", "Sanlam"],
    note: "Independent attorneys draft binding agreements; AS Brokers coordinates the cover and funding side.",
  },
  {
    id: "group-benefits",
    title: "Group risk & employee benefits",
    group: "business",
    problem:
      "Staff expect risk and retirement benefits; owners need schemes that are affordable and correctly administered.",
    brokerRole:
      "We structure and administer group risk and retirement benefit schemes for employers.",
    providers: ["Discovery", "Momentum"],
  },
  {
    id: "business-medical",
    title: "Business medical aid (group)",
    group: "business",
    problem:
      "Recruiting and keeping good people is harder without a workable group medical arrangement.",
    brokerRole:
      "We help employers compare factual scheme options and administer group medical aid membership.",
    providers: ["Discovery", "Momentum"],
  },
  {
    id: "renewable-electricity",
    title: "Renewable electricity for business",
    group: "business",
    problem:
      "Rising utility costs, grid instability, and ESG reporting pressure — without capital for on-site solar.",
    brokerRole:
      "We facilitate access to renewable energy procurement platforms that wheel green power via the national grid.",
    providers: ["Discovery"],
  },

  // ── For you and your family ─────────────────────────────────────────
  {
    id: "short-term-personal",
    title: "Short-term personal insurance",
    group: "personal",
    problem:
      "Home, vehicles, and possessions — where underinsurance quietly reduces claim payouts through the Average Clause.",
    brokerRole:
      "We review declared values against replacement costs, compare the market, and manage claims when they happen.",
    providers: ["Bryte", "Discovery", "King Price", "Momentum", "Strategic Insurance Solutions (SIS)"],
  },
  {
    id: "life-personal",
    title: "Personal life assurance",
    group: "personal",
    problem:
      "If your income stops — through death, disability, or severe illness — the bond, school fees, and household costs do not.",
    brokerRole:
      "We compare life, disability, severe illness, and income protection structures across the market after a needs analysis.",
    providers: ["Bidvest Life", "Brightrock", "Discovery", "Liberty", "Momentum", "Sanlam"],
  },
  {
    id: "personal-medical",
    title: "Personal medical aid",
    group: "personal",
    problem:
      "Choosing between scheme options and networks without understanding what each tier actually funds in hospital.",
    brokerRole:
      "We help families compare factual benefit structures and support applications and claims.",
    providers: ["Discovery", "Momentum"],
    note: "Only registered medical schemes may be described as medical aid under the Medical Schemes Act.",
  },
  {
    id: "gap-cover",
    title: "Gap cover",
    group: "personal",
    problem:
      "Specialists can charge multiples of the scheme rate — the shortfall lands on the family, usually mid-treatment.",
    brokerRole:
      "We align gap cover to your existing medical scheme option so shortfall cover is in place before it is needed.",
    providers: ["Turnberry"],
    note: "Gap cover is short-term insurance under the Demarcation Regulations, not a medical scheme, and requires active medical scheme membership.",
  },
  {
    id: "wellness",
    title: "Wellness programme",
    group: "personal",
    problem:
      "Health behaviour affects long-term insurance affordability and wellbeing.",
    brokerRole:
      "We assist clients participating in insurer wellness programmes linked to their cover.",
    providers: ["Vitality (Discovery)"],
  },
  {
    id: "banking",
    title: "Banking",
    group: "personal",
    problem:
      "Clients often want transactional banking that connects to their broader financial picture.",
    brokerRole: "We facilitate access to behaviour-linked digital banking.",
    providers: ["Discovery Bank"],
  },

  // ── Wealth, retirement & investments ────────────────────────────────
  {
    id: "retirement",
    title: "Retirement planning",
    group: "wealth",
    problem:
      "Outliving capital, Two-Pot decisions, and tax on contributions and drawdowns — discovered too late to fix cheaply.",
    brokerRole:
      "We quantify the retirement gap, then structure retirement annuities, preservation funds, and living annuities across our platform panel after a needs analysis.",
    providers: ["Discovery", "Everest", "Momentum", "Twenty Seven Four (27four)"],
  },
  {
    id: "listed-investments",
    title: "Listed investments",
    group: "wealth",
    problem:
      "Cash loses to inflation, but picking funds and wrappers without structure is guesswork.",
    brokerRole:
      "We construct portfolios across platforms and asset managers within regulated wrappers — unit trusts, endowments, retirement funds.",
    providers: ["Discovery", "Momentum", "nReach", "The Cycle (LifeCycle)", "Twenty Seven Four (27four)"],
  },
  {
    id: "unlisted-investments",
    title: "Unlisted investments (Category 1.8)",
    group: "wealth",
    problem:
      "Some investors want alternatives beyond listed markets — but unlisted instruments carry liquidity and valuation risks that must be understood first.",
    brokerRole:
      "Our Category 1.8 licence permits advice on certain unlisted securities. Product terms, liquidity constraints, fees, and risks are discussed only during a documented needs analysis.",
    providers: ["Aluma Capital", "Everest Wealth"],
    note: "Unlisted instruments carry significant liquidity constraints, and past performance is not a guarantee of future results. No product terms or return targets are published on this website; a risk assessment precedes any capital allocation.",
  },

  // ── Estate, education & lifestyle ────────────────────────────────────
  {
    id: "wills",
    title: "Wills",
    group: "fiduciary",
    problem:
      "Dying without a valid will freezes assets and puts dependants through avoidable cost and delay.",
    brokerRole:
      "We facilitate will drafting through fiduciary partners and coordinate the cover that funds estate costs.",
    providers: ["AS Brokers with Electus Trust", "Capital Legacy", "Discovery", "Momentum"],
  },
  {
    id: "estates",
    title: "Winding up estates",
    group: "fiduciary",
    problem:
      "Deceased estates must be wound up through the Master of the High Court — a technical legal process most families face unprepared.",
    brokerRole:
      "Together with Electus Trust we administer the winding-up of deceased estates and keep families informed through the process.",
    providers: ["AS Brokers & Electus Trust"],
  },
  {
    id: "education",
    title: "Financial education",
    group: "fiduciary",
    problem:
      "Financial decisions made without understanding compound into expensive mistakes.",
    brokerRole:
      "Albert Schuurman and Johnny Farinha lead structured financial education — before any advice conversation.",
    providers: ["AS Brokers", "Financial Freedom Community™", "Wealth Creators University"],
    note: "Educational programmes and calculators are factual information under FAIS Section 1(3)(a); they do not assess suitability or replace personal advice.",
  },
];

export function getProviderCategoriesByGroup(group: ProviderCategory["group"]) {
  return PROVIDER_PANEL.filter((category) => category.group === group);
}

/** Deduplicated, alphabetical list of all external provider names (for strips/SEO). */
export function getAllProviderNames(): string[] {
  const names = new Set<string>();
  for (const category of PROVIDER_PANEL) {
    for (const provider of category.providers) names.add(provider);
  }
  return [...names].sort((a, b) => a.localeCompare(b));
}
