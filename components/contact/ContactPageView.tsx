import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { ContactFormDeferred } from "@/components/contact/ContactFormDeferred";
import {
  ContactIntakeBanner,
} from "@/components/contact/ContactIntakeBanner.client";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#3f3a36";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const TRUST_IMAGE = "/images/contact-trust.jpg";
const FAIS_POPIA =
  "Submitting this form does not constitute financial advice under the FAIS Act, 2002. Advice is only rendered after a documented needs analysis by a licensed representative of FSP 17273. Personal information is processed to respond to your enquiry and arrange a consultation, in line with POPIA. See our Privacy Policy.";

const STEPS = [
  {
    number: "01",
    title: "We reply personally",
    body: "An authorised FSP 17273 adviser reviews your enquiry and gets back to you, not a rotating call centre.",
  },
  {
    number: "02",
    title: "Consultation",
    body: "A direct conversation to understand your goals, time horizon, and existing cover or capital. At your pace.",
  },
  {
    number: "03",
    title: "Clear next steps",
    body: "Where appropriate: needs analysis, quotations, and a plan you understand before anything is implemented.",
  },
] as const;

const WHO_WE_HELP = [
  "Pre-retirees who need capital-longevity maths, not a product pitch",
  "Business owners worried about underinsurance and continuity",
  "Families facing medical shortfalls or estate liquidity gaps",
  "High earners seeking tax-aware structures under Category 1.8",
] as const;

export function ContactPageView({ faqs = [] }: { faqs?: FAQItem[] }) {
  // Visible FAQ must match JSON-LD, no pad-to-6.
  const faqItems = faqs;

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      {/* §1 Hero, light */}
      <header
        className="border-b pb-12 pt-28 md:pb-14 md:pt-36 lg:pb-16 lg:pt-40"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-7">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL }}
            >
              Contact · Krugersdorp · West Rand ·{" "}
              <span className="tabular-nums">FSP 17273</span>
            </p>
            <h1
              className="mt-5 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
            >
              Contact AS Brokers in Krugersdorp
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              Tell us what you need help with. An authorised AS Brokers adviser will respond
              personally about retirement, Everest, insurance, medical, or estate. Submitting an enquiry
              is not financial advice under FAIS.
            </p>
            <Suspense fallback={null}>
              <ContactIntakeBanner />
            </Suspense>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <div
              className="relative aspect-[16/10] overflow-hidden border bg-white"
              style={{ borderColor: HAIRLINE }}
            >
              <Image
                src={TRUST_IMAGE}
                alt={getAlt(TRUST_IMAGE, "In-person consultation with an AS Brokers adviser")}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-stone-500">
              Human intake: FSP 17273 responds personally, not a rotating queue.
            </p>
          </div>
        </div>
      </header>

      {/* §2 Form + channels, light */}
      <section
        className="border-b pb-16 pt-14 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="intake-form-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start`}>
          <div className="min-w-0 lg:col-span-8">
            <h2
              id="intake-form-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.5vw, 1.75rem)", color: INK }}
            >
              Send an enquiry
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              AS Brokers CC · <span className="tabular-nums">FSP 17273</span> · POPIA compliant
            </p>
            <div className="mt-8 border bg-white p-6 sm:p-8 md:p-10" style={{ borderColor: HAIRLINE }}>
              <Suspense
                fallback={
                  <div className="min-h-[420px] border border-stone-200 bg-stone-50" aria-hidden />
                }
              >
                <ContactFormDeferred />
              </Suspense>
            </div>
          </div>

          <aside className="min-w-0 lg:col-span-4 lg:sticky lg:top-28">
            <h2 className="font-serif text-xl font-semibold tracking-tight text-shark">
              Prefer another channel?
            </h2>
            <ul className="mt-5 space-y-0 border-y" style={{ borderColor: HAIRLINE }}>
              <li className="border-b py-4" style={{ borderColor: HAIRLINE }}>
                <a
                  href="https://wa.me/27662276044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                  style={{ color: TEAL }}
                >
                  WhatsApp · +27 66 227 6044
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </li>
              <li className="py-4">
                <a
                  href="mailto:albert@asbrokers.co.za"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                  style={{ color: TEAL }}
                >
                  albert@asbrokers.co.za
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-stone-500">
              Existing clients: contact your adviser directly and we&apos;ll route you accordingly.
            </p>
          </aside>
        </div>
      </section>

      {/* §3 What happens next, shark */}
      <section
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="next-steps-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: TEAL_ON_DARK }}
          >
            After you write
          </p>
          <h2
            id="next-steps-heading"
            className="mt-4 max-w-2xl font-serif font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
          >
            What happens next
          </h2>
          <ol className="mt-10 grid gap-0 border-y border-white/10 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.number}
                className={`py-8 md:py-10 ${
                  i < STEPS.length - 1 ? "border-b border-white/10 md:border-b-0 md:border-r md:pr-8" : ""
                } ${i > 0 ? "md:pl-8" : ""}`}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-[0.16em] tabular-nums"
                  style={{ color: TEAL_ON_DARK }}
                >
                  {step.number}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <aside className="min-w-0 lg:col-span-3">
              <p
                className="text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: TEAL_ON_DARK }}
              >
                Fit
              </p>
            </aside>
            <div className="min-w-0 lg:col-span-9">
              <h3 className="font-serif text-xl font-semibold tracking-tight text-white">
                Who we help best
              </h3>
              <ul className="mt-6 space-y-0 border-y border-white/10">
                {WHO_WE_HELP.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/10 py-4 text-sm leading-relaxed text-white/70 last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §4 FAIS / POPIA, light */}
      <section
        className="border-b py-12 md:py-14"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="fais-popia-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="fais-popia-heading"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500"
          >
            FAIS &amp; POPIA
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600">
            {FAIS_POPIA}{" "}
            <Link href="/privacy" prefetch={false} className="font-semibold transition hover:opacity-80" style={{ color: TEAL }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* §5 FAQ, shark */}
      <VisibleFaqSection
        faqs={faqItems}
        headingId="contact-faq-heading"
        primaryCta={{ href: "#intake-form-heading", label: "Send an enquiry" }}
      />

      {/* §6 Related, light */}
      <RelatedContent variant="warm" links={getRelatedLinks("/contact")} />
      <Footer />
    </div>
  );
}
