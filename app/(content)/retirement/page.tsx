import { RetirementPageView } from "@/components/retirement/RetirementPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Retirement Planning | Peace of Mind for South Africans";
const PAGE_DESCRIPTION =
  "Retirement planning for South Africans, whether you are years away or already retired. Calculators, living annuities, and independent advice. FSP 17273.";

const retirementFAQs = [
  {
    question: "How much capital do I need for retirement?",
    answer:
      "The amount depends on your target monthly income, inflation, investment growth, tax rate, and how long you expect to live. Use our Retirement Reality Calculator to get an estimate based on your own inputs.",
  },
  {
    question: "What if I am already retired and worried my money will not last?",
    answer:
      "Start with our Life of Capital Calculator to model how long your savings may last. Then explore living annuity options and speak with an adviser about sustainable drawdown strategies.",
  },
  {
    question: "What is the Everest Amethyst Living Annuity?",
    answer:
      "Amethyst is a living annuity wrapper for pension, provident, preservation, and RA capital. It targets a structured net return profile (around 10.2% p.a.) with drawdown flexibility between 2.5% and 17.5% of capital.",
  },
];

export const metadata = buildPageMetadata({
  path: "/retirement",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function RetirementPage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/retirement"]} variant="split" />
      <PageJsonLd
        path="/retirement"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={retirementFAQs}
      />
      <RetirementPageView faqs={retirementFAQs} />
    </>
  );
}
