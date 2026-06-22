import { Footer } from "@/components/Footer";
import { ExecutableArticleHtml } from "@/components/client-studio/ExecutableArticleHtml";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { insightUrlPath } from "@/lib/site-url";
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

  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <PageJsonLd
        path={insightUrlPath(post.slug, post.locale ?? "en")}
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
          { name: post.title, path: insightUrlPath(post.slug, post.locale ?? "en") },
        ]}
      />
      <article className="pt-28 pb-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
          <p className="text-[10px] uppercase tracking-wider text-teal-500/90 mb-1">Insights studio</p>
          <time className="text-xs text-zinc-500 uppercase tracking-wider" dateTime={published}>
            {formatDate(published)}
          </time>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-lg text-zinc-400 leading-relaxed max-w-4xl">{post.excerpt}</p>}
          {/* CMS fragments often ship max-w-3xl on <section>; widen so desktop is not “triple column” skinny */}
          <div className="mt-8 max-w-full overflow-x-auto [&_a]:break-words [&_img]:max-h-none [&_img]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_.max-w-3xl]:!max-w-none [&_section]:!max-w-none">
            <ExecutableArticleHtml
              className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-teal-400"
              html={html}
            />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
