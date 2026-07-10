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
import { ArrowRight, Briefcase } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-x-6 gap-y-6 lg:gap-x-8 lg:gap-y-8`;

const HERO_IMAGE = "/images/home4-why-independence-4x3.jpg";

const FOUNDERS = [
  {
    id: "person-albert-schuurman",
    name: "Albert Schuurman",
    role: "Co-founder & Key Individual",
    focus: "Retirement engineering, Everest Wealth, and living annuities.",
    initials: "AS",
  },
  {
    id: "person-johnny-farinha",
    name: "Johnny Farinha",
    role: "Co-founder",
    focus: "Estate structuring, business continuity, and personal life risk.",
    initials: "JF",
  },
];

const TRUST_FOCUS = ["Retirement planning", "Risk architecture", "Legacy structuring"];
const TRUST_BADGES = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

function FounderCard({
  id,
  name,
  role,
  focus,
  initials,
}: (typeof FOUNDERS)[number]) {
  return (
    <article
      id={id}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-stone-200/90 sm:flex-row"
    >
      <div
        className="flex aspect-square w-full shrink-0 items-center justify-center sm:w-44 md:w-48"
        style={{ backgroundColor: `${TEAL}14` }}
        aria-hidden
      >
        <span
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 2.75rem)", color: TEAL }}
        >
          {initials}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
        >
          {name}
        </h3>
        <p
          className="mt-1 font-semibold uppercase tracking-wide"
          style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.2vw, 0.75rem)", color: TEAL }}
        >
          {role}
        </p>
        <p
          className="mt-3 flex-1 leading-relaxed"
          style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
        >
          {focus}
        </p>
      </div>
    </article>
  );
}

function IndependenceBlock({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: "teal" | "blue";
}) {
  const border = accent === "teal" ? TEAL : "#0057B8";
  return (
    <article
      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 sm:p-7"
      style={{ borderLeft: `4px solid ${border}` }}
    >
      <h2
        className="font-bold tracking-tight"
        style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.45vw, 1.4375rem)", color: INK }}
      >
        {title}
      </h2>
      <p
        className="mt-3 leading-relaxed"
        style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
      >
        {description}
      </p>
    </article>
  );
}

export function AboutPageView({ faqs = [] }: { faqs?: FAQItem[] }) {
  return (
    <>
      <header
        data-chunk-boundary="true"
        className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={`${GRID} gap-y-8 lg:items-center`}>
          <HubReveal className="col-span-12 lg:col-span-6">
            <p
              className="font-semibold uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
            >
              About AS Brokers · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.25rem + 2.2vw, 3rem)",
                lineHeight: 1.1,
                color: INK,
              }}
            >
              Protecting your legacy. Engineering your wealth.
            </h1>
            <p
              className="mt-5 max-w-lg leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              As an{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                independent financial advisor in Krugersdorp
              </strong>
              , we have spent over 25 years helping South Africans secure their retirement and protect
              their businesses.
            </p>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 sm:aspect-[4/3]">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(HERO_IMAGE, "AS Brokers Krugersdorp office and independent financial advisers")}
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
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="about-independence-heading"
      >
        <div className={GRID}>
          <HubReveal className="col-span-12 lg:col-span-8">
            <h2
              id="about-independence-heading"
              className="sr-only"
            >
              The independence advantage
            </h2>
            <p
              className="max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Category 1.8 is regulatory language. For you, it means broader choice, clearer duty of care,
              and access to solutions many tied advisers cannot offer.
            </p>
          </HubReveal>

          <HubReveal delay={0.04} className="col-span-12 lg:col-span-7">
            <IndependenceBlock
              title="We work for you, not the product providers."
              description="Because we are fully independent, we survey the entire market to build a bespoke risk and wealth architecture that serves your goals, free from institutional quotas."
              accent="teal"
            />
          </HubReveal>

          <HubReveal delay={0.08} className="col-span-12 lg:col-span-5">
            <IndependenceBlock
              title="Access investments many advisers cannot offer."
              description="Our FSCA Category 1.8 license allows us to advise on and distribute exclusive structured returns and private market opportunities, such as Everest Wealth."
              accent="blue"
            />
          </HubReveal>
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-y border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="about-team-heading"
      >
        <div className={`${HOME4_WRAP} space-y-6`}>
          <HubReveal>
            <h2
              id="about-team-heading"
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Meet the fiduciaries
            </h2>
            <p
              className="mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              Two co-founders lead advice. A specialist team handles commercial underwriting, medical aid,
              and claims behind the scenes.
            </p>
          </HubReveal>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {FOUNDERS.map((founder, index) => (
              <HubReveal key={founder.id} delay={0.04 + index * 0.04}>
                <FounderCard {...founder} />
              </HubReveal>
            ))}
          </div>

          <HubReveal delay={0.1}>
            <p
              className="max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
            >
              Our dedicated specialists include{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                Petro Vermeulen
              </strong>{" "}
              (commercial underwriting),{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                Monique Schuurman
              </strong>{" "}
              (personal short-term & renewals),{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                Sharine van Vollenstee
              </strong>{" "}
              (medical aid & life onboarding), and{" "}
              <strong className="font-semibold" style={{ color: INK }}>
                Shanel van Niekerk
              </strong>{" "}
              (claims). They ensure every policy and claim receives expert attention.
            </p>
          </HubReveal>
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="py-12 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="about-education-heading"
      >
        <HubReveal>
          <div
            className={`${HOME4_WRAP} rounded-2xl bg-white p-8 ring-1 ring-stone-200/90 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10`}
          >
            <div className="max-w-2xl">
              <Briefcase className="h-8 w-8 text-cinematic-teal/80" aria-hidden />
              <h2
                id="about-education-heading"
                className="mt-4 font-bold tracking-tight"
                style={{ fontSize: "clamp(1.375rem, 1.1rem + 0.9vw, 1.875rem)", color: INK }}
              >
                Education before advice.
              </h2>
              <p
                className="mt-4 leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)", color: BODY }}
              >
                We believe you should never invest in something you don&apos;t fully understand. That is why
                we built South Africa&apos;s most comprehensive free library of fiduciary calculators and
                retirement guides.
              </p>
            </div>
            <Link
              href="/calculators"
              prefetch={false}
              className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3.5 font-semibold text-shark ring-1 ring-stone-200 transition-colors duration-500 hover:bg-stone-200 lg:mt-0"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Explore our Calculators
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </HubReveal>
      </section>

      <section
        data-chunk-boundary="true"
        className="relative overflow-hidden border-t border-stone-800 py-16 md:py-24"
        style={{ backgroundColor: INK }}
        aria-labelledby="about-cta-heading"
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
                id="about-cta-heading"
                className="font-bold tracking-tight text-white"
                style={{ fontSize: "clamp(1.75rem, 1.35rem + 1.4vw, 2.75rem)", lineHeight: 1.1 }}
              >
                Let&apos;s look at the math together.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/75" style={{ fontSize: "1.0625rem" }}>
                Book a consultation with an independent adviser in Krugersdorp. We will review your
                retirement, risk, and legacy goals without pressure or jargon.
              </p>
              <Link
                href="/contact"
                prefetch={false}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-shark transition hover:bg-stone-100"
              >
                Book an Actuarial Consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur-2xl sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cinematic-teal">
                  What we review
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
          <p className="mt-10 max-w-3xl leading-relaxed text-white/50" style={{ fontSize: "0.875rem" }}>
            AS Brokers CC · FSP 17273 · Krugersdorp, West Rand, Gauteng · Est. 1998
          </p>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/about")} />
      <Footer />
    </>
  );
}
