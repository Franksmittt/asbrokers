import { Footer } from "@/components/Footer";
import { HubReveal } from "@/components/hub/HubReveal";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { FAQItem } from "@/lib/seo";
import { ContactFormDeferred } from "@/components/contact/ContactFormDeferred";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { CheckSquare, LineChart, MessageCircle, ShieldCheck } from "@/components/icons";
import {
  HUB_TEAL as TEAL,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

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
      <section
        data-chunk-boundary="true"
        className="border-t border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: "#FDFCFA" }}
        aria-labelledby="contact-main-heading"
      >
        <div className={GRID}>
          <h2 id="contact-main-heading" className="sr-only">
            Contact AS Brokers
          </h2>

          <div className="col-span-12 space-y-10 lg:col-span-5">
            <HubReveal instant>
              <div>
                <h3
                  className="font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", color: INK }}
                >
                  Who we help
                </h3>
                <p
                  className="mt-3 max-w-xl leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  We work best with clients who value independent advice, long-term planning, and a
                  structured review before any recommendation.
                </p>
                <ul className="mt-6 space-y-3">
                  {whoWeHelp.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${TEAL}18`, color: TEAL }}
                      >
                        <CheckSquare className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span
                        className="leading-relaxed"
                        style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </HubReveal>

            <HubReveal instant>
              <div>
                <h3
                  className="font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", color: INK }}
                >
                  What to expect
                </h3>
                <p
                  className="mt-3 max-w-xl leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  A clear, structured path from first conversation to implementation, at your pace.
                </p>
                <div className="mt-6 space-y-4">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <article
                        key={step.number}
                        className="flex gap-4 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-stone-200/90"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-samsung-blue/10 text-samsung-blue">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>
                        <div>
                          <p
                            className="font-semibold uppercase tracking-wide"
                            style={{ fontSize: "clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem)", color: TEAL }}
                          >
                            Step {step.number}
                          </p>
                          <h4
                            className="mt-1 font-bold"
                            style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: INK }}
                          >
                            {step.title}
                          </h4>
                          <p
                            className="mt-1.5 leading-relaxed"
                            style={{ fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)", color: BODY }}
                          >
                            {step.body}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </HubReveal>

            <HubReveal delay={0.08}>
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-800 shadow-sm ring-1 ring-stone-200/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </HubReveal>

            <HubReveal delay={0.1}>
              <div>
                <h3
                  className="font-bold"
                  style={{ fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", color: INK }}
                >
                  Prefer to reach out directly?
                </h3>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="https://wa.me/27662276044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-whatsapp-accessible px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0d655e]"
                  >
                    WhatsApp · +27 66 227 6044
                  </a>
                  <a
                    href="mailto:albert@asbrokers.co.za"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold shadow-md ring-1 ring-stone-200/90 transition-all hover:ring-stone-300"
                    style={{ color: INK }}
                  >
                    albert@asbrokers.co.za
                  </a>
                </div>
                <p
                  className="mt-4 leading-relaxed text-stone-600"
                  style={{ fontSize: "clamp(0.8125rem, 0.8rem + 0.08vw, 0.875rem)" }}
                >
                  Existing clients: contact your adviser directly and we&apos;ll route you accordingly.
                </p>
              </div>
            </HubReveal>
          </div>

          <HubReveal instant className="col-span-12 lg:col-span-7">
            <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-stone-200/90 sm:p-8 lg:sticky lg:top-28">
              <div className="mb-6">
                <h3
                  className="font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", color: INK }}
                >
                  Request a consultation
                </h3>
                <p
                  className="mt-2 leading-relaxed"
                  style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem)", color: BODY }}
                >
                  Tell us a little about yourself and what you&apos;d like to discuss. We&apos;ll respond
                  personally — not via a call centre.
                </p>
              </div>
              <ContactFormDeferred />
            </div>
          </HubReveal>
        </div>
      </section>

      <VisibleFaqSection faqs={faqs} />
      <RelatedContent variant="warm" links={getRelatedLinks("/contact")} />
      <Footer />
    </>
  );
}
