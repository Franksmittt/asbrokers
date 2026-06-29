import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import type { FunnelStep, JourneyLink, NavPillar, SolutionGroup } from "@/lib/home3-journey";
import { formatDateEnZa } from "@/lib/format-date";

export const HOME3_WRAP = "mx-auto max-w-7xl px-4 sm:px-6 md:px-8";

const PILLAR_ACCENT: Record<NavPillar["accent"], string> = {
  teal: "from-cinematic-teal/20 to-transparent ring-cinematic-teal/30 hover:ring-cinematic-teal/50",
  gold: "from-supernova-gold/15 to-transparent ring-supernova-gold/25 hover:ring-supernova-gold/45",
  blue: "from-samsung-blue/20 to-transparent ring-samsung-blue/30 hover:ring-samsung-blue/50",
  orange: "from-orange-500/15 to-transparent ring-orange-400/25 hover:ring-orange-400/45",
  violet: "from-violet-500/15 to-transparent ring-violet-400/25 hover:ring-violet-400/45",
};

const PILLAR_CTA: Record<NavPillar["accent"], string> = {
  teal: "text-cinematic-teal",
  gold: "text-supernova-gold",
  blue: "text-blue-400",
  orange: "text-orange-400",
  violet: "text-violet-300",
};

export function Home3Section({
  id,
  className = "",
  children,
  bordered = true,
  highlight = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bordered?: boolean;
  highlight?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 py-16 md:py-24 ${
        bordered ? "border-t border-white/10" : ""
      } ${highlight ? "bg-gradient-to-b from-cinematic-teal/[0.06] to-transparent" : ""} ${className}`}
    >
      <div className={HOME3_WRAP}>{children}</div>
    </section>
  );
}

export function Home3SectionHeader({
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
      <div className="max-w-3xl">
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

export function Home3PreviewBanner() {
  return (
    <div className="border-b border-violet-500/30 bg-violet-950/40 px-4 py-2.5 text-center text-xs text-violet-100/90">
      Preview at <span className="font-mono font-medium text-violet-50">/home3</span> — education-first homepage
      (v3). Live site remains at <span className="font-mono font-medium text-violet-50">/</span>
    </div>
  );
}

export function Home3PillarCard({ pillar }: { pillar: NavPillar }) {
  return (
    <Link
      href={pillar.href}
      className={`group relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-6 md:p-7 ring-1 transition-all duration-500 hover:bg-white/[0.06] ${PILLAR_ACCENT[pillar.accent]}`}
    >
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{pillar.title}</h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{pillar.subtitle}</p>
      </div>
      <span
        className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${PILLAR_CTA[pillar.accent]} group-hover:gap-3 transition-all`}
      >
        Explore
        <ArrowRight className="w-4 h-4" aria-hidden />
      </span>
    </Link>
  );
}

export function Home3CalcGrid({ items }: { items: JourneyLink[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {items.map((calc) => (
        <Link
          key={calc.label}
          href={calc.href}
          className="rounded-2xl rim-light bg-white/[0.04] px-4 py-5 text-center hover:bg-white/[0.08] transition-all duration-300 group"
        >
          <span className="text-sm font-semibold text-white group-hover:text-cinematic-teal transition-colors leading-snug">
            {calc.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Home3WorryPills({ items }: { items: JourneyLink[] }) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {items.map((q) => (
        <Link
          key={q.label}
          href={q.href}
          className="rounded-full rim-light bg-white/[0.05] px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/[0.1] transition-colors"
        >
          {q.label}
        </Link>
      ))}
    </div>
  );
}

export function Home3RetirementFunnel({ steps }: { steps: FunnelStep[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {steps.map((step, i) => (
        <li key={step.step} className="relative">
          {i < steps.length - 1 ? (
            <span
              className="hidden md:block absolute top-8 left-[calc(100%-0.5rem)] w-4 h-px bg-white/20 z-0"
              aria-hidden
            />
          ) : null}
          <div className="relative z-10 flex h-full flex-col rounded-3xl rim-light bg-white/[0.04] p-5 md:p-6 hover:bg-white/[0.07] transition-colors">
            <span className="font-mono text-xs text-cinematic-teal">{step.step}</span>
            <h3 className="mt-2 text-base font-bold text-white">{step.title}</h3>
            <p className="mt-2 flex-1 text-sm text-zinc-400 leading-relaxed">{step.description}</p>
            <Link href={step.href} className="mt-4 text-sm font-semibold text-cinematic-teal hover:underline">
              {step.cta} →
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Home3RetirementPaths({
  paths,
}: {
  paths: readonly { title: string; items: readonly JourneyLink[] }[];
}) {
  return (
    <div className="mt-10 grid md:grid-cols-2 gap-6">
      {paths.map((path) => (
        <div key={path.title} className="rounded-3xl rim-light bg-white/[0.03] p-6">
          <h3 className="text-lg font-bold text-white">{path.title}</h3>
          <ul className="mt-4 space-y-2">
            {path.items.map((item) => (
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

export function Home3SolutionGrid({ groups }: { groups: SolutionGroup[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <div key={group.title} className="rounded-3xl rim-light bg-white/[0.04] p-6 md:p-7 flex flex-col">
          {group.href ? (
            <Link href={group.href} className="text-lg font-bold text-white hover:text-cinematic-teal transition-colors">
              {group.title}
            </Link>
          ) : (
            <h3 className="text-lg font-bold text-white">{group.title}</h3>
          )}
          <ul className="mt-4 flex-1 space-y-2">
            {group.items.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {group.journey ? (
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-x-3 gap-y-1">
              {group.journey.map((stage, i) => (
                <span key={stage.label} className="text-xs text-zinc-500">
                  {i > 0 ? <span className="mr-3 text-white/20">→</span> : null}
                  <Link href={stage.href} className="text-zinc-400 hover:text-cinematic-teal">
                    {stage.label}
                  </Link>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function Home3EstatePanel({
  items,
  journey,
}: {
  items: JourneyLink[];
  journey: JourneyLink[];
}) {
  return (
    <div className="rounded-3xl rim-light bg-white/[0.04] p-6 md:p-8">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-2xl bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/[0.08] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 text-sm">
        {journey.map((stage, i) => (
          <span key={stage.label} className="flex items-center gap-2">
            {i > 0 ? <span className="text-zinc-600">→</span> : null}
            <Link href={stage.href} className="text-zinc-400 hover:text-cinematic-teal font-medium">
              {stage.label}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Home3LearnHub({ items }: { items: JourneyLink[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-2xl rim-light bg-white/[0.04] px-4 py-4 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors text-center"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function Home3WhyPhilosophy({
  pillars,
}: {
  pillars: readonly { title: string; body: string }[];
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {pillars.map((item) => (
        <article key={item.title} className="rounded-3xl rim-light bg-white/[0.04] p-6 md:p-7">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function Home3ArticleList({
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
