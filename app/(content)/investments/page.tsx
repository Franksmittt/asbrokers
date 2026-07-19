import { InvestmentsPageView } from "@/components/investments/InvestmentsPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Wealth Engineering Beyond the Unit Trust | AS Brokers";
const PAGE_DESCRIPTION =
  "High earners lose yield to market volatility and marginal tax on interest. Independent Category 1.8 wealth engineering for voluntary capital, targeted profiles, DWT architecture, education before advice. FSP 17273.";

const investmentsFAQs = [
  {
    question: "How are unlisted preference share dividends taxed in South Africa?",
    answer:
      "Dividends on many voluntary preference-share structures are typically subject to 20% Dividends Withholding Tax (DWT). For high earners, that can be more tax-efficient than interest taxed at marginal income tax rates (up to 45%). Tax treatment does not remove liquidity risk or convert a targeted return profile into a guarantee. Confirm the current SARS position with a qualified professional.",
  },
  {
    question: "What is the difference between voluntary capital products and a living annuity?",
    answer:
      "Voluntary Everest-style products are typically funded with after-tax capital and follow product-specific liquidity, notice, and DWT rules. A living annuity (such as Amethyst) wraps retirement-fund capital under Regulation 28 with legislated drawdown bounds of 2.5%–17.5%. They are different legal and tax wrappers and should not be conflated.",
  },
  {
    question: "What does a Category 1.8 FSP licence mean?",
    answer:
      "Category 1.8 authorisation includes advice on certain securities and instruments (including shares) beyond a standard unit-trust shelf. AS Brokers CC (FSP 17273) can evaluate and advise on appropriate unlisted structures where suitable, while remaining an independent adviser surveying the market.",
  },
  {
    question: "Are Everest Wealth returns guaranteed?",
    answer:
      "No. Figures such as 12.8%, 14.2%, and 14.5% are targeted return profiles based on underlying private structures, not guarantees. Voluntary capital is illiquid: a 120-day notice period and up to a 15% early exit penalty may apply, with a R100,000 minimum on voluntary products.",
  },
  {
    question: "Does AS Brokers only recommend Everest products?",
    answer:
      "No. As an independent Category 1.8 FSP (17273), we structure advice around your goals and survey the market. Everest is one solution we can access where appropriate, not the only option, and never a default for every client.",
  },
  {
    question: "Do the online investment calculators constitute financial advice?",
    answer:
      "No. Calculators on asbrokers.co.za are illustrative and educational only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Book FSP 17273 for advice tailored to your circumstances.",
  },
];

export const metadata = buildPageMetadata({
  path: "/investments",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "independent investment strategies South Africa",
    "wealth building South Africa",
    "Category 1.8 FSP",
    "Everest Wealth preference shares",
    "DWT vs marginal tax",
    "living annuity income strategies",
    "tax-free investments",
    "FSP 17273",
    "Krugersdorp financial adviser",
  ],
});

export default function InvestmentsPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/investments-hero-16x9-480.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/investments-hero-16x9-960.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <PageJsonLd
        path="/investments"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={investmentsFAQs}
        service={{
          name: "Independent wealth engineering & investment strategies",
          description: PAGE_DESCRIPTION,
          serviceType: "Investment advice",
        }}
      />
      <InvestmentsPageView faqs={investmentsFAQs} />
    </>
  );
}
