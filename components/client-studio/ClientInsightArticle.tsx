import Image from "next/image";
import { ExecutableArticleHtml } from "@/components/client-studio/ExecutableArticleHtml";
import "./insight-article.css";
import { PageWithFooter } from "@/components/hub/HubContentShell";
import { HubHeroAfterLink } from "@/components/hub/HubHeroAfterLink";
import { HubHeroKicker } from "@/components/hub/HubHeroKicker";
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HOME4_WRAP } from "@/lib/layout-constants";
import { insightUrlPath } from "@/lib/site-url";
import { presentInsightArticleHtml } from "@/lib/insights/article-presentation";
import { resolveStudioInsightCoverImage } from "@/lib/insights/cover-image";
import { getAlt } from "@/lib/image-alt";
import type { StudioPostRow } from "@/lib/client-studio/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type Props = {
  post: StudioPostRow;
};

export function ClientInsightArticle({ post }: Props) {
  const published = post.publishedAt?.toISOString() ?? post.updatedAt.toISOString();
  const path = insightUrlPath(post.slug, post.locale ?? "en");
  const heroImage = resolveStudioInsightCoverImage({
    heroImageUrl: post.heroImageUrl,
    bodyHtmlPublished: post.bodyHtmlPublished,
    bodyHtml: post.bodyHtml,
  });
  const html = presentInsightArticleHtml(post.bodyHtmlPublished ?? "", {
    title: post.title,
    coverSrc: heroImage,
  });
  const excerpt = post.excerpt?.trim() || null;

  return (
    <PageWithFooter>
      <PageJsonLd
        path={path}
        primaryImagePath={heroImage}
        webPage={{
          name: `${post.metaTitle ?? post.title} | AS Brokers`,
          description: post.metaDescription ?? post.excerpt ?? "",
        }}
        article={{
          headline: post.title,
          description: post.excerpt ?? undefined,
          datePublished: published,
          dateModified: post.updatedAt.toISOString(),
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: post.title, path },
        ]}
      />
      <MarketingHubHero
        kicker={<HubHeroKicker shortLabel="Insights" longLabel="Insights" />}
        title={post.title}
        description={excerpt}
        borderBottom
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <Image
              src={heroImage}
              alt={getAlt(heroImage, post.title)}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </figure>
        }
        after={
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <time
              className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500"
              dateTime={published}
            >
              {formatDate(published)}
            </time>
            <HubHeroAfterLink prompt="More from the library?" href="/insights" label="All insights" />
          </div>
        }
      />

      <section className="pb-20 pt-12 md:pb-28 md:pt-16" aria-label={post.title}>
        <div className={HOME4_WRAP}>
          <div className="mx-auto w-full max-w-3xl">
            <ExecutableArticleHtml className="insight-article" html={html} />
          </div>
        </div>
      </section>
    </PageWithFooter>
  );
}
