import Link from "next/link";
import { CalculatorsHubBelowFold } from "@/components/calculators/CalculatorsHubBelowFold";
import { Footer } from "@/components/Footer";
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { HOME4_WRAP } from "@/lib/layout-constants";
import { ArrowRight } from "@/components/icons";
import {
  HUB_START_HERE,
  getHubCalculatorById,
  type HubStartHereItem,
} from "@/lib/calculators/hub-catalog";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#3f3a36";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";

const HERO_ALT =
  "Couple reviewing finances with a calculator at a dining table at home";

const METHOD_HREF = "/retirement-gap-method";
const REVIEW_HREF = "/contact?source=retirement_gap_review";

const PRIMARY_CLASS =
  "inline-flex items-center gap-2 rounded bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]";
const SECONDARY_CLASS =
  "inline-flex items-center gap-2 text-sm font-semibold text-[#006B6B] hover:opacity-80";

type FaqItem = { question: string; answer: string };

function SectionHeader({
  kicker,
  headingId,
  title,
  lead,
  invert = false,
}: {
  kicker: string;
  headingId: string;
  title: string;
  lead?: string;
  invert?: boolean;
}) {
  return (
    <div className="min-w-0 max-w-2xl">
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
        style={{ color: invert ? TEAL_ON_DARK : TEAL }}
      >
        {kicker}
      </p>
      <h2
        id={headingId}
        className={`mt-3 text-2xl font-serif font-semibold tracking-tight sm:text-[1.75rem] ${
          invert ? "text-white" : ""
        }`}
        style={{ color: invert ? undefined : INK }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-base ${invert ? "text-white/70" : ""}`}
          style={invert ? undefined : { color: BODY }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

function StartHereRow({ item }: { item: HubStartHereItem }) {
  const tool = item.calculatorId ? getHubCalculatorById(item.calculatorId) : undefined;
  const href = tool?.href ?? item.categoryHref ?? "#toolkit";
  const label = tool?.title ?? item.categoryLabel ?? "Open calculator";

  return (
    <li className="border-b last:border-b-0" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
      <Link
        href={href}
        prefetch={false}
        className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
      >
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            I want to know…
          </p>
          <p className="mt-1.5 font-serif text-lg font-semibold tracking-tight text-white sm:text-xl">
            {item.question}
          </p>
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold transition group-hover:opacity-80"
          style={{ color: TEAL_ON_DARK }}
        >
          {label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </Link>
    </li>
  );
}

/**
 * Calculators hub (RSC): Retirement Gap Toolkit™ (ASSET 000).
 * Entire hub stays server-rendered, do not gate chapters behind click/idle.
 */
export function CalculatorsHubView({ faqItems }: { faqItems: FaqItem[] }) {
  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      <MarketingHubHero
        kicker="The Retirement Gap Toolkit™"
        title="Understand your Retirement Gap, one calculation at a time."
        description="Every retirement decision answers a different question. How much should you save? Can you afford to retire? How long will your money last? What income can your investments provide? No single calculator can answer every retirement question. The Retirement Gap Toolkit™ brings together educational calculators designed to help South Africans understand, measure and improve their retirement position, one calculation at a time."
        actions={
          <>
            <a href="#toolkit" className={PRIMARY_CLASS}>
              Start Exploring the Toolkit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href={METHOD_HREF} prefetch={false} className={SECONDARY_CLASS}>
              Learn the Retirement Gap Method™
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </>
        }
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <picture>
              <source
                media="(min-width: 769px)"
                type="image/webp"
                srcSet="/images/calculators-hub-16x9-960.webp"
              />
              <source type="image/webp" srcSet="/images/calculators-hub-16x9-480.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized public LCP sources */}
              <img
                src="/images/calculators-hub-16x9-480.webp"
                alt={HERO_ALT}
                width={480}
                height={359}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </picture>
          </figure>
        }
      />

      <section
        className="border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="why-toolkit-heading"
      >
        <div className={HOME4_WRAP}>
          <SectionHeader
            kicker="Why this exists"
            headingId="why-toolkit-heading"
            title="Why We Built the Retirement Gap Toolkit™"
            lead="Many people believe retirement planning is one calculation. It isn't."
          />
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
            <p>
              Every important retirement decision answers a different financial question. One
              calculator estimates how much you should save. Another estimates how long your money
              may last. Others explore retirement income, investment growth, taxation and estate
              planning.
            </p>
            <p>
              The Retirement Gap Toolkit™ brings these individual calculations together in one
              place, helping you build a more complete understanding of your retirement position.
            </p>
          </div>
        </div>
      </section>

      <section
        id="start-here"
        className="scroll-mt-28 bg-shark py-16 text-white md:py-24"
        aria-labelledby="start-here-heading"
      >
        <div className={HOME4_WRAP}>
          <SectionHeader
            kicker="Start here"
            headingId="start-here-heading"
            title="Not sure where to begin?"
            lead="Choose the calculator that best matches your current situation. This is the natural starting point before you browse the full Toolkit."
            invert
          />
          <ul className="mt-10 max-w-3xl border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            {HUB_START_HERE.map((item) => (
              <StartHereRow
                key={item.calculatorId ?? item.categoryHref ?? item.question}
                item={item}
              />
            ))}
          </ul>
        </div>
      </section>

      <CalculatorsHubBelowFold />

      <section
        className="border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="whole-story-heading"
      >
        <div className={HOME4_WRAP}>
          <SectionHeader
            kicker="The bigger picture"
            headingId="whole-story-heading"
            title="One Calculator Never Tells the Whole Story"
          />
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
            <p>Every calculator answers an important question. No calculator answers every question.</p>
            <p>
              Your retirement position depends on many different financial decisions working
              together. The Retirement Gap Toolkit™ helps you calculate individual parts of your
              retirement journey. The Retirement Gap Method™ explains how those pieces fit together.
            </p>
          </div>
          <p className="mt-8">
            <Link href={METHOD_HREF} prefetch={false} className={SECONDARY_CLASS}>
              Learn the Retirement Gap Method™
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section
        id="retirement-gap-method"
        className="scroll-mt-28 bg-shark py-16 text-white md:py-24"
        aria-labelledby="method-intro-heading"
      >
        <div className={HOME4_WRAP}>
          <SectionHeader
            kicker="Asset 018"
            headingId="method-intro-heading"
            title="The Retirement Gap Method™"
            lead="Numbers are only the beginning."
            invert
          />
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-white/70 sm:text-base">
            <p>
              The Retirement Gap Toolkit™ gives you the numbers. The Retirement Gap Method™ helps
              you understand what those numbers mean.
            </p>
            <p>It provides a structured educational framework that helps you:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-[#5EEAD4]">
              <li>Understand your Retirement Gap.</li>
              <li>Interpret calculator results.</li>
              <li>Recognise common retirement planning mistakes.</li>
              <li>Identify the financial decisions that matter most.</li>
              <li>Learn practical ways to improve your retirement future.</li>
            </ul>
            <p>
              This page introduces the Method only. Detailed information about the Workshop and
              Financial Freedom Community belongs exclusively on the Method page.
            </p>
          </div>
          <p className="mt-10">
            <Link
              href={METHOD_HREF}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Discover the Retirement Gap Method™
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section
        className="pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="journey-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="rounded-xl bg-shark px-6 py-10 text-white sm:px-10 sm:py-12">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL_ON_DARK }}
            >
              Next step
            </p>
            <h2
              id="journey-heading"
              className="mt-3 max-w-2xl font-serif text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
            >
              Start Your Retirement Journey
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Whether you are beginning to save, approaching retirement or already retired,
              understanding your Retirement Gap is one of the most valuable financial decisions you
              can make. The Retirement Gap Toolkit™ gives you the numbers. The Retirement Gap
              Method™ helps you understand what those numbers mean, and what to do next.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Link
                href={METHOD_HREF}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Explore the Retirement Gap Method™
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={REVIEW_HREF}
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline-offset-2 hover:text-white hover:underline"
              >
                Book a Retirement Gap Review
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t pb-12 pt-10 md:pb-16"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="toolkit-disclaimer-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="max-w-3xl">
            <h2
              id="toolkit-disclaimer-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: TEAL }}
            >
              Educational purposes only
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
              The Retirement Gap Toolkit™ provides educational calculations to improve your
              understanding of retirement planning concepts. It does not replace personalised
              financial advice, which should always consider your individual financial
              circumstances, objectives and needs. AS Brokers CC is an authorised financial
              services provider (FSP 17273).
            </p>
          </div>
        </div>
      </section>

      <VisibleFaqSection
        faqs={faqItems}
        id="faq"
        headingId="calc-faq-heading"
        kicker="Toolkit FAQ"
        heading="Questions about the Retirement Gap Toolkit™"
        lead="Educational tools first. Personal financial advice only after a needs analysis with AS Brokers CC, FSP 17273."
        primaryCta={{
          href: METHOD_HREF,
          label: "Learn the Method™",
        }}
        secondaryCta={{
          href: REVIEW_HREF,
          label: "Book a Retirement Gap Review",
        }}
      />

      <Footer />
    </div>
  );
}
