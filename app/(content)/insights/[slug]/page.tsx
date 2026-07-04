import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ClientInsightArticle } from "@/components/client-studio/ClientInsightArticle";
import { ArticlePortableText } from "@/components/portable-text/ArticlePortableText";
import { WarmHero, WarmPageWithFooter, WarmSection } from "@/components/warm/WarmShell";
import { getPublishedStudioPostBySlug } from "@/lib/client-studio/posts";
import { insightUrlPath } from "@/lib/site-url";
import { formatDateEnZa } from "@/lib/format-date";
import { buildArticleMetadata } from "@/lib/seo-metadata";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { WARM_META } from "@/lib/warm-theme";
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
  const path = insightUrlPath(slug, locale);
  const article = await getSanityArticleOrNull(slug, locale);
  if (!article) {
    const studio = await getPublishedStudioPostBySlug(slug, locale);
    if (studio) {
      return <ClientInsightArticle post={studio} />;
    }
    notFound();
  }

  const heroImage = getPrimaryPageImage(path) ?? "/images/insights-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path={path}
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
          { name: article.title, path },
        ]}
      />
      <WarmHero
        kicker="Insights"
        title={article.title}
        description={article.excerpt ?? undefined}
        imageSrc={heroImage}
        maxWidth="5xl"
      >
        <time className={`mt-4 block ${WARM_META} text-white/70`} dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </WarmHero>

      <WarmSection narrow className="pb-8">
        <div className="prose prose-stone max-w-none prose-headings:text-shark prose-p:text-stone-600 prose-a:text-samsung-blue hover:prose-a:text-cinematic-teal">
          <ArticlePortableText value={article.body as import("@portabletext/types").PortableTextBlock[]} />
        </div>
      </WarmSection>

      <RelatedContent
        variant="warm"
        links={[
          { href: "/insights", title: "All insights", description: "Browse retirement, estate, and market education." },
          { href: "/calculators", title: "Planning tools", description: "Retirement and wealth planning calculators." },
          { href: "/contact", title: "Book a review", description: "Discuss how this applies to your plan." },
        ]}
      />
    </WarmPageWithFooter>
  );
}
