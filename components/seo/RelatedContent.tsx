import Link from "next/link";

export type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

type RelatedContentProps = {
  heading?: string;
  links: RelatedLink[];
  className?: string;
};

/** Server-rendered related links for internal topology (Phase 5.2). */
export function RelatedContent({
  heading = "Related content",
  links,
  className = "",
}: RelatedContentProps) {
  if (!links.length) return null;

  return (
    <section
      data-chunk-boundary
      className={`border-t border-white/10 py-12 ${className}`}
      aria-labelledby="related-content-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <h2 id="related-content-heading" className="mb-6 text-xl font-bold text-white md:text-2xl">
          {heading}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={false}
                className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cinematic-teal/40 hover:bg-white/[0.06]"
              >
                <span className="font-semibold text-white">{link.title}</span>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{link.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
