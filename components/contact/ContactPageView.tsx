"use client";

import Image from "next/image";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { ContactFormDeferred } from "@/components/contact/ContactFormDeferred";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { getAlt } from "@/lib/image-alt";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const TRUST_IMAGE = "/images/contact-trust.jpg";
const FAIS_POPIA =
  "Submitting this form does not constitute financial advice under the FAIS Act, 2002. Advice is only rendered after a documented needs analysis by a licensed representative of FSP 17273. Personal information is processed to respond to your enquiry and initiate a capital assessment, in line with POPIA. See our Privacy Policy.";

const SOURCE_LABELS: Record<string, string> = {
  investments_terminal: "Continuing from the Investments hub",
  insurance_terminal: "Continuing from the Insurance risk audit",
  estate_terminal: "Continuing from Estate planning",
  insights_terminal: "Continuing from the Insights library",
  about_terminal: "Continuing from About AS Brokers",
  calculators_terminal: "Continuing after the calculator library",
  everest_terminal: "Continuing from the Everest Wealth hub",
  medical_terminal: "Continuing from medical aid & gap structuring",
};

const STEPS = [
  {
    number: "1",
    title: "Capital Assessment",
    body: "An authorised FSP 17273 adviser reviews your goals, time horizon, and preliminary capital needs — personally, not via a call centre.",
  },
  {
    number: "2",
    title: "Wealth Engineering Call",
    body: "A direct consultation to review your trajectory, discuss suitable structures, and answer questions at your pace.",
  },
  {
    number: "3",
    title: "Implementation & Allocation",
    body: "Where appropriate: formal quotations, tax-clearance routing, and next steps toward implementation.",
  },
] as const;

function IntakeContextBanner() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "";
  const label = SOURCE_LABELS[source];
  if (!label) return null;
  return (
    <p className="mt-4 border-l-2 border-cinematic-teal pl-4 text-sm font-medium text-stone-700">
      {label}
    </p>
  );
}

export function ContactPageView({ faqs = [] }: { faqs?: FAQItem[] }) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="pb-10 pt-28 md:pb-12 md:pt-36 lg:pt-40">
        <div className={HOME4_WRAP}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Contact · Krugersdorp · West Rand ·{" "}
            <span className="tabular-nums">FSP 17273</span>
          </p>
          <h1
            className="mt-5 max-w-3xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
          >
            Engineer your wealth architecture
          </h1>
          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
          >
            Untangling retirement, risk, medical, or estate questions can feel risky. Start here:
            Capital Assessment → Wealth Engineering Call → Implementation — with an authorised
            FSP 17273 adviser, not a call centre. Submitting an enquiry is not financial advice.
          </p>
          <Suspense fallback={null}>
            <IntakeContextBanner />
          </Suspense>
        </div>
      </header>

      <section className="pb-16 md:pb-20" aria-labelledby="intake-form-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-12 gap-10 lg:gap-14`}>
          <div className="col-span-12 lg:col-span-7">
            <h2 id="intake-form-heading" className="font-serif text-xl font-semibold tracking-tight text-shark">
              Consultation enquiry
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              AS Brokers CC · <span className="tabular-nums">FSP 17273</span> · POPIA compliant
            </p>
            <div className="mt-8 border bg-white p-6 sm:p-8" style={{ borderColor: HAIRLINE }}>
              <Suspense
                fallback={
                  <div className="min-h-[480px] border border-stone-200 bg-stone-50" aria-hidden />
                }
              >
                <ContactFormDeferred />
              </Suspense>
            </div>
          </div>

          <div className="col-span-12 space-y-12 lg:col-span-5">
            <figure>
              <div
                className="relative aspect-[4/3] overflow-hidden border bg-white"
                style={{ borderColor: HAIRLINE }}
              >
                <Image
                  src={TRUST_IMAGE}
                  alt={getAlt(TRUST_IMAGE, "In-person consultation with an AS Brokers adviser")}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-stone-500">
                Human intake: an authorised FSP 17273 adviser responds — not a rotating call centre.
              </figcaption>
            </figure>

            <div>
              <h2 className="font-serif text-xl font-semibold tracking-tight text-shark">
                Who we help best
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone-600">
                <li>Pre-retirees who need capital-longevity maths, not a product pitch</li>
                <li>Business owners worried about underinsurance and continuity</li>
                <li>Families facing medical shortfalls or estate liquidity gaps</li>
                <li>High earners seeking tax-aware structures under Category 1.8</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold tracking-tight text-shark">
                What happens next
              </h2>
              <ol className="mt-6 space-y-6">
                {STEPS.map((step) => (
                  <li key={step.number} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span className="font-serif text-lg font-semibold tabular-nums text-stone-500">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-shark">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t pt-8" style={{ borderColor: HAIRLINE }}>
              <h2 className="font-serif text-xl font-semibold tracking-tight text-shark">
                Prefer another channel?
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="https://wa.me/27662276044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-stone-700 underline-offset-2 hover:text-cinematic-teal hover:underline"
                  >
                    WhatsApp · +27 66 227 6044
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:albert@asbrokers.co.za"
                    className="font-medium text-stone-700 underline-offset-2 hover:text-cinematic-teal hover:underline"
                  >
                    albert@asbrokers.co.za
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-stone-500">
                Existing clients: contact your adviser directly and we&apos;ll route you accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y py-10" style={{ borderColor: HAIRLINE }} aria-labelledby="fais-popia-heading">
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <h2 id="fais-popia-heading" className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            FAIS &amp; POPIA
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {FAIS_POPIA}{" "}
            <a href="/privacy" className="font-semibold text-cinematic-teal hover:opacity-80">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="contact-faq-heading">
        <div className={`${HOME4_WRAP} mx-auto max-w-3xl`}>
          <h2
            id="contact-faq-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y border-y" style={{ borderColor: HAIRLINE }}>
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-semibold text-shark marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span className="shrink-0 text-cinematic-teal transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/contact")} />
      <Footer />
    </div>
  );
}
