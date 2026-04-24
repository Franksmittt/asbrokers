import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ClientInsightArticle } from "@/components/client-studio/ClientInsightArticle";
import { Footer } from "@/components/Footer";
import { ArticlePortableText } from "@/components/portable-text/ArticlePortableText";
import { getPublishedStudioPostBySlug } from "@/lib/client-studio/posts";
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { locale: localeParam } = await searchParams;
  const locale = localeParam ?? "en";
  const article = await cachedSanityFetch<Article | null>(articleBySlugQuery, { slug, locale });
  if (!article) {
    const studio = await getPublishedStudioPostBySlug(slug, locale);
    if (!studio) return { title: "Article | AS Brokers" };
    const title = studio.metaTitle ?? studio.title;
    const description = studio.metaDescription ?? studio.excerpt ?? undefined;
    return {
      title: `${title} | AS Brokers`,
      description,
    };
  }
  const title = article.seo?.metaTitle ?? article.title;
  const description = article.seo?.metaDescription ?? article.excerpt ?? undefined;
  return {
    title: `${title} | AS Brokers`,
    description,
    robots: article.seo?.noIndex ? "noindex, nofollow" : undefined,
    alternates: article.seo?.canonicalUrl ? { canonical: article.seo.canonicalUrl } : undefined,
  };
}

export default async function ArticlePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { locale: localeParam } = await searchParams;
  const locale = localeParam ?? "en";
  const article = await cachedSanityFetch<Article | null>(articleBySlugQuery, { slug, locale });
  if (!article) {
    const studio = await getPublishedStudioPostBySlug(slug, locale);
    if (studio) {
      return <ClientInsightArticle post={studio} />;
    }
    notFound();
  }

  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <article className="pt-28 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <time className="text-xs text-zinc-500 uppercase tracking-wider" dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">{article.excerpt}</p>
          )}
          <div className="mt-8 prose prose-invert max-w-none">
            <ArticlePortableText value={article.body as import("@portabletext/types").PortableTextBlock[]} />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
