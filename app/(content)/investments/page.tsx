import { InvestmentsPageView } from "@/components/investments/InvestmentsPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Investments Hub | Smarter Investing for Every Life Stage";
const PAGE_DESCRIPTION =
  "Independent investment guidance for South Africans: wealth building before retirement, income strategies after retirement, and Everest Wealth education. FSP 17273.";

const investmentsFAQs = [
  {
    question: "What is the difference between before and after retirement investing?",
    answer:
      "Before retirement, the focus is typically on growth, tax efficiency, and compounding through vehicles such as tax-free savings, retirement annuities, and voluntary capital products. After retirement, the priority shifts to sustainable income, drawdown management, and capital preservation.",
  },
  {
    question: "What are Everest Wealth voluntary products?",
    answer:
      "Everest voluntary products are unlisted preference share structures with targeted return profiles (e.g. 12.8%, 14.2%, 14.5% p.a.), a R100,000 minimum, five-year terms, and liquidity constraints including 120-day notice and a potential 15% early exit penalty.",
  },
  {
    question: "Does AS Brokers only recommend Everest products?",
    answer:
      "No. As an independent Category 1.8 FSP (17273), we survey the market and structure advice around your goals. Everest is one solution we can access where appropriate — not the only option.",
  },
];

export const metadata = buildPageMetadata({
  path: "/investments",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "investments South Africa",
    "wealth building",
    "Everest Wealth",
    "independent financial adviser",
    "FSP 17273",
    "Category 1.8",
  ],
});

export default function InvestmentsPage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/investments"]} variant="split" />
      <PageJsonLd
        path="/investments"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={investmentsFAQs}
      />
      <InvestmentsPageView faqs={investmentsFAQs} />
    </>
  );
}
