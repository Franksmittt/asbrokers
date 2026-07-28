import { RetirementPlanningPageView } from "@/components/retirement-planning/RetirementPlanningPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Retirement Planning: Close the Capital Gap | AS Brokers";
const PAGE_DESCRIPTION =
  "Most people discover the retirement gap too late. AS Brokers CC (FSP 17273) helps you quantify the gap, stress-test your timeline, and structure a plan after a needs analysis. Run the numbers first, then let's talk.";

const planningFAQs = [
  {
    question: "Who is this retirement planning page for?",
    answer:
      "South African professionals still in the accumulation phase who want educational information on capital, timeline, and growth concepts before they stop working. Content is factual information only, not personalised advice.",
  },
  {
    question: "What is the Retirement Survival Blueprint?",
    answer:
      "A guided 5-step educational walkthrough that introduces the Financial Freedom Score™ concept and common planning questions. It is illustrative only and is not a substitute for regulated advice from FSP 17273.",
  },
  {
    question: "How does the Two-Pot system affect my retirement planning?",
    answer:
      "New contributions are split between a Savings Pot (limited annual access, taxed at marginal rates) and a Retirement Pot (preserved for annuity purchase). Pre-August 2024 balances sit in a Vested Pot under prior rules. Speak to an authorised adviser before changing contributions or withdrawing.",
  },
  {
    question: "What is the 2026 retirement annuity tax deduction limit?",
    answer:
      "From 1 March 2026 the annual deduction ceiling for qualifying retirement contributions rises to R430,000 (from R350,000), still within the 27.5% of remuneration or taxable income framework. Verify the current SARS position for your tax year with a qualified professional.",
  },
  {
    question: "What does Category 1.8 mean for AS Brokers clients?",
    answer:
      "Category 1.8 authorisation includes advice on certain securities and instruments, which may include unlisted instruments beyond a standard unit-trust shelf. AS Brokers CC (FSP 17273) discusses liquidity, term, tax treatment, and risks during advice. Licence category does not mean every product is appropriate for every client.",
  },
  {
    question: "Do the online calculators constitute financial advice?",
    answer:
      "No. Calculators on asbrokers.co.za are illustrative and educational only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Personal advice requires a needs analysis with FSP 17273.",
  },
];

export const metadata = buildPageMetadata({
  path: "/retirement-planning",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "pre-retirement planning South Africa",
    "retirement planning South Africa",
    "Financial Freedom Score",
    "Retirement Survival Blueprint",
    "Two-Pot retirement system",
    "retirement annuity tax deduction 2026",
    "Category 1.8 FSP",
    "FSP 17273",
    "Krugersdorp financial adviser",
  ],
});

export default function RetirementPlanningPage() {
  return (
    <>
      <link rel="preload" as="image" href="/images/retirement-planning-hero-16x9-480.webp" media="(max-width: 768px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/images/retirement-planning-hero-16x9-960.webp" media="(min-width: 769px)" fetchPriority="high" />
      <PageJsonLd
        path="/retirement-planning"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={planningFAQs}
        service={{
          name: "Retirement planning education and advice services",
          description: PAGE_DESCRIPTION,
          serviceType: "Retirement planning",
        }}
      />
      <RetirementPlanningPageView faqs={planningFAQs} />
    </>
  );
}
