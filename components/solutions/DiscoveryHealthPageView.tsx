import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { DiscoveryLeadForm } from "@/components/solutions/DiscoveryLeadForm";
import {
  DiscoveryPlanMatrix,
  type DiscoveryPlanCard,
} from "@/components/solutions/DiscoveryPlanMatrix.client";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";

const VALUE_CARDS = [
  {
    title: "100% embedded pricing",
    body: "Broker fees are capped by the Council for Medical Schemes (R125.86 per month + VAT for 2026, or 3% + VAT of contributions, whichever is less) and built into the premium by law. Apply direct and Discovery retains that fee. Apply through us and you get ongoing broker support for the same monthly contribution.",
  },
  {
    title: "Fiduciary needs analysis",
    body: "Under the FAIS General Code of Conduct we must complete a needs analysis and Record of Advice before recommending a plan. The job is matching clinical and financial risk, not selling the highest commission option.",
  },
  {
    title: "Claims & dispute support",
    body: "Scheme call centres protect the risk pool. We help with rejected claims, PMB short-pays from Medical Savings Accounts, and Section 47 complaints to the Registrar of Medical Schemes when escalation is needed.",
  },
  {
    title: "Medical aid + gap stacking",
    body: "Even strong Discovery plans typically reimburse in-hospital specialists at a capped scheme rate. We engineer a DHMS plan with demarcation-compliant Gap Cover to close specialist shortfalls while keeping total premium coherent.",
  },
] as const;

const JARGON = [
  {
    term: "MSA",
    definition:
      "Medical Savings Account — a yearly day-to-day wallet funded from part of your premium for GP visits, acute medicine, and basic dentistry. Unused funds typically roll over.",
  },
  {
    term: "ATB",
    definition:
      "Above Threshold Benefit — once day-to-day claims deplete the MSA and reach an annual threshold, further out-of-hospital claims may be covered at the Discovery Health Rate on qualifying plans.",
  },
  {
    term: "PHF",
    definition:
      "Personal Health Fund — behaviour-linked day-to-day funding via the Discovery Health app (steps, sleep, health checks). 2026 materials describe advances and earnable top-ups; confirm current limits for your plan.",
  },
  {
    term: "Networks",
    definition:
      "Network plans require listed hospitals/providers to avoid large co-payments on non-emergency out-of-network admissions. Viable in Gauteng where Smart and Delta networks include major private hospitals.",
  },
] as const;

const PLANS: DiscoveryPlanCard[] = [
  {
    series: "Executive",
    avatar: "Elite unrestricted access",
    mechanism:
      "Unlimited private hospital cover, large upfront MSA, unlimited ATB pathway, maximum Personal Health Fund limit on scheme materials.",
    premiums: ["From ~R12,338 main member (Apr 2026)"],
    filter: "premium",
  },
  {
    series: "Comprehensive",
    avatar: "High-risk / heavy day-to-day",
    mechanism:
      "Strong hospital cover with high MSA and limited ATB — suited where chronic or specialist utilisation is expected.",
    premiums: ["Classic Smart from ~R8,576", "Classic from ~R10,037"],
    filter: "premium",
  },
  {
    series: "Priority",
    avatar: "ATB without Comprehensive cost",
    mechanism: "Hospital cover with moderate MSA and limited ATB — pragmatic middle path.",
    premiums: ["Essential from ~R5,327", "Classic from ~R6,198"],
    filter: "family",
  },
  {
    series: "Saver",
    avatar: "Day-to-day control + hospital",
    mechanism: "Unlimited hospital cover with ~25% of premium to MSA. No ATB. Standard PHF applies.",
    premiums: ["Classic Delta from ~R3,875", "Classic from ~R4,850"],
    filter: "family",
  },
  {
    series: "Smart Saver",
    avatar: "Young family / digital tools",
    mechanism:
      "Network hospital cover (e.g. listed Gauteng facilities), risk-funded GP pathways, moderate MSA, PHF.",
    premiums: ["Essential from ~R2,750", "Classic from ~R3,350"],
    filter: "family",
  },
  {
    series: "Core",
    avatar: "Catastrophic hospital only",
    mechanism:
      "Unlimited hospital cover for emergencies and surgeries. No day-to-day MSA. Standard PHF may apply.",
    premiums: ["Essential Delta from ~R2,681", "Classic from ~R3,905"],
    filter: "budget",
  },
  {
    series: "Smart",
    avatar: "Digital native / network GP",
    mechanism:
      "Network hospital + fixed co-pay network GP visits. No MSA. Strict Smart Network rules apply.",
    premiums: ["Active from ~R1,350", "Classic from ~R3,018"],
    filter: "budget",
  },
  {
    series: "KeyCare",
    avatar: "Income-banded essential cover",
    mechanism:
      "Income-based premiums with highly restricted state/network facilities for hospital and primary care.",
    premiums: ["Start Regional from ~R1,278"],
    filter: "budget",
  },
];

type Props = { faqs: FAQItem[] };

export function DiscoveryHealthPageView({ faqs }: Props) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={HOME4_WRAP}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em] text-cinematic-teal">
            Discovery Health · Medical aid &amp; gap · FSP 17273
          </p>
          <h1
            className="mt-5 max-w-3xl font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
          >
            Stop guessing. Architect your Discovery Health cover.
          </h1>
          <p
            className="mt-5 max-w-2xl leading-relaxed"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
          >
            Navigating Discovery Health Medical Scheme alone leaves you exposed to specialist
            shortfalls, hidden co-payments, and redundant premiums. AS Brokers runs a FAIS-compliant
            plan audit and Gap Cover stack, at no extra cost beyond the broker fee already built into
            every medical aid premium.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#discovery-audit-form"
              className="inline-flex items-center gap-2 rounded bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              Get your free plan audit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#discovery-matrix"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
            >
              2026 plan matrix
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-stone-500">
            Independent Category 1.8 FSP 17273 · Council for Medical Schemes broker remuneration
            framework · POPIA consent on every lead · Educational content, not personal advice until
            consultation.
          </p>
        </div>
      </header>

      <section className="pb-16 md:pb-24" aria-labelledby="deficit-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
              The specialist deficit
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="deficit-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              The blind spot in “full cover” medical aid
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Even top-tier medical aids legally limit specialist payouts to a scheme rate (often
              100%–200% of the Discovery Health Rate). If a surgeon charges multiples of that rate,
              you fund the deficit. Choosing a plan from a PDF brochure without Gap Cover stacking is
              a household balance-sheet risk, not a shopping exercise.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              For the 2026 benefit year, Discovery Health announced a weighted average contribution
              increase of 7.2% (plan bands vary; Active Smart held at 0% in scheme materials), with
              increases deferred to 1 April 2026 for members. We translate that matrix into the plan
              that fits your risk, not the loudest brochure.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-y py-16 md:py-24"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="broker-value-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="broker-value-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Why use AS Brokers for Discovery
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            You pay the same contribution whether you join through a call centre or an accredited
            broker. The difference is lifelong needs analysis, stacking, and claims advocacy.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-px border sm:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            {VALUE_CARDS.map((card) => (
              <li key={card.title} className="bg-[#F7F6F3] p-6 sm:p-8">
                <h3 className="font-serif text-xl font-semibold tracking-tight text-shark">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="jargon-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
              Jargon decoder
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="jargon-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              MSA, ATB, PHF, networks — plain English
            </h2>
            <dl className="mt-8 border-y" style={{ borderColor: HAIRLINE }}>
              {JARGON.map((row) => (
                <div
                  key={row.term}
                  className="grid gap-2 border-b py-5 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
                  style={{ borderColor: HAIRLINE }}
                >
                  <dt className="text-sm font-semibold text-shark">{row.term}</dt>
                  <dd className="text-sm leading-relaxed text-stone-600">{row.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="discovery-matrix"
        className="scroll-mt-28 border-y py-16 md:scroll-mt-32 md:py-24"
        style={{ borderColor: HAIRLINE, backgroundColor: "rgba(29,29,31,0.03)" }}
        aria-labelledby="matrix-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="matrix-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            The 2026 Discovery Health matrix, decoded
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Find the avatar closest to your household. We then build the exact plan + Gap architecture
            around it — education first, advice after consultation.
          </p>
          <div className="mt-10">
            <DiscoveryPlanMatrix plans={PLANS} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="stack-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 lg:sticky lg:top-28">
              Holistic stack
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="stack-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Discovery Health + Gap Cover
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              A standalone medical aid is often financially incomplete. By pairing a network-efficient
              DHMS tier (for example Smart Saver where appropriate) with a targeted Gap Cover product,
              we aim to close in-hospital specialist shortfalls — scheme materials for Discovery Gap
              Comprehensive describe additional specialist cover layers, oncology co-payment support,
              and defined out-of-hospital scan benefits subject to annual limits.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Gap cover is short-term insurance under Demarcation Regulations. It requires an
              underlying medical scheme and is not a substitute for medical aid. We map both layers
              together.
            </p>
            <Link
              href="/solutions/medical-aid"
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal"
            >
              Medical aid vs gap demarcation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="discovery-audit-form"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="discovery-form-heading"
      >
        <div className={HOME4_WRAP}>
          <div
            className="grid grid-cols-1 gap-10 rounded-xl px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:gap-12"
            style={{ backgroundColor: INK }}
          >
            <div className="lg:col-span-5">
              <h2
                id="discovery-form-heading"
                className="font-serif font-semibold tracking-tight text-white"
                style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", lineHeight: 1.2 }}
              >
                Request a custom Discovery + Gap stack
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/75">
                Submit your details. A certified adviser will contact you within one business day for
                a zero-cost, FAIS-compliant audit of your current coverage.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/50">
                AS Brokers CC · FSP 17273 · Independent of Discovery Health Medical Scheme
                administration. Product recommendations follow consultation and Record of Advice.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 sm:p-8 lg:col-span-7">
              <DiscoveryLeadForm />
            </div>
          </div>
        </div>
      </section>

      <VisibleFaqSection
        faqs={faqItems}
        headingId="discovery-faq-heading"
        primaryCta={{ href: "#discovery-audit-form", label: "Request an audit" }}
      />

      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/discovery-health")} />

      <Footer />
    </div>
  );
}
