import Link from "next/link";
import { Footer } from "@/components/Footer";
import { EverestCalculatorEmbed } from "@/components/everest/EverestCalculatorEmbed";
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { HubHeroActions } from "@/components/hub/HubHeroActions";
import { HubHeroKicker } from "@/components/hub/HubHeroKicker";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  EVEREST_128_PRODUCT,
  EVEREST_142_PRODUCT,
  EVEREST_145_PRODUCT,
  EVEREST_AMETHYST_PRODUCT,
} from "@/lib/everest-product-configs";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const MUTED = "#57534e";
const HERO_IMAGE = "/images/everest-wealth-hero-16x9-480.webp";
const HERO_ALT = "Couple walking through a vineyard at golden hour, patient wealth growth";

const CONSTRAINTS = [
  { dt: "Minimum", dd: "R100,000" },
  { dt: "Term", dd: "5 years" },
  { dt: "Notice", dd: "120 days" },
  { dt: "Early exit", dd: "Up to 15% may apply" },
  { dt: "Tax", dd: "20% DWT typical" },
  { dt: "Structure", dd: "Preference shares" },
] as const;

const TRUST_FACTS = [
  { dt: "Your adviser", dd: "AS Brokers CC · FSP 17273" },
  { dt: "Licence", dd: "Category 1.8 · unlisted shares" },
  { dt: "Independence", dd: "Not a tied Everest agent" },
  { dt: "Product provider", dd: "Everest Wealth · FSP 795" },
] as const;

const UNDERSTANDING = [
  {
    title: "Everest Wealth (FSP 795)",
    body: "Product provider and structurer. Designs voluntary preference-share profiles and Amethyst living annuity wrappers, distributed through independent intermediaries.",
  },
  {
    title: "AS Brokers (FSP 17273)",
    body: "Independent Category 1.8 intermediary. Explains structure, liquidity, tax, and suitability. Your capital only moves through compliant channels after a needs analysis.",
  },
  {
    title: "Laudian HoldCo",
    body: "Preference shares sit in an unlisted private equity holding company that invests in and lends to operating businesses. Illiquid by design.",
  },
] as const;

const JUMP_LINKS = [
  { href: "#constraints", label: "Constraints" },
  { href: "#profile-128", label: "12.8%" },
  { href: "#profile-142", label: "14.2%" },
  { href: "#profile-145", label: "14.5%" },
  { href: "#compare", label: "Compare" },
  { href: "#amethyst", label: "Amethyst" },
] as const;

type ProfileBlock = {
  id: string;
  product: typeof EVEREST_128_PRODUCT;
};

const PROFILE_BLOCKS: ProfileBlock[] = [
  { id: "profile-128", product: EVEREST_128_PRODUCT },
  { id: "profile-142", product: EVEREST_142_PRODUCT },
  { id: "profile-145", product: EVEREST_145_PRODUCT },
];

type Props = { faqs: FAQItem[] };

/**
 * Soft-locked single page: Everest hub + product copy + ASSET calculator embeds.
 * Legacy product routes redirect here while public containment remains elsewhere.
 */
export function EverestWealthPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      <MarketingHubHero
        kicker={<HubHeroKicker shortLabel="Everest" longLabel="Everest Wealth · Soft-locked" />}
        title="Need monthly income without betting on the next market correction?"
        description="One review page for Albert: voluntary profiles (12.8%, 14.2%, 14.5%), Amethyst living annuity, constraints, and the calculators that used to live on separate product pages. Educational under FAIS. Not public until released."
        actions={
          <HubHeroActions
            primaryLabel="Jump to 12.8% calculator"
            primaryHref="#profile-128"
          />
        }
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <picture>
              <source
                media="(min-width: 769px)"
                type="image/webp"
                srcSet="/images/everest-wealth-hero-16x9-960.webp"
              />
              <source type="image/webp" srcSet="/images/everest-wealth-hero-16x9-480.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- LCP picture/webp; images.unoptimized */}
              <img
                src={HERO_IMAGE}
                alt={getAlt(HERO_IMAGE, HERO_ALT)}
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

      <nav
        className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur"
        style={{ borderColor: HAIRLINE }}
        aria-label="Everest page sections"
      >
        <div className={`${HOME4_WRAP} flex gap-1 overflow-x-auto py-2`}>
          {JUMP_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        className="border-y bg-white"
        style={{ borderColor: HAIRLINE }}
        aria-label="Who you are dealing with"
      >
        <div className={HOME4_WRAP}>
          <dl
            className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
            style={{ backgroundColor: HAIRLINE }}
          >
            {TRUST_FACTS.map((item) => (
              <div key={item.dt} className="min-w-0 bg-white px-5 py-6 sm:px-6">
                <dt
                  className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: MUTED }}
                >
                  {item.dt}
                </dt>
                <dd className="mt-2 font-serif text-base font-semibold tracking-tight text-shark">
                  {item.dd}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="constraints"
        className="scroll-mt-28 border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="everest-constraints-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-5">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL }}
            >
              Before you open a calculator
            </p>
            <h2
              id="everest-constraints-heading"
              className="mt-3 font-serif font-semibold tracking-tight text-balance"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)", color: INK }}
            >
              The rules sit next to the yield
            </h2>
            <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
              Voluntary Everest profiles are unlisted preference-share structures. They are not bank
              deposits, not guaranteed rates, and not for money you may need next year.
            </p>
          </div>

          <aside
            className="min-w-0 border bg-white lg:col-span-7"
            style={{ borderColor: HAIRLINE }}
            role="note"
            aria-label="Everest voluntary capital constraints"
          >
            <dl
              className="grid grid-cols-2 gap-px sm:grid-cols-3"
              style={{ backgroundColor: HAIRLINE }}
            >
              {CONSTRAINTS.map((item) => (
                <div key={item.dt} className="min-w-0 bg-white px-5 py-4 sm:px-6">
                  <dt
                    className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: MUTED }}
                  >
                    {item.dt}
                  </dt>
                  <dd className="mt-1.5 break-words font-serif text-base font-semibold tracking-tight text-shark">
                    {item.dd}
                  </dd>
                </div>
              ))}
            </dl>
            <div
              className="border-t px-5 py-4 sm:px-6"
              style={{ borderColor: HAIRLINE, backgroundColor: "#FFFBEB" }}
              role="note"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-900">
                Liquidity warning
              </p>
              <p className="mt-2 text-sm leading-relaxed text-amber-950/80">
                Unlisted preference shares are illiquid. Expect a typical five-year term,{" "}
                <strong className="font-semibold">120-day notice</strong>, and up to a{" "}
                <strong className="font-semibold">15% early-exit penalty</strong>. Only commit
                capital you can leave for the full term. Educational only under FAIS, not advice.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="understanding"
        className="scroll-mt-28 bg-shark py-16 text-white md:py-24"
        aria-labelledby="understanding-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: TEAL_ON_DARK }}
          >
            Understanding Everest
          </p>
          <h2
            id="understanding-heading"
            className="mt-3 max-w-2xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)" }}
          >
            Who does what
          </h2>
          <div
            className="mt-10 grid grid-cols-1 gap-px md:grid-cols-3"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            {UNDERSTANDING.map((item) => (
              <article key={item.title} className="bg-shark px-6 py-8">
                <h3 className="font-serif text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {PROFILE_BLOCKS.map(({ id, product }) => (
        <section
          key={id}
          id={id}
          className="scroll-mt-28 border-b py-14 md:py-20"
          style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
          aria-labelledby={`${id}-heading`}
        >
          <div className={HOME4_WRAP}>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: TEAL }}
            >
              {product.kicker}
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-3 max-w-3xl font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)", color: INK }}
            >
              {product.heroTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
              {product.heroSubtitle}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {product.featureCards.map((card) => (
                <article
                  key={card.title}
                  className="border bg-white p-5 sm:p-6"
                  style={{ borderColor: HAIRLINE }}
                >
                  <h3 className="font-serif text-lg font-semibold text-shark">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                    {card.description}
                  </p>
                </article>
              ))}
            </div>

            {product.trustCard ? (
              <div
                className="mt-4 border bg-white p-5 sm:p-6"
                style={{ borderColor: HAIRLINE }}
              >
                <h3 className="font-serif text-lg font-semibold text-shark">{product.trustCard.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  {product.trustCard.description}
                </p>
              </div>
            ) : null}

            <ul className="mt-6 space-y-2 text-sm" style={{ color: BODY }}>
              {product.fiduciaryNotes.map((note) => (
                <li key={note} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-800" aria-hidden />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h3 className="font-serif text-xl font-semibold text-shark">{product.calculatorTitle}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed" style={{ color: BODY }}>
                {product.calculatorLead}
              </p>
              <div className="mt-5">
                <EverestCalculatorEmbed src={product.calculatorSrc} title={product.calculatorTitle} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section
        id="compare"
        className="scroll-mt-28 border-b py-14 md:py-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="compare-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: TEAL }}
          >
            Side-by-side tools
          </p>
          <h2
            id="compare-heading"
            className="mt-3 max-w-2xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)", color: INK }}
          >
            Compare income vs growth before you book
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
            The comparison calculators that used to live on separate ASSET pages are embedded here
            for review.
          </p>

          <div className="mt-10 space-y-12">
            <div>
              <h3 className="font-serif text-xl font-semibold text-shark">12.8% vs 14.2%</h3>
              <p className="mt-2 text-sm" style={{ color: BODY }}>
                Loyalty-bonus income profile versus maximum day-one Onyx cash flow.
              </p>
              <div className="mt-5">
                <EverestCalculatorEmbed
                  src="/embed-calculators/asset-011-everest-128-vs-142.html"
                  title="12.8% vs 14.2% comparison calculator"
                />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-shark">Income vs growth</h3>
              <p className="mt-2 text-sm" style={{ color: BODY }}>
                Day-one cash flow versus deferred compounding to maturity.
              </p>
              <div className="mt-5">
                <EverestCalculatorEmbed
                  src="/embed-calculators/asset-013-everest-income-vs-growth.html"
                  title="Income vs growth comparison calculator"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="amethyst"
        className="scroll-mt-28 border-b py-14 md:py-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="amethyst-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: TEAL }}
          >
            {EVEREST_AMETHYST_PRODUCT.kicker}
          </p>
          <h2
            id="amethyst-heading"
            className="mt-3 max-w-3xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 2rem)", color: INK }}
          >
            {EVEREST_AMETHYST_PRODUCT.heroTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
            {EVEREST_AMETHYST_PRODUCT.heroSubtitle}
          </p>

          {EVEREST_AMETHYST_PRODUCT.pillTags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {EVEREST_AMETHYST_PRODUCT.pillTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-xs font-semibold text-stone-700"
                  style={{ borderColor: HAIRLINE }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {EVEREST_AMETHYST_PRODUCT.featureCards.map((card) => (
              <article
                key={card.title}
                className="border bg-white p-5 sm:p-6"
                style={{ borderColor: HAIRLINE }}
              >
                <h3 className="font-serif text-lg font-semibold text-shark">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <ul className="mt-6 space-y-2 text-sm" style={{ color: BODY }}>
            {EVEREST_AMETHYST_PRODUCT.fiduciaryNotes.map((note) => (
              <li key={note} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-800" aria-hidden />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h3 className="font-serif text-xl font-semibold text-shark">
              {EVEREST_AMETHYST_PRODUCT.calculatorTitle}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed" style={{ color: BODY }}>
              {EVEREST_AMETHYST_PRODUCT.calculatorLead}
            </p>
            <div className="mt-5">
              <EverestCalculatorEmbed
                src={EVEREST_AMETHYST_PRODUCT.calculatorSrc}
                title={EVEREST_AMETHYST_PRODUCT.calculatorTitle}
              />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-xl font-semibold text-shark">
              Living annuity income &amp; sustainability
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed" style={{ color: BODY }}>
              Generic drawdown sustainability check (ASSET 014). Separate from the Amethyst product
              illustration above.
            </p>
            <div className="mt-5">
              <EverestCalculatorEmbed
                src="/embed-calculators/asset-014-living-annuity.html"
                title="Living annuity income and sustainability calculator"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="content-visibility-auto">
        <VisibleFaqSection
          faqs={faqItems}
          headingId="everest-faq-heading"
          primaryCta={{ href: "/contact?source=everest_faq", label: "Contact us" }}
        />
      </div>

      <section className="content-visibility-auto pb-16 md:pb-24" aria-labelledby="everest-cta-heading">
        <div className={HOME4_WRAP}>
          <div className="rounded-xl bg-shark px-6 py-10 text-white sm:px-10 sm:py-12 md:flex md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: TEAL_ON_DARK }}
              >
                Next step
              </p>
              <h2
                id="everest-cta-heading"
                className="mt-3 font-serif text-2xl font-semibold tracking-tight text-white"
              >
                Test suitability, do not chase a headline yield
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Calculators stay educational. For Everest suitability, liquidity, and tax fit, speak
                with an independent Category 1.8 adviser at AS Brokers CC.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col items-start gap-3 md:mt-0 md:items-end">
              <Link
                href="/contact?source=everest_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Contact us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                Or WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="content-visibility-auto">
        <Footer />
      </div>
    </div>
  );
}
