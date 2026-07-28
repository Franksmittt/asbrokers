import { ProviderPanelPageView } from "@/components/providers/ProviderPanelPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Our Services & Provider Panel | AS Brokers | FSP 17273";
const PAGE_DESCRIPTION =
  "The insurers, medical schemes, investment platforms, and fiduciary partners AS Brokers CC (FSP 17273) works with: business insurance, personal cover, retirement, investments, wills, and estates. Factual panel disclosure; personal advice after a needs analysis.";

const providerFAQs = [
  {
    question: "Does listing a provider mean you recommend it?",
    answer:
      "No. Provider names indicate contractual or placement capability only. Under the FAIS Act, a website cannot recommend a product for you; which provider and product fits your situation is determined during a documented needs analysis with an authorised representative of FSP 17273.",
  },
  {
    question: "Why do you work with so many providers?",
    answer:
      "Because we are an independent broker, not a tied agent. Different insurers and platforms price different risks and needs differently. A panel lets us survey the market on your behalf instead of fitting you to one product house's shelf.",
  },
  {
    question: "Can you move my existing policies or investments to a provider on this panel?",
    answer:
      "Often, yes, after reviewing what you have. We compare your existing cover or portfolio against alternatives and only recommend a change where the needs analysis supports it. Cancelling cover before replacement cover is confirmed is something we specifically help clients avoid.",
  },
  {
    question: "What does Category 1.8 mean on this page?",
    answer:
      "FSCA Category 1.8 (Securities and Instruments: Shares) authorisation includes advice on certain unlisted securities. Unlisted instruments carry significant liquidity and valuation risks, so product terms are discussed only during advice; we do not publish return targets on this website.",
  },
  {
    question: "Is gap cover the same as medical aid?",
    answer:
      "No. Only registered medical schemes (such as Discovery Health and Momentum Health) may be described as medical aid. Gap cover, such as Turnberry, is short-term insurance under the Demarcation Regulations and requires active medical scheme membership.",
  },
  {
    question: "Who handles wills and deceased estates?",
    answer:
      "We facilitate will drafting and estate administration with fiduciary partners including Electus Trust and Capital Legacy. Admitted attorneys and appointed executors handle the legal instruments; AS Brokers coordinates the financial and cover side.",
  },
];

export const metadata = buildPageMetadata({
  path: "/providers",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "insurance provider panel South Africa",
    "independent broker providers",
    "business insurance providers",
    "medical aid brokers Discovery Momentum",
    "Category 1.8 FSP",
    "FSP 17273",
  ],
});

export default function ProvidersPage() {
  return (
    <>
      <PageJsonLd
        path="/providers"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={providerFAQs}
        service={{
          name: "Independent broking across a contracted provider panel",
          description: PAGE_DESCRIPTION,
          serviceType:
            "Insurance Broking, Medical Aid, Investments, Retirement Planning, Estate Administration",
        }}
      />
      <ProviderPanelPageView faqs={providerFAQs} />
    </>
  );
}
