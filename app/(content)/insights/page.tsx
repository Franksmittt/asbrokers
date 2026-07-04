import Link from "next/link";
import { WarmHero, WarmPageWithFooter, WarmSection } from "@/components/warm/WarmShell";
import { getInsightFeed } from "@/lib/insights/feed";
import { InsightsFeedFilter } from "@/components/insights/InsightsFeedFilter";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/insights",
  title: "Insights & Resources",
  description:
    "Articles and guides on retirement planning, estate duty, Everest Wealth, semigration, and financial planning for South Africans. Educational content from FSP 17273.",
});

export default async function InsightsPage() {
  const articles = await getInsightFeed();
  const heroImage = getPrimaryPageImage("/insights") ?? "/images/insights-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <WarmHero
        kicker="Resources"
        title="Insights & Education"
        description="Articles, guides, and tools to help you make informed decisions about retirement, estate planning, and wealth."
        imageSrc={heroImage}
        maxWidth="4xl"
      >
        <p className="mt-4 text-sm text-white/80">
          Featured:{" "}
          <Link
            href="/insights/semigration-retirement"
            prefetch={false}
            className="font-medium text-cinematic-teal hover:underline"
          >
            Semigration & retirement villages
          </Link>
        </p>
      </WarmHero>

      <WarmSection className="pb-24">
        <InsightsFeedFilter articles={articles} />
      </WarmSection>
    </WarmPageWithFooter>
  );
}
