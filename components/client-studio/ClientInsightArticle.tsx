import { WarmHero, WarmPageWithFooter, WarmSection } from "@/components/warm/WarmShell";
import { ExecutableArticleHtml } from "@/components/client-studio/ExecutableArticleHtml";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { insightUrlPath } from "@/lib/site-url";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { WARM_META } from "@/lib/warm-theme";
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
  const heroImage = getPrimaryPageImage(path) ?? "/images/insights-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path={path}
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
      <WarmHero kicker="Insights studio" title={post.title} description={post.excerpt ?? undefined} imageSrc={heroImage} maxWidth="5xl">
        <time className={`mt-4 block ${WARM_META} text-white/70`} dateTime={published}>
          {formatDate(published)}
        </time>
      </WarmHero>

      <WarmSection narrow className="pb-16">
        <div className="max-w-full overflow-x-auto [&_a]:break-words [&_img]:max-h-none [&_img]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_.max-w-3xl]:!max-w-none [&_section]:!max-w-none">
          <ExecutableArticleHtml
            className="prose prose-stone max-w-none prose-headings:text-shark prose-p:text-stone-600 prose-a:text-samsung-blue hover:prose-a:text-cinematic-teal"
            html={html}
          />
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
