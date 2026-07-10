"use client";

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
  variant?: "dark" | "warm";
  /** Parent already applies hub page wrap (e.g. HOME4_WRAP). */
  inset?: boolean;
};

/** Server-rendered related links for internal topology (Phase 5.2). */
export function RelatedContent({
  heading = "Related content",
  links,
  className = "",
  variant = "dark",
  inset = false,
}: RelatedContentProps) {
  if (!links.length) return null;

  const warm = variant === "warm";
  const containerClass = warm
    ? "mx-auto max-w-7xl px-4 sm:px-6 md:px-8"
    : "mx-auto max-w-4xl px-4 sm:px-6 md:px-8";
  const gridClass = warm
    ? links.length >= 4
      ? "grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    : "grid gap-4 sm:grid-cols-2";

  const body = (
    <>
      <h2
        id="related-content-heading"
        className={`mb-6 text-xl font-bold md:text-2xl ${warm ? "text-shark" : "text-white"}`}
      >
        {heading}
      </h2>
      <ul className={gridClass}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={false}
              className={
                warm
                  ? "block h-full rounded-2xl border border-stone-200/80 bg-white/95 p-5 shadow-sm transition hover:border-cinematic-teal/40 hover:shadow-md"
                  : "block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cinematic-teal/40 hover:bg-white/[0.06]"
              }
            >
              <span className={`font-semibold ${warm ? "text-shark" : "text-white"}`}>{link.title}</span>
              <p className={`mt-2 text-sm leading-relaxed ${warm ? "text-stone-600" : "text-zinc-500"}`}>
                {link.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  if (inset) {
    return (
      <div
        data-chunk-boundary
        className={`border-t border-stone-200/80 pt-14 ${className}`}
        aria-labelledby="related-content-heading"
      >
        {body}
      </div>
    );
  }

  return (
    <section
      data-chunk-boundary
      className={`border-t py-12 ${warm ? "border-stone-200/80" : "border-white/10"} ${className}`}
      aria-labelledby="related-content-heading"
    >
      <div className={containerClass}>{body}</div>
    </section>
  );
}
