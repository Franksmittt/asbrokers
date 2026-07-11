"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { HubCalculatorToolBay } from "@/components/hub/HubCalculatorToolBay";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, ShieldCheck } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";
import { calculatorPagePath } from "@/lib/calculators/page-path";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;
const WARM = "#FDFCFA";

const HERO_IMAGE = "/images/home4-goal-retire-16x9.png";

const CALC_REALITY = calculatorPagePath("asset-002-retirement-reality-check");
const CALC_GROWTH = calculatorPagePath("asset-001-retirement-growth");
const CALC_GOAL = calculatorPagePath("asset-017-personal-goal");

const PATH_STEPS = [
  { n: "1", label: "Diagnose", href: "#planning-worry-heading" },
  { n: "2", label: "Calculate", href: "#planning-calculators-heading" },
  { n: "3", label: "Get advice", href: "#planning-trust-heading" },
] as const;

const CALCULATOR_TILES = [
  {
    code: "ASSET 002",
    title: "Retirement Reality Check",
    description: "Compare your desired income against your projected capital to see if a gap exists.",
    href: CALC_REALITY,
  },
  {
    code: "ASSET 001",
    title: "Retirement Growth Calculator",
    description: "Discover the exact return percentage you need to hit your target.",
    href: CALC_GROWTH,
  },
  {
    code: "ASSET 017",
    title: "Personal Goal Growth",
    description: "Project future lump sums based on your monthly contributions.",
    href: CALC_GOAL,
  },
];

const EDUCATION_CARDS = [
  {
    title: "Tax-Free Investments & RAs",
    description:
      "Build long-term capital with tax-efficient structures and disciplined contributions before you retire.",
    href: "/everest-wealth",
    cta: "Explore wealth building",
    span: "col-span-12 md:col-span-7",
  },
  {
    title: "Preservation Funds",
    description:
      "Changing jobs? Understand your options for pension or provident capital without derailing your timeline.",
    href: "/contact",
    cta: "Speak to an adviser",
    span: "col-span-12 md:col-span-5",
  },
  {
    title: "Latest Retirement Guides",
    description: "Plain-language articles on accumulation, tax, inflation, and retirement readiness.",
    href: "/insights",
    cta: "Browse insights",
    span: "col-span-12",
  },
];

function EducationCard({
  title,
  description,
  href,
  cta,
}: (typeof EDUCATION_CARDS)[number]) {
  return (
    <article className="h-full">
      <Link
        href={href}
        prefetch={false}
        className="group flex h-full flex-col border-l-[3px] border-cinematic-teal bg-white p-6 ring-1 ring-stone-200/90 transition-colors hover:bg-stone-50 sm:p-8"
      >
        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)", color: INK }}
        >
          {title}
        </h3>
        <p
          className="mt-3 flex-1 leading-relaxed"
          style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.15vw, 1.0625rem)", color: BODY }}
        >
          {description}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2 font-semibold text-samsung-blue"
          style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </article>
  );
}

type Props = { faqs: FAQItem[] };

export function RetirementPlanningPageView({ faqs }: Props) {
  return (
    <>
      {/* Chapter 1 — light: arrive, understand, choose a path */}
      <header
        data-chunk-boundary="true"
        className="pb-10 pt-28 md:pb-14 md:pt-36 lg:pb-16 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={`${GRID} items-center gap-y-8`}>
          <HubReveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Pre-retirement planning · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              Are you on track to retire comfortably?
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              For South Africans still working: diagnose your trajectory, check the numbers, then
              speak with an independent adviser when you want a plan — not a product pitch.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/retirement-survival-blueprint"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#004a9e]"
              >
                Start the Retirement Survival Blueprint
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-300 transition hover:bg-stone-50"
                style={{ color: INK }}
              >
                Book a strategy call
              </Link>
            </div>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Professional South African couple in their fifties reviewing retirement plans together"
                )}
                fill
                priority
                className="object-cover object-center"
                sizes={HUB_SPLIT_HERO_SIZES}
              />
            </div>
          </HubReveal>
        </div>

        <div className={`${HOME4_WRAP} mt-10 border-t border-stone-200/90 pt-8 md:mt-12`}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            AS Brokers CC · Independent Category 1.8 · Est. 1998 · Krugersdorp
          </p>
          <nav aria-label="Page path" className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
            <span className="mr-2 font-medium text-stone-600">On this page:</span>
            {PATH_STEPS.map((step, i) => (
              <span key={step.href} className="inline-flex items-center gap-2">
                {i > 0 ? <span className="text-stone-300" aria-hidden>/</span> : null}
                <Link
                  href={step.href}
                  prefetch={false}
                  className="inline-flex items-center gap-1.5 font-semibold text-samsung-blue transition hover:opacity-80"
                >
                  <span className="tabular-nums text-cinematic-teal">{step.n}</span>
                  {step.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* Chapter 2 — one continuous dark journey: diagnose → calculate → advise */}
      <section
        data-chunk-boundary="true"
        className="bg-[#1D1D1F] text-white"
        aria-label="Diagnose, calculate, and get advice"
      >
        <div
          className="py-16 md:py-20"
          style={{
            background: "linear-gradient(165deg, #004a9e 0%, #006b6b 42%, #1D1D1F 88%)",
          }}
        >
          <div className={HOME4_WRAP}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Step 1 · Financial Freedom Score™
            </p>
            <div className="mt-6 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <ShieldCheck className="h-8 w-8 text-white/75" aria-hidden />
                <h2
                  id="planning-worry-heading"
                  className="mt-4 font-bold tracking-tight text-white"
                  style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)", lineHeight: 1.1 }}
                >
                  Will your money survive your retirement?
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-white/80" style={{ fontSize: "1.0625rem" }}>
                  The Retirement Survival Blueprint is a guided 5-step diagnostic. It shows your score
                  and the gaps in your trajectory — then you can check the maths below, or speak to us.
                </p>
                <Link
                  href="/retirement-survival-blueprint"
                  prefetch={false}
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
                >
                  Start the Retirement Survival Blueprint
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm leading-relaxed text-white/70">
                  Prefer to explore first? Keep scrolling — the same tools our clients use for gap
                  checks are next, then a clear path to book independent advice (FSP 17273).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-14 md:py-16">
          <p className={`${HOME4_WRAP} mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/45`}>
            Step 2 · Illustrative calculators
          </p>
          <HubCalculatorToolBay
            embedded
            showChartIcon={false}
            headingId="planning-calculators-heading"
            title="Run the numbers yourself."
            lead="Educational tools only — not personalised advice. Use them to spot gaps before a fiduciary conversation."
            tools={CALCULATOR_TILES.map((tile) => ({
              code: tile.code,
              title: tile.title,
              description: tile.description,
              href: tile.href,
              span: "col-span-12 md:col-span-4",
            }))}
          />
        </div>

        <div className="border-t border-white/10 py-16 md:py-20">
          <div className={HOME4_WRAP}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
              Step 3 · Independent advice · Krugersdorp
            </p>
            <div className="mt-6 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <h2
                  id="planning-trust-heading"
                  className="font-bold tracking-tight text-white"
                  style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)", lineHeight: 1.1 }}
                >
                  When you are ready for a plan built around your facts.
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-white/75" style={{ fontSize: "1.0625rem" }}>
                  AS Brokers CC is an independent Category 1.8 FSP (17273) with over 25 years helping
                  West Rand families — advice-led, not call-centre sales or institutional quotas.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
                  >
                    Book a Retirement Strategy Call
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/about"
                    prefetch={false}
                    className="inline-flex items-center rounded-2xl px-6 py-3.5 text-sm font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/5"
                  >
                    About AS Brokers
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <dl className="space-y-5 border border-white/10 bg-white/[0.04] p-7 sm:p-8">
                  {[
                    { dt: "Authorisation", dd: "FSCA FSP 17273 · Category 1.8" },
                    { dt: "Experience", dd: "Serving clients since 1998" },
                    { dt: "Location", dd: "Krugersdorp, West Rand, Gauteng" },
                    { dt: "Approach", dd: "Fiduciary, advice-led, not product quotas" },
                  ].map((row) => (
                    <div key={row.dt} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                        {row.dt}
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium text-white">{row.dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3 — warm depth (optional), then FAQ */}
      <section
        data-chunk-boundary="true"
        className="py-14 md:py-20"
        style={{ backgroundColor: WARM }}
        aria-labelledby="planning-education-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <p
              className="font-semibold uppercase tracking-[0.16em]"
              style={{ fontSize: "0.75rem", color: TEAL }}
            >
              Optional deeper reading
            </p>
            <h2
              id="planning-education-heading"
              className="mt-3 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Structures and guides for the accumulation phase.
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Not required to start the Blueprint or book a call — here when you want more context.
            </p>
          </HubReveal>

          {EDUCATION_CARDS.map((card, index) => (
            <HubReveal key={card.title} delay={index * 0.04} className={card.span}>
              <EducationCard {...card} />
            </HubReveal>
          ))}
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/retirement-planning")} />
      <Footer />
    </>
  );
}
