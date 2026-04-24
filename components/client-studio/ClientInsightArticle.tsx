import { Footer } from "@/components/Footer";
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
      <article className="pt-28 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-wider text-teal-500/90 mb-1">Insights studio</p>
          <time className="text-xs text-zinc-500 uppercase tracking-wider" dateTime={published}>
            {formatDate(published)}
          </time>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-lg text-zinc-400 leading-relaxed">{post.excerpt}</p>}
          <div className="mt-8 max-w-full overflow-x-auto [&_a]:break-words [&_img]:max-h-none [&_img]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto">
            <div
              className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-teal-400"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
