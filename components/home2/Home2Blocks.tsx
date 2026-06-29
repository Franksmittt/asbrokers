import Link from "next/link";

import type { JourneyCard, JourneyLink, SolutionGroup } from "@/lib/home2-journey";
import { formatDateEnZa } from "@/lib/format-date";
import { ArrowRight } from "@/components/icons";

export const HOME2_WRAP = "mx-auto max-w-7xl px-4 sm:px-6 md:px-8";

const ACCENT_RING: Record<JourneyCard["accent"], string> = {
  teal: "hover:ring-cinematic-teal/40 group-hover:shadow-[0_0_40px_rgba(20,184,166,0.12)]",
  gold: "hover:ring-supernova-gold/40 group-hover:shadow-[0_0_40px_rgba(255,184,0,0.1)]",
  blue: "hover:ring-samsung-blue/40 group-hover:shadow-[0_0_40px_rgba(0,84,159,0.12)]",
  orange: "hover:ring-orange-400/40 group-hover:shadow-[0_0_40px_rgba(251,146,60,0.1)]",
};

const ACCENT_CTA: Record<JourneyCard["accent"], string> = {
  teal: "text-cinematic-teal",
  gold: "text-supernova-gold",
  blue: "text-blue-400",
  orange: "text-orange-400",
};

export function Home2Section({
  id,
  className = "",
  children,
  bordered = true,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 py-16 md:py-24 ${bordered ? "border-t border-white/10" : ""} ${className}`}
    >
      <div className={HOME2_WRAP}>{children}</div>
    </section>
  );
}

export function Home2SectionHeader({
  kicker,
  title,
  description,
  href,
  linkLabel,
}: {
  kicker?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-10 md:mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {kicker ? (
          <p className="trust-hallmark text-xs uppercase tracking-[0.12em] text-zinc-400 mb-2">{kicker}</p>
        ) : null}
        <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.03em] text-white">{title}</h2>
        {description ? (
          <p className="mt-3 text-zinc-400 text-base md:text-lg leading-relaxed tracking-[0.01em]">{description}</p>
        ) : null}
      </div>
      {href && linkLabel ? (
        <Link href={href} className="shrink-0 text-sm font-semibold text-cinematic-teal hover:underline">
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}

export function Home2JourneyCard({ card }: { card: JourneyCard }) {
  return (
    <article
      className={`group flex flex-col rounded-3xl rim-light bg-white/[0.04] p-6 md:p-8 transition-all duration-500 ring-1 ring-white/10 hover:bg-white/[0.07] ${ACCENT_RING[card.accent]}`}
    >
      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{card.title}</h3>
      <ul className="mt-5 flex-1 space-y-2.5">
        {card.bullets.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={card.href}
        className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${ACCENT_CTA[card.accent]} group-hover:gap-3 transition-all duration-300`}
      >
        {card.cta}
        <ArrowRight className="w-4 h-4" aria-hidden />
      </Link>
    </article>
  );
}

export function Home2CalcStrip({ items }: { items: JourneyLink[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {items.map((calc) => (
        <Link
          key={calc.label}
          href={calc.href}
          className="rounded-2xl rim-light bg-white/[0.04] px-5 py-4 text-center hover:bg-white/[0.08] transition-all duration-300 group"
        >
          <span className="text-sm font-semibold text-white group-hover:text-cinematic-teal transition-colors">
            {calc.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Home2ArticleList({
  articles,
}: {
  articles: readonly { title: string; excerpt: string; publishedAt: string; slug: string }[];
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {articles.map((post) => (
        <Link
          key={post.slug}
          href={`/insights/${post.slug}`}
          className="group rounded-3xl rim-light bg-white/[0.04] p-6 md:p-7 hover:bg-white/[0.07] transition-all duration-500"
        >
          <time className="text-xs text-zinc-500 uppercase tracking-wider" dateTime={post.publishedAt}>
            {formatDateEnZa(post.publishedAt)}
          </time>
          <h3 className="mt-2 text-lg font-bold text-white group-hover:text-cinematic-teal transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{post.excerpt}</p>
          <span className="mt-4 inline-block text-sm font-semibold text-cinematic-teal">Read article →</span>
        </Link>
      ))}
    </div>
  );
}

export function Home2SolutionGrid({ groups }: { groups: SolutionGroup[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <div key={group.title} className="rounded-3xl rim-light bg-white/[0.04] p-6 md:p-7">
          {group.href ? (
            <Link href={group.href} className="text-lg font-bold text-white hover:text-cinematic-teal transition-colors">
              {group.title}
            </Link>
          ) : (
            <h3 className="text-lg font-bold text-white">{group.title}</h3>
          )}
          <ul className="mt-4 space-y-2">
            {group.items.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Home2EstateQuick({ items }: { items: readonly JourneyLink[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-2xl rim-light bg-white/[0.04] px-4 py-6 text-center hover:bg-white/[0.08] transition-all duration-300"
        >
          <span className="text-base font-semibold text-white">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

export function Home2WhyAccess() {
  return (
    <div className="mt-10 rounded-3xl rim-light bg-gradient-to-br from-white/[0.06] to-cinematic-teal/5 p-6 md:p-8 border border-cinematic-teal/20">
      <h3 className="text-lg md:text-xl font-bold text-white">
        Access investments many advisers cannot offer
      </h3>
      <p className="mt-3 text-sm md:text-base text-zinc-400 leading-relaxed max-w-3xl">
        AS Brokers is authorised to advise on both traditional investments and selected private-market investment
        opportunities, giving suitable clients access to a broader range of solutions where appropriate.
      </p>
      <p className="mt-3 text-xs text-zinc-500 leading-relaxed max-w-3xl">
        Our Category 1.8 FSP licence (FSP 17273) is what enables this broader advisory scope — explained in full on our{" "}
        <Link href="/regulatory-compliance" className="text-cinematic-teal hover:underline">
          compliance page
        </Link>
        .
      </p>
    </div>
  );
}

export function Home2PreviewBanner() {
  return (
    <div className="border-b border-amber-500/30 bg-amber-950/40 px-4 py-2.5 text-center text-xs text-amber-100/90">
      Preview at <span className="font-mono font-medium text-amber-50">/home2</span> — customer-journey homepage.
      Live site remains at <span className="font-mono font-medium text-amber-50">/</span>
    </div>
  );
}
