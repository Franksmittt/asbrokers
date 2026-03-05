"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ContactEnquiryForm } from "@/components/ContactEnquiryForm";
import { ShieldCheck } from "@/components/icons";

const trustBadges = [
  "FSP 17273",
  "25+ Years Experience",
  "Zero Advice Fees on Investments",
];

const steps = [
  {
    number: "1",
    title: "I'll review your enquiry personally",
    body: "Not a call centre. I'll look at what you've selected and prepare for a relevant conversation.",
  },
  {
    number: "2",
    title: "We'll have a structured discussion",
    body: "I'll call or WhatsApp you to understand your full situation (income, tax, estate, and goals) before recommending anything.",
  },
  {
    number: "3",
    title: "You'll receive a tailored recommendation",
    body: "If we're the right fit, I'll present a clear plan with formal quotes, suitability confirmation, and implementation steps.",
  },
];

const idealClient = [
  "Business owners, professionals, or retirees with investable assets",
  "Value advice and structured planning over product shopping",
  "Want a long-term relationship, not a once-off transaction",
  "Willing to follow a professional process before committing",
];

export default function ContactPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Top: text left (same height as form), form right */}
      <section className="pt-28 pb-16 md:pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left: copy + we work best with + CTAs, fills same height as form */}
            <div className="flex flex-col min-h-0">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                  Let&apos;s start a conversation
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Independent financial advice for business owners, professionals, and retirees who value structured planning.
                </p>
                <div className="space-y-3 mb-8">
                  {trustBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-2 text-sm text-zinc-300"
                    >
                      <span className="text-green-400">✓</span>
                      {badge}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-10 lg:mb-0">
                  Submit the form and we&apos;ll get back to you personally. No call centre. Select what you&apos;d like to discuss and we&apos;ll prepare for a relevant conversation.
                </p>
              </div>

              {/* Spacer so next block sits at bottom of column (same height as form) */}
              <div className="flex-1 min-h-[2rem]" aria-hidden />

              {/* We work best with + CTAs, aligned to bottom */}
              <div className="pt-8 lg:pt-10 border-t border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">
                  We work best with clients who
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

      {/* What happens next */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-y border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            What happens next
          </h2>
          <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
            After you submit, here&apos;s what to expect:
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center sm:text-left">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-lg mb-4">
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
