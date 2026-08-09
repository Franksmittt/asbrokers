import { ExecutableArticleHtml } from "@/components/client-studio/ExecutableArticleHtml";
import {
  HubContentSection,
  HubSplitHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { insightUrlPath } from "@/lib/site-url";
import { resolveStudioInsightCoverImage } from "@/lib/insights/cover-image";
import type { StudioPostRow } from "@/lib/client-studio/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Props = {
  post: StudioPostRow;
};

export function ClientInsightArticle({ post }: Props) {
  const published = post.publishedAt?.toISOString() ?? post.updatedAt.toISOString();
  const html = post.bodyHtmlPublished ?? "";
  const path = insightUrlPath(post.slug, post.locale ?? "en");
  const heroImage = resolveStudioInsightCoverImage({
    heroImageUrl: post.heroImageUrl,
    bodyHtmlPublished: post.bodyHtmlPublished,
    bodyHtml: post.bodyHtml,
  });

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
      <HubSplitHero
        kicker="Insights studio"
        title={post.title}
        description={post.excerpt ?? undefined}
        imageSrc={heroImage}
        imageAlt={post.title}
        priority
      >
        <time className="mt-4 block text-xs font-medium uppercase tracking-wider text-stone-500" dateTime={published}>
          {formatDate(published)}
        </time>
      </HubSplitHero>

      <HubContentSection narrow className="pb-16">
        <div className="max-w-full overflow-x-auto [&_a]:break-words [&_img]:max-h-none [&_img]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_.max-w-3xl]:!max-w-none [&_section]:!max-w-none">
          <ExecutableArticleHtml
            className="prose prose-stone max-w-none prose-headings:text-shark prose-p:text-stone-600 prose-a:text-samsung-blue hover:prose-a:text-cinematic-teal"
            html={html}
          />
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
