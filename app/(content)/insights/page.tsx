import { InsightsHubPageView } from "@/components/insights/InsightsHubPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getInsightFeed } from "@/lib/insights/feed";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Financial Education & Fiduciary Insights | AS Brokers";
const PAGE_DESCRIPTION =
  "Articles and guides on retirement planning, estate duty, Everest Wealth, semigration, and financial planning for South Africans. Educational content from FSP 17273.";

const insightsFAQs = [
  {
    question: "Are these articles personalised financial advice?",
    answer:
      "No. Insights and guides on this page are educational only. For advice tailored to your circumstances, book a consultation with a qualified AS Brokers adviser (FSP 17273).",
  },
  {
    question: "How often is new content published?",
    answer:
      "We add articles on retirement, investments, insurance, and estate planning as market conditions and client questions evolve. Subscribe to the newsletter for occasional updates.",
  },
];

export const metadata = buildPageMetadata({
  path: "/insights",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default async function InsightsPage() {
  const articles = await getInsightFeed();

  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/insights"]} />
      <PageJsonLd
        path="/insights"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={insightsFAQs}
      />
      <InsightsHubPageView articles={articles} faqs={insightsFAQs} />
    </>
  );
}
