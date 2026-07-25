import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { HubHeroActions } from "@/components/hub/HubHeroActions";
import { HubHeroAfterLink } from "@/components/hub/HubHeroAfterLink";
import { HubHeroKicker } from "@/components/hub/HubHeroKicker";

const HERO_IMAGE = "/images/estate-planning-hero-16x9.webp";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
/** WCAG AA teal on canvas; lighter teal for shark chapters. */
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const ESTATE_CRAFT = "/images/risk-arch-estate.jpg";
const FAIS_DISCLAIMER =
  "Content and calculators on this page are illustrative and educational only and do not constitute financial, tax, or legal advice as defined in the FAIS Act, 2002. Estate duty, executor fees, and donations rules change, verify current SARS and statutory positions with qualified professionals.";

const GENERAL_ADVICE_DISCLAIMER =
  "The information on this page is general information under Section 1(3)(a) of the FAIS Act, 37 of 2002, and is not financial advice or a product recommendation. Personal recommendations follow a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).";

// CONTAINMENT 2026-07-22: legislation-dependent calculators frozen.
// Restore: calculatorPagePath("asset-007-estate-duty") / calculatorPagePath("asset-008-estate-reduction")
const CALC_ESTATE_DUTY = "/calculators";
const CALC_ESTATE_REDUCTION = "/calculators";

const PILLARS = [
  {
    dt: "Estate duty abatement",
    dd: "The first R3.5 million of a net dutiable estate is generally free of estate duty. Amounts above that are typically taxed at 20% up to R30 million, and 25% thereafter, confirm the current statutory position for your planning year.",
  },
  {
    dt: "Executor fees",
    dd: "Statutory maximum executor remuneration is commonly framed at 3.5% plus VAT (effective 4.025% where VAT applies). That cash must exist in the estate, a will alone does not create it.",
  },
  {
    dt: "Spousal rollover",
    dd: "Section 4(q) mechanisms can allow a surviving spouse to benefit from unused abatement capacity, often discussed as a combined R7 million shield across two estates, subject to facts and current law.",
  },
  {
    dt: "Annual donations",
    dd: "Lifetime transfers within SARS donation exemptions can reduce dutiable estates over time. Budget updates adjust annual exemptions, verify the current natural-person exemption before modelling multi-year strategies.",
  },
  {
    dt: "Section 7C trust loans",
    dd: "Interest-free or low-interest loans to trusts can trigger deemed donations based on the official rate of interest. Rate changes (for example after SARB repo moves) alter the maths, treat any published rate as educational until verified.",
  },
  {
    dt: "Business succession",
    dd: "Buy-and-sell funding and key-person capital sit on the financial side of continuity. Legal agreements remain attorney work; we coordinate the capital architecture.",
  },
] as const;

type Props = { faqs: FAQItem[] };

function ToolCard({
  code,
  title,
  description,
  href,
}: {
  code: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <article className="flex h-full flex-col border bg-white p-6 sm:p-7" style={{ borderColor: HAIRLINE }}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500 tabular-nums">
        {code}
      </p>
      <h3 className="mt-3 font-serif text-lg font-semibold tracking-tight text-shark">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{description}</p>
      <Link
        href={href}
        prefetch={false}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
        style={{ color: TEAL }}
      >
        Run the calculation
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <p className="mt-5 border-t pt-4 text-[11px] leading-relaxed text-stone-500" style={{ borderColor: HAIRLINE }}>
        {FAIS_DISCLAIMER}
      </p>
    </article>
  );
}

export function EstatePlanningPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      {/* §1 Hero, light */}
      <MarketingHubHero
        kicker={<HubHeroKicker shortLabel="Estate" longLabel="Estate Planning" />}
        title="Estate duty and executor fees are paid in cash — or your family sells assets"
        description="Without liquidity, SARS and the executor queue first; heirs inherit what's left. AS Brokers CC (FSP 17273) structures the liquidity and life cover needed to settle duty and fees, and coordinates with your attorneys on the capital architecture — before a crisis forces the decision."
        actions={
          <HubHeroActions
            primaryLabel="Book a strategy call"
            primaryHref="/contact?source=estate_hero"
          />
        }
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <picture>
              <source
                media="(min-width: 769px)"
                type="image/webp"
                srcSet="/images/estate-planning-hero-16x9-960.webp"
              />
              <source type="image/webp" srcSet="/images/estate-planning-hero-16x9-480.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized public LCP sources */}
              <img
                src="/images/estate-planning-hero-16x9-480.webp"
                alt={getAlt(
                  HERO_IMAGE,
                  "Multi-generational family discussing estate documents at a wooden table"
                )}
                width={480}
                height={359}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </picture>
          </figure>
        }
        after={
          <HubHeroAfterLink
            prompt="Prefer the checklist first?"
            href="/legacy-readiness-checklist"
            label="Legacy Readiness Checklist"
          />
        }
      />

      {/* §2 Primary diagnostic, shark */}
      <section
        id="legacy-checklist"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="legacy-checklist-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: TEAL_ON_DARK }}
          >
            Primary diagnostic
          </p>
          <h2
            id="legacy-checklist-heading"
            className="mt-4 font-serif font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
          >
            Legacy Readiness Checklist
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
            A guided readiness review covering wills, liquidity, duty awareness, and succession
            gaps, before you book a strategy call.
          </p>
          <Link
            href="/legacy-readiness-checklist"
            prefetch={false}
            className="mt-8 inline-flex items-center gap-2 rounded px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: TEAL }}
          >
            Start the checklist
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* §3 Architecture, light */}
      <section
        id="estate-architecture"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="architecture-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="architecture-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            The financial architecture of deceased estates in South Africa
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Factual legislative framing on estate duty, executor fees, and lawful rollover
            mechanisms. Not “avoid the taxman” rhetoric.
          </p>
          <figure className="mt-8">
            <div
              className="relative aspect-[21/9] overflow-hidden border bg-white sm:aspect-[2.4/1]"
              style={{ borderColor: HAIRLINE }}
            >
              <Image
                src={ESTATE_CRAFT}
                alt={getAlt(
                  ESTATE_CRAFT,
                  "Estate planning desk, documents, portfolio and succession context"
                )}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
            <figcaption className="mt-3 max-w-3xl text-xs leading-relaxed text-stone-500">
              Craft, not faces: liquidity engineering is paperwork and capital structure, attorneys
              draft; we engineer the cash.
            </figcaption>
          </figure>
          <dl className="mt-10 border-y" style={{ borderColor: HAIRLINE }}>
            {PILLARS.map((row) => (
              <div
                key={row.dt}
                className="grid gap-2 border-b py-6 last:border-b-0 sm:grid-cols-[14rem_1fr] sm:gap-8"
                style={{ borderColor: HAIRLINE }}
              >
                <dt className="font-serif text-base font-semibold tracking-tight text-shark">{row.dt}</dt>
                <dd className="text-sm leading-relaxed text-stone-600">{row.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* §4 Scope boundary, shark */}
      <section
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="scope-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em] lg:sticky lg:top-28"
              style={{ color: TEAL_ON_DARK }}
            >
              Scope boundary
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="scope-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              Financial coordination vs legal drafting
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              AS Brokers engineers liquidity, life cover, investment placement, and succession
              funding, so an estate can settle fees and duty without forced sales. Binding wills,
              trust deeds, and related instruments are drafted by admitted attorneys. We coordinate;
              we do not practise as a law firm on this website.
            </p>
            <Link
              href="/solutions/business-insurance"
              prefetch
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
              style={{ color: TEAL_ON_DARK }}
            >
              Business insurance &amp; succession
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* §5 Calculators + credentials, light */}
      <section
        id="estate-calculators"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="estate-calcs-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="estate-calcs-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Intergenerational wealth transfer tools
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Model liquidity stress and donation strategies. Illustrative only, bring outputs to a
            strategy call for advice on your facts.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            <ToolCard
              code="ASSET 007"
              title="Estate Duty & Executor Fee Calculator"
              description="Illustrate duty, executor fees, and liquidity pressure from the inputs you provide."
              href={CALC_ESTATE_DUTY}
            />
            <ToolCard
              code="ASSET 008"
              title="Estate Reduction Strategy"
              description="Model annual donation strategies within SARS limits to understand multi-year estate reduction maths."
              href={CALC_ESTATE_REDUCTION}
            />
          </div>

          <div className="mt-14 grid gap-6 border-t pt-10 md:grid-cols-3" style={{ borderColor: HAIRLINE }}>
            {[
              { title: "25+ years", body: "Est. 1998 · Krugersdorp, West Rand" },
              { title: "FSP 17273", body: "Independent Category 1.8 · FSCA" },
              { title: "Scope honesty", body: "Financial engineering · attorney-drafted instruments" },
            ].map((item) => (
              <div key={item.title}>
                <p className="font-serif text-lg font-semibold tracking-tight text-shark">{item.title}</p>
                <p className="mt-1 text-sm text-stone-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §6 FAQ, shark (component default) */}
      <VisibleFaqSection
        faqs={faqItems}
        headingId="estate-faq-heading"
        primaryCta={{ href: "/contact?source=estate_faq", label: "Contact us" }}
      />

      {/* §7 Related, light */}
      <RelatedContent variant="warm" links={getRelatedLinks("/estate-planning")} />

      {/* §8 Terminal, dark panel (kept) */}
      <section
        id="strategy-call"
        className="scroll-mt-28 pb-16 pt-4 md:scroll-mt-32 md:pb-24"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="strategy-heading"
      >
        <div className={HOME4_WRAP}>
          <div
            className="rounded-xl px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14"
            style={{ backgroundColor: INK }}
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL_ON_DARK }}
            >
              FSP 17273 · Category 1.8
            </p>
            <h2
              id="strategy-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Ready for a legacy strategy call?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              Bring asset lists, existing wills, and business continuity questions. We review
              liquidity and risk architecture; attorneys handle drafting.
            </p>
            <Link
              href="/contact?source=estate_terminal"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-white/50">{FAIS_DISCLAIMER}</p>
          </div>
        </div>
      </section>

      <section aria-label="General information disclaimer" className="pb-10">
        <div className={HOME4_WRAP}>
          <p className="max-w-3xl text-xs leading-relaxed text-stone-500">
            {GENERAL_ADVICE_DISCLAIMER}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
