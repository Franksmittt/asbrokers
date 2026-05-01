"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ContactEnquiryForm } from "@/components/forms/ContactEnquiryForm";
import { ShieldCheck } from "@/components/icons";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";

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

export default function ContactPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@type\": \"WebPage\", \"url\": \"https://www.asbrokers.co.za/contact\", \"description\": \"Contact AS Brokers CC for professional financial planning, investment, and insurance services. We serve Krugersdorp, the West Rand, and beyond. FSP 17273. Phone: +27116601445.\", \"@context\": \"https://schema.org\", \"name\": \"Contact AS Brokers CC | Get in Touch for Financial Advice | FSP 17273\"}" }} />
      {/* Top: text left (same height as form), form right */}
      <section className="pt-28 pb-16 md:pb-24">
        <div className={PAGE_CONTENT_MAX}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left: copy + we work best with + CTAs, fills same height as form */}
            <div className="flex flex-col min-h-0">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                  Book a Private Actuarial Consultation.
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Connect directly with our Code 1.8 wealth engineers. No call centres. Just mathematics, strategy, and high-yield execution.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
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
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Submit the form and we&apos;ll get back to you personally. No call centre. Select what you&apos;d like to discuss and we&apos;ll prepare for a relevant conversation.
                </p>
                <div className="w-full max-w-xl mb-10 lg:mb-0">
                  <PageMediaStrip
                    variant="secondary"
                    src="/images/contact-trust.jpg"
                    alt="Personal financial consultation in a professional meeting setting"
                    rounded="3xl"
                  />
                </div>
              </div>

              {/* Spacer so next block sits at bottom of column (same height as form) */}
              <div className="flex-1 min-h-[2rem]" aria-hidden />

              {/* Client Qualification Criteria + CTAs, aligned to bottom */}
              <div className="pt-8 lg:pt-10 border-t border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">
                  Client Qualification Criteria
                </h2>
                <ul className="space-y-2 mb-8">
                  {idealClient.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-zinc-400 text-sm">
                      <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="https://wa.me/27672429946"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    WhatsApp us: 067 242 9946
                  </a>
                  <Link
                    href="/#solutions"
                    className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white text-sm font-medium"
                  >
                    <ShieldCheck className="w-4 h-4" /> Explore solutions
                  </Link>
                </div>
                <p className="text-zinc-500 text-xs mt-4">
                  Existing clients: get in touch with your adviser or update your details. We&apos;ll route you accordingly.
                </p>
              </div>
            </div>

            {/* Right: form, drives row height */}
            <div className="flex flex-col">
              <ContactEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* The Actuarial Review Process */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-y border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            The Actuarial Review Process
          </h2>
          <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
            Structured execution from assessment to allocation.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center sm:text-left">
                <span className="inline-flex w-12 h-12 items-center justify-center rounded-[1.25rem] border border-white/25 bg-white/10 text-white font-bold text-xl tabular-nums shadow-[0_0_0_1px_rgba(255,255,255,0.06)] mb-4">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
