import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ClientInsightArticle } from "@/components/client-studio/ClientInsightArticle";
import { Footer } from "@/components/Footer";
import { ArticlePortableText } from "@/components/portable-text/ArticlePortableText";
import { getPublishedStudioPostBySlug } from "@/lib/client-studio/posts";
import { absoluteUrl, insightUrlPath } from "@/lib/site-url";
import { formatDateEnZa } from "@/lib/format-date";
import { buildArticleMetadata } from "@/lib/seo-metadata";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { cachedSanityFetch } from "@/sanity/lib/fetch";
import { articleBySlugQuery } from "@/sanity/lib/queries";

type Article = {
  _id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt: string;
  excerpt: string | null;
  body: unknown;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    noIndex?: boolean | null;
  } | null;
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
};

async function getSanityArticleOrNull(slug: string, locale: string): Promise<Article | null> {
  try {
    return await cachedSanityFetch<Article | null>(articleBySlugQuery, { slug, locale });
  } catch {
    return null;
  }
}

function formatDate(iso: string) {
  return formatDateEnZa(iso, { year: "numeric", month: "long", day: "numeric" });
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { locale: localeParam } = await searchParams;
  const locale = localeParam ?? "en";
  const path = insightUrlPath(slug, locale);
  const article = await getSanityArticleOrNull(slug, locale);
  if (!article) {
    const studio = await getPublishedStudioPostBySlug(slug, locale);
    if (!studio) return { title: "Article | AS Brokers" };
    return buildArticleMetadata({
      path,
      title: studio.metaTitle ?? studio.title,
      excerpt: studio.metaDescription ?? studio.excerpt,
    });
  }
  return buildArticleMetadata({
    path,
    title: article.seo?.metaTitle ?? article.title,
    excerpt: article.seo?.metaDescription ?? article.excerpt,
    noIndex: Boolean(article.seo?.noIndex),
    canonicalOverride: article.seo?.canonicalUrl ?? undefined,
  });
}

export default async function ArticlePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { locale: localeParam } = await searchParams;
  const locale = localeParam ?? "en";
  const article = await getSanityArticleOrNull(slug, locale);
  if (!article) {
    const studio = await getPublishedStudioPostBySlug(slug, locale);
    if (studio) {
      return <ClientInsightArticle post={studio} />;
    }
    notFound();
  }

  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <PageJsonLd
        path={insightUrlPath(slug, locale)}
        webPage={{
          name: `${article.seo?.metaTitle ?? article.title} | AS Brokers`,
          description: article.seo?.metaDescription ?? article.excerpt ?? "",
        }}
        article={{
          headline: article.title,
          description: article.excerpt ?? undefined,
          datePublished: article.publishedAt,
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: insightUrlPath(slug, locale) },
        ]}
      />
      <article className="pt-28 pb-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
          <time className="text-xs text-zinc-500 uppercase tracking-wider" dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed max-w-4xl">{article.excerpt}</p>
          )}
          <div className="mt-8 prose prose-invert max-w-none">
            <ArticlePortableText value={article.body as import("@portabletext/types").PortableTextBlock[]} />
          </div>
        </div>
      </article>
      <RelatedContent
        links={[
          { href: "/insights", title: "All insights", description: "Browse retirement, estate, and market education." },
          { href: "/calculators", title: "Calculator hub", description: "Retirement and wealth planning tools." },
          { href: "/contact", title: "Book a review", description: "Discuss how this applies to your plan." },
        ]}
      />
      <Footer />
    </div>
  );
}
