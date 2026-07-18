import type { FAQItem } from "@/lib/seo";
import { CALCULATOR_REGISTRY, getCalculatorById, type CalculatorRegistryEntry } from "@/lib/calculators/registry";
import { calculatorPagePath } from "@/lib/calculators/page-path";

export type CalculatorPageConfig = {
  id: string;
  path: string;
  assetCode: string;
  calculatorSrc: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  kicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  calculatorTitle: string;
  calculatorLead: string;
  sidePanelTitle: string;
  sidePanelParagraphs: string[];
  sidePanelBullets: string[];
  fiduciaryNotes: string[];
  howToSteps: { title: string; description: string }[];
  readingSections: { heading: string; paragraphs: string[] }[];
  faqs: FAQItem[];
  categoryLabel: string;
  categoryHref: string;
};

const FIDUCIARY: string[] = [
  "Educational illustration only. Not personalised financial, tax, or legal advice.",
  "Tax tables and product terms may change. Confirm with a qualified practitioner.",
  "FSP 17273 · Category 1.8 independent adviser · Krugersdorp.",
];

type PageContent = Omit<
  CalculatorPageConfig,
  "id" | "path" | "assetCode" | "calculatorSrc" | "calculatorTitle"
> & { shortTitle: string };

const RETIREMENT = { categoryLabel: "Retirement planning", categoryHref: "/retirement-planning" };
const ESTATE = { categoryLabel: "Estate planning", categoryHref: "/estate-planning" };
const EVEREST = { categoryLabel: "Everest Wealth", categoryHref: "/investments" };
const INSURANCE = { categoryLabel: "Insurance & risk", categoryHref: "/insurance" };
const WEALTH = { categoryLabel: "Wealth building", categoryHref: "/investments" };
const TAX = { categoryLabel: "Tax planning", categoryHref: "/calculators" };

const PAGES: Record<string, PageContent> = {
  "asset-001-retirement-growth": {
    shortTitle: "Retirement Growth Rate Calculator",
    seoTitle: "Retirement Growth Rate Calculator South Africa",
    seoDescription:
      "See the illustrative growth rate you may need to reach a retirement capital target from savings and contributions. Free SA calculator. FSP 17273.",
    keywords: ["retirement growth rate calculator", "retirement calculator South Africa", "retirement savings target"],
    kicker: "Retirement planning",
    heroTitle: "What growth rate do you need to retire on track?",
    heroSubtitle:
      "Model the illustrative return required to close the gap between where you are today and the capital you want at retirement.",
    heroImage: "/images/calc-lcp/asset-001.webp",
    heroImageAlt: "Couple reviewing retirement savings growth with an adviser",
    calculatorLead:
      "Enter current savings, monthly contributions, years to retirement, and your target lump sum. The tool shows an illustrative required growth rate.",
    sidePanelTitle: "Who this is for",
    sidePanelParagraphs: [
      "Still working and asking whether your retirement savings are on track? This calculator translates a target capital number into an illustrative growth rate.",
      "Use it before product conversations so you understand the maths behind compound growth, contributions, and time.",
    ],
    sidePanelBullets: [
      "Set a retirement capital target",
      "Include lump sum and monthly contributions",
      "Stress-test time horizon changes",
      "Prepare informed adviser discussions",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Set your target", description: "Enter the retirement capital you want at your chosen retirement age." },
      { title: "Add what you have", description: "Include current retirement savings and ongoing monthly contributions." },
      { title: "Choose your timeline", description: "Set years until retirement to see how time affects the required rate." },
      { title: "Review the result", description: "Compare the illustrative rate with realistic return assumptions before acting." },
    ],
    readingSections: [
      {
        heading: "Why growth assumptions matter in retirement planning",
        paragraphs: [
          "Many South Africans focus on products before they understand the return their plan implicitly requires. A modest shortfall today can compound into a large gap at retirement.",
          "Independent advice helps you align return expectations with risk tolerance, tax wrappers, and liquidity needs rather than chasing a number from a calculator.",
        ],
      },
      {
        heading: "What to do after you run the numbers",
        paragraphs: [
          "If the required rate looks ambitious, explore contribution increases, delayed retirement, or a phased retirement income strategy with an FSP 17273 adviser.",
          "Pair this tool with our Retirement Reality Check and Personal Goal calculators for a fuller picture.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the growth rate guaranteed?",
        answer:
          "No. The result is an illustrative required rate based on your inputs. Markets, fees, and tax can change outcomes.",
      },
      {
        question: "Does this include inflation?",
        answer:
          "Use your target in today's money and discuss real vs nominal returns with your adviser for a complete plan.",
      },
      {
        question: "What should I include in current savings?",
        answer:
          "Include retirement annuities, pension funds, preservation funds, and voluntary investments you intend to use at retirement.",
      },
      {
        question: "What return assumption is realistic?",
        answer:
          "Many planners stress-test conservative, moderate, and optimistic bands. Compare the required rate with those bands before acting.",
      },
      {
        question: "Can AS Brokers help me implement a plan?",
        answer:
          "Yes. We are an independent Category 1.8 FSP (17273) serving Krugersdorp and the West Rand.",
      },
      {
        question: "How often should I rerun this calculator?",
        answer:
          "Rerun when your salary, contributions, or retirement date changes, or at least once a year as part of a retirement review.",
      },
    ],
    ...RETIREMENT,
  },

  "asset-002-retirement-reality-check": {
    shortTitle: "Retirement Reality Check Calculator",
    seoTitle: "Retirement Reality Check Calculator South Africa",
    seoDescription:
      "Compare desired retirement income against projected capital. Free retirement reality check for South Africans. See funding gaps before you retire. FSP 17273.",
    keywords: ["retirement reality check", "will I have enough to retire", "retirement gap calculator"],
    kicker: "Retirement planning",
    heroTitle: "Will your retirement income match your lifestyle?",
    heroSubtitle:
      "Compare the income you want in retirement with the capital you are on track to build. See surplus or shortfall in plain numbers.",
    heroImage: "/images/calc-lcp/asset-002.webp",
    heroImageAlt: "Retirement planning review at a kitchen table",
    calculatorLead:
      "Enter desired monthly retirement income, expected capital, growth, and drawdown assumptions to see whether your plan may fund your lifestyle.",
    sidePanelTitle: "The question most clients ask",
    sidePanelParagraphs: [
      "Will I have enough? This reality check shows whether projected capital supports your income goal, before you commit to products or drawdown strategies.",
      "It is a conversation starter, not a quote or guarantee.",
    ],
    sidePanelBullets: [
      "Income need vs projected capital",
      "Gap or surplus at a glance",
      "Use before living annuity decisions",
      "Pairs with Life of Capital tool",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Define income need", description: "Enter the monthly income you want in today's rands." },
      { title: "Enter capital projections", description: "Add expected retirement lump sum and growth assumptions." },
      { title: "Set drawdown rules", description: "Use an illustrative drawdown or annuity assumption where prompted." },
      { title: "Read the gap", description: "A shortfall means planning changes; a surplus may allow more flexibility." },
    ],
    readingSections: [
      {
        heading: "Income need vs capital on paper",
        paragraphs: [
          "Retirement planning fails when lifestyle expectations and capital bases are never reconciled. This calculator makes that reconciliation visible.",
          "Medical costs, travel, and family support often rise in early retirement. Build margin into your income target before you treat a surplus as certainty.",
        ],
      },
    ],
    faqs: [
      {
        question: "What if I have a shortfall?",
        answer:
          "Consider higher contributions, later retirement, lower income targets, or a structured advice review with FSP 17273.",
      },
      {
        question: "Does this replace a living annuity quote?",
        answer: "No. It is educational. Product quotes and suitability reviews require adviser-led analysis.",
      },
    ],
    ...RETIREMENT,
  },

  "asset-003-retirement-premium": {
    shortTitle: "Retirement Premium Calculator",
    seoTitle: "Retirement Premium Calculator South Africa",
    seoDescription:
      "Estimate monthly contributions or premiums needed to close a retirement funding gap over time. Illustrative retirement premium calculator. FSP 17273.",
    keywords: ["retirement premium calculator", "retirement contribution calculator", "monthly retirement savings"],
    kicker: "Retirement planning",
    heroTitle: "How much should you save each month to close the gap?",
    heroSubtitle:
      "Turn a retirement capital shortfall into an illustrative monthly funding number over your remaining working years.",
    heroImage: "/images/calc-lcp/asset-003.webp",
    heroImageAlt: "Monthly retirement contribution planning",
    calculatorLead:
      "Enter your funding gap, years to retirement, and growth assumption to see an illustrative monthly premium or contribution.",
    sidePanelTitle: "After the reality check",
    sidePanelParagraphs: [
      "Once you know you have a gap, the next question is practical: what monthly number closes it? This tool gives an illustrative answer.",
      "Risk products, RA contributions, and voluntary investments may all play a role. An adviser helps you choose structures tax-efficiently.",
    ],
    sidePanelBullets: [
      "Gap-to-monthly contribution illustration",
      "Time horizon sensitivity",
      "Use after Reality Check",
      "Not a policy quote",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter the shortfall", description: "Use your gap from a reality check or your own capital target." },
      { title: "Set years remaining", description: "How long you can still contribute before retirement." },
      { title: "Add growth assumption", description: "Use a conservative illustrative return for stress-testing." },
      { title: "Review monthly result", description: "Treat the output as a planning benchmark, not a product premium." },
    ],
    readingSections: [
      {
        heading: "Premiums, contributions, and affordability",
        paragraphs: [
          "A theoretical monthly number means little if it is not sustainable through salary changes, business cycles, and family commitments.",
          "Build plans you can keep when markets are volatile. FSP 17273 advisers help align funding with cash flow and tax wrappers.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this a life insurance premium?",
        answer:
          "It illustrates retirement funding needs. Actual insurance or investment premiums depend on product, age, and underwriting.",
      },
      {
        question: "Is this personalised advice?",
        answer:
          "No. The monthly figure is an educational illustration. Personal advice requires a needs analysis with AS Brokers CC (FSP 17273).",
      }
    ],
    ...RETIREMENT,
  },

  "asset-004-life-of-capital": {
    shortTitle: "Life of Capital Calculator",
    seoTitle: "Life of Capital Calculator | Retirement Drawdown South Africa",
    seoDescription:
      "Model how long retirement capital may last at your drawdown rate. Free life of capital calculator for retirees and pre-retirees. FSP 17273.",
    keywords: ["life of capital calculator", "retirement drawdown calculator", "will my money last in retirement"],
    kicker: "Retirement income",
    heroTitle: "How long will your retirement capital last?",
    heroSubtitle:
      "Stress-test sustainable drawdown: see when capital may deplete at your chosen income, growth, and inflation assumptions.",
    heroImage: "/images/calc-lcp/asset-004.webp",
    heroImageAlt: "Retiree reviewing how long capital may last",
    calculatorLead:
      "Enter lump sum, monthly income draw, growth rate, and inflation to model capital longevity. Essential for living annuity and voluntary income planning.",
    sidePanelTitle: "What this test shows",
    sidePanelParagraphs: [
      "Retirement income is not only about yield. It is about how long capital sustains your lifestyle when markets, inflation, and drawdowns interact.",
      "Already retired or within five years of retirement? This is often the first diagnostic we run.",
    ],
    sidePanelBullets: [
      "Drawdown sustainability stress-test",
      "Inflation and growth sensitivity",
      "Identify gaps before irreversible choices",
      "Pairs with Living Annuity calculator",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter capital base", description: "Add retirement lump sum or living annuity capital." },
      { title: "Set monthly income", description: "The income you need or are drawing today." },
      { title: "Add growth and inflation", description: "Use conservative assumptions for stress-testing." },
      { title: "Read depletion timeline", description: "If capital runs out too soon, adjust income or strategy with an adviser." },
    ],
    readingSections: [
      {
        heading: "Drawdown risk in South African retirement",
        paragraphs: [
          "Living annuities and voluntary income products give flexibility, but drawdowns that look fine in year one can fail in year fifteen when sequences of returns and inflation compound.",
          "Regulation 28, tax on income, and medical inflation all affect real outcomes. Use this tool to prepare questions for a fiduciary review.",
        ],
      },
      {
        heading: "Amethyst and alternative yield strategies",
        paragraphs: [
          "Some clients pair living annuity capital with structured yield solutions where suitable. Liquidity, minimums, and suitability rules apply.",
          "Everest voluntary products carry R100k minimums and liquidity constraints. Discuss fit with FSP 17273 before committing capital.",
        ],
      },
    ],
    faqs: [
      {
        question: "What drawdown rate is safe?",
        answer:
          "There is no universal safe rate. It depends on age, portfolio, fees, and inflation. Use this tool to explore scenarios, then seek advice.",
      },
      {
        question: "Does this model living annuities?",
        answer:
          "It illustrates capital longevity. For living annuity income mechanics, use our Living Annuity calculator as well.",
      },
    ],
    ...RETIREMENT,
  },

  "asset-005-future-value": {
    shortTitle: "Future Value & Inflation Calculator",
    seoTitle: "Inflation Calculator South Africa | Future Value Calculator",
    seoDescription:
      "See how inflation erodes purchasing power over time. Free future value and inflation calculator for South African financial planning. FSP 17273.",
    keywords: ["inflation calculator South Africa", "future value calculator", "purchasing power calculator"],
    kicker: "Inflation & tax",
    heroTitle: "What will today's money be worth tomorrow?",
    heroSubtitle:
      "Model how inflation erodes purchasing power so retirement, education, and estate plans account for rising living costs.",
    heroImage: "/images/calc-lcp/asset-005.webp",
    heroImageAlt: "Purchasing power and inflation planning",
    calculatorLead:
      "Enter a lump sum or future expense and an inflation rate to see illustrative future values and the real cost of waiting.",
    sidePanelTitle: "Why purchasing power matters",
    sidePanelParagraphs: [
      "A rand today buys less tomorrow. Plans that ignore inflation often look adequate on paper but fail in real life.",
      "Use this before retirement contributions, education funding, or estate liquidity conversations.",
    ],
    sidePanelBullets: [
      "CPI impact on long-term goals",
      "Nominal vs real outcomes",
      "Education and retirement planning",
      "Not a forecast guarantee",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Choose amount", description: "Enter today's lump sum or annual expense." },
      { title: "Set inflation rate", description: "Use long-term CPI assumptions for illustration." },
      { title: "Pick time horizon", description: "Years until you need the money." },
      { title: "Compare results", description: "See how much more you may need in future rands." },
    ],
    readingSections: [
      {
        heading: "Inflation and retirement income",
        paragraphs: [
          "Fixed incomes lose purchasing power every year inflation runs above zero. Living annuities, pensions, and voluntary income must be reviewed with inflation in mind.",
          "South African investors often underestimate medical and municipal cost inflation relative to headline CPI.",
        ],
      },
    ],
    faqs: [
      {
        question: "What inflation rate should I use?",
        answer:
          "Many planners use long-term CPI bands for illustration. Your adviser may stress-test higher rates for conservative planning.",
      },
      {
        question: "Is this a forecast of CPI?",
        answer:
          "No. You choose an illustrative inflation rate. Outcomes are not guaranteed and are not a SARS or SARB forecast.",
      }
    ],
    ...TAX,
  },

  "asset-006-income-tax": {
    shortTitle: "Income Tax Calculator",
    seoTitle: "Income Tax Calculator South Africa 2026/27",
    seoDescription:
      "Estimate personal income tax, rebates, and net pay using SARS 2026/27 illustrative brackets. Free South African income tax calculator. FSP 17273.",
    keywords: ["income tax calculator South Africa", "PAYE calculator", "SARS tax calculator 2026"],
    kicker: "Tax planning",
    heroTitle: "Estimate your personal income tax",
    heroSubtitle:
      "Illustrative SARS bracket calculation for salary, bonus, and retirement drawdown conversations. Not a substitute for a full assessment.",
    heroImage: "/images/calc-lcp/asset-006.webp",
    heroImageAlt: "Income tax estimation worksheet",
    calculatorLead:
      "Enter taxable income components to see illustrative tax payable, rebates, and net income using 2026/27 table logic in the tool.",
    sidePanelTitle: "How to use this diagnostic",
    sidePanelParagraphs: [
      "Marginal tax brackets affect RA contributions, voluntary investments, and drawdown decisions. Know your bracket before you optimise.",
      "Confirm final positions with your tax practitioner. This tool does not replace SARS eFiling or a formal assessment.",
    ],
    sidePanelBullets: [
      "SARS 2026/27 bracket illustration",
      "Rebates and medical credits where applicable",
      "Compare interest vs dividend tax in advice sessions",
      "Educational estimate only",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter taxable income", description: "Salary, bonus, rental, or other taxable components." },
      { title: "Add deductions if prompted", description: "Include RA or other fields the tool supports." },
      { title: "Review tax payable", description: "See marginal rate and net income illustration." },
      { title: "Plan with an adviser", description: "Use results to discuss retirement and investment structuring." },
    ],
    readingSections: [
      {
        heading: "Tax-aware retirement planning",
        paragraphs: [
          "Drawdown from living annuities, voluntary products, and interest income are taxed differently. Bracket management can extend portfolio longevity.",
          "Independent advisers integrate tax, estate, and investment decisions rather than optimising one line in isolation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are these the official SARS rates?",
        answer:
          "The tool implements illustrative 2026/27 logic. Legislation may change. Verify with SARS or your tax practitioner.",
      },
      {
        question: "Can I use this for my tax return?",
        answer:
          "No. It is an educational estimate only. File via SARS eFiling or your tax practitioner for an official assessment.",
      }
    ],
    ...TAX,
  },

  "asset-007-estate-duty": {
    shortTitle: "Estate Duty Calculator",
    seoTitle: "Estate Duty Calculator South Africa",
    seoDescription:
      "Estimate estate duty, executor fees, and liquidity needs using current abatement rules. Free South African estate duty calculator. FSP 17273.",
    keywords: ["estate duty calculator South Africa", "executor fees calculator", "estate planning calculator"],
    kicker: "Estate planning",
    heroTitle: "Estimate estate duty and executor costs",
    heroSubtitle:
      "Quantify potential duty above the R3.5 million abatement and executor fees so your family is not caught without liquidity.",
    heroImage: "/images/calc-lcp/asset-007.webp",
    heroImageAlt: "Estate planning and duty estimation",
    calculatorLead:
      "Enter net estate value, deductions, and abatement to see illustrative duty at 20% and 25% bands plus executor fees.",
    sidePanelTitle: "What to enter",
    sidePanelParagraphs: [
      "Estate duty applies to dutiable estate above the abatement. Executor fees and liquidity shortfalls are often underestimated until it is too late.",
      "Use this diagnostic before wills, trusts, and donation strategies with a qualified adviser.",
    ],
    sidePanelBullets: [
      "R3.5m abatement illustration",
      "20% and 25% duty bands",
      "Executor fee at 3.5% plus VAT",
      "Not legal advice",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Estate planning requires qualified legal and tax advice alongside financial planning."],
    howToSteps: [
      { title: "List assets", description: "Enter total estate value including property, investments, and policies." },
      { title: "Apply deductions", description: "Include liabilities and allowable deductions where relevant." },
      { title: "Review duty estimate", description: "See illustrative duty and executor fees." },
      { title: "Plan liquidity", description: "Discuss trusts, donations, and life cover with FSP 17273." },
    ],
    readingSections: [
      {
        heading: "Liquidity at death",
        paragraphs: [
          "Families often have paper wealth but insufficient cash to pay duty, executor fees, and maintenance costs while the estate is wound up.",
          "Life cover, trust structuring, and annual donations may form part of a coordinated estate plan.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the estate duty abatement?",
        answer:
          "The tool uses the R3.5 million abatement as implemented. Confirm current SARS rules with your estate planner.",
      },
      {
        question: "Is this legal advice?",
        answer:
          "No. Estate duty and wills require coordinated legal and tax advice. Use this tool to prepare questions for that review.",
      }
    ],
    ...ESTATE,
  },

  "asset-008-estate-reduction": {
    shortTitle: "Estate Reduction Strategy Calculator",
    seoTitle: "Estate Reduction Calculator | Annual Donations South Africa",
    seoDescription:
      "Model how R100k and R200k annual donations may reduce dutiable estate over time. Free estate reduction calculator. FSP 17273.",
    keywords: ["estate reduction calculator", "donation tax calculator South Africa", "annual donation limit"],
    kicker: "Estate planning",
    heroTitle: "Reduce estate duty with structured giving",
    heroSubtitle:
      "Illustrate how annual donations within SARS limits may transfer wealth during your lifetime and lower eventual duty.",
    heroImage: "/images/calc-lcp/asset-008.webp",
    heroImageAlt: "Annual donation and estate reduction planning",
    calculatorLead:
      "Enter estate value, donation amounts, and planning horizon to see illustrative reduction in dutiable estate.",
    sidePanelTitle: "Planning with donations",
    sidePanelParagraphs: [
      "Annual donations within SARS limits can transfer wealth while reducing eventual estate duty when structured correctly.",
      "Donations must align with wills, trusts, and liquidity. Professional estate planning advice is essential.",
    ],
    sidePanelBullets: [
      "R100k and R200k donation bands",
      "Long-horizon estate reduction",
      "Pairs with duty calculator",
      "Requires professional advice",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Donation strategies must be documented and tax-compliant."],
    howToSteps: [
      { title: "Enter estate value", description: "Start with current net estate estimate." },
      { title: "Set annual donations", description: "Use allowable donation amounts per beneficiary." },
      { title: "Choose horizon", description: "Years you plan to continue structured giving." },
      { title: "Review reduction", description: "See illustrative dutiable estate change, then formalise with advisers." },
    ],
    readingSections: [
      {
        heading: "Donations vs waiting for death",
        paragraphs: [
          "Transferring wealth while you are alive can help children and grandchildren when they need capital, not only when an estate is frozen.",
          "Donation tax, accrual, and trust law interact. Never implement donation plans without coordinated legal and tax review.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the annual donation limits?",
        answer:
          "The tool illustrates R100k and R200k bands as commonly used in planning. Confirm current SARS limits with your practitioner.",
      },
      {
        question: "Should I donate without advice?",
        answer:
          "No. Donation strategies must be documented and tax-compliant. Confirm SARS limits and structure with a qualified practitioner.",
      }
    ],
    ...ESTATE,
  },

  "asset-009-everest-142-income": {
    shortTitle: "Everest 14.2% Income Calculator",
    seoTitle: "Everest 14.2% Income Calculator South Africa",
    seoDescription:
      "Illustrate net monthly income from Everest 14.2% Onyx Income+ after dividend withholding tax. R100k minimum. Educational tool. FSP 17273.",
    keywords: ["Everest 14.2 calculator", "Onyx Income calculator", "high income voluntary investment"],
    kicker: "Everest Wealth",
    heroTitle: "Model Everest 14.2% Onyx Income+",
    heroSubtitle:
      "See illustrative day-one monthly income from targeted 14.2% p.a. profile after 20% dividend withholding tax on voluntary capital.",
    heroImage: "/images/calc-lcp/asset-009.webp",
    heroImageAlt: "Everest Wealth income planning illustration",
    calculatorLead:
      "Enter lump sum (R100,000 minimum) to see gross and net monthly income illustration. Targeted return, not guaranteed.",
    sidePanelTitle: "Who suits 14.2% income?",
    sidePanelParagraphs: [
      "Clients who need maximum cash flow from day one and accept no five-year loyalty bonus may prefer the 14.2% income profile over 12.8% Strategic Income.",
      "Voluntary Everest capital is illiquid. Early exit may require 120-day notice and up to 15% penalty.",
    ],
    sidePanelBullets: [
      "R100,000 minimum lump sum",
      "20% DWT on dividends",
      "Five-year term commitment",
      "Compare with 12.8% tool",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Everest voluntary products are illiquid. Suitability review required."],
    howToSteps: [
      { title: "Enter capital", description: "Minimum R100,000 voluntary lump sum." },
      { title: "Review gross income", description: "See illustrative monthly dividend profile." },
      { title: "See net after DWT", description: "20% dividend withholding tax applied in tool." },
      { title: "Compare strategies", description: "Use 12.8% vs 14.2% comparison before deciding." },
    ],
    readingSections: [
      {
        heading: "Income now vs bonus later",
        paragraphs: [
          "14.2% Onyx Income+ prioritises higher starting income. The 12.8% Strategic Income profile trades some day-one cash flow for a 10% loyalty bonus at year five.",
          "Neither is guaranteed. Category 1.8 advice is required before investing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 14.2% guaranteed?",
        answer: "No. It is a targeted return profile subject to issuer performance and risk.",
      },
      {
        question: "Can I withdraw early?",
        answer:
          "Voluntary products are illiquid. Early exit is subject to issuer discretion, 120-day notice, and possible 15% penalty.",
      },
    ],
    ...EVEREST,
  },

  "asset-010-everest-128-income": {
    shortTitle: "Everest 12.8% Income Calculator",
    seoTitle: "Everest 12.8% Strategic Income Calculator",
    seoDescription:
      "Illustrate Everest 12.8% Strategic Income including 10% loyalty bonus at year five. Net income after DWT. R100k minimum. FSP 17273.",
    keywords: ["Everest 12.8 calculator", "Strategic Income calculator", "Everest Wealth calculator"],
    kicker: "Everest Wealth",
    heroTitle: "Model Everest 12.8% Strategic Income",
    heroSubtitle:
      "Balance monthly dividends with a 10% loyalty bonus at year five. Illustrative net income after dividend withholding tax.",
    heroImage: "/images/calc-lcp/asset-010.webp",
    heroImageAlt: "Everest 12.8% Strategic Income illustration",
    calculatorLead:
      "Enter voluntary lump sum to see monthly income illustration and five-year bonus impact. Targeted returns only.",
    sidePanelTitle: "Strategic Income profile",
    sidePanelParagraphs: [
      "12.8% Strategic Income suits clients who can accept slightly lower day-one income for long-term bonus value at maturity.",
      "Discuss liquidity, tax, and suitability with FSP 17273 before committing voluntary capital.",
    ],
    sidePanelBullets: [
      "10% loyalty bonus at year 5",
      "Monthly dividend income",
      "R100,000 minimum",
      "120-day liquidity notice may apply",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Show liquidity warning on voluntary Everest products."],
    howToSteps: [
      { title: "Enter lump sum", description: "R100,000 minimum voluntary investment." },
      { title: "View monthly income", description: "Illustrative gross and net dividends." },
      { title: "See bonus at year 5", description: "10% loyalty bonus on capital illustration." },
      { title: "Book suitability review", description: "Confirm fit with independent Category 1.8 advice." },
    ],
    readingSections: [
      {
        heading: "Understanding the loyalty bonus",
        paragraphs: [
          "The bonus rewards five-year commitment. Clients who may need capital earlier should stress-test liquidity rules before investing.",
          "Dividends are taxed at 20% DWT, which may differ from your marginal income tax rate.",
        ],
      },
    ],
    faqs: [
      {
        question: "How does 12.8% compare to 14.2%?",
        answer: "Use our 12.8% vs 14.2% comparison calculator for a side-by-side five-year illustration.",
      },
      {
        question: "Is 12.8% guaranteed?",
        answer:
          "No. It is a targeted return profile subject to issuer performance and risk. Liquidity constraints and a suitability review apply.",
      }
    ],
    ...EVEREST,
  },

  "asset-011-everest-128-vs-142": {
    shortTitle: "Everest 12.8% vs 14.2% Comparison",
    seoTitle: "Everest 12.8% vs 14.2% Calculator Comparison",
    seoDescription:
      "Compare Everest 12.8% Strategic Income with 14.2% Onyx Income+ over five years on the same capital. Free comparison calculator. FSP 17273.",
    keywords: ["Everest 12.8 vs 14.2", "Everest income comparison", "which Everest product"],
    kicker: "Everest Wealth",
    heroTitle: "12.8% Strategic Income vs 14.2% Onyx Income+",
    heroSubtitle:
      "Side-by-side five-year illustration on identical capital: day-one income, bonus, and total outcome.",
    heroImage: "/images/calc-lcp/asset-011.webp",
    heroImageAlt: "Everest income product comparison",
    calculatorLead:
      "Enter the same lump sum for both profiles to compare monthly income and five-year total illustration.",
    sidePanelTitle: "Which income product?",
    sidePanelParagraphs: [
      "The trade-off is cash flow now versus bonus value later. This comparison makes that trade-off visible on the same capital base.",
      "Product selection requires suitability review, liquidity planning, and tax analysis.",
    ],
    sidePanelBullets: [
      "Same capital, two profiles",
      "Five-year horizon",
      "Bonus vs higher day-one income",
      "Not a recommendation",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter capital once", description: "Use the same lump sum for both columns." },
      { title: "Compare monthly income", description: "See day-one cash flow difference." },
      { title: "Review five-year totals", description: "Include bonus effects where applicable." },
      { title: "Discuss with adviser", description: "Choose structure based on income need and liquidity." },
    ],
    readingSections: [
      {
        heading: "Choosing between income profiles",
        paragraphs: [
          "Clients near retirement with high immediate income needs may lean toward 14.2%. Those with flexibility and five-year certainty may prefer 12.8% with bonus.",
          "Everest is one solution among many. AS Brokers remains independent and surveys the market.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which is better?",
        answer:
          "Neither is universally better. Depends on income timing, tax, liquidity, and risk tolerance. Advice is required.",
      },
      {
        question: "What is the R100,000 minimum for?",
        answer:
          "Everest voluntary income products typically require a R100,000 minimum lump sum. Confirm current terms in a suitability review.",
      }
    ],
    ...EVEREST,
  },

  "asset-012-strategic-growth": {
    shortTitle: "Everest 14.5% Strategic Growth Calculator",
    seoTitle: "Everest 14.5% Strategic Growth Calculator",
    seoDescription:
      "Project five-year maturity value for Everest 14.5% Strategic Growth. Compound growth illustration after tax. R100k minimum. FSP 17273.",
    keywords: ["Everest 14.5 calculator", "Strategic Growth calculator", "Everest compound growth"],
    kicker: "Everest Wealth",
    heroTitle: "Model Everest 14.5% Strategic Growth",
    heroSubtitle:
      "Pure compounding with no monthly withdrawals. Returns accumulate over five years and pay at maturity.",
    heroImage: "/images/calc-lcp/asset-012.webp",
    heroImageAlt: "Everest Strategic Growth compound illustration",
    calculatorLead:
      "Enter lump sum to see five-year maturity illustration with growth taxed at maturity per tool assumptions.",
    sidePanelTitle: "Growth without income",
    sidePanelParagraphs: [
      "Strategic Growth suits clients who do not need monthly income and want capital working until maturity.",
      "Illiquid five-year commitment. Early exit subject to issuer rules.",
    ],
    sidePanelBullets: [
      "14.5% targeted compound p.a.",
      "No monthly withdrawals",
      "Tax on growth at maturity",
      "R100,000 minimum",
    ],
    fiduciaryNotes: [...FIDUCIARY, "Five-year illiquid commitment. Early exit penalties may apply."],
    howToSteps: [
      { title: "Enter capital", description: "R100,000 minimum voluntary lump sum." },
      { title: "Review compound path", description: "See illustrative growth to maturity." },
      { title: "Note tax at maturity", description: "20% DWT on growth per tool logic." },
      { title: "Compare income products", description: "Use Income vs Growth comparison if you need cash flow." },
    ],
    readingSections: [
      {
        heading: "When growth beats income",
        paragraphs: [
          "Clients still earning employment income may not need dividends today. Compounding can be tax-efficient relative to frequent drawdowns.",
          "Match product choice to your income timeline and emergency liquidity needs.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I draw income from Strategic Growth?",
        answer: "This profile is designed for compounding without monthly withdrawals. Income products are separate.",
      },
      {
        question: "Is 14.5% guaranteed?",
        answer:
          "No. Strategic Growth uses a targeted return profile. Capital is typically committed for five years with liquidity constraints.",
      }
    ],
    ...EVEREST,
  },

  "asset-013-everest-income-vs-growth": {
    shortTitle: "Everest Income vs Growth Comparison",
    seoTitle: "Everest Income vs Growth Calculator Comparison",
    seoDescription:
      "Compare Everest 12.8% income, 14.2% income, and 14.5% growth strategies side by side. Free three-way calculator. FSP 17273.",
    keywords: ["Everest income vs growth", "Everest comparison calculator", "Everest Wealth strategies"],
    kicker: "Everest Wealth",
    heroTitle: "Compare income and growth strategies",
    heroSubtitle:
      "Three Everest-style profiles on one screen: monthly income, bonus effects, and growth maturity outcomes.",
    heroImage: "/images/calc-lcp/asset-013.webp",
    heroImageAlt: "Everest income versus growth comparison",
    calculatorLead:
      "Enter capital to compare 12.8% income, 14.2% income, and 14.5% growth illustrations together.",
    sidePanelTitle: "Full strategy selection",
    sidePanelParagraphs: [
      "Most clients need to see income now, bonus trade-offs, and pure growth in one view before they can choose.",
      "This is the education step before a suitability call with FSP 17273.",
    ],
    sidePanelBullets: [
      "Three strategies compared",
      "Income and maturity outcomes",
      "Educational illustration",
      "Liquidity warnings apply",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter lump sum", description: "Same capital across all three strategies." },
      { title: "Compare income lines", description: "12.8% and 14.2% monthly illustrations." },
      { title: "Review growth maturity", description: "14.5% compound outcome at five years." },
      { title: "Book advice", description: "Confirm suitability and liquidity with an adviser." },
    ],
    readingSections: [
      {
        heading: "Education before product selection",
        paragraphs: [
          "Everest voluntary products are unlisted preference share structures with targeted returns, not bank deposits.",
          "Independent advisers explain risk, liquidity, and tax before any application is submitted.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does AS Brokers only recommend Everest?",
        answer:
          "No. We are independent Category 1.8 FSP 17273 and survey the market. Everest is one solution where appropriate.",
      },
      {
        question: "Are these returns guaranteed?",
        answer:
          "No. All figures are targeted structural profiles for education. Suitability, liquidity, and tax review are required before investing.",
      }
    ],
    ...EVEREST,
  },

  "asset-014-living-annuity": {
    shortTitle: "Living Annuity Income Calculator",
    seoTitle: "Living Annuity Calculator South Africa",
    seoDescription:
      "Model living annuity income in the 2.5% to 17.5% drawdown band. Free SA calculator with Amethyst-style notes. Educational only. FSP 17273.",
    keywords: [
      "living annuity calculator",
      "retirement annuity drawdown",
      "Amethyst living annuity calculator",
      "2.5% to 17.5% drawdown",
    ],
    kicker: "Living annuity",
    heroTitle: "Model living annuity drawdown income",
    heroSubtitle:
      "Estimate income from pension, RA, or preservation capital using illustrative growth and drawdown rates in the regulated 2.5% to 17.5% band.",
    heroImage: "/images/calc-lcp/asset-014.webp",
    heroImageAlt: "Living annuity income planning",
    calculatorLead:
      "Enter capital, a drawdown percentage between 2.5% and 17.5%, and growth assumptions to see illustrative monthly income and sustainability notes.",
    sidePanelTitle: "Post-retirement capital",
    sidePanelParagraphs: [
      "Retirees with pension, RA, or preservation funds often face living annuity decisions at retirement. Drawdown rate drives income and longevity.",
      "South African living annuities generally allow annual drawdowns between 2.5% and 17.5%. Pair with Life of Capital to stress-test whether income lasts.",
    ],
    sidePanelBullets: [
      "2.5% to 17.5% drawdown band",
      "Inflation and growth stress-tests",
      "Retired client pathway",
      "Not a product quote",
    ],
    fiduciaryNotes: [
      ...FIDUCIARY,
      "Living annuity drawdowns typically sit between 2.5% and 17.5% a year. Confirm product rules before acting.",
      "Amethyst and other structured yield ideas may complement a living annuity where suitable — liquidity and suitability rules apply.",
    ],
    howToSteps: [
      { title: "Enter annuity capital", description: "Lump sum moving into living annuity." },
      {
        title: "Set drawdown %",
        description: "Use a rate in the 2.5% to 17.5% band. Real products apply specific annual review rules.",
      },
      { title: "Add growth assumption", description: "Stress-test conservative and moderate returns." },
      { title: "Review sustainability", description: "Use Life of Capital tool for longevity check." },
    ],
    readingSections: [
      {
        heading: "Drawdown decisions at retirement",
        paragraphs: [
          "Choosing drawdown is choosing how much future income you keep. Too high early on can destroy capital in a bad sequence of returns.",
          "Amethyst and structured yield solutions may complement living annuities where suitable. Liquidity constraints and a suitability review apply. Advice is essential.",
        ],
      },
    ],
    faqs: [
      {
        question: "What drawdown band applies to living annuities?",
        answer:
          "South African living annuities generally allow annual drawdowns between 2.5% and 17.5%. This tool illustrates scenarios inside that band; confirm your product’s rules with an adviser.",
      },
      {
        question: "Is Amethyst the same as a living annuity?",
        answer:
          "No. Amethyst-style structured yield may complement retirement income where suitable. Living annuities have their own regulatory drawdown band, liquidity, and tax treatment. Suitability review required.",
      },
      {
        question: "Does this replace a product quote?",
        answer:
          "No. Results are educational only. Personal advice requires a needs analysis with AS Brokers CC (FSP 17273).",
      },
    ],
    ...RETIREMENT,
  },

  "asset-015-average-clause": {
    shortTitle: "Average Clause Calculator",
    seoTitle: "Average Clause Calculator South Africa | Underinsurance",
    seoDescription:
      "See how underinsurance reduces insurance claims when the average clause applies. Free average clause calculator for home and business assets. FSP 17273.",
    keywords: ["average clause calculator", "underinsurance calculator", "insurance claim reduction"],
    kicker: "Insurance & risk",
    heroTitle: "How underinsurance cuts your claim",
    heroSubtitle:
      "Illustrate claim reduction when sum insured is below replacement value. Essential for home, contents, and commercial property.",
    heroImage: "/images/calc-lcp/asset-015.webp",
    heroImageAlt: "Home insurance underinsurance review",
    calculatorLead:
      "Enter replacement value, sum insured, and claim amount to see illustrative payment after average clause application.",
    sidePanelTitle: "The average clause",
    sidePanelParagraphs: [
      "Insurers may reduce claims proportionally when you are underinsured. The average clause catches families and businesses off guard after a loss.",
      "Use this before renewing property cover with your broker.",
    ],
    sidePanelBullets: [
      "Home and contents education",
      "Commercial property risk",
      "Sum insured vs replacement value",
      "Book a risk review",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter replacement value", description: "True cost to replace the asset today." },
      { title: "Enter sum insured", description: "What your policy schedule shows." },
      { title: "Add claim amount", description: "Loss value you are claiming for." },
      { title: "See reduced payout", description: "Illustrative payment after average clause." },
    ],
    readingSections: [
      {
        heading: "Why sums insured drift",
        paragraphs: [
          "Building costs, contents inflation, and renovations push replacement values up while policies stay static. Annual reviews prevent average clause shocks.",
          "AS Brokers reviews short-term and commercial cover across multiple insurers including Santam, Old Mutual, and Bryte.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this apply to all policies?",
        answer:
          "Average clause mechanics depend on policy wording. This tool educates on common principles. Review your schedule with your broker.",
      },
      {
        question: "Does this assess my claim?",
        answer:
          "No. It shows how the average clause can reduce a claim when underinsured. Ask your broker to review sums insured.",
      }
    ],
    ...INSURANCE,
  },

  "asset-016-growth-comparison": {
    shortTitle: "Power of Growth Calculator",
    seoTitle: "Investment Growth Calculator South Africa | Power of Growth",
    seoDescription:
      "Project future value of lump sum plus monthly contributions at your chosen growth rate. Free compound growth calculator. FSP 17273.",
    keywords: ["investment growth calculator", "compound growth calculator South Africa", "wealth calculator"],
    kicker: "Wealth building",
    heroTitle: "See the power of compound growth",
    heroSubtitle:
      "Project how lump sums and monthly contributions may grow over time at an illustrative return rate.",
    heroImage: "/images/calc-lcp/asset-016.webp",
    heroImageAlt: "Wealth building and compound growth illustration",
    calculatorLead:
      "Enter starting capital, monthly contributions, growth rate, and years to see illustrative future value.",
    sidePanelTitle: "Compound growth education",
    sidePanelParagraphs: [
      "Small contribution increases early in a career often matter more than large lump sums late in life because of compounding time.",
      "Use realistic return assumptions and discuss tax wrappers with an adviser.",
    ],
    sidePanelBullets: [
      "Lump sum plus contributions",
      "Multi-year projection",
      "Life stage wealth building",
      "Not a performance guarantee",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Enter starting amount", description: "Current investments or lump sum." },
      { title: "Add monthly contributions", description: "Regular savings into the plan." },
      { title: "Set growth and years", description: "Illustrative return and time horizon." },
      { title: "Review projection", description: "Use as motivation, not a promise of returns." },
    ],
    readingSections: [
      {
        heading: "Time beats timing",
        paragraphs: [
          "Consistent contributions through volatile markets often outperform waiting for the perfect entry point.",
          "Tax-free savings, retirement annuities, and voluntary products each have different tax and liquidity rules.",
        ],
      },
    ],
    faqs: [
      {
        question: "What growth rate should I assume?",
        answer:
          "Use conservative bands for planning. Historical returns do not guarantee future performance.",
      },
      {
        question: "Are growth rates guaranteed?",
        answer:
          "No. You choose an illustrative rate. Markets, fees, and tax change real outcomes. Discuss assumptions with FSP 17273.",
      }
    ],
    ...WEALTH,
  },

  "asset-017-personal-goal": {
    shortTitle: "Personal Goal Growth Calculator",
    seoTitle: "Personal Financial Goal Calculator South Africa",
    seoDescription:
      "Set a financial goal, target date, and see required growth and contributions month by month. Free personal goal calculator. FSP 17273.",
    keywords: ["financial goal calculator", "savings goal calculator", "personal goal growth rate"],
    kicker: "Wealth building",
    heroTitle: "Hit your personal financial goal on time",
    heroSubtitle:
      "Set a target amount and date. See the illustrative growth rate and contribution path required to get there.",
    heroImage: "/images/calc-lcp/asset-017.webp",
    heroImageAlt: "Personal financial goal planning",
    calculatorLead:
      "Enter goal amount, target date, starting capital, and contributions to see required growth and month-by-month illustration.",
    sidePanelTitle: "Goal-based planning",
    sidePanelParagraphs: [
      "Goals like education, property deposits, or retirement capital are easier to fund when you know the required return and contribution discipline.",
      "This tool produces a planning spreadsheet mindset before product selection.",
    ],
    sidePanelBullets: [
      "Target date planning",
      "Required return illustration",
      "Contribution schedule view",
      "Pairs with Retirement Growth tool",
    ],
    fiduciaryNotes: FIDUCIARY,
    howToSteps: [
      { title: "Name your goal", description: "Enter target capital and deadline." },
      { title: "Add what you have", description: "Current savings and monthly contributions." },
      { title: "See required rate", description: "Illustrative growth needed to hit the goal." },
      { title: "Adjust inputs", description: "Extend date or raise contributions if rate looks unrealistic." },
    ],
    readingSections: [
      {
        heading: "Goals before products",
        paragraphs: [
          "Product-led advice often fails because the goal was never defined. Start with the outcome, then choose wrappers tax-efficiently.",
          "FSP 17273 advisers help align goals across retirement, estate, and risk cover.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can this plan my retirement?",
        answer:
          "Yes as an educational step. Pair with Retirement Reality Check and Growth Rate calculators for retirement-specific planning.",
      },
      {
        question: "Is this a savings product quote?",
        answer:
          "No. It is an educational goal planner. Product selection and contributions need a personal advice process.",
      }
    ],
    ...WEALTH,
  },
};

function buildConfig(entry: CalculatorRegistryEntry): CalculatorPageConfig {
  const content = PAGES[entry.id];
  if (!content) {
    throw new Error(`Missing page content for calculator ${entry.id}`);
  }
  const { shortTitle, faqs, ...rest } = content;
  return {
    id: entry.id,
    path: calculatorPagePath(entry.id),
    assetCode: entry.assetCode,
    calculatorSrc: entry.embedPath,
    calculatorTitle: shortTitle,
    /** Page-authored FAQs only — VisibleFaqSection and PageJsonLd share this list (no pad-to-6). */
    faqs,
    ...rest,
  };
}

export function getCalculatorPageConfig(id: string): CalculatorPageConfig | undefined {
  const entry = getCalculatorById(id);
  if (!entry) return undefined;
  if (!PAGES[entry.id]) return undefined;
  return buildConfig(entry);
}

export function getAllCalculatorPageConfigs(): CalculatorPageConfig[] {
  return CALCULATOR_REGISTRY.map(buildConfig);
}

export const CALCULATOR_PAGE_SLUGS = CALCULATOR_REGISTRY.map((e) => e.id);
