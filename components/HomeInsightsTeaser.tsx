import Link from "next/link";
import { cachedSanityFetch } from "@/sanity/lib/fetch";
import { insightsListQuery } from "@/sanity/lib/queries";

type ArticleStub = {
  _id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt: string;
  excerpt: string | null;
};

const MOCK_INSIGHTS: { title: string; excerpt: string; publishedAt: string; slug: string }[] = [
  {
    title: "Semigration & Retirement Villages",
    excerpt: "How coastal and estate living is reshaping retirement planning and what to consider before you move.",
    publishedAt: "2025-02-15",
    slug: "semigration-retirement-villages",
  },
  {
    title: "Everest Fixed Returns: Beating Volatility",
    excerpt: "Why fixed 12.8–14.5% returns are gaining traction among investors seeking certainty in uncertain markets.",
    publishedAt: "2025-02-08",
    slug: "everest-fixed-returns-volatility",
  },
  {
    title: "Estate Duty Reduction Strategies",
    excerpt: "Legitimate ways to structure your estate so more of your wealth passes to the next generation.",
    publishedAt: "2025-01-28",
    slug: "estate-duty-reduction-strategies",
  },
  {
    title: "Retirement Income in a High-Inflation World",
    excerpt: "How to design drawdowns and protect your lifestyle when inflation and rates are volatile.",
    publishedAt: "2025-01-12",
    slug: "retirement-income-inflation",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function InsightCard({
  title,
  excerpt,
  publishedAt,
  href,
}: {
  title: string;
  excerpt: string;
  publishedAt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-[2rem] rim-light border-0 p-6 md:p-8 hover:bg-white/[0.07] transition-all duration-500 group"
    >
      <time className="text-xs text-zinc-500 uppercase tracking-wider" dateTime={publishedAt}>
        {formatDate(publishedAt)}
      </time>
      <h3 className="mt-2 text-lg font-bold text-white group-hover:text-cinematic-teal transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-zinc-400 text-sm line-clamp-2 tracking-[0.01em]">{excerpt}</p>
      <span className="mt-3 inline-block text-cinematic-teal text-sm font-semibold group-hover:underline">
        Read more →
      </span>
    </Link>
  );
}

export async function HomeInsightsTeaser() {
  const articles = await cachedSanityFetch<ArticleStub[]>(insightsListQuery).catch(() => []);
  const fromSanity = articles.slice(0, 4);
  const useMock = fromSanity.length < 4;

  type TeaserItem = { _id: string; title: string; excerpt: string; publishedAt: string; slug: string; locale?: string };
  const teasers: TeaserItem[] = useMock
    ? MOCK_INSIGHTS.map((m, i) => ({ _id: `mock-${i}`, ...m, locale: "en" }))
    : fromSanity.map((a) => ({ _id: a._id, title: a.title, excerpt: a.excerpt ?? "", publishedAt: a.publishedAt, slug: a.slug, locale: a.locale }));

  return (
    <section
      className="relative z-10 py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto"
      aria-labelledby="insights-heading"
    >
      <div>
        <h2 id="insights-heading" className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
          Insights & Education
        </h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-12 tracking-[0.01em]">
          Thought leadership on retirement, estate planning, and wealth so you stay ahead.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teasers.map((item) => (
            <InsightCard
              key={item._id}
              title={item.title}
              excerpt={item.excerpt}
              publishedAt={item.publishedAt}
              href={useMock ? "/insights" : `/insights/${item.slug}?locale=${item.locale ?? "en"}`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/insights"
            className="text-cinematic-teal font-semibold text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-cinematic-teal rounded"
          >
            View all insights →
          </Link>
        </div>
      </div>
    </section>
  );
}
