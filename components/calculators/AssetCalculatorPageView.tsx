"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { EverestCalculatorEmbed } from "@/components/everest/EverestCalculatorEmbed";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { CalculatorPageConfig } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, ChevronRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

export function AssetCalculatorPageView({
  path,
  assetCode,
  kicker,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  calculatorSrc,
  calculatorTitle,
  calculatorLead,
  sidePanelTitle,
  sidePanelParagraphs,
  sidePanelBullets,
  fiduciaryNotes = [],
  howToSteps,
  readingSections,
  faqs,
  categoryLabel,
  categoryHref,
}: CalculatorPageConfig) {
  return (
    <>
      <header
        data-chunk-boundary="true"
        className="border-b border-stone-200/80 pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-stone-500">
              <Link href="/calculators" prefetch={false} className="font-medium hover:text-samsung-blue">
                Calculators
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
              <Link href={categoryHref} prefetch={false} className="font-medium hover:text-samsung-blue">
                {categoryLabel}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
              <span className="text-stone-700">{calculatorTitle}</span>
            </nav>
          </HubReveal>

          <HubReveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              {kicker} · {assetCode}
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
            <Link
              href="#calculator-tool"
              prefetch={false}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e]"
            >
              Use the calculator
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={heroImage}
                alt={getAlt(heroImage, heroImageAlt)}
                fill
                unoptimized
                priority
                fetchPriority="high"
                className="object-cover object-center"
                sizes={HUB_SPLIT_HERO_SIZES}
              />
            </div>
          </HubReveal>
        </div>
      </header>

      <section
        data-chunk-boundary="true"
        className="border-b border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
      >
        <div className={HOME4_WRAP}>
          <HubReveal>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              How to use this calculator
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
              Work through the steps below, then scroll to the tool. Results are illustrative. Book FSP 17273 advice
              when you want numbers tailored to your situation.
            </p>
          </HubReveal>
          <ol className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {howToSteps.map((step, index) => (
              <li key={step.title} className="flex">
                <HubReveal delay={index * 0.04} className="flex flex-1">
                  <div className="flex h-full w-full flex-col rounded-2xl bg-white p-5 ring-1 ring-stone-200/90">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-cinematic-teal">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-2 font-semibold text-shark">{step.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{step.description}</p>
                  </div>
                </HubReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="calculator-tool"
        data-chunk-boundary="true"
        className="scroll-mt-28 border-b border-stone-200/80 py-12 md:py-16 md:scroll-mt-32"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby={`${path}-calculator-heading`}
      >
        <div className={GRID}>
          <HubReveal className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
              >
                {sidePanelTitle}
              </h2>
              {sidePanelParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-4 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {paragraph}
                </p>
              ))}
              {sidePanelBullets.length > 0 ? (
                <ul className="mt-5 space-y-2">
                  {sidePanelBullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 leading-relaxed text-stone-700"
                      style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
                    >
                      <span className="mt-0.5 font-bold text-cinematic-teal" aria-hidden>
                        ·
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {fiduciaryNotes.length > 0 ? (
                <div className="mt-6 rounded-2xl bg-stone-50 p-5 ring-1 ring-stone-200/90">
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Before you begin</p>
                  <ul className="mt-3 space-y-2">
                    {fiduciaryNotes.map((note) => (
                      <li key={note} className="text-sm leading-relaxed text-stone-600">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </HubReveal>

          <HubReveal className="col-span-12 lg:col-span-8">
            <h2 id={`${path}-calculator-heading`} className="text-xl font-bold text-shark sm:text-2xl">
              {calculatorTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">{calculatorLead}</p>
            <div className="mt-6 rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-stone-200/90 sm:p-6">
              <EverestCalculatorEmbed src={calculatorSrc} title={calculatorTitle} />
            </div>
          </HubReveal>
        </div>
      </section>

      {readingSections.map((section, index) => (
        <section
          key={section.heading}
          data-chunk-boundary="true"
          className={`py-12 md:py-16 ${index % 2 === 0 ? "bg-[#FDFCFA]" : ""}`}
          style={index % 2 === 1 ? { backgroundColor: CANVAS } : undefined}
        >
          <div className={HOME4_WRAP}>
            <HubReveal delay={index * 0.03}>
              <h2
                className="max-w-3xl font-bold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
              >
                {section.heading}
              </h2>
              <div className="mt-6 max-w-4xl space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="leading-relaxed"
                    style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </HubReveal>
          </div>
        </section>
      ))}

      <VisibleFaqSection faqs={faqs} />

      <section className="border-t border-stone-200/80 py-12 md:py-14" style={{ backgroundColor: CANVAS }}>
        <div className={`${HOME4_WRAP} text-center`}>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
          >
            Ready for advice built around your numbers?
          </h2>
          <p
            className="mx-auto mt-3 max-w-2xl leading-relaxed"
            style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
          >
            Illustrative tools are a starting point, not personalised advice. Speak with an independent FSP 17273 adviser
            in Krugersdorp when you want clarity on retirement, investments, insurance, or estate planning.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact?source=calculator_terminal"
              prefetch={false}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e]"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Book a capital assessment
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/everest-wealth"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
              style={{ color: INK }}
            >
              Everest Wealth hub
            </Link>
            <Link
              href="/calculators"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
              style={{ color: INK }}
            >
              All calculators
            </Link>
          </div>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks(path)} />
      <Footer />
    </>
  );
}
