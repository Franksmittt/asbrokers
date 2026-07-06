"use client";

import Image from "next/image";
import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { ContactEnquiryFormLazy } from "@/components/contact/ContactEnquiryFormLazy";
import { Home4Reveal, HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { CheckSquare, LineChart, MessageCircle, ShieldCheck } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import { HUB_HERO_SIZES } from "@/lib/hub-lcp";
import { HUB_TEAL as TEAL } from "@/lib/hub-design-tokens";

const trustBadges = ["FSP 17273", "Category 1.8", "25+ Years of Experience"];

const whoWeHelp = [
  "High-net-worth individuals planning long-term wealth and income",
  "Business owners needing insurance, continuity, and structured advice",
  "Those nearing or in retirement who want clarity on drawdown and tax",
  "Families seeking independent guidance on investments, insurance, and estate planning",
];

const steps = [
  {
    number: "1",
    title: "Capital Assessment",
    body: "Your information is reviewed by an authorised FSP 17273 adviser to understand your goals, time horizon, and preliminary capital needs.",
    icon: LineChart,
  },
  {
    number: "2",
    title: "Wealth Engineering Call",
    body: "A direct consultation to review your current trajectory, discuss suitable structures, and answer your questions. No call centre.",
    icon: MessageCircle,
  },
  {
    number: "3",
    title: "Implementation & Allocation",
    body: "Where appropriate, formal quotations, tax-clearance routing, and next steps toward implementation and allocation.",
    icon: ShieldCheck,
  },
];

export function ContactPageView({ faqs = [] }: { faqs?: FAQItem[] }) {
  return (
    <>
      {/* Hero */}
      <section data-chunk-boundary="true" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home4-why-independence-4x3.jpg"
            alt={getAlt(
              "/images/home4-why-independence-4x3.jpg",
              "Independent financial adviser meeting with clients in a welcoming consultation"
            )}
            fill
            priority
            className="object-cover object-center"
            sizes={HUB_HERO_SIZES}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-shark/88 via-shark/60 to-shark/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-canvas via-shark/10 to-shark/25" />
        </div>

        <div className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28">
          <div className={`${HOME4_WRAP} max-w-3xl`}>
            <HubReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
                Contact · Krugersdorp · West Rand
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-[3.25rem] leading-[1.08]">
                Let&apos;s build your financial future together.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
                Speak with our independent fiduciary experts about your retirement, investments,
                insurance, or estate planning.
              </p>
            </HubReveal>
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section data-chunk-boundary="true" className="py-12 md:py-16">
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-shark sm:text-3xl">Who we help</h2>
            <p className="mt-3 max-w-xl text-stone-600 leading-relaxed">
              We work best with clients who value independent advice, long-term planning, and a structured review
              before any recommendation.
            </p>
            <ul className="mt-6 space-y-3">
              {whoWeHelp.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-stone-700 sm:text-base">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cinematic-teal/10 text-cinematic-teal">
                    <CheckSquare className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Home4Reveal>
        </div>
      </section>

      {/* What to expect + form */}
      <section data-chunk-boundary="true" className="border-t border-stone-200/80 py-12 md:py-20">
        <div className={HOME4_WRAP}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="space-y-10">
              <Home4Reveal delay={0.05}>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-shark sm:text-3xl">What to expect</h2>
                  <p className="mt-3 max-w-xl text-stone-600 leading-relaxed">
                    A clear, structured path from first conversation to implementation, at your pace.
                  </p>
                  <div className="mt-6 space-y-4">
                    {steps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <article
                          key={step.number}
                          className="flex gap-4 rounded-2xl bg-white/90 p-5 shadow-lg ring-1 ring-stone-200/80 transition-shadow duration-300 ease-in-out hover:shadow-xl"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-samsung-blue/10 text-samsung-blue">
                            <Icon className="h-5 w-5" aria-hidden />
                          </div>
                          <div>
                            <p
                              className="text-xs font-semibold uppercase tracking-wide"
                              style={{ color: TEAL }}
                            >
                              Step {step.number}
                            </p>
                            <h3 className="mt-1 text-lg font-bold text-shark">{step.title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{step.body}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </Home4Reveal>

              <Home4Reveal delay={0.1}>
                <div>
                  <h2 className="text-lg font-bold text-shark">Prefer to reach out directly?</h2>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href="https://wa.me/27662276044"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-whatsapp-accessible px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:bg-[#0d655e] hover:shadow-lg"
                    >
                      WhatsApp · +27 66 227 6044
                    </a>
                    <a
                      href="mailto:albert@asbrokers.co.za"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-shark shadow-md ring-1 ring-stone-200/80 transition-all duration-300 ease-in-out hover:shadow-lg hover:ring-stone-300"
                    >
                      albert@asbrokers.co.za
                    </a>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-stone-500">
                    Existing clients: contact your adviser directly and we&apos;ll route you accordingly.
                  </p>
                </div>
              </Home4Reveal>

              <Home4Reveal delay={0.12}>
                <div className="flex flex-wrap gap-2">
                  {trustBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-600 shadow-sm ring-1 ring-stone-200/80"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </Home4Reveal>
            </div>

            <Home4Reveal delay={0.08} className="lg:sticky lg:top-28">
              <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-stone-200/80 backdrop-blur-sm sm:p-8 md:p-10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight text-shark">Request a consultation</h2>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    Tell us a little about yourself and what you&apos;d like to discuss. We&apos;ll respond personally.
                    Not via a call centre.
                  </p>
                </div>
                <ContactEnquiryFormLazy />
              </div>
            </Home4Reveal>
          </div>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/contact")} />
      <Footer />
    </>
  );
}
