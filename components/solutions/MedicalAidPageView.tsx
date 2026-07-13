import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { MedicalDemarcationDiagram } from "@/components/trust/TrustDiagrams";
import { getAlt } from "@/lib/image-alt";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const MEDICAL_CRAFT = "/images/risk-arch-medical.jpg";

type Props = { faqs: FAQItem[] };

export function MedicalAidPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={HOME4_WRAP}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em] text-cinematic-teal">
            Medical aid &amp; gap · FSP 17273 · Claims advocacy
          </p>
          <h1
            className="mt-5 max-w-3xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
          >
            Health integration: defending against the medical inflation gap
          </h1>
          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
          >
            Schemes pay a base tariff. Private specialists often charge far more, leaving
            catastrophic in-hospital shortfalls. We structure medical aid with demarcation-compliant
            gap cover, then stay for authorisations and claims advocacy, not the cheapest plan on a
            comparison site.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact?source=medical_terminal"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Book a health structuring call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/healthy-retirement-blueprint"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
            >
              Retirement health gap assessment
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      <section className="pb-16 md:pb-24" aria-labelledby="shortfall-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
              The shortfall reality
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="shortfall-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Why “cheapest hospital plan” is the wrong job
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Call-centre medical brokers sell speed. The failure mode is the claim: PMBs, hospital
              authorisations, and specialist billing that exceeds scheme tariff by hundreds of
              percent. Your problem is insulating the household balance sheet, not winning a quote
              race.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              AS Brokers structures scheme + gap together, with specialist operational support for
              onboarding and chronic authorisations, the human layer that comparison sites do not
              provide.
            </p>
            <figure className="mt-8">
              <div
                className="relative aspect-[16/9] overflow-hidden border bg-white"
                style={{ borderColor: HAIRLINE }}
              >
                <Image
                  src={MEDICAL_CRAFT}
                  alt={getAlt(
                    MEDICAL_CRAFT,
                    "Medical and wellness setting, household protection context, not staff portraits"
                  )}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-stone-500">
                Outcome context, not headshots: the job is insulating the household at claim time.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-labelledby="gap-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
              Demarcation
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="gap-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Medical aid vs gap cover, different laws
            </h2>
            <div className="mt-8">
              <MedicalDemarcationDiagram />
            </div>
            <dl className="mt-8 border-y" style={{ borderColor: HAIRLINE }}>
              {[
                {
                  dt: "Medical schemes",
                  dd: "Governed by the Medical Schemes Act. Must provide Prescribed Minimum Benefits (PMBs). This is your primary health funding vehicle.",
                },
                {
                  dt: "Gap cover",
                  dd: "Short-term insurance under Demarcation Regulations, typically for in-hospital specialist shortfalls. It requires an underlying medical scheme. It is not a substitute for medical aid, and it is not day-to-day GP cover.",
                },
                {
                  dt: "Annual caps",
                  dd: "Gap benefits are subject to regulatory annual limits that adjust over time. Verify the current figure for your policy year with a licensed adviser, we do not sell “unlimited gap” myths.",
                },
              ].map((row) => (
                <div
                  key={row.dt}
                  className="grid gap-2 border-b py-5 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  style={{ borderColor: HAIRLINE }}
                >
                  <dt className="text-sm font-semibold text-shark">{row.dt}</dt>
                  <dd className="text-sm leading-relaxed text-stone-600">{row.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y py-12" style={{ borderColor: HAIRLINE }} aria-labelledby="advocacy-heading">
        <div className={HOME4_WRAP}>
          <h2
            id="advocacy-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
          >
            The advocacy promise
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            When a specialist bill arrives or an authorisation stalls, you need operational depth , 
            not a rotating call-centre queue. Our medical desk handles onboarding and claim pathways
            so you are not alone at the worst moment.
          </p>
          <Link
            href="/insurance"
            prefetch={false}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal"
          >
            Full risk architecture hub
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <VisibleFaqSection
        faqs={faqItems}
        headingId="medical-faq-heading"
        primaryCta={{ href: "/contact?source=medical_faq", label: "Contact us" }}
      />

      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/medical-aid")} />

      <section className="pb-16 md:pb-24" aria-labelledby="medical-cta-heading">
        <div className={HOME4_WRAP}>
          <div
            className="mx-auto max-w-[1000px] rounded-xl px-6 py-10 sm:px-10 sm:py-12"
            style={{ backgroundColor: INK }}
          >
            <h2
              id="medical-cta-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Ready to structure scheme + gap properly?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              Bring current membership, dependents, chronic conditions, and recent co-payment
              shocks. An authorised adviser will map options without a “cheapest plan” pitch.
            </p>
            <Link
              href="/contact?source=medical_terminal"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 rounded bg-cinematic-teal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Book a health structuring call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
