import { InsuranceHubPageView } from "@/components/insurance/InsuranceHubPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Insurance & Risk Protection | Wealth Protection for South Africans";
const PAGE_DESCRIPTION =
  "Independent insurance and risk architecture for South Africans. Medical aid, life cover, business protection, and short-term assets. FSP 17273.";

const insuranceFAQs = [
  {
    question: "Why start with a life event instead of a product list?",
    answer:
      "High-net-worth clients rarely need a generic quote form first. We segment by what you are protecting (health, income, business, or assets), then match education, calculators, and advice to that need.",
  },
  {
    question: "What does the Average Clause Calculator show?",
    answer:
      "It illustrates how underinsurance on home or commercial property can reduce a claim when insurers apply the average clause. Use it to stress-test whether your sums insured reflect true replacement value.",
  },
  {
    question: "Are AS Brokers tied to one insurer?",
    answer:
      "No. We are an independent Category 1.8 FSP (17273) and review solutions across the market, including partners such as Santam, Old Mutual, and Bryte, to engineer cover that pays out when you need it.",
  },
];

export const metadata = buildPageMetadata({
  path: "/insurance",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function InsuranceHubPage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/insurance"]} variant="split" />
      <PageJsonLd
        path="/insurance"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={insuranceFAQs}
        service={{
          name: "Insurance & Risk Protection by AS Brokers CC",
          description:
            "Independent insurance broking, medical aid structuring, life cover, business risk, and short-term asset protection for Krugersdorp and the West Rand.",
          serviceType:
            "Insurance Broking, Medical Aid Advice, Life Insurance, Business Risk, Short-Term Insurance",
        }}
      />
      <InsuranceHubPageView faqs={insuranceFAQs} />
    </>
  );
}
