import { ClientInsightArticle } from "@/components/client-studio/ClientInsightArticle";
import { getPublishedStudioPostBySlug } from "@/lib/client-studio/posts";
import { insightUrlPath } from "@/lib/site-url";
import { buildArticleMetadata } from "@/lib/seo-metadata";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { locale: localeParam } = await searchParams;
  const locale = localeParam ?? "en";
  const path = insightUrlPath(slug, locale);
  const studio = await getPublishedStudioPostBySlug(slug, locale);
  if (!studio) return { title: "Article | AS Brokers" };
  return buildArticleMetadata({
    path,
    title: studio.metaTitle ?? studio.title,
    excerpt: studio.metaDescription ?? studio.excerpt,
  });
}

/** Public article pages are Blog Studio only (legacy Sanity renderer retired). */
export default async function ArticlePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { locale: localeParam } = await searchParams;
  const locale = localeParam ?? "en";
  const studio = await getPublishedStudioPostBySlug(slug, locale);
  if (!studio) notFound();
  return <ClientInsightArticle post={studio} />;
}
