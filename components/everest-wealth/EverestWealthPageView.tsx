"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Home4Reveal, HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, Briefcase } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

const SECTION_PY = "py-16 md:py-20";

const BEFORE_RETIREMENT = {
  title: "Before Retirement",
  focus: "Wealth Building & Compounding",
  description: "Grow your capital aggressively and tax-efficiently while you are still working.",
  links: [
    { label: "Strategic Growth 14.5%", href: "/everest-strategic-growth-145" },
    { label: "Retirement planning", href: "/retirement" },
    { label: "Speak with an adviser", href: "/contact" },
  ],
};

const AFTER_RETIREMENT = {
  title: "After Retirement",
  focus: "Income & Capital Preservation",
  description: "Generate reliable, structured income to sustain your lifestyle.",
  links: [
    { label: "Living Annuities", href: "/everest-amethyst-living-annuity" },
    { label: "Sustainable Drawdowns", href: "/income-in-retirement" },
    { label: "Alternative Yields", href: "/everest-128-product" },
  ],
};

const EVEREST_PRODUCTS = [
  {
    title: "12.8% Strategic Income",
    rate: "12.8%",
    rateLabel: "Targeted p.a.",
    tag: "Most popular",
    description:
      "Monthly dividend income with a 10% loyalty bonus on capital after five years. A balanced choice if you can accept slightly lower cash flow now for long-term value.",
    href: "/everest-128-product",
    cta: "Explore Strategic Income",
    fiduciary: [
      "R100,000 minimum lump sum",
      "Dividends taxed at 20% DWT (not marginal income tax)",
      "120-day notice may apply on approved early exit",
      "Up to 15% early exit penalty may apply",
    ],
  },
  {
    title: "14.2% Onyx Income+",
    rate: "14.2%",
    rateLabel: "Targeted p.a.",
    tag: "Maximum day-one income",
    description:
      "Higher monthly income from day one, with no loyalty bonus. Suited to retirees who need maximum cash flow now.",
    href: "/calculators",
    cta: "Explore Onyx Income+",
    fiduciary: [
      "R100,000 minimum lump sum",
      "Dividends taxed at 20% DWT",
      "120-day notice may apply on approved early exit",
      "Up to 15% early exit penalty may apply",
    ],
  },
  {
    title: "14.5% Strategic Growth",
    rate: "14.5%",
    rateLabel: "Compound p.a.",
    tag: "Pure growth",
    description:
      "Capital compounding with no monthly withdrawals. Returns accumulate over five years and are paid at maturity.",
    href: "/everest-strategic-growth-145",
    cta: "Explore Strategic Growth",
    fiduciary: [
      "R100,000 minimum lump sum",
      "20% DWT on growth at maturity",
      "Five-year term commitment",
      "Illiquid; early exit subject to issuer discretion",
    ],
  },
];

const TRUST_BADGES = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

function LifeStageCard({
  title,
  focus,
  description,
  links,
  accent,
}: {
  title: string;
  focus: string;
  description: string;
  links: { label: string; href: string }[];
  accent: "teal" | "blue";
}) {
  const ring =
    accent === "teal"
      ? "ring-cinematic-teal/20 hover:ring-cinematic-teal/40"
      : "ring-samsung-blue/20 hover:ring-samsung-blue/40";
  const badge =
    accent === "teal" ? "bg-cinematic-teal/10 text-cinematic-teal" : "bg-samsung-blue/10 text-samsung-blue";

  return (
    <article
      className={`rounded-3xl bg-white/95 p-6 shadow-xl ring-1 ${ring} transition-all duration-300 ease-in-out hover:shadow-2xl sm:p-8`}
    >
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badge}`}>
        {focus}
      </span>
      <h2 className="mt-4 text-xl font-bold tracking-tight text-shark sm:text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">{description}</p>
      <ul className="mt-6 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={false}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue transition-colors duration-300 ease-in-out hover:text-cinematic-teal"
            >
              {link.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProductCard({
  title,
  rate,
  rateLabel,
  tag,
  description,
  href,
  cta,
  fiduciary,
}: (typeof EVEREST_PRODUCTS)[number]) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-stone-200/80 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          {tag ? (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-samsung-blue">{tag}</span>
          ) : null}
          <h3 className="mt-1 text-xl font-bold tracking-tight text-shark">{title}</h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-3xl font-bold tabular-nums text-cinematic-teal">{rate}</p>
          <p className="text-[10px] font-medium uppercase tracking-wide text-stone-500">{rateLabel}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">{description}</p>
      <Link
        href={href}
        prefetch={false}
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-stone-100 px-5 py-2.5 text-sm font-semibold text-shark transition-all duration-300 ease-in-out hover:bg-stone-200"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <div className="mt-6 border-t border-stone-200/80 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Fiduciary notes</p>
        <ul className="mt-2 space-y-1">
          {fiduciary.map((note) => (
            <li key={note} className="text-xs leading-relaxed text-stone-500">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function EverestWealthPageView() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] pb-24 text-shark md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/everest-suite-hero-16x9.jpg"
            alt={getAlt("/images/everest-suite-hero-16x9.jpg", "Professional reviewing investment plans")}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-shark/88 via-shark/55 to-shark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F6F3] via-transparent to-shark/20" />
        </div>

        <div className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28">
          <div className={`${HOME4_WRAP} max-w-3xl`}>
            <Home4Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
                Investments · Everest Wealth · FSP 17273
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.25rem] leading-[1.08]">
                Smarter investments for every stage of your life.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
                From tax-free wealth building to high-yield retirement income, access exclusive opportunities
                tailored to your goals.
              </p>
            </Home4Reveal>
          </div>
        </div>
      </section>

      {/* Life-stage journey */}
      <section className={SECTION_PY} aria-labelledby="everest-life-stage">
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <h2 id="everest-life-stage" className="text-2xl font-bold tracking-tight text-shark sm:text-3xl">
              Where are you on your journey?
            </h2>
            <p className="mt-3 max-w-2xl text-stone-600 leading-relaxed">
              Start with your timeline. We will match the right structures, calculators, and conversations to your stage.
            </p>
          </Home4Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
            <Home4Reveal delay={0.04}>
              <LifeStageCard {...BEFORE_RETIREMENT} accent="teal" />
            </Home4Reveal>
            <Home4Reveal delay={0.08}>
              <LifeStageCard {...AFTER_RETIREMENT} accent="blue" />
            </Home4Reveal>
          </div>
        </div>
      </section>

      {/* Premium yield architectures */}
      <section
        className={`border-y border-stone-200/80 bg-white/60 ${SECTION_PY}`}
        aria-labelledby="everest-products"
      >
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cinematic-teal">
                  Everest Wealth
                </p>
                <h2 id="everest-products" className="mt-2 text-2xl font-bold tracking-tight text-shark sm:text-3xl">
                  Premium Yield Architectures
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
                  Structured return profiles for voluntary capital. Targeted terms, not guarantees. Your adviser will
                  confirm suitability before you invest.
                </p>
              </div>
              <Link
                href="/everest-wealth/about"
                prefetch={false}
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-samsung-blue hover:text-cinematic-teal"
              >
                Understanding Everest
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Home4Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {EVEREST_PRODUCTS.map((product, index) => (
              <Home4Reveal key={product.href} delay={index * 0.05}>
                <ProductCard {...product} />
              </Home4Reveal>
            ))}
          </div>

          <Home4Reveal delay={0.12} className="mt-8">
            <article className="rounded-3xl bg-gradient-to-br from-cinematic-teal/10 via-white to-samsung-blue/10 p-6 ring-1 ring-stone-200/80 shadow-md sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-shark">Amethyst Living Annuity</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600">
                    For pension, provident, preservation, and RA capital. Structured net return profile near 10.2% p.a.
                    with drawdown from 2.5% to 17.5%.
                  </p>
                </div>
                <Link
                  href="/everest-amethyst-living-annuity"
                  prefetch={false}
                  className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-samsung-blue px-5 py-3 text-sm font-semibold text-white shadow-md shadow-samsung-blue/20 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
                >
                  Explore Amethyst
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          </Home4Reveal>
        </div>
      </section>

      {/* Trust anchor */}
      <section className={`border-t border-stone-200/80 bg-gradient-to-br from-shark via-[#1a2626] to-[#152020] ${SECTION_PY}`}>
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Access investments many advisers cannot offer.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
                  As a Category 1.8 authorised financial services provider, we can guide suitable clients toward
                  traditional and selected alternative investments, including Everest Wealth solutions, while
                  remaining fully independent. We are not tied to a single product house.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {TRUST_BADGES.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-200 ring-1 ring-white/10"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-samsung-blue/30 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
                >
                  Book an Investment Strategy Call
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-8">
                <Briefcase className="h-8 w-8 text-cinematic-teal/80" aria-hidden />
                <p className="mt-4 text-sm leading-relaxed text-stone-400">
                  Everest Wealth Management (Pty) Ltd is an authorised Financial Services Provider (FSP 795). AS
                  Brokers (FSP 17273) acts as an independent intermediary. Returns shown are based on current product
                  terms and are not guaranteed. Unlisted investments involve liquidity constraints. Consult a qualified
                  financial adviser before investing.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <Link href="/everest-wealth/about" prefetch={false} className="font-medium text-cinematic-teal hover:text-white">
                    Fiduciary briefing
                  </Link>
                  <a
                    href="https://wa.me/27662276044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-stone-400 hover:text-white"
                  >
                    WhatsApp +27 66 227 6044
                  </a>
                </div>
              </div>
            </div>
          </Home4Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
