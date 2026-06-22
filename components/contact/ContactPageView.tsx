import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ContactEnquiryFormLazy } from "@/components/contact/ContactEnquiryFormLazy";
import { ShieldCheck } from "@/components/icons";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";
import { PageJsonLd } from "@/components/seo/PageJsonLd";

const trustBadges = [
  "FSP 17273",
  "25+ Years Experience",
  "Zero Advice Fees on Investments",
];

const steps = [
  {
    number: "1",
    title: "Capital Assessment.",
    body: "Your data is reviewed by an authorized FSP 17273 advisor to calculate preliminary capital lifespans.",
  },
  {
    number: "2",
    title: "Wealth Engineering Call.",
    body: "A direct consultation to audit your current trajectory and introduce unlisted yield structures.",
  },
  {
    number: "3",
    title: "Implementation & Allocation.",
    body: "Formal Everest Wealth quotations, tax-clearance routing, and final capital allocation.",
  },
];

const idealClient = [
  "Deploy meaningful capital into alternative structures beyond traditional markets",
  "Value actuarial rigour and long-term capital allocation over product shopping",
  "Seek a long-term wealth-engineering relationship, not a once-off transaction",
  "Ready for a structured review and suitability process before implementation",
];

const contactWebPage = {
  name: "Contact AS Brokers CC | Get in Touch for Financial Advice | FSP 17273",
  description:
    "Contact AS Brokers CC for professional financial planning, investment, and insurance services. Krugersdorp, West Rand. FSP 17273.",
};

/** Server-rendered contact page — form is the only client island (Phase 2.4). */
export function ContactPageView() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <PageJsonLd path="/contact" webPage={contactWebPage} />
      <section data-chunk-boundary className="pb-16 pt-28 md:pb-24">
        <div className={PAGE_CONTENT_MAX}>
          <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex min-h-0 flex-col">
              <div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Book a Private Actuarial Consultation.
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-zinc-400">
                  Connect directly with our Code 1.8 wealth engineers. No call centres. Just mathematics,
                  strategy, and high-yield execution.
                </p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {trustBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-2 rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 shadow-[0_0_12px_rgba(34,197,94,0.08)]"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-green-500/15 text-green-400 shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {badge}
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                  Submit the form and we&apos;ll get back to you personally. No call centre. Select what
                  you&apos;d like to discuss and we&apos;ll prepare for a relevant conversation.
                </p>
                <div className="mb-10 w-full max-w-xl lg:mb-0">
                  <PageMediaStrip
                    variant="secondary"
                    src="/images/contact-trust.jpg"
                    rounded="3xl"
                  />
                </div>
              </div>
              <div className="min-h-[2rem] flex-1" aria-hidden />
              <div className="border-t border-white/5 pt-8 lg:pt-10">
                <h2 className="mb-6 text-xl font-bold text-white">Client Qualification Criteria</h2>
                <ul className="mb-8 space-y-2">
                  {idealClient.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="mt-0.5 shrink-0 text-green-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <a
                    href="https://wa.me/27662276044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp-accessible px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                  >
                    WhatsApp us: +27 66 227 6044
                  </a>
                  <Link
                    href="/#solutions"
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-zinc-400 hover:text-white"
                  >
                    <ShieldCheck className="h-4 w-4" /> Explore solutions
                  </Link>
                </div>
                <p className="mt-4 text-xs text-zinc-400">
                  Existing clients: get in touch with your adviser or update your details. We&apos;ll route
                  you accordingly.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <ContactEnquiryFormLazy />
            </div>
          </div>
        </div>
      </section>

      <section data-chunk-boundary className="border-y border-white/5 bg-black/20 px-4 py-16 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold text-white sm:text-3xl">
            The Actuarial Review Process
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-zinc-400">
            Structured execution from assessment to allocation.
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center sm:text-left">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-white/25 bg-white/10 text-xl font-bold tabular-nums text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                  {step.number}
                </span>
                <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
