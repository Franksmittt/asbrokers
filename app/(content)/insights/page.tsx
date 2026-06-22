import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";
import { getInsightFeed } from "@/lib/insights/feed";
import { InsightsFeedFilter } from "@/components/insights/InsightsFeedFilter";

export const metadata = buildPageMetadata({
  path: "/insights",
  title: "Insights & Resources",
  description:
    "Articles and guides on retirement planning, estate duty, Everest Wealth, semigration, and financial planning for South Africans. Educational content from FSP 17273.",
});

export default async function InsightsPage() {
  const articles = await getInsightFeed();

  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-10">
        <div className={PAGE_CONTENT_MAX}>
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Resources</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Insights & Education
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto md:mx-0">
              Articles, guides, and tools to help you make informed decisions about retirement, estate planning, and wealth.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              Featured:{" "}
              <Link href="/insights/semigration-retirement" prefetch={false} className="text-cinematic-teal hover:underline">
                Semigration & retirement villages
              </Link>
            </p>
          </div>
          <div className="mt-8">
            <PageMediaStrip
              variant="secondary"
              src="/images/insights-inset-1x1.jpg"
              rounded="3xl"
            />
          </div>
        </div>
      </section>

      <section className={`${PAGE_CONTENT_MAX} pb-24`}>
        <div className="mx-auto max-w-7xl">
          <InsightsFeedFilter articles={articles} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
