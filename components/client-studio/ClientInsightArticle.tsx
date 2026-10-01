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

      <HubContentSection narrow className="px-4 pb-20 pt-2 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-prose overflow-x-auto [&_a]:break-words [&_img]:mx-auto [&_img]:max-h-none [&_img]:max-w-full [&_img]:rounded-[15px] [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_section]:!max-w-none [&_iframe]:mx-auto [&_iframe]:max-w-full [&_iframe]:rounded-[15px]">
          <ExecutableArticleHtml
            className="prose prose-stone prose-lg max-w-prose prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[#1D1D1F] prose-p:text-[#52525b] prose-p:leading-[1.78] prose-li:text-[#52525b] prose-a:text-[#0057B8] hover:prose-a:text-[#006B6B] prose-blockquote:border-[#006B6B] prose-blockquote:text-[#1D1D1F] prose-strong:text-[#1D1D1F] prose-hr:border-[#E5E5E5]"
            html={html}
          />
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
