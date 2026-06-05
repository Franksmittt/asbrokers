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

function MockArticleGallery({ post }: Props) {
  return (
    <section
      aria-label={`${post.title} image gallery`}
      className="mt-10 rounded-[2.25rem] bg-white/[0.035] p-2.5 ring-1 ring-white/10 sm:p-3"
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
        {post.galleryImages.slice(0, 6).map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className="group relative overflow-hidden rounded-[1.5rem] bg-zinc-950"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? "eager" : "lazy"}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-70" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
              {String(index + 1).padStart(2, "0")}
            </span>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function MockInsightArticle({ post }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <article className="px-4 pb-20 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
          <header className="rounded-[2.5rem] bg-white/[0.03] p-6 ring-1 ring-white/10 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] lg:items-end">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200 ring-1 ring-amber-300/20">
                  Mockup blog post
                </div>
                <time className="block text-xs uppercase tracking-wider text-zinc-500" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-4xl text-lg leading-relaxed text-zinc-400">{post.excerpt}</p>
              </div>
              <aside className="rounded-[2rem] bg-black/25 p-5 text-sm leading-relaxed text-zinc-300 ring-1 ring-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-teal">
                  Demo direction
                </p>
                <p className="mt-3">
                  Richer imagery, clearer spacing, and conversion-focused content blocks show the client how their
                  blog can feel editorial while still driving enquiries.
                </p>
              </aside>
            </div>
            <MockArticleGallery post={post} />
          </header>

          <div className="mt-10 rounded-[2.5rem] bg-white/[0.025] px-5 py-8 ring-1 ring-white/10 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="mb-10 rounded-[2rem] bg-white/5 p-5 text-sm leading-relaxed text-zinc-300 ring-1 ring-white/10">
              This is sample content created to demonstrate how AS Brokers insight articles can look on the site. It
              is not a published advisory note.
            </div>
            <ExecutableArticleHtml
              className="prose prose-invert max-w-none prose-headings:mt-12 prose-headings:text-white prose-p:text-zinc-300 prose-a:text-teal-400 prose-figcaption:text-zinc-500 prose-strong:text-white prose-ul:my-7 prose-ol:my-7 [&_.lead]:text-xl [&_.lead]:leading-relaxed [&_.lead]:text-zinc-200 [&_.not-prose]:my-10"
              html={post.bodyHtml}
            />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
