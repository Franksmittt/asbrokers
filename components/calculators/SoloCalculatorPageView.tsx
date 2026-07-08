"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { EverestCalculatorEmbed } from "@/components/everest/EverestCalculatorEmbed";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

export type SoloCalculatorPageProps = {
  path: string;
  kicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  calculatorSrc?: string;
  calculatorTitle: string;
  calculatorLead?: string;
  sidePanelTitle: string;
  sidePanelParagraphs: string[];
  sidePanelBullets?: string[];
  fiduciaryNotes?: string[];
  fallbackPanel?: React.ReactNode;
};

export function SoloCalculatorPageView({
  path,
  kicker,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  calculatorSrc,
  calculatorTitle,
  calculatorLead = "Illustrative calculator only — not a quote, guarantee, or personalised advice.",
  sidePanelTitle,
  sidePanelParagraphs,
  sidePanelBullets = [],
  fiduciaryNotes = [],
  fallbackPanel,
}: SoloCalculatorPageProps) {
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
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
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
                  key={paragraph.slice(0, 40)}
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Before you begin
                  </p>
                  <ul className="mt-3 space-y-2">
                    {fiduciaryNotes.map((note) => (
                      <li
                        key={note}
                        className="text-sm leading-relaxed text-stone-600"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </HubReveal>

          <HubReveal className="col-span-12 lg:col-span-8">
            <h2
              id={`${path}-calculator-heading`}
              className="sr-only"
            >
              {calculatorTitle}
            </h2>
            <p
              className="mb-4 max-w-2xl leading-relaxed lg:sr-only"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {calculatorLead}
            </p>
            <div className="rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-stone-200/90 sm:p-6">
              {calculatorSrc ? (
                <EverestCalculatorEmbed src={calculatorSrc} title={calculatorTitle} />
              ) : (
                fallbackPanel
              )}
            </div>
          </HubReveal>
        </div>
      </section>

      <section
        className="border-t border-stone-200/80 py-12 md:py-14"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={`${HOME4_WRAP} text-center`}>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
          >
            Stop guessing. Let&apos;s look at the math together.
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
          >
            Illustrative tools are a starting point — not personalised advice. Book a conversation with
            an independent FSP 17273 adviser when you want clarity on your numbers.
          </p>
          <Link
            href="/contact"
            prefetch={false}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition-all hover:bg-[#004a9e]"
            style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
          >
            Book a fiduciary review
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks(path)} />
      <Footer />
    </>
  );
}
