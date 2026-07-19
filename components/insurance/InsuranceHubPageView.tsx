import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { getAlt } from "@/lib/image-alt";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const INSET = "rgba(29,29,31,0.05)";
/** WCAG AA teal on canvas; lighter teal for shark chapters. */
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const HERO_IMAGE = "/images/insurance-hero-16x9.webp";
const COMMERCIAL_IMAGE = "/images/risk-arch-commercial.jpg";
const FAIS_DISCLAIMER =
  "Content and calculators on this page are illustrative and educational only and do not constitute financial, tax, or insurance advice as defined in the FAIS Act, 2002. Outcomes depend on underwriting, policy wording, and your circumstances.";

const CALC_AVERAGE_CLAUSE = calculatorPagePath("asset-015-average-clause");

const PROTECTION_DOMAINS = [
  {
    title: "Medical aid & gap",
    description: "Scheme structuring and shortfall cover within statutory demarcation.",
    href: "/solutions/medical-aid",
    image: "/images/insurance-domain-medical-21x9.webp",
    alt: "Mother and child with a doctor in a calm consulting room",
  },
  {
    title: "Life & income",
    description: "Life, disability, and severe illness cover for dependents and earnings.",
    href: "/solutions/life-insurance",
    image: "/images/insurance-domain-life-21x9.webp",
    alt: "Father on a patio watching his child play — protecting dependents and earnings",
  },
  {
    title: "Personal assets",
    description: "Home, motor, and high-value possessions, including underinsurance risk.",
    href: "/solutions/personal-insurance",
    image: "/images/insurance-domain-personal-21x9.webp",
    alt: "Couple with their car at home — personal assets and underinsurance risk",
  },
  {
    title: "Business & partners",
    description: "Commercial cover, key person protection, and buy-and-sell continuity.",
    href: "/solutions/business-insurance",
    image: "/images/insurance-domain-business-21x9.webp",
    alt: "Business partners outside a commercial warehouse — continuity and cover",
  },
] as const;

const PARTNERS = ["Santam", "Old Mutual", "Bryte"] as const;

type Props = { faqs: FAQItem[] };

export function InsuranceHubPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      {/* §1 Hero — light */}
      <MarketingHubHero
        kicker={<>Insurance &amp; risk · FSP 17273 · Category 1.8</>}
        title={<>Commercial and personal risk architecture</>}
        description={
          <>
            Most owners discover policy flaws after the fire, Average Clause underinsurance, broken
            Business Interruption definitions, escalating life premiums. We structure indemnification
            for your balance sheet, place cover independently across the market, and stay for the
            claim.
          </>
        }
        actions={
          <nav aria-label="On this page" className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#protection-domains" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Protection domains
            </a>
            <a href="#average-clause" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Average clause diagnostic
            </a>
            <a href="#independence" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Independence
            </a>
            <a href="#risk-audit" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
              Book a risk audit
            </a>
          </nav>
        }
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <picture>
              <source
                media="(min-width: 769px)"
                type="image/webp"
                srcSet="/images/insurance-hero-16x9-960.webp"
              />
              <source type="image/webp" srcSet="/images/insurance-hero-16x9-480.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized public LCP sources */}
              <img
                src="/images/insurance-hero-16x9-480.webp"
                alt={getAlt(HERO_IMAGE, "Adviser reviewing cover documents with a family at a suburban home")}
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

      {/* §2 Protection domains — route-owned below the shared hero */}
      <section
        className="border-b pb-12 md:pb-16 lg:pb-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
      >
        <div className={HOME4_WRAP}>
          <h2 id="protection-domains" className="sr-only">
            Protecting personal wealth and commercial balance sheets
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px border sm:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            {PROTECTION_DOMAINS.map((domain) => (
              <Link
                key={domain.href}
                href={domain.href}
                prefetch
                className="group flex flex-col bg-[#F7F6F3] transition hover:bg-white"
              >
                <div className="relative aspect-[21/9] w-full overflow-hidden bg-stone-200/60">
                  <Image
                    src={domain.image}
                    alt={getAlt(domain.image, domain.alt)}
                    fill
                    unoptimized
                    className="object-cover object-center motion-safe:transition motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-serif text-xl font-semibold tracking-tight text-shark">{domain.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{domain.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: TEAL }}>
                    Open domain
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §3 Commercial reality — shark */}
      <section
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="commercial-reality-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em] lg:sticky lg:top-28"
              style={{ color: TEAL_ON_DARK }}
            >
              Commercial reality
            </p>
          </aside>
          <div className="min-w-0 lg:col-span-9">
            <h2
              id="commercial-reality-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              Cover written for the balance sheet that actually operates
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
              Workshops, stock, machinery, and interruption risk do not match a template policy sold
              on price. Independent placement starts with what can burn, stop, or sue, then the
              wording.
            </p>
            <figure className="mt-8">
              <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-white/5">
                <Image
                  src={COMMERCIAL_IMAGE}
                  alt={getAlt(
                    COMMERCIAL_IMAGE,
                    "South African workshop, commercial property and interruption risk context"
                  )}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
              <figcaption className="mt-3 max-w-2xl text-xs leading-relaxed text-white/50">
                Ability cue: real operating environments, not glass-tower stock. Average Clause and
                Business Interruption definitions decide whether a claim restores the firm.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* §3 Average clause + tools — light */}
      <section
        id="average-clause"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="average-clause-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="rounded-lg px-6 py-10 sm:px-10 sm:py-12" style={{ backgroundColor: INSET }}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Diagnostic · ASSET 015
            </p>
            <h2
              id="average-clause-heading"
              className="mt-4 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              The mechanics of the Average Clause in South Africa
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              If the sum insured is below replacement value, many policies reduce the claim
              proportionally:{" "}
              <span className="font-semibold tabular-nums text-shark">
                (Amount Insured ÷ Market Value) × Damages = Payout
              </span>
              . That is underwriting maths, not a scare tactic.
            </p>
            <Link
              href={CALC_AVERAGE_CLAUSE}
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
              style={{ color: TEAL }}
            >
              Run the Average Clause calculator
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-stone-500">{FAIS_DISCLAIMER}</p>
          </div>

          <div className="mt-10 grid gap-5 border bg-white p-6 sm:grid-cols-2 sm:p-8" style={{ borderColor: HAIRLINE }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Premium liability
              </p>
              <h3 className="mt-2 font-serif text-lg font-semibold tracking-tight text-shark">
                Escalating vs level premiums
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Cheap starting premiums can become unaffordable when guarantees expire. Review the
                life insurance hub before comparing quotes on price alone.
              </p>
              <Link
                href="/solutions/life-insurance"
                prefetch
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: TEAL }}
              >
                Open life cover education
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="border-t pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0" style={{ borderColor: HAIRLINE }}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Commercial continuity
              </p>
              <h3 className="mt-2 font-serif text-lg font-semibold tracking-tight text-shark">
                Business risk review
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Key person, buy-and-sell funding, and commercial liability, structured for the
                balance sheet, not a generic package.
              </p>
              <Link
                href="/business-risk-review"
                prefetch={false}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: TEAL }}
              >
                Start a business risk review
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §4 Medical / gap demarcation — shark */}
      <section
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="medical-gap-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em] lg:sticky lg:top-28"
              style={{ color: TEAL_ON_DARK }}
            >
              Regulatory demarcation
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="medical-gap-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              Medical aid structuring vs gap cover demarcation
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              Medical schemes are governed by the Medical Schemes Act and must provide Prescribed
              Minimum Benefits (PMBs). Gap cover is a short-term insurance product under Demarcation
              Regulations, designed to fund in-hospital specialist shortfalls, not to replace a
              medical scheme.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              Annual gap cover benefit caps adjust under those regulations (verify the current
              figure for your policy year with a licensed adviser). We structure household health
              cover across both regimes without conflating them.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href="/solutions/medical-aid"
                prefetch
                className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                Medical aid &amp; gap domain
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/solutions/discovery-health"
                prefetch
                className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                Discovery Health 2026
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §5 Independence — light */}
      <section
        id="independence"
        className="scroll-mt-28 border-b py-12 md:py-16"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="independence-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="independence-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            The independence advantage: unrestricted market access
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            As an independent Category 1.8 FSP we survey the market and place cover where it fits , 
            without quotas that force a single insurer&apos;s shelf. Market access includes
            institutions such as:
          </p>
          <ul className="mt-8 grid gap-0 border-y md:grid-cols-3" style={{ borderColor: HAIRLINE }}>
            {PARTNERS.map((name) => (
              <li
                key={name}
                className="border-b px-4 py-5 font-serif text-lg font-semibold tracking-tight text-stone-700 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                style={{ borderColor: HAIRLINE }}
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone-600">
            Names indicate placement capability, not endorsement exclusivity or tied agency.
          </p>
        </div>
      </section>

      {/* §6 FAQ — shark (component default) */}
      <VisibleFaqSection
        faqs={faqItems}
        headingId="insurance-faq-heading"
        primaryCta={{ href: "/contact?source=insurance_faq", label: "Contact us" }}
      />

      {/* §7 Related — light */}
      <RelatedContent variant="warm" links={getRelatedLinks("/insurance")} />

      {/* §8 Terminal — dark panel (kept) */}
      <section
        id="risk-audit"
        className="scroll-mt-28 pb-16 pt-4 md:scroll-mt-32 md:pb-24"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="risk-audit-heading"
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
              id="risk-audit-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Ready for a structured risk audit?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              Bring policies, sums insured, and business continuity questions. An independent
              adviser will review cover architecture without product pressure.
            </p>
            <Link
              href="/contact?source=insurance_terminal"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Book a risk audit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-white/50">{FAIS_DISCLAIMER}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
