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
import { HubHeroKicker } from "@/components/hub/HubHeroKicker";
import { getAlt } from "@/lib/image-alt";
import { CallbackForm } from "@/components/forms/CallbackForm";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const INSET = "rgba(29,29,31,0.05)";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";

const HERO_IMAGE = "/images/insurance-domain-business-21x9.webp";
const COMMERCIAL_IMAGE = "/images/risk-arch-commercial.jpg";
const OWNER_IMAGE = "/images/business-insurance-inset-1x1.jpg";

const RISK_CARDS = [
  {
    id: "underinsurance",
    title: "Underinsurance & the Average Clause",
    problem:
      "If buildings, stock, or equipment are insured for less than replacement value, many policies reduce the claim proportionally: (Sum Insured ÷ Replacement Value) × Claim = Payout. One fire on under-declared stock can wipe out years of margin — even if the damage is only partial.",
    solution:
      "We review sums insured and escalation clauses at inception and every renewal so declared values keep pace with actual replacement costs.",
  },
  {
    id: "bi",
    title: "Business Interruption",
    problem:
      "Revenue stops; salaries, rent, and fixed costs don't. A BI policy with the wrong indemnity period or basis — turnover versus gross profit — can exhaust its cover months before the business reopens.",
    solution:
      "We structure BI cover to match your break-even position and realistic recovery timeline, not a standard-product template.",
  },
  {
    id: "liability",
    title: "Public & Products Liability",
    problem:
      "One personal-injury or property-damage claim from a client, visitor, or product defect can exceed the net worth of a small business. Generic policy limits and poorly defined covered activities are common causes of declined or reduced liability claims.",
    solution:
      "We establish appropriate liability limits with wording that reflects your actual operating activity — on-site, off-site, and product-related.",
  },
  {
    id: "keyperson",
    title: "Key Person & Partner Risk",
    problem:
      "The death or disability of a founder, director, or key technician removes the revenue, relationships, or skills that sustain the business. Surviving partners may also face an inherited shareholder they did not choose.",
    solution:
      "We structure life cover to fund buy-and-sell agreements and key person obligations, aligned to the shareholders' agreement.",
  },
  {
    id: "crime",
    title: "Crime & Cyber",
    problem:
      "Theft, fraud, and business-email compromise are among the fastest-growing causes of commercial loss in South Africa. Standard property policies do not cover employee dishonesty or electronic funds transfer fraud.",
    solution:
      "We assess crime/fidelity and cyber liability exposure against your cash-handling, payroll processes, and digital operating profile.",
  },
  {
    id: "fleet",
    title: "Vehicles & Fleet",
    problem:
      "Unlicensed drivers, mixed private and commercial use, and outdated declared values are common causes of declined or reduced fleet claims. A single serious accident can expose the business balance sheet.",
    solution:
      "We review driver schedules, cover bases, and declared values annually — and clarify the business-use wording before a claim makes it relevant.",
  },
] as const;

const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    title: "Business Risk Review",
    body: "A free workbook to capture assets, turnover, key people, and existing cover. Completing it before we meet saves time and identifies the most important questions to examine together.",
  },
  {
    step: "02",
    title: "Needs analysis meeting",
    body: "An authorised representative of AS Brokers CC (FSP 17273) reviews the workbook with you, asks follow-up questions, and documents your commercial risk profile. Under FAIS, personal advice requires this step.",
  },
  {
    step: "03",
    title: "Market survey & placement",
    body: "As an independent Category 1.8 FSP, we survey the market and place cover that fits the documented needs — without quotas that tie us to one insurer's shelf.",
  },
  {
    step: "04",
    title: "Annual reviews & claims advocacy",
    body: "We review cover at every renewal to close any drift between declared values and real asset costs. When a claim arises, we represent your interests with the insurer and loss assessor.",
  },
] as const;

const PARTNERS = ["Santam", "Old Mutual", "Bryte"] as const;

type Props = { faqs: FAQItem[] };

export function BusinessInsurancePageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      {/* §1 Hero */}
      <MarketingHubHero
        kicker={<HubHeroKicker shortLabel="Business Insurance" longLabel="Business Insurance" />}
        title="Insurance built around how your business actually operates"
        description="One uninsured gap — a fire, a liability claim, the death of a partner — can end a business that took decades to build. An independent broker finds the gaps first."
        actions={
          <>
            <Link
              href="/business-risk-review"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
            >
              Start a free Business Risk Review
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact?source=business_insurance"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#006B6B] hover:opacity-80"
            >
              Request a needs analysis
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </>
        }
        visual={
          <figure className="relative aspect-[21/9] h-full min-h-[12rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <Image
              src={HERO_IMAGE}
              alt={getAlt(HERO_IMAGE, "Business partners outside a commercial warehouse, continuity and cover")}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </figure>
        }
        borderBottom
      />

      {/* §2 The risks that close businesses */}
      <section
        id="business-risks"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="risks-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Where cover fails
              </p>
            </div>
            <div className="lg:col-span-9">
              <h2
                id="risks-heading"
                className="font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
              >
                The risks that close businesses
              </h2>
              <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                Most commercial losses come from predictable causes. What makes them catastrophic is
                a cover gap that existed before the event — not during it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            {RISK_CARDS.map((card) => (
              <div key={card.id} className="flex flex-col bg-white p-6 sm:p-8">
                <h3
                  className="font-serif text-lg font-semibold tracking-tight"
                  style={{ color: INK }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{card.problem}</p>
                <p
                  className="mt-5 border-t pt-4 text-sm leading-relaxed font-medium"
                  style={{ borderColor: HAIRLINE, color: TEAL }}
                >
                  {card.solution}
                </p>
              </div>
            ))}
          </div>

          <figure className="mt-12">
            <div
              className="relative aspect-[16/9] overflow-hidden border bg-stone-100"
              style={{ borderColor: HAIRLINE }}
            >
              <Image
                src={COMMERCIAL_IMAGE}
                alt={getAlt(
                  COMMERCIAL_IMAGE,
                  "South African workshop, commercial property and business interruption risk context"
                )}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-stone-500">
              Real operating environments: the Average Clause and Business Interruption definitions
              decide whether a claim restores the firm or leaves the owner exposed.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* §3 The owner is part of the business — shark */}
      <section
        className="bg-shark py-16 text-white md:py-24"
        aria-labelledby="owner-heading"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em] lg:sticky lg:top-28"
              style={{ color: TEAL_ON_DARK }}
            >
              Personal lines
            </p>
          </aside>
          <div className="min-w-0 lg:col-span-9">
            <h2
              id="owner-heading"
              className="font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              The owner is part of the business
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
              A business owner&apos;s risk does not end at the office door. Home contents, personal
              motor vehicles, life cover, income protection, and medical aid for the owner and staff
              all intersect with the business balance sheet. A gap in any one of them creates
              pressure on the other.
            </p>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
              An authorised representative who understands the commercial picture can structure
              personal cover in context — not in isolation from what the business depends on.
            </p>
            <dl className="mt-8 border-y border-white/15">
              {[
                {
                  dt: "Home & motor",
                  dd: "Personal property and vehicle cover reviewed alongside the business portfolio — shared assets and dual-use vehicles handled correctly.",
                },
                {
                  dt: "Life & income protection",
                  dd: "The owner's death or disability affects the business and the household simultaneously. Both need a plan, and they interact.",
                },
                {
                  dt: "Medical aid for owner and staff",
                  dd: "Scheme structuring for the owner and, where appropriate, group schemes for staff — coordinated through the same adviser relationship.",
                },
                {
                  dt: "Estate continuity",
                  dd: "Business assets, loan accounts, and personal estate intersect. Cover structures should align with the owner's will and shareholders' agreement.",
                },
              ].map((row) => (
                <div
                  key={row.dt}
                  className="grid gap-2 border-b border-white/15 py-5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-white">{row.dt}</dt>
                  <dd className="text-sm leading-relaxed text-white/65">{row.dd}</dd>
                </div>
              ))}
            </dl>
            <figure className="mt-10">
              <div className="relative aspect-square max-w-xs overflow-hidden border border-white/10 bg-white/5">
                <Image
                  src={OWNER_IMAGE}
                  alt={getAlt(
                    OWNER_IMAGE,
                    "Business owner reviewing documents, personal and commercial cover in context"
                  )}
                  fill
                  className="object-cover object-center"
                  sizes="320px"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-white/50">
                Personal and commercial cover reviewed together — not as separate product sales.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* §4 How we work — CANVAS */}
      <section
        id="how-we-work"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="how-we-work-heading"
      >
        <div className={HOME4_WRAP}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
                The process
              </p>
            </div>
            <div className="min-w-0 lg:col-span-9">
              <h2
                id="how-we-work-heading"
                className="font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
              >
                How we work
              </h2>
              <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                Independent advice follows a structured process — not a price comparison. Here is
                what to expect from introduction to annual review.
              </p>

              <ol className="mt-10 grid gap-px border sm:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
                {HOW_WE_WORK_STEPS.map((item) => (
                  <li key={item.step} className="flex flex-col bg-white p-6 sm:p-8">
                    <span
                      className="text-[11px] font-semibold tabular-nums"
                      style={{ color: TEAL }}
                    >
                      {item.step}
                    </span>
                    <h3
                      className="mt-3 font-serif text-lg font-semibold tracking-tight"
                      style={{ color: INK }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{item.body}</p>
                  </li>
                ))}
              </ol>

              <div
                className="mt-8 rounded-lg px-6 py-7 sm:px-8"
                style={{ backgroundColor: INSET }}
              >
                <p className="text-sm leading-relaxed text-stone-600">
                  Annual renewal reviews are where independent brokers add consistent value: sums
                  insured erode against inflation, business turnover changes, and new assets enter
                  the picture. A once-and-done policy is almost always underinsured within three
                  years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §5 Independence note — CANVAS light band */}
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
            style={{ fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", color: INK }}
          >
            Not tied to one insurer
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            As an independent Category 1.8 FSP, AS Brokers CC surveys the market and places cover
            according to a documented needs analysis. Placement capability includes:
          </p>
          <ul
            className="mt-6 grid gap-0 border-y md:grid-cols-3"
            style={{ borderColor: HAIRLINE }}
          >
            {PARTNERS.map((name) => (
              <li
                key={name}
                className="border-b px-4 py-5 font-serif text-lg font-semibold tracking-tight text-stone-700 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                style={{ borderColor: HAIRLINE }}
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-stone-600">
            Names indicate placement capability, not endorsement exclusivity or tied agency.
          </p>
        </div>
      </section>

      {/* §5b Callback capture — light */}
      <section
        className="border-b pb-14 pt-2 md:pb-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-label="Request a callback"
      >
        <div className={HOME4_WRAP}>
          <CallbackForm
            source="business_insurance"
            heading="Rather talk it through?"
            description="Leave your name and number. An adviser who works with business owners phones you back within one business day — bring a renewal, a claim, or a gap you're unsure about."
            buttonLabel="Request a callback"
            showNote
            whatsappMessage="Hi AS Brokers, please call me back about my business insurance."
          />
        </div>
      </section>

      {/* §6 FAQ — shark (component default) */}
      <VisibleFaqSection
        faqs={faqItems}
        id="business-insurance-faq"
        headingId="business-insurance-faq-heading"
        kicker="Before you book"
        heading="Straight answers on business insurance"
        lead="Education first. Personal advice only after a needs analysis with AS Brokers CC, FSP 17273."
        primaryCta={{ href: "/contact?source=business_insurance_faq", label: "Contact us" }}
        secondaryCta={{ href: "/business-risk-review", label: "Start the Risk Review" }}
      />

      {/* §7 Related — warm */}
      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/business-insurance")} />

      {/* §8 Terminal CTA — dark panel */}
      <section
        className="pb-16 pt-4 md:pb-24"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby="biz-cta-heading"
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
              FSP 17273 · Category 1.8 · Est. 1998
            </p>
            <h2
              id="biz-cta-heading"
              className="mt-4 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
            >
              Ready to find the gaps before a claim does?
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              Bring policy schedules, asset values, and turnover figures. An authorised
              representative will review your circumstances and provide personal recommendations
              where appropriate — after a documented needs analysis.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/business-risk-review"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Start a free Business Risk Review
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact?source=business_insurance_terminal"
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                Request a needs analysis
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §9 Quiet Section 1(3)(a) disclaimer — above footer */}
      <section
        className="border-t pb-10 pt-8"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-label="General information disclaimer"
      >
        <div className={HOME4_WRAP}>
          <p className="max-w-3xl text-xs leading-relaxed text-stone-500">
            <span className="font-semibold text-stone-600">General information · Section 1(3)(a) FAIS Act.</span>{" "}
            The content on this page is provided for general informational purposes only and
            constitutes factual information as contemplated in Section 1(3)(a) of the Financial
            Advisory and Intermediary Services Act, 37 of 2002. It does not constitute financial,
            insurance, tax, or legal advice, and no recommendation is made regarding the suitability
            of any financial product for any individual. Personal advice is only provided after a
            Financial Needs Analysis conducted by an authorised representative of AS Brokers CC
            (FSP 17273), as required by FAIS.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
