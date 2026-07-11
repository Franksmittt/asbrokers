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
import { ArrowRight, ShieldCheck, FileText } from "@/components/icons";
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

const HERO_IMAGE = "/images/home4-goal-retire-16x9.png";

const CALC_REALITY = calculatorPagePath("asset-002-retirement-reality-check");
const CALC_GROWTH = calculatorPagePath("asset-001-retirement-growth");
const CALC_GOAL = calculatorPagePath("asset-017-personal-goal");

const CALCULATOR_TILES = [
  {
    code: "ASSET 002",
    title: "Retirement Reality Check",
    description: "Compare your desired income against your projected capital to see if a gap exists.",
    href: CALC_REALITY,
    accent: "teal" as const,
  },
  {
    code: "ASSET 001",
    title: "Retirement Growth Calculator",
    description: "Discover the exact return percentage you need to hit your target.",
    href: CALC_GROWTH,
    accent: "blue" as const,
  },
  {
    code: "ASSET 017",
    title: "Personal Goal Growth",
    description: "Project future lump sums based on your monthly contributions.",
    href: CALC_GOAL,
    accent: "teal" as const,
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

const TRUST_FOCUS = ["Tax-Free Investments & RAs", "Preservation Funds", "Retirement Readiness"];
const TRUST_BADGES = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

function EducationCard({
  title,
  description,
  href,
  cta,
  span,
}: (typeof EDUCATION_CARDS)[number]) {
  return (
    <article className={span}>
      <Link
        href={href}
        prefetch={false}
        className="group flex h-full flex-col rounded-2xl bg-white/95 p-6 shadow-lg ring-1 ring-stone-200/80 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
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
      {/* Split hero — text and image in separate grid cells */}
      <header
        data-chunk-boundary="true"
        className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={`${GRID} items-center gap-y-8`}>
          <HubReveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              Pre-retirement · FSP 17273
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
              Clarity on your capital, your timeline, and exactly what growth rate you need to reach
              financial independence.
            </p>
            <Link
              href="/retirement-survival-blueprint"
              prefetch={false}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Take the Retirement Survival Blueprint
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
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
      </header>

      {/* TEMP: 6 Survival Blueprint options — reply A–F */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-10"
        style={{ backgroundColor: CANVAS }}
        aria-label="Retirement Survival Blueprint design options"
      >
        <div className={HOME4_WRAP}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
            Design review · Survival Blueprint block
          </p>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Six options below. Reply with <strong>A</strong>, <strong>B</strong>, <strong>C</strong>,{" "}
            <strong>D</strong>, <strong>E</strong>, or <strong>F</strong> and we&apos;ll lock that one
            in.
          </p>
        </div>
      </section>

      {/* A — Glass card (current direction) */}
      <section
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="planning-worry-a"
      >
        <div className={HOME4_WRAP}>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
            Option A · Glass card
          </p>
          <article className="max-w-3xl rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-stone-200/80 backdrop-blur-xl sm:p-10">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-8 w-8 shrink-0" style={{ color: TEAL }} aria-hidden />
              <div>
                <h2
                  id="planning-worry-a"
                  className="font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.9vw, 2rem)", color: INK }}
                >
                  Will your money survive your retirement?
                </h2>
                <p
                  className="mt-4 max-w-2xl leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.125rem)", color: BODY }}
                >
                  Stop guessing. Take our 5-step guided diagnostic to discover your Financial Freedom
                  Score™ and identify any gaps in your current trajectory.
                </p>
                <Link
                  href="/retirement-survival-blueprint"
                  prefetch={false}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-lg shadow-cta-glow-blue transition hover:bg-[#004a9e]"
                >
                  Start the Retirement Survival Blueprint
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* B — Dark command band */}
      <section
        className="relative overflow-hidden border-t border-stone-800 py-16 md:py-24"
        style={{ backgroundColor: INK }}
        aria-labelledby="planning-worry-b"
      >
        <div
          className="pointer-events-none absolute -right-16 top-8 h-64 w-64 rounded-full bg-cinematic-teal/25 blur-3xl"
          aria-hidden
        />
        <div className={`relative ${HOME4_WRAP}`}>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-white/45">
            Option B · Dark command band
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
            5-step guided diagnostic
          </p>
          <h2
            id="planning-worry-b"
            className="mt-4 max-w-3xl font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)", lineHeight: 1.1 }}
          >
            Will your money survive your retirement?
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75" style={{ fontSize: "1.0625rem" }}>
            Stop guessing. Take our 5-step guided diagnostic to discover your Financial Freedom
            Score™ and identify any gaps in your current trajectory.
          </p>
          <Link
            href="/retirement-survival-blueprint"
            prefetch={false}
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
          >
            Start the Retirement Survival Blueprint
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* C — Split with score panel */}
      <section
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="planning-worry-c"
      >
        <div className={HOME4_WRAP}>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
            Option C · Split + score panel
          </p>
          <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col justify-center lg:col-span-7">
              <h2
                id="planning-worry-c"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.25rem)", color: INK }}
              >
                Will your money survive your retirement?
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed" style={{ fontSize: "1.0625rem", color: BODY }}>
                Stop guessing. Take our 5-step guided diagnostic to discover your Financial Freedom
                Score™ and identify any gaps in your current trajectory.
              </p>
              <Link
                href="/retirement-survival-blueprint"
                prefetch={false}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#004a9e]"
              >
                Start the Retirement Survival Blueprint
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-7 shadow-xl ring-1 ring-stone-200/90 sm:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                    Financial Freedom Score™
                  </p>
                  <p
                    className="mt-4 font-bold tracking-tight text-shark"
                    style={{ fontSize: "clamp(3rem, 2.5rem + 2vw, 4.5rem)", lineHeight: 1 }}
                  >
                    ??
                    <span className="text-2xl font-semibold text-stone-400"> /100</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    Complete the blueprint to unlock your personalised score and gap map.
                  </p>
                </div>
                <div className="mt-8 flex gap-2">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <span
                      key={step}
                      className="flex h-9 flex-1 items-center justify-center rounded-xl bg-stone-100 text-xs font-bold text-stone-500"
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D — Full-bleed gradient banner */}
      <section
        className="border-t border-stone-200/80 py-16 md:py-24"
        style={{
          background: "linear-gradient(135deg, #004a9e 0%, #006b6b 55%, #1D1D1F 100%)",
        }}
        aria-labelledby="planning-worry-d"
      >
        <div className={`${HOME4_WRAP} text-center`}>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-white/50">
            Option D · Gradient banner
          </p>
          <ShieldCheck className="mx-auto h-10 w-10 text-white/80" aria-hidden />
          <h2
            id="planning-worry-d"
            className="mx-auto mt-5 max-w-3xl font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)", lineHeight: 1.1 }}
          >
            Will your money survive your retirement?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/80" style={{ fontSize: "1.0625rem" }}>
            Stop guessing. Take our 5-step guided diagnostic to discover your Financial Freedom
            Score™ and identify any gaps in your current trajectory.
          </p>
          <Link
            href="/retirement-survival-blueprint"
            prefetch={false}
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
          >
            Start the Retirement Survival Blueprint
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* E — Numbered runway */}
      <section
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="planning-worry-e"
      >
        <div className={HOME4_WRAP}>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
            Option E · Numbered runway
          </p>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2
                id="planning-worry-e"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.25rem)", color: INK }}
              >
                Will your money survive your retirement?
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed" style={{ fontSize: "1.0625rem", color: BODY }}>
                Stop guessing. Take our 5-step guided diagnostic to discover your Financial Freedom
                Score™ and identify any gaps in your current trajectory.
              </p>
              <Link
                href="/retirement-survival-blueprint"
                prefetch={false}
                className="mt-8 inline-flex items-center gap-2 border-b-2 border-samsung-blue pb-1 font-semibold text-samsung-blue transition hover:opacity-80"
              >
                Start the Retirement Survival Blueprint
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <ol className="grid list-none grid-cols-5 gap-2 lg:col-span-5">
              {["Capital", "Income", "Timeline", "Gaps", "Score"].map((label, i) => (
                <li
                  key={label}
                  className="rounded-2xl bg-white px-2 py-4 text-center shadow-md ring-1 ring-stone-200/90"
                >
                  <span className="block text-lg font-bold tabular-nums text-cinematic-teal">
                    {i + 1}
                  </span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-stone-500">
                    {label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* F — Photo editorial split */}
      <section
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="planning-worry-f"
      >
        <div className={HOME4_WRAP}>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
            Option F · Photo editorial
          </p>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-300/70 lg:col-span-5 lg:aspect-auto lg:min-h-[360px]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(HERO_IMAGE, "Couple reviewing retirement plans")}
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-cinematic-teal/10 px-3 py-1.5">
                <ShieldCheck className="h-4 w-4" style={{ color: TEAL }} aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
                  Financial Freedom Score™
                </span>
              </div>
              <h2
                id="planning-worry-f"
                className="mt-5 font-bold tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.25rem)", color: INK }}
              >
                Will your money survive your retirement?
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed" style={{ fontSize: "1.0625rem", color: BODY }}>
                Stop guessing. Take our 5-step guided diagnostic to discover your Financial Freedom
                Score™ and identify any gaps in your current trajectory.
              </p>
              <Link
                href="/retirement-survival-blueprint"
                prefetch={false}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#004a9e]"
              >
                Start the Retirement Survival Blueprint
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HubCalculatorToolBay
        headingId="planning-calculators-heading"
        title="Run your own numbers."
        lead="Illustrative tools for the accumulation phase. Educational only — not personalised advice."
        tools={CALCULATOR_TILES.map((tile) => ({
          code: tile.code,
          title: tile.title,
          description: tile.description,
          href: tile.href,
          span: "col-span-12 md:col-span-4",
        }))}
      />

      {/* Education */}
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 bg-white/60 py-14 md:py-20"
        aria-labelledby="planning-education-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 shrink-0" style={{ color: TEAL }} aria-hidden />
              <h2
                id="planning-education-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
              >
                Master your accumulation phase.
              </h2>
            </div>
          </HubReveal>

          {EDUCATION_CARDS.map((card, index) => (
            <HubReveal key={card.title} delay={index * 0.05} className={card.span}>
              <EducationCard {...card} />
            </HubReveal>
          ))}
        </div>
      </section>

      {/* Fiduciary trust */}
      <section
        data-chunk-boundary="true"
        className="relative overflow-hidden border-t border-stone-800 py-16 md:py-24"
        style={{ backgroundColor: INK }}
        aria-labelledby="planning-trust-heading"
      >
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-cinematic-teal/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-samsung-blue/20 blur-3xl"
          aria-hidden
        />
        <div className={`relative ${HOME4_WRAP}`}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h2
                id="planning-trust-heading"
                className="font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)", lineHeight: 1.1 }}
              >
                Expert guidance for your final working years.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/75" style={{ fontSize: "1.0625rem" }}>
                As an independent Category 1.8 FSP, we engineer wealth-building strategies that
                aren&apos;t tied to a single institution. Let&apos;s build a plan that works for you.
              </p>
              <Link
                href="/contact"
                prefetch={false}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
              >
                Book a Retirement Strategy Call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur-2xl sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                  Retirement focus
                </p>
                <ul className="mt-5 space-y-3">
                  {TRUST_FOCUS.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-base font-semibold text-white">{item}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-cinematic-teal" aria-hidden />
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2">
                  {TRUST_BADGES.map((b) => (
                    <span
                      key={b}
                      className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/85 ring-1 ring-white/10"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/retirement-planning")} />
      <Footer />
    </>
  );
}
