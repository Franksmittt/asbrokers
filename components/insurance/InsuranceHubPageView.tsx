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
import { ArrowRight, LineChart, ShieldCheck } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
  HUB_BLUE as BLUE,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

/** Golden-hour suburban family — text lives in a separate column, never overlaid. */
const HERO_IMAGE = "/images/home4-goal-insure-16x9.png";

const CALC_AVERAGE_CLAUSE = "/embed-calculators/asset-015-average-clause.html";
const PREMIUM_LIABILITY = "/solutions/life-insurance";
const BUSINESS_RISK_REVIEW = "/business-risk-review";

const PROTECTION_BLOCKS = [
  {
    title: "My Family's Health",
    description: "Medical aid, gap cover, and wellness benefits structured for your household.",
    href: "/solutions/medical-aid",
    links: [
      { label: "Medical aid", href: "/solutions/medical-aid" },
      { label: "Gap cover", href: "/solutions/medical-aid" },
    ],
    span: "col-span-12 lg:col-span-7",
    accent: "teal" as const,
    large: true,
  },
  {
    title: "My Life & Income",
    description: "Life cover, disability, and severe illness to protect what you earn.",
    href: "/solutions/life-insurance",
    links: [
      { label: "Life cover", href: "/solutions/life-insurance" },
      { label: "Disability & income", href: "/solutions/life-insurance" },
      { label: "Severe illness", href: "/solutions/life-insurance" },
    ],
    span: "col-span-12 lg:col-span-5",
    accent: "blue" as const,
    large: false,
  },
  {
    title: "My Short-Term Assets",
    description: "Premium protection for your home, vehicles, and high-value possessions.",
    href: "/solutions/personal-insurance",
    links: [
      { label: "Home & contents", href: "/solutions/personal-insurance" },
      { label: "Motor & valuables", href: "/solutions/personal-insurance" },
    ],
    span: "col-span-12 lg:col-span-5",
    accent: "teal" as const,
    large: false,
  },
  {
    title: "My Business & Partners",
    description: "Commercial cover, key person protection, and buy & sell continuity.",
    href: "/solutions/business-insurance",
    links: [
      { label: "Business insurance", href: "/solutions/business-insurance" },
      { label: "Key person cover", href: "/solutions/business-life" },
      { label: "Buy & sell agreements", href: "/solutions/business-life" },
    ],
    span: "col-span-12 lg:col-span-7",
    accent: "blue" as const,
    large: true,
  },
];

const RISK_CALCULATORS = [
  {
    code: "ASSET 015",
    title: "Average Clause Calculator",
    description:
      "See how underinsurance can decimate a commercial or home claim when the average clause applies.",
    href: CALC_AVERAGE_CLAUSE,
    accent: "teal" as const,
    span: "col-span-12 lg:col-span-5",
  },
  {
    code: "Premium Liability Test",
    title: "Escalating vs level premiums",
    description:
      "Compare escalating and level life premiums to expose the trap of expiring guarantees.",
    href: PREMIUM_LIABILITY,
    accent: "blue" as const,
    span: "col-span-12 lg:col-span-4",
  },
  {
    code: "Business Risk Review™",
    title: "Gap analysis for owners",
    description:
      "Structured review of commercial, life, and continuity risks — not a generic quote form.",
    href: BUSINESS_RISK_REVIEW,
    accent: "teal" as const,
    span: "col-span-12 lg:col-span-3",
  },
];

const PARTNERS = ["Santam", "Old Mutual", "Bryte"];
const TRUST_BADGES = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

function ProtectionCard({
  title,
  description,
  href,
  links,
  accent,
  large,
}: (typeof PROTECTION_BLOCKS)[number]) {
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
          <ShieldCheck className="h-5 w-5" aria-hidden />
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
        {links.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <span
                  className="inline-flex items-center gap-2 font-semibold"
                  style={{ color: border, fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        <span
          className="mt-5 inline-flex items-center gap-2 font-semibold"
          style={{ color: border, fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
        >
          Explore protection
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </article>
  );
}

function RiskCalculatorTile({
  code,
  title,
  description,
  href,
  accent,
}: (typeof RISK_CALCULATORS)[number]) {
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
          Open tool
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </article>
  );
}

type Props = { faqs: FAQItem[] };

export function InsuranceHubPageView({ faqs }: Props) {
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
              Insurance · Risk Architecture · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              Wealth protection and fiduciary defense.
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              From your health to your business, we structure independent insurance to protect
              exactly what you&apos;ve built.
            </p>
            <Link
              href="/contact"
              prefetch={false}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Request a Risk Audit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "South African family walking together in a suburban driveway at golden hour, home and car softly in the background"
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
        aria-labelledby="insurance-protect-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12 lg:col-span-8">
            <h2
              id="insurance-protect-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              What do you need to protect?
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Start with your life event, not a product catalogue. Choose the area that matches your
              situation and we will guide you from education to advice.
            </p>
          </HubReveal>

          {PROTECTION_BLOCKS.map((block, index) => (
            <HubReveal key={block.title} delay={index * 0.04} className={block.span}>
              <ProtectionCard {...block} />
            </HubReveal>
          ))}
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="insurance-risk-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12 lg:col-span-8">
            <h2
              id="insurance-risk-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Test your current risk exposure.
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Illustrative tools only — not quotes or personalised advice. Use them to spot gaps
              before a fiduciary conversation.
            </p>
          </HubReveal>

          {RISK_CALCULATORS.map((tile, index) => (
            <HubReveal key={tile.code} delay={index * 0.04} className={tile.span}>
              <RiskCalculatorTile {...tile} />
            </HubReveal>
          ))}
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-20"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="insurance-trust-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12">
            <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-stone-200/90 sm:p-10">
              <h2
                id="insurance-trust-heading"
                className="max-w-3xl font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.1rem + 1vw, 2rem)", color: INK }}
              >
                We work for you, not the insurer.
              </h2>
              <p
                className="mt-4 max-w-3xl leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)", color: BODY }}
              >
                As an independent Category 1.8 FSP, we review the entire market to engineer a risk
                architecture that actually pays out when you need it most. No call centres — just
                dedicated fiduciary experts.
              </p>

              <div className="mt-8 border-t border-stone-200/80 pt-8">
                <p
                  className="font-semibold uppercase tracking-[0.18em] text-stone-700"
                  style={{ fontSize: "clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem)" }}
                >
                  Recognised partners
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {PARTNERS.map((partner, index) => (
                    <span key={partner} className="flex items-center gap-x-6">
                      <span
                        className="font-semibold"
                        style={{
                          fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)",
                          color: INK,
                        }}
                      >
                        {partner}
                      </span>
                      {index < PARTNERS.length - 1 ? (
                        <span className="hidden h-4 w-px bg-stone-300 sm:block" aria-hidden />
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>

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
                Speak to a Fiduciary Advisor
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </HubReveal>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/insurance")} />
      <Footer />
    </>
  );
}
