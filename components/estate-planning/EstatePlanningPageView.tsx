"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, FileText, LineChart, Scroll } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
  HUB_BLUE as BLUE,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";
import { calculatorPagePath } from "@/lib/calculators/page-path";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

const HERO_IMAGE = "/images/home4-goal-estate-16x9.png";

const CALC_ESTATE_DUTY = calculatorPagePath("asset-007-estate-duty");
const CALC_ESTATE_REDUCTION = calculatorPagePath("asset-008-estate-reduction");

const OUTCOME_CARDS = [
  {
    title: "Wills & Trusts",
    description: "Structure your legacy to protect your dependents and ring-fence your assets.",
    href: "/legacy-readiness-checklist",
    span: "col-span-12 lg:col-span-7",
    accent: "teal" as const,
    large: true,
  },
  {
    title: "Estate Duty & Tax Planning",
    description:
      "Legally minimize SARS liabilities so your family inherits your wealth, not the taxman.",
    href: CALC_ESTATE_DUTY,
    span: "col-span-12 lg:col-span-5",
    accent: "blue" as const,
    large: false,
  },
  {
    title: "Business Succession",
    description:
      "Buy-and-sell agreements and continuity planning to ensure your life's work survives you.",
    href: "/solutions/business-life",
    span: "col-span-12 lg:col-span-5",
    accent: "blue" as const,
    large: false,
  },
  {
    title: "Executor & Liquidity Planning",
    description:
      "Ensure your estate has the immediate cash flow required to settle fees and avoid forced asset sales.",
    href: "/contact",
    span: "col-span-12 lg:col-span-7",
    accent: "teal" as const,
    large: true,
  },
];

const ESTATE_CALCULATORS = [
  {
    code: "ASSET 007",
    title: "Estate Duty & Executor Fee Calculator",
    description:
      "Expose the cost of dying: duty, executor fees, and liquidity stress before your family faces it.",
    href: CALC_ESTATE_DUTY,
    accent: "teal" as const,
    span: "col-span-12 lg:col-span-7",
  },
  {
    code: "ASSET 008",
    title: "Estate Reduction Strategy",
    description:
      "Model R100k and R200k annual donation strategies to reduce estate duty within SARS limits.",
    href: CALC_ESTATE_REDUCTION,
    accent: "blue" as const,
    span: "col-span-12 lg:col-span-5",
  },
];

const EDUCATION_PILLARS = [
  {
    title: "Latest Legacy Guides",
    description: "Plain-language articles on wills, trusts, duty, and succession for South African families.",
    href: "/insights",
    cta: "Browse legacy guides",
  },
  {
    title: "Retirement & Estate Articles",
    description: "How retirement capital, living annuities, and estate liquidity interact in real plans.",
    href: "/insights",
    cta: "Read retirement & estate insights",
  },
];

const TRUST_BADGES = ["FSP 17273", "25+ Years of Experience"];

function OutcomeCard({
  title,
  description,
  href,
  accent,
  large,
}: (typeof OUTCOME_CARDS)[number]) {
  const border = accent === "teal" ? TEAL : BLUE;
  return (
    <article className="h-full">
      <Link
        href={href}
        prefetch={false}
        className="group flex h-full min-h-[12rem] flex-col rounded-2xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(29,29,31,0.12)] sm:p-8"
      >
        <div
          className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${border}18`, color: border }}
        >
          <Scroll className="h-5 w-5" aria-hidden />
        </div>
        <h3
          className="font-bold tracking-tight"
          style={{
            fontSize: large
              ? "clamp(1.25rem, 1.1rem + 0.55vw, 1.5625rem)"
              : "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)",
            color: INK,
          }}
        >
          {title}
        </h3>
        <p
          className="mt-3 flex-1 leading-relaxed"
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
        >
          {description}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2 font-semibold"
          style={{ color: border, fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
        >
          Explore outcome
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </article>
  );
}

function EstateCalculatorTile({
  code,
  title,
  description,
  href,
  accent,
}: (typeof ESTATE_CALCULATORS)[number]) {
  const border = accent === "teal" ? TEAL : BLUE;
  return (
    <article className="h-full">
      <Link
        href={href}
        prefetch={false}
        className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(29,29,31,0.12)] sm:p-7"
      >
        <div
          className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${border}18`, color: border }}
        >
          <LineChart className="h-5 w-5" aria-hidden />
        </div>
        <p
          className="font-semibold uppercase tracking-[0.12em]"
          style={{ fontSize: "clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem)", color: TEAL }}
        >
          {code}
        </p>
        <h3
          className="mt-2 font-bold tracking-tight"
          style={{ fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", color: INK }}
        >
          {title}
        </h3>
        <p
          className="mt-3 flex-1 leading-relaxed"
          style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
        >
          {description}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2 font-semibold"
          style={{ color: border, fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
        >
          Open calculator
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </article>
  );
}

type Props = { faqs: FAQItem[] };

export function EstatePlanningPageView({ faqs }: Props) {
  return (
    <>
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
              Estate Planning · Legacy Structuring · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              Protecting your legacy. Engineering your wealth.
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              Wills, trusts, duty, and legacy outcomes to ensure your assets transfer seamlessly
              without unnecessary tax burdens or delays.
            </p>
            <Link
              href="/legacy-readiness-checklist"
              prefetch={false}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Take the Legacy Readiness Checklist
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Multi-generational South African family planning their legacy together"
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

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="estate-outcomes-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12 lg:col-span-8">
            <h2
              id="estate-outcomes-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              What outcome are you planning for?
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Start with the result you want, not a product brochure. We coordinate financial and
              risk architecture with your attorney who drafts binding legal instruments.
            </p>
          </HubReveal>

          {OUTCOME_CARDS.map((card, index) => (
            <HubReveal key={card.title} delay={index * 0.04} className={card.span}>
              <OutcomeCard {...card} />
            </HubReveal>
          ))}
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="estate-calculators-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12 lg:col-span-8">
            <h2
              id="estate-calculators-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Planning Tools &amp; Calculators.
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Illustrative calculators only — not SARS assessments or legal advice. Use them to grasp
              scale, then involve qualified professionals for your specific facts.
            </p>
          </HubReveal>

          {ESTATE_CALCULATORS.map((tile, index) => (
            <HubReveal key={tile.code} delay={index * 0.04} className={tile.span}>
              <EstateCalculatorTile {...tile} />
            </HubReveal>
          ))}
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 bg-white/60 py-14 md:py-20"
        aria-labelledby="estate-education-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 shrink-0" style={{ color: TEAL }} aria-hidden />
              <h2
                id="estate-education-heading"
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
              >
                Master your estate planning.
              </h2>
            </div>
          </HubReveal>

          {EDUCATION_PILLARS.map((pillar, index) => (
            <HubReveal
              key={pillar.title}
              delay={index * 0.04}
              className="col-span-12 md:col-span-6"
            >
              <article className="h-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8">
                <h3
                  className="font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="mt-3 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {pillar.description}
                </p>
                <Link
                  href={pillar.href}
                  prefetch={false}
                  className="mt-5 inline-flex items-center gap-2 font-semibold"
                  style={{ color: TEAL, fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
                >
                  {pillar.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </HubReveal>
          ))}
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="estate-trust-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <article className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-stone-200/90 sm:p-10">
              <h2
                id="estate-trust-heading"
                className="max-w-3xl font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.1rem + 1vw, 2rem)", color: INK }}
              >
                Fiduciary structuring you can trust.
              </h2>
              <p
                className="mt-4 max-w-3xl leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)", color: BODY }}
              >
                As an independent Category 1.8 FSP with over 25 years of experience, we engineer
                estate plans that serve your family, not institutional executors.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 ring-1 ring-stone-200/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                prefetch={false}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
              >
                Book an Estate Planning Review
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>

              <p
                className="mt-8 max-w-3xl leading-relaxed text-stone-600"
                style={{ fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
              >
                AS Brokers does not draft wills or trust deeds and does not provide legal or tax advice
                on this website. Calculators and articles are educational. Verify current SARS position
                with qualified professionals.{" "}
                <Link
                  href="/regulatory-compliance"
                  prefetch={false}
                  className="font-semibold hover:opacity-80"
                  style={{ color: TEAL }}
                >
                  Disclosures
                </Link>
                .
              </p>
            </article>
          </HubReveal>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/estate-planning")} />
      <Footer />
    </>
  );
}
