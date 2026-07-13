"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { EverestCalculatorEmbed } from "@/components/everest/EverestCalculatorEmbed";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { ensureSixFaqs } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
  HUB_BLUE as BLUE,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8`;

export type EverestFeatureCard = {
  title: string;
  description: string;
  accent?: "teal" | "blue";
  span?: string;
};

export type EverestProductPageProps = {
  path: string;
  kicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  calculatorSrc: string;
  calculatorTitle: string;
  calculatorLead?: string;
  featureCards: EverestFeatureCard[];
  trustCard?: { title: string; description: string };
  fiduciaryNotes: string[];
  cta?: { label: string; href: string };
  pillTags?: string[];
  faqs?: FAQItem[];
};

function FeatureCard({
  title,
  description,
  accent = "teal",
  span = "min-w-0 md:col-span-6",
}: EverestFeatureCard & { span?: string }) {
  const border = accent === "teal" ? TEAL : BLUE;
  return (
    <article className={`${span} h-full`}>
      <div className="flex h-full flex-col rounded-3xl bg-white/95 p-6 shadow-xl ring-1 ring-stone-200/90 backdrop-blur-sm sm:p-8">
        <h3
          className="font-bold tracking-tight"
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
          className="mt-4 inline-block h-1 w-10 rounded-full"
          style={{ backgroundColor: border }}
          aria-hidden
        />
      </div>
    </article>
  );
}

export function EverestProductPageView({
  path,
  kicker,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  calculatorSrc,
  calculatorTitle,
  calculatorLead = "Illustrative calculator only, not a quote, guarantee, or personalised advice.",
  featureCards,
  trustCard,
  fiduciaryNotes,
  cta,
  pillTags,
  faqs = [],
}: EverestProductPageProps) {
  return (
    <>
      <header
        data-chunk-boundary="true"
        className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={`${GRID} items-center gap-y-8`}>
          <HubReveal className="min-w-0 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              {kicker}
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              {heroTitle}
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              {heroSubtitle}
            </p>
            {pillTags && pillTags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {pillTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 shadow-sm ring-1 ring-stone-200/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </HubReveal>

          <HubReveal delay={0.06} className="min-w-0 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={heroImage}
                alt={getAlt(heroImage, heroImageAlt)}
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
        className="border-t border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
      >
        <div className={GRID}>
          {featureCards.map((card, index) => (
            <HubReveal key={card.title} delay={index * 0.04} className={card.span ?? "min-w-0 md:col-span-6"}>
              <FeatureCard {...card} />
            </HubReveal>
          ))}

          {trustCard ? (
            <HubReveal className="min-w-0 lg:col-span-7">
              <article className="h-full rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8">
                <p
                  className="font-semibold uppercase tracking-[0.12em]"
                  style={{ fontSize: "clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem)", color: TEAL }}
                >
                  Tax efficiency
                </p>
                <h2
                  className="mt-2 font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
                >
                  {trustCard.title}
                </h2>
                <p
                  className="mt-3 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {trustCard.description}
                </p>
              </article>
            </HubReveal>
          ) : null}
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby={`${path}-calculator-heading`}
      >
        <div className={GRID}>
          <HubReveal className="min-w-0 lg:col-span-8">
            <h2
              id={`${path}-calculator-heading`}
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              {calculatorTitle}
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {calculatorLead}
            </p>
          </HubReveal>

          <HubReveal className="min-w-0 col-span-full">
            <div className="rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-stone-200/90 sm:p-6">
              <EverestCalculatorEmbed src={calculatorSrc} title={calculatorTitle} />
            </div>
          </HubReveal>

          <HubReveal className="min-w-0 col-span-full">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-8">
              <h3
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", color: INK }}
              >
                Important disclosures
              </h3>
              <ul className="mt-4 space-y-2">
                {fiduciaryNotes.map((note) => (
                  <li
                    key={note}
                    className="leading-relaxed text-stone-700"
                    style={{ fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
                  >
                    {note}
                  </li>
                ))}
              </ul>
              <p
                className="mt-4 leading-relaxed text-stone-600"
                style={{ fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
              >
                Targeted returns are not guaranteed. Educational summary only, suitability depends on your
                circumstances. FSP 17273 · Category 1.8.
              </p>
            </div>
          </HubReveal>

          {cta ? (
            <HubReveal className="min-w-0 col-span-full">
              <Link
                href={cta.href}
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition-all hover:bg-[#004a9e]"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </HubReveal>
          ) : null}
        </div>
      </section>

      {faqs.length > 0 ? (
        <VisibleFaqSection
          faqs={ensureSixFaqs(faqs)}
          primaryCta={{ href: "/contact?source=everest_faq", label: "Contact us" }}
        />
      ) : null}
      <RelatedContent variant="warm" links={getRelatedLinks(path)} />
      <Footer />
    </>
  );
}
