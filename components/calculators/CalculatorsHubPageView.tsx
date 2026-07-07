"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
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

const HERO_IMAGE = "/images/calculators-education-16x9.jpg";

const CARD_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px";

type CalculatorTile = {
  id: string;
  code: string;
  title: string;
  description: string;
  href: string;
  image: string;
  span: string;
};

const RETIREMENT_CALCULATORS: CalculatorTile[] = [
  {
    id: "asset-002-retirement-reality-check",
    code: "ASSET 002",
    title: "Retirement Reality Check",
    description: "Compare your desired income against projected capital to see if a gap exists.",
    href: "/embed-calculators/asset-002-retirement-reality-check.html",
    image: "/images/home-actuarial-engine-16x9.jpg",
    span: "col-span-12 md:col-span-6 lg:col-span-5",
  },
  {
    id: "asset-004-life-of-capital",
    code: "ASSET 004",
    title: "Life of Capital",
    description: "Model how long your retirement capital will last at your chosen drawdown rate.",
    href: "/embed-calculators/asset-004-life-of-capital.html",
    image: "/images/calculators-capital-lifespan-4x3.jpg",
    span: "col-span-12 md:col-span-6 lg:col-span-4",
  },
  {
    id: "asset-016-growth-comparison",
    code: "ASSET 016",
    title: "The Power of Growth",
    description: "Project future lump sums and compound returns from monthly contributions.",
    href: "/embed-calculators/asset-016-growth-comparison.html",
    image: "/images/everest-growth-145-inset-1x1.jpg",
    span: "col-span-12 lg:col-span-3",
  },
];

const EVEREST_CALCULATORS: CalculatorTile[] = [
  {
    id: "asset-013-everest-income-vs-growth",
    code: "ASSET 013",
    title: "Everest Income vs Growth",
    description: "Compare 12.8%, 14.2%, and 14.5% strategies side by side.",
    href: "/embed-calculators/asset-013-everest-income-vs-growth.html",
    image: "/images/everest-wealth-inset-1x1.jpg",
    span: "col-span-12 lg:col-span-7",
  },
  {
    id: "asset-014-living-annuity",
    code: "ASSET 014",
    title: "Living Annuity Drawdown",
    description: "Estimate Amethyst-style income, drawdown, and inflation protection.",
    href: "/embed-calculators/asset-014-living-annuity.html",
    image: "/images/living-annuity-inset-1x1.jpg",
    span: "col-span-12 lg:col-span-5",
  },
];

const ESTATE_CALCULATORS: CalculatorTile[] = [
  {
    id: "asset-007-estate-duty",
    code: "ASSET 007",
    title: "Estate Duty & Executor Fees",
    description: "Estimate the immediate liquidity your estate needs at death.",
    href: "/embed-calculators/asset-007-estate-duty.html",
    image: "/images/estate-duty-calculator-inset-1x1.jpg",
    span: "col-span-12 lg:col-span-7",
  },
  {
    id: "asset-008-estate-reduction",
    code: "ASSET 008",
    title: "Estate Reduction Strategy",
    description: "Illustrate the R100k and R200k annual donation strategy over time.",
    href: "/embed-calculators/asset-008-estate-reduction.html",
    image: "/images/annual-estate-reduction-inset-1x1.jpg",
    span: "col-span-12 lg:col-span-5",
  },
];

function CalculatorVisualCard({ tile }: { tile: CalculatorTile }) {
  return (
    <article id={tile.id} className="h-full scroll-mt-28">
      <Link
        href={tile.href}
        prefetch={false}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(29,29,31,0.14)]"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
          <Image
            src={tile.image}
            alt={getAlt(tile.image, `${tile.title} calculator preview`)}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={CARD_IMAGE_SIZES}
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p
            className="font-semibold uppercase tracking-[0.12em]"
            style={{ fontSize: "clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem)", color: TEAL }}
          >
            {tile.code}
          </p>
          <h3
            className="mt-2 font-bold tracking-tight"
            style={{ fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", color: INK }}
          >
            {tile.title}
          </h3>
          <p
            className="mt-2 flex-1 leading-relaxed"
            style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
          >
            {tile.description}
          </p>
          <span
            className="mt-4 inline-flex items-center gap-2 font-semibold"
            style={{ color: TEAL, fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)" }}
          >
            Open calculator
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

function CategorySection({
  id,
  title,
  description,
  tiles,
}: {
  id: string;
  title: string;
  description: string;
  tiles: CalculatorTile[];
}) {
  return (
    <section
      data-chunk-boundary="true"
      className="border-t border-stone-200/80 py-12 md:py-16"
      aria-labelledby={id}
    >
      <div className={GRID}>
        <HubReveal className="col-span-12 lg:col-span-8">
          <h2
            id={id}
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.75rem)", color: INK }}
          >
            {title}
          </h2>
          <p
            className="mt-3 max-w-2xl leading-relaxed"
            style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
          >
            {description}
          </p>
        </HubReveal>

        {tiles.map((tile, index) => (
          <HubReveal key={tile.id} delay={index * 0.04} className={tile.span}>
            <CalculatorVisualCard tile={tile} />
          </HubReveal>
        ))}
      </div>
    </section>
  );
}

export function CalculatorsHubPageView() {
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
              Planning tools · FSP 17273
            </p>
            <h1
              className="mt-4 font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                lineHeight: 1.12,
                color: INK,
              }}
            >
              Fiduciary Tools &amp; Financial Calculators.
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{
                fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
                lineHeight: 1.65,
                color: BODY,
              }}
            >
              Run the numbers for your portfolio. Explore our interactive library of retirement,
              wealth, and estate calculators before you book a consultation.
            </p>
          </HubReveal>

          <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Sophisticated professional reviewing financial charts and planning notes at a desk"
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

      <div style={{ backgroundColor: "#FDFCFA" }}>
        <CategorySection
          id="calculators-retirement-heading"
          title="Retirement & wealth building"
          description="Stress-test capital, income gaps, and compounding before you commit to a strategy."
          tiles={RETIREMENT_CALCULATORS}
        />

        <CategorySection
          id="calculators-everest-heading"
          title="Premium yields (Everest Wealth)"
          description="Compare targeted income and growth profiles on voluntary Everest capital. Educational only — not guaranteed outcomes."
          tiles={EVEREST_CALCULATORS}
        />

        <CategorySection
          id="calculators-estate-heading"
          title="Estate & risk architecture"
          description="Quantify duty, executor fees, and donation strategies so your family is not caught short."
          tiles={ESTATE_CALCULATORS}
        />
      </div>

      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-14 md:py-16"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="calculators-cta-heading"
      >
        <HubReveal>
          <div className={`${HOME4_WRAP} rounded-2xl bg-white p-8 shadow-xl ring-1 ring-stone-200/90 sm:p-10`}>
            <h2
              id="calculators-cta-heading"
              className="max-w-2xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)", color: INK }}
            >
              Stop guessing. Let&apos;s review the math together.
            </h2>
            <p
              className="mt-4 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)", color: BODY }}
            >
              Our fiduciary experts use these exact tools to engineer bespoke wealth architectures.
              Book a session to run your numbers live.
            </p>
            <p
              className="mt-4 max-w-2xl leading-relaxed text-stone-600"
              style={{ fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
            >
              All calculators are illustrative only and not financial, tax, or legal advice.
            </p>
            <Link
              href="/contact"
              prefetch={false}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition-all duration-300 hover:bg-[#004a9e]"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
            >
              Book an Actuarial Consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </HubReveal>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/calculators")} />
      <Footer />
    </>
  );
}
