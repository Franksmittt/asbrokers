import { Footer } from "@/components/Footer";
import { ExecutableArticleHtml } from "@/components/client-studio/ExecutableArticleHtml";
import type { MockInsightPost } from "@/lib/insights/mockPosts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Props = {
  post: MockInsightPost;
};

export function MockInsightArticle({ post }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <article className="px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200 ring-1 ring-amber-300/20">
            Mockup blog post
          </div>
          <time className="block text-xs uppercase tracking-wider text-zinc-500" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-zinc-400">{post.excerpt}</p>
          <div className="mt-6 rounded-[2rem] bg-white/5 p-5 text-sm leading-relaxed text-zinc-300 ring-1 ring-white/10">
            This is sample content created to demonstrate how AS Brokers insight articles can look on the site. It is
            not a published advisory note.
          </div>
          <div className="mt-10 max-w-full overflow-x-auto [&_a]:break-words [&_img]:max-h-none [&_img]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_section]:!max-w-none">
            <ExecutableArticleHtml
              className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-teal-400 prose-figcaption:text-zinc-500 prose-strong:text-white"
              html={post.bodyHtml}
            />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
