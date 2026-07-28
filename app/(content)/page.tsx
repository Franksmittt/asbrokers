import { Home4Hero } from "@/components/home4/Home4Hero";
import { Home4GoalCards } from "@/components/home4/Home4GoalCards";
import { Home4BelowFoldRest } from "@/components/home4/Home4BelowFoldRest";
import { HomeChatBar } from "@/components/home/HomeChatBar";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";
import type { FAQItem } from "@/lib/seo";

const PAGE_TITLE = "Business Insurance Brokers | AS Brokers | FSP 17273";
const PAGE_DESCRIPTION =
  "AS Brokers CC (FSP 17273) is an independent business insurance broker in Krugersdorp. We survey the commercial market, run a proper needs analysis, and place structured cover for business owners across Gauteng. Retirement, estate, and medical advice also available.";

const HOME_FAQS: FAQItem[] = [
  {
    question: "What does a business insurance broker actually do?",
    answer:
      "An independent business insurance broker surveys the commercial market on your behalf, comparing insurers like Santam, Bryte, and King Price, to find cover that fits your specific risks and budget. AS Brokers (FSP 17273) runs a needs analysis, recommends and places the cover, handles documentation, and stands with you at every annual review and claim. Unlike a direct insurer, we are not tied to any single product house.",
  },
  {
    question: "Can you review our existing commercial cover?",
    answer:
      "Yes. A Business Risk Review is the starting point for most of our commercial clients. We examine your current policies for gaps, underinsurance, and overlap, then compare the market to see whether better structure or pricing is available. There is no obligation to change. Contact AS Brokers CC or start a Business Risk Review online.",
  },
  {
    question: "Do you only handle business insurance, or can you help with personal cover too?",
    answer:
      "We cover both sides of a business owner's life. Alongside commercial cover (property, liability, business interruption, fleet), we structure personal short-term insurance, life and disability cover, medical aid, gap cover, retirement planning, and estate planning. Everything sits with one independent, authorised FSP (17273).",
  },
];

export const metadata = buildPageMetadata({
  path: "/",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "business insurance broker Krugersdorp",
    "commercial insurance South Africa",
    "independent insurance broker Gauteng",
    "AS Brokers FSP 17273",
    "business risk review",
    "Category 1.8 FSP",
    "short-term insurance broker West Rand",
  ],
});

export default function HomePage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/"]} />
      <PageJsonLd
        path="/"
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
        }}
        primaryImagePath="/opengraph-image"
        faqs={HOME_FAQS}
      />
      <Home4Hero />
      <Home4GoalCards />
      {/* SSR immediately, do not gate on click/idle (same bug as calculators hub). */}
      <Home4BelowFoldRest />
      {/* Visible chat shell; heavy FloatingChat loads on focus/submit only. */}
      <HomeChatBar />
    </>
  );
}
