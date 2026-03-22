import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { cachedSanityFetch } from "@/sanity/lib/fetch";
import { insightsListQuery } from "@/sanity/lib/queries";

export const metadata = {
  title: "Insights & Resources | AS Brokers",
  description:
    "Articles, guides, and resources on retirement planning, estate duty, Everest Wealth, and financial planning in South Africa.",
};

type ArticleStub = {
  _id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt: string;
  excerpt: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightsPage() {
  const articles = await cachedSanityFetch<ArticleStub[]>(insightsListQuery).catch(() => []);

  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          <div className="text-center md:text-left md:max-w-xl">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Resources</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Insights & Education
            </h1>
            <p className="text-lg text-zinc-400">
              Articles, guides, and tools to help you make informed decisions about retirement, estate planning, and wealth.
            </p>
          </div>
          <div className="shrink-0 w-36 h-36 sm:w-40 sm:h-40 mx-auto md:mx-0 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/images/insights-inset-1x1.jpg"
              alt="Research and financial education resources"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-24">
        {articles.length > 0 ? (
          <ul className="space-y-6">
            {articles.map((a) => (
              <li key={a._id}>
                <Link
                  href={`/insights/${a.slug}?locale=${a.locale}`}
                  className="block rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8 hover:border-white/20 transition-colors"
                >
                  <time className="text-xs text-zinc-500 uppercase tracking-wider" dateTime={a.publishedAt}>
                    {formatDate(a.publishedAt)}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold text-white">{a.title}</h2>
                  {a.excerpt && (
                    <p className="mt-2 text-zinc-400 line-clamp-2">{a.excerpt}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-8 md:p-12 text-center">
            <p className="text-zinc-400 mb-6">
              Our insight articles and resource hub are coming soon. We&apos;ll share regular updates on SA budget impact, estate planning, retirement income, and Everest Wealth so you stay ahead.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/calculators"
                prefetch={false}
                className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
              >
                Use our calculators
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
