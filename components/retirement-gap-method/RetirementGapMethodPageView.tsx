import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { ArrowRight } from "@/components/icons";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { HOME4_WRAP } from "@/lib/layout-constants";
import { getRelatedLinks } from "@/lib/related-content";
import {
  FFC_PATH,
  FFC_REGISTER_PATH,
  GAP_CAUSE_CARDS,
  LEARN_PATH_CARDS,
  METHOD_FAQS,
  METHOD_JOURNEY_STEPS,
  METHOD_PATH,
  METHOD_TOOLKIT_LINKS,
  RETIREMENT_GAP_WORKSHOP,
  REVIEW_HREF,
  TOOLKIT_PATH,
  WORKSHOP_REGISTER_HREF,
} from "@/lib/retirement-gap-method/content";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#3f3a36";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const GOLD = "#D4AF37";

const PRIMARY_BTN =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#1D1D1F] transition hover:opacity-90";
const SECONDARY_BTN =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15";
const LIGHT_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-6 py-3.5 text-sm font-bold text-white transition hover:opacity-90";
const LIGHT_SECONDARY =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-[#1D1D1F] ring-1 ring-stone-300 transition hover:bg-white";

/**
 * Asset 018: Retirement Gap Method™ cornerstone landing page (no calculator).
 */
export function RetirementGapMethodPageView() {
  const related = getRelatedLinks(METHOD_PATH);

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      {/* §1 Hero */}
      <header className="border-b border-white/10 bg-[#1D1D1F] pb-16 pt-28 text-white md:pb-24 md:pt-36">
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: GOLD }}
          >
            The Retirement Gap Method™
          </p>
          <h1
            className="mt-5 max-w-3xl font-bold tracking-tight text-balance"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3.25rem)", lineHeight: 1.12 }}
          >
            Understand your Retirement Gap.
            <br />
            Measure it.
            <br />
            Close it.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Most people don&apos;t experience financial difficulty in retirement because of one bad
            decision. They experience it because dozens of small financial decisions compound over
            many years. The Retirement Gap Method™ provides a practical educational framework that
            helps South Africans understand, measure and progressively close their Retirement Gap
            through better financial decisions.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href={TOOLKIT_PATH} prefetch={false} className={PRIMARY_BTN}>
              Explore the Retirement Gap Toolkit™
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href={WORKSHOP_REGISTER_HREF} prefetch={false} className={SECONDARY_BTN}>
              Reserve My Workshop Seat
            </Link>
          </div>
        </div>
      </header>

      {/* §2 Why we created it */}
      <section className="border-b py-14 md:py-20" style={{ borderColor: HAIRLINE }} aria-labelledby="why-created">
        <div className={`${HOME4_WRAP} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
              Why this exists
            </p>
            <h2
              id="why-created"
              className="mt-3 max-w-md font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Why we created the Retirement Gap Method™
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed" style={{ color: BODY }}>
              Most retirement planning begins with financial products. We believe retirement
              planning should begin with understanding.
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: BODY }}>
              Many South Africans approaching retirement ask the same questions:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "Have I saved enough?",
                "Can I afford to retire?",
                "Will my money last?",
                "What should I do with my retirement savings?",
                "Am I making good financial decisions?",
                "How do I close my Retirement Gap?",
              ].map((q) => (
                <li
                  key={q}
                  className="rounded-2xl bg-white px-4 py-3 text-sm font-medium ring-1 ring-stone-200/90"
                  style={{ color: INK }}
                >
                  {q}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed" style={{ color: BODY }}>
              The Retirement Gap Method™ was created to answer these questions and provide a
              structured pathway that helps people understand, measure and progressively close their
              Retirement Gap.
            </p>
          </div>
        </div>
      </section>

      {/* §3 What is a Retirement Gap */}
      <section
        className="border-b py-14 md:py-20"
        style={{ borderColor: HAIRLINE, backgroundColor: "#FDFCFA" }}
        aria-labelledby="what-is-gap"
      >
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
            Definition
          </p>
          <h2
            id="what-is-gap"
            className="mt-3 font-bold tracking-tight"
            style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
          >
            What is a Retirement Gap?
          </h2>
          <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: BODY }}>
            A Retirement Gap is the shortfall between the retirement income your savings may
            produce and the income you expect to need. Capital is what you have accumulated. Income
            is what that capital can responsibly produce over time.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: BODY }}>
            Understanding that difference is one of the foundations of the Retirement Gap Method™.
            The Toolkit helps you measure it. The Method helps you decide what to do next.
          </p>
          <Link
            href={calculatorPagePath("asset-002-retirement-reality-check")}
            prefetch={false}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
            style={{ color: TEAL }}
          >
            Start with the Retirement Reality Check
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* §4 Why gaps develop */}
      <section className="border-b py-14 md:py-20" style={{ borderColor: HAIRLINE }} aria-labelledby="why-gaps">
        <div className={HOME4_WRAP}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
            Causes
          </p>
          <h2
            id="why-gaps"
            className="mt-3 max-w-2xl font-bold tracking-tight"
            style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
          >
            Why Retirement Gaps develop
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GAP_CAUSE_CARDS.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl bg-white p-5 ring-1 ring-stone-200/90 sm:p-6"
              >
                <h3 className="text-base font-bold tracking-tight" style={{ color: INK }}>
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  {card.description}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-base font-medium leading-relaxed" style={{ color: INK }}>
            Most Retirement Gaps are not caused by one major mistake. They are the result of many
            small financial decisions made over many years.
          </p>
        </div>
      </section>

      {/* §5 Journey */}
      <section
        className="border-b bg-[#1D1D1F] py-14 text-white md:py-20"
        aria-labelledby="journey-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: TEAL_ON_DARK }}
          >
            Process
          </p>
          <h2
            id="journey-heading"
            className="mt-3 max-w-2xl font-bold tracking-tight"
            style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)" }}
          >
            The Retirement Gap Journey
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {METHOD_JOURNEY_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  {step.step}
                </p>
                <h3 className="mt-2 text-lg font-bold" style={{ color: GOLD }}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.description}</p>
                {index < METHOD_JOURNEY_STEPS.length - 1 ? (
                  <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-white/30 md:block" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §6 Toolkit */}
      <section className="border-b py-14 md:py-20" style={{ borderColor: HAIRLINE }} aria-labelledby="toolkit-heading">
        <div className={HOME4_WRAP}>
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
              Measure
            </p>
            <h2
              id="toolkit-heading"
              className="mt-3 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              The Retirement Gap Toolkit™
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: BODY }}>
              Every calculator answers a different retirement question. Together they provide a
              complete picture of a person&apos;s Retirement Gap, before product conversations begin.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METHOD_TOOLKIT_LINKS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                prefetch={false}
                className="group flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-stone-200/90 transition hover:ring-stone-300 sm:p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                  {tool.assetCode}
                </p>
                <h3 className="mt-2 text-lg font-bold tracking-tight group-hover:opacity-80" style={{ color: INK }}>
                  {tool.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: BODY }}>
                  {tool.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: TEAL }}>
                  Open tool
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link href={TOOLKIT_PATH} prefetch={false} className={LIGHT_PRIMARY}>
              Explore the Retirement Gap Toolkit™
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* §7 Three ways to learn */}
      <section
        className="border-b py-14 md:py-20"
        style={{ borderColor: HAIRLINE, backgroundColor: "#FDFCFA" }}
        aria-labelledby="three-ways"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="three-ways"
            className="max-w-2xl font-bold tracking-tight"
            style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
          >
            Three ways to learn
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {LEARN_PATH_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-stone-200/90"
              >
                <h3 className="text-xl font-bold tracking-tight" style={{ color: INK }}>
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: BODY }}>
                  {card.description}
                </p>
                <Link
                  href={card.ctaHref}
                  prefetch={false}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: TEAL }}
                >
                  {card.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §8 Workshop */}
      <section className="border-b py-14 md:py-20" style={{ borderColor: HAIRLINE }} aria-labelledby="workshop-heading">
        <div className={`${HOME4_WRAP} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
              {RETIREMENT_GAP_WORKSHOP.eyebrow}
            </p>
            <h2
              id="workshop-heading"
              className="mt-3 font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              {RETIREMENT_GAP_WORKSHOP.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: BODY }}>
              {RETIREMENT_GAP_WORKSHOP.lead}
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {RETIREMENT_GAP_WORKSHOP.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-base leading-relaxed" style={{ color: BODY }}>
                  <span className="mt-1 font-bold" style={{ color: TEAL }} aria-hidden>
                    ·
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-3xl bg-[#1D1D1F] p-6 text-white sm:p-8">
              <p className="text-sm leading-relaxed text-white/75">{RETIREMENT_GAP_WORKSHOP.scheduleNote}</p>
              <p className="mt-3 text-xs leading-relaxed text-white/50">{RETIREMENT_GAP_WORKSHOP.formatNote}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={RETIREMENT_GAP_WORKSHOP.primaryCtaHref}
                  prefetch={false}
                  className={PRIMARY_BTN}
                >
                  {RETIREMENT_GAP_WORKSHOP.primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={RETIREMENT_GAP_WORKSHOP.secondaryCtaHref}
                  prefetch={false}
                  className={SECONDARY_BTN}
                >
                  {RETIREMENT_GAP_WORKSHOP.secondaryCtaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §9 Financial Freedom Community */}
      <section
        className="border-b py-14 md:py-20"
        style={{ borderColor: HAIRLINE, backgroundColor: "#FDFCFA" }}
        aria-labelledby="ffc-heading"
      >
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
            Next step after the workshop
          </p>
          <h2
            id="ffc-heading"
            className="mt-3 font-bold tracking-tight"
            style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
          >
            Financial Freedom Community™
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: BODY }}>
            After the workshop, the Financial Freedom Community™ is the deeper educational pathway, 
            a 12-week programme that unlocks proprietary members planning tools, including the Goal
            Engineering Planner™, once registration and payment are complete.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={FFC_PATH} prefetch={false} className={LIGHT_PRIMARY}>
              Explore the Community
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href={FFC_REGISTER_PATH} prefetch={false} className={LIGHT_SECONDARY}>
              Start registration
            </Link>
          </div>
        </div>
      </section>

      {/* §10 Why AS Brokers */}
      <section className="border-b py-14 md:py-20" style={{ borderColor: HAIRLINE }} aria-labelledby="why-asb">
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <h2
            id="why-asb"
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
          >
            Why AS Brokers?
          </h2>
          <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: BODY }}>
            We believe people make better financial decisions when they first understand the
            principles behind those decisions.
          </p>
          <p className="mt-4 text-base font-semibold leading-relaxed" style={{ color: INK }}>
            Our mission is simple: help South Africans understand, measure and close their
            Retirement Gap.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">
            AS Brokers CC · FSP 17273 · Independent Category 1.8 advice · Krugersdorp, Gauteng.
          </p>
        </div>
      </section>

      {/* §10b FAIS Section 1(3)(a) disclaimer */}
      <section className="border-b py-8 md:py-10" style={{ borderColor: HAIRLINE, backgroundColor: "#FDFCFA" }}>
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <p className="text-xs leading-relaxed text-stone-500">
            <strong className="text-stone-600">General information notice (FAIS Act, Section 1(3)(a)):</strong>{" "}
            The Retirement Gap Method™, its calculators, workshop, and all educational content on this page
            constitute factual information as contemplated in Section 1(3)(a) of the Financial Advisory and
            Intermediary Services Act, 37 of 2002. None of this material constitutes financial, investment,
            legal, or tax advice. No recommendation is made regarding the suitability of any financial product
            for any individual. Personal financial advice requires a Financial Needs Analysis conducted by an
            authorised representative of AS Brokers CC (FSP 17273).
          </p>
        </div>
      </section>

      {/* §11 FAQs */}
      <VisibleFaqSection heading="Frequently asked questions" faqs={[...METHOD_FAQS]} />

      {/* §12 Final CTA */}
      <section className="border-b bg-[#1D1D1F] py-14 text-white md:py-20" aria-labelledby="ready-heading">
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <h2
            id="ready-heading"
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)" }}
          >
            Ready to close your Retirement Gap?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Whether retirement is five years away or you have already retired, understanding your
            Retirement Gap is one of the most valuable financial decisions you can make.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={TOOLKIT_PATH} prefetch={false} className={PRIMARY_BTN}>
              Explore the Retirement Gap Toolkit™
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href={WORKSHOP_REGISTER_HREF} prefetch={false} className={SECONDARY_BTN}>
              Reserve My Workshop Seat
            </Link>
            <Link href={REVIEW_HREF} prefetch={false} className={SECONDARY_BTN}>
              Book a Retirement Gap Review
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <RelatedContent heading="Continue exploring" links={related} />
      ) : null}

      <Footer />
    </div>
  );
}
