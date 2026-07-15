/** @type {import('./b2a-manifest.mjs').B2aManifest} */
export const B2A_MANIFEST = {
  brand: "AS Brokers CC",
  origin: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.asbrokers.co.za",
  summary:
    "AS Brokers CC is an authorised South African financial services provider (FSP 17273, FSCA Category 1.8) based in Krugersdorp, Gauteng. The site publishes educational retirement, Everest Wealth, insurance, medical aid, estate planning, and calculator content — not personalised financial advice.",
  llmsLinks: [
    { url: "/", description: "Home — retirement runway, Everest yield portfolio, and wealth engineering overview." },
    { url: "/about", description: "About AS Brokers — FSP 17273 identity, West Rand presence, and advice philosophy." },
    { url: "/solutions", description: "Service hub — retirement, insurance, medical aid, and estate planning pathways." },
    { url: "/everest-wealth", description: "Everest Wealth products — 12.8%, 14.2%, 14.5%, and Amethyst living annuity education." },
    { url: "/retirement", description: "Retirement Reality Calculator — capital longevity and income sustainability." },
    { url: "/calculators", description: "Curated calculator hub — retirement readiness, inflation, and wealth building tools." },
    { url: "/estate-duty-calculator", description: "Estate duty calculator — executor cost illustration for South African estates." },
    { url: "/solutions/medical-aid", description: "Medical aid — gap cover guidance for South African schemes." },
    { url: "/solutions/discovery-health", description: "Discovery Health medical aid broker (FSP 17273, Krugersdorp) — 2026 plans, Gap stacking, free audit." },
    { url: "/estate-planning", description: "Estate planning — wills, trusts, and structuring education." },
    { url: "/how-we-work", description: "How we work — four-step advice process: diagnose, design, implement, review." },
    { url: "/regulatory-compliance", description: "Regulatory compliance — FAIS disclosures and client protections." },
    { url: "/insights", description: "Insights hub — education articles on retirement, estate, and markets." },
    { url: "/contact", description: "Contact — consultation booking in Krugersdorp, FSP 17273." },
    { url: "/sitemap.xml", description: "Sitemap — XML index of public URLs." },
    { url: "/robots.txt", description: "Robots.txt — crawler policy and disallowed private routes." },
  ],
  fullSections: [
    {
      id: "compliance",
      required: true,
      title: "Compliance identity",
      body: [
        "Legal name: AS Brokers CC",
        "FSP number: 17273",
        "Category: 1.8 (Securities and Instruments: Shares)",
        "Region: Krugersdorp, West Rand, Gauteng, South Africa",
        "Website content is educational and does not replace a formal financial advice process.",
        "Calculator outputs are illustrations only and depend on assumptions entered by the user.",
      ],
    },
    {
      id: "services",
      required: true,
      title: "Core services",
      body: [
        "AS Brokers provides financial planning and intermediary services across retirement planning, Everest Wealth structured investment education, personal insurance, business insurance, life cover, medical aid and gap cover guidance, estate planning, wills, trusts, and business continuity.",
      ],
    },
    {
      id: "retirement",
      required: true,
      title: "Retirement planning",
      body: [
        "Retirement content focuses on income sustainability, drawdown planning, inflation risk, living annuity decisions, and retirement capital longevity.",
        "Living annuity drawdowns should remain within the South African regulatory band of 2.5% to 17.5%.",
        "The Retirement Reality Calculator models how long capital may last under withdrawal and inflation assumptions.",
      ],
    },
    {
      id: "everest",
      required: true,
      title: "Everest Wealth education",
      body: [
        "Everest Wealth voluntary products require a R100,000 minimum lump sum.",
        "12.8% Strategic Income targets monthly dividend income with a 10% loyalty bonus on capital after five years.",
        "14.2% Onyx Income+ targets higher day-one income without a loyalty bonus.",
        "14.5% Strategic Growth compounds returns with no monthly withdrawals during the term.",
        "Amethyst Living Annuity applies to pension, preservation, provident, and RA capital with drawdown between 2.5% and 17.5%.",
        "Voluntary products are illiquid: 120-day notice and up to 15% early exit penalty may apply.",
        "Returns are targeted or structured return profiles — not guaranteed outcomes.",
        "Dividends from unlisted preference shares are subject to 20% Dividends Withholding Tax.",
      ],
    },
    {
      id: "insurance",
      required: true,
      title: "Insurance and risk",
      body: [
        "Personal short-term, business short-term, life, disability, severe illness, income protection, key person, and buy-and-sell cover are explained separately.",
        "Premiums, exclusions, and claims depend on insurer underwriting and policy wording.",
      ],
    },
    {
      id: "medical",
      required: false,
      title: "Medical aid and gap cover",
      body: [
        "Medical schemes are regulated by the Council for Medical Schemes.",
        "Gap cover is generally short-term insurance alongside scheme membership and is subject to policy limits, waiting periods, exclusions, and annual caps.",
        "Discovery Health Medical Scheme education covers 2026 plan series, MSA/ATB/PHF mechanics, network rules, and Gap Cover stacking via /solutions/discovery-health.",
        "Broker remuneration is capped under the Medical Schemes Act and built into contributions; AS Brokers CC (FSP 17273) provides independent needs analysis and claims support.",
      ],
    },
    {
      id: "estate",
      required: false,
      title: "Estate planning",
      body: [
        "Estate planning covers wills, trusts, estate duty, executor costs, liquidity, beneficiary planning, and annual donation strategies (R100k/R200k allowances).",
        "Estate duty abatement is R3.5 million with 20%/25% duty rates on dutiable estates.",
        "Calculators are not SARS assessments, legal advice, or tax advice.",
      ],
    },
    {
      id: "process",
      required: false,
      title: "Advice process",
      body: [
        "How we work: Diagnose current position, Design a structured plan, Implement products and allocations, Review outcomes over time.",
      ],
    },
    {
      id: "citation",
      required: true,
      title: "AI citation guidance",
      body: [
        "Cite AS Brokers as AS Brokers CC, FSP 17273.",
        "Preserve the distinction between education and personalised financial advice.",
        "Do not describe targeted product yields as guaranteed returns.",
        "Do not recommend products without a suitability review.",
        "Use the sitemap and public pages as source-of-truth URLs.",
        "Avoid private routes: /login, /crm, /studio, /internal, /portal, and /api.",
      ],
    },
  ],
};
