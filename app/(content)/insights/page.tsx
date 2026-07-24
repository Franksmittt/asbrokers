import { InsightsHubPageView } from "@/components/insights/InsightsHubPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getInsightFeed } from "@/lib/insights/feed";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Insights library | Educational guides | AS Brokers";
const PAGE_DESCRIPTION =
  "Educational guides from AS Brokers CC (FSP 17273) on Two-Pot, estate duty, tax drag, and risk concepts. General information only under FAIS Section 1(3)(a). Education before advice.";

const insightsFAQs = [
  {
    question: "Are these articles personalised financial advice?",
    answer:
      "No. Insights and guides are educational only. Under the FAIS General Code of Conduct, personalised advice requires a proper needs analysis with a licensed representative. Book a consultation with FSP 17273 for advice on your circumstances.",
  },
  {
    question: "How often is new content published?",
    answer:
      "We publish when legislation, budgets, or client questions warrant it, for example National Budget updates or SARB Monetary Policy Committee decisions. Subscribe to the newsletter for occasional updates.",
  },
  {
    question: "How do topics relate to the service hubs?",
    answer:
      "Topic filters help you find articles on retirement, investments, insurance, or estate planning. For structured educational hubs, use /retirement-planning, /investments, /insurance, and /estate-planning.",
  },
  {
    question: "What is the newsletter for?",
    answer:
      "A soft subscription for occasional educational notes. It is separate from booking advice and does not enrol you in a sales sequence disguised as education.",
  },
  {
    question: "Where are the calculators?",
    answer:
      "Interactive tools are listed in the calculator handoff on this page and in the full /calculators library. They are illustrative only and do not constitute advice.",
  },
  {
    question: "Who authors this library?",
    answer:
      "Content is published under AS Brokers CC (FSP 17273), an independent Category 1.8 provider based in Krugersdorp. Educational framing relies on legislation and planning frameworks, not generic SEO filler.",
  },
];

export const metadata = buildPageMetadata({
  path: "/insights",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "financial education South Africa",
    "educational insights",
    "retirement planning articles",
    "estate planning guides",
    "FAIS Section 1(3)(a)",
    "FSP 17273",
  ],
});

export default async function InsightsPage() {
  const articles = await getInsightFeed();

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/insights-hero-16x9-480.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/insights-hero-16x9-960.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <PageJsonLd
        path="/insights"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={insightsFAQs}
      />
      <InsightsHubPageView articles={articles} faqs={insightsFAQs} />
    </>
  );
}
