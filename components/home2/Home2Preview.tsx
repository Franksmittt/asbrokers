import Link from "next/link";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { HomeClientReviews } from "@/components/HomeClientReviews";
import { HomeCtaStrip } from "@/components/HomeCtaStrip";
import { HomeInsightsTeaserStatic } from "@/components/HomeInsightsTeaserStatic";
import { HomeStatsSection } from "@/components/HomeStatsSection";
import { ArrowRight } from "@/components/icons";
import { HUB_CALCULATORS } from "@/lib/calculators/hub-catalog";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";
import { cn } from "@/lib/utils";

const PILLAR_CARDS = [
  {
    pillar: "Health",
    accent: "from-emerald-500/20 to-transparent",
    ring: "hover:border-emerald-500/40",
    offer: PLANNING_TOOL_OFFERS["healthy-retirement"],
    cta: "Start free assessment",
  },
  {
    pillar: "Wealth",
    accent: "from-cinematic-teal/20 to-transparent",
    ring: "hover:border-cinematic-teal/40",
    offer: PLANNING_TOOL_OFFERS["retirement-survival"],
    cta: "Start free blueprint",
  },
  {
    pillar: "Legacy",
    accent: "from-amber-500/15 to-transparent",
    ring: "hover:border-amber-500/35",
    offer: PLANNING_TOOL_OFFERS["legacy-checklist"],
    cta: "Start free checklist",
  },
  {
    pillar: "Business",
    accent: "from-[#3ecf8e]/20 to-transparent",
    ring: "hover:border-[#3ecf8e]/40",
    offer: PLANNING_TOOL_OFFERS["business-risk"],
    cta: "Start risk review",
    featured: true,
  },
] as const;

const CPP_COLUMNS = [
  {
    title: "Create",
    summary: "Build wealth, income, and financial freedom with a clear plan.",
    items: ["Retirement planning", "Investments & living annuities", "Financial freedom modelling"],
    href: "/solutions",
  },
  {
    title: "Protect",
    summary: "Cover health, personal assets, and business risks before disruption hits.",
    items: ["Life & disability cover", "Medical aid & gap cover", "Commercial & business insurance"],
    href: "/business-risk-review",
  },
  {
    title: "Preserve",
    summary: "Transfer wealth efficiently to the people who matter.",
    items: ["Wills & estate planning", "Trusts & structuring", "Beneficiary & executor readiness"],
    href: "/legacy-readiness-checklist",
  },
] as const;

const BUSINESS_TOPICS = [
  "Commercial insurance",
  "Key person cover",
  "Buy & sell agreements",
  "Business liability",
  "Cyber & crime risks",
  "Succession planning",
] as const;

const JOURNEY = [
  "Article or video",
  "Calculator or assessment",
  "Blueprint download",
  "Email follow-up",
  "Discovery meeting",
  "Ongoing advice",
] as const;

function PreviewBanner() {
  return (
    <div
      className="relative z-20 border-b border-amber-500/25 bg-amber-950/40 px-4 py-2.5 text-center text-xs text-amber-100/90"
      role="status"
    >
      <span className="font-semibold text-amber-200">Preview homepage</span>
      {" · "}
      This is <code className="rounded bg-black/30 px-1 py-0.5 text-amber-100">/home2</code> for Albert to review. The
      live site still uses <code className="rounded bg-black/30 px-1 py-0.5 text-amber-100">/</code>.
    </div>
  );
}

function PathCard({
  pillar,
  accent,
  ring,
  offer,
  cta,
  ...rest
}: (typeof PILLAR_CARDS)[number]) {
  const featured = "featured" in rest && rest.featured;
  return (
    <Link
      href={offer.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300",
        ring,
        featured && "ring-1 ring-[#3ecf8e]/25"
      )}
    >
      <div
        className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60", accent)}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col">
        {featured ? (
          <span className="mb-2 inline-flex w-fit rounded-full border border-[#3ecf8e]/30 bg-[#3ecf8e]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#3ecf8e]">
            Business owners
          </span>
        ) : (
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{pillar}</p>
        )}
        <h3 className="mt-1 text-lg font-semibold leading-snug text-white group-hover:text-cinematic-teal">
          {offer.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">&ldquo;{offer.coreQuestion}&rdquo;</p>
        <p className="mt-3 text-xs text-zinc-500">{offer.freeSummary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export function Home2Preview() {
  return (
    <div className="relative min-h-screen bg-void pb-24 md:pb-0">
      <PreviewBanner />

      <section className="relative min-h-[78vh] overflow-hidden pt-24 md:pt-28">
        <BackgroundOrbs />
        <div className="relative z-10 mx-auto max-w-5xl px-4 pb-16 text-center sm:px-6">
          <p className="trust-hallmark text-xs uppercase tracking-[0.14em] text-zinc-500">
            FSP 17273 · Independent adviser · Krugersdorp
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl leading-[1.08]">
            Create, protect, and preserve{" "}
            <span className="text-cinematic-teal">what matters most.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            People don&apos;t wake up wanting products — they worry about their health, money, family, and business. We
            help you solve those problems with free assessments, calculators, and structured advice.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-500">
            Start with the area that matches your biggest worry today.
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-4 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">What&apos;s your main worry?</h2>
              <p className="mt-1 text-sm text-zinc-500">Four free starting points — pick one.</p>
            </div>
            <Link href="/legacy-conversations" className="text-sm text-cinematic-teal hover:underline">
              See full framework →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLAR_CARDS.map((card) => (
              <PathCard key={card.pillar} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-16 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
            Create · Protect · Preserve
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-500">
            Everything AS Brokers does fits one of these three outcomes.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {CPP_COLUMNS.map((col) => (
              <div key={col.title} className="rim-light rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white">{col.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{col.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-cinematic-teal" aria-hidden>
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={col.href}
                  className="mt-5 inline-flex text-sm font-medium text-cinematic-teal hover:underline"
                >
                  Explore {col.title.toLowerCase()} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.02] px-4 py-16 sm:px-6 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#3ecf8e]">Business owners</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              Could your business survive a major disruption?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
              Commercial insurance, key person cover, buy-sell agreements, and liability gaps are a major part of our
              work — and what many business owners search for first.
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BUSINESS_TOPICS.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3ecf8e]" aria-hidden />
                  {topic}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/business-risk-review"
                className="inline-flex items-center justify-center rounded-2xl bg-[#3ecf8e] px-6 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Free Business Risk Review™
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Request commercial quote
              </Link>
            </div>
          </div>
          <div className="rim-light rounded-2xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Business Survival Blueprint™</p>
            <p className="mt-3 text-lg font-medium leading-relaxed text-white">
              {PLANNING_TOOL_OFFERS["business-risk"].problem}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-400">
              {PLANNING_TOOL_OFFERS["business-risk"].proofPoints.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="text-[#3ecf8e]">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-16 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Educational calculators</h2>
              <p className="mt-1 text-sm text-zinc-500">Quick numbers — then talk to an adviser for your plan.</p>
            </div>
            <Link href="/calculators" className="text-sm font-medium text-cinematic-teal hover:underline">
              View all calculators →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {HUB_CALCULATORS.map((calc) => (
              <Link
                key={calc.embedId}
                href={calc.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cinematic-teal/35 hover:bg-white/[0.05]"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{calc.tag}</span>
                <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-cinematic-teal">{calc.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-16 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl rim-light rounded-2xl p-6 text-center md:p-10">
          <h2 className="text-xl font-bold text-white md:text-2xl">How we work with you</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
            Every article, calculator, and blueprint follows the same journey.
          </p>
          <ol className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2">
            {JOURNEY.map((step, i) => (
              <li
                key={step}
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300 sm:text-sm"
              >
                <span className="font-bold tabular-nums text-cinematic-teal">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <Link
            href="/how-we-work"
            className="mt-6 inline-block text-sm font-medium text-cinematic-teal hover:underline"
          >
            Read how we work →
          </Link>
        </div>
      </section>

      <HomeStatsSection />
      <HomeClientReviews />
      <HomeInsightsTeaserStatic />
      <HomeCtaStrip />
      <Footer />
    </div>
  );
}
