import Image from "next/image";
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
import { getAlt } from "@/lib/image-alt";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
/** WCAG AA teal on canvas (matches /insurance hub). */
const TEAL = "#0F766E";
const HERO_IMAGE = "/images/risk-arch-medical.webp";
// CONTAINMENT 2026-07-22: Asset 015 frozen. Restore: calculatorPagePath("asset-015-average-clause")
const CALC_AVERAGE = "/calculators";

const GENERAL_ADVICE_DISCLAIMER =
  "The information on this page is provided for general informational purposes only and constitutes factual information as contemplated in Section 1(3)(a) of the Financial Advisory and Intermediary Services Act, 37 of 2002 (FAIS Act). It does not constitute financial, investment, legal, tax, or insurance advice. No recommendation is made regarding the suitability of any financial product for any individual. Personal advice requires a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).";

const VALUE_CARDS = [
  {
    title: "Embedded broker pricing",
    body: "Broker fees are capped by the Council for Medical Schemes (R125.86 per month + VAT for 2026, or 3% + VAT of contributions, whichever is less) and built into the premium by law. Apply direct and Discovery Health Medical Scheme retains that fee. Apply through AS Brokers CC and you get ongoing broker support for the same monthly contribution.",
  },
  {
    title: "FAIS needs analysis",
    body: "Under the FAIS General Code of Conduct, AS Brokers CC must complete a needs analysis and Record of Advice before recommending a Discovery Health plan. The job is matching clinical and financial risk, not selling the highest commission option.",
  },
  {
    title: "Claims & dispute support",
    body: "Scheme call centres protect the risk pool. AS Brokers helps with rejected claims, PMB short-pays from Medical Savings Accounts, and Section 47 complaints to the Registrar of Medical Schemes when escalation is needed.",
  },
  {
    title: "Medical aid + Gap stacking",
    body: "Even strong Discovery Health plans typically reimburse in-hospital specialists at a capped scheme rate. We engineer a DHMS plan with demarcation-compliant Gap Cover to close specialist shortfalls while keeping total premium coherent.",
  },
] as const;

const FIT_ROWS = [
  {
    fit: "for",
    title: "Households joining or switching Discovery Health",
    body: "You want an independent broker to map dependents, chronics, hospital preferences, and budget before you pick a series, not a brochure-only decision.",
  },
  {
    fit: "for",
    title: "Members who need Gap Cover with medical aid",
    body: "You understand (or want to understand) specialist tariff shortfalls and need scheme + Gap Cover structured together under Demarcation rules.",
  },
  {
    fit: "for",
    title: "West Rand / Gauteng families who want a local FSP",
    body: "You prefer dealing with AS Brokers CC in Krugersdorp (or remotely) rather than a national call centre with no ongoing broker relationship.",
  },
  {
    fit: "not",
    title: "People seeking clinical or hospital treatment advice",
    body: "AS Brokers CC does not practise medicine. Clinical decisions sit with your doctors and the scheme’s managed-care rules.",
  },
  {
    fit: "not",
    title: "Anyone wanting “unlimited gap” or guaranteed claim outcomes",
    body: "Gap benefits have regulatory annual limits and exclusions. We will not market myths. Outcomes depend on wording and facts.",
  },
  {
    fit: "not",
    title: "Clients who only want the cheapest brochure plan",
    body: "If the sole criterion is lowest contribution with no shortfall analysis, a comparison site quote race may feel faster, and riskier at claim time.",
  },
] as const;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Enquiry",
    body: "You request a Discovery + Gap audit (form, WhatsApp, or contact). POPIA consent is explicit. No advice is given on the form alone.",
  },
  {
    step: "02",
    title: "Needs analysis",
    body: "An authorised representative of FSP 17273 documents dependents, chronics, budget, network tolerance, and existing cover, FAIS Record of Advice pathway.",
  },
  {
    step: "03",
    title: "Option shortlist",
    body: "We shortlist Discovery Health Medical Scheme series (and Gap Cover where appropriate) that match the analysis, not a one-size product push.",
  },
  {
    step: "04",
    title: "Application support",
    body: "We assist with applications, underwriting questions, and onboarding so you are not alone in scheme administration.",
  },
  {
    step: "05",
    title: "Ongoing advocacy",
    body: "After join or switch, AS Brokers remains the broker of record for authorisations, shortfalls, and dispute pathways where escalation is warranted.",
  },
] as const;

const JARGON = [
  {
    term: "MSA",
    definition:
      "Medical Savings Account, a yearly day-to-day wallet funded from part of your Discovery Health premium for GP visits, acute medicine, and basic dentistry. Unused funds typically roll over.",
  },
  {
    term: "ATB",
    definition:
      "Above Threshold Benefit, once day-to-day claims deplete the MSA and reach an annual threshold, further out-of-hospital claims may be covered at the Discovery Health Rate on qualifying plans.",
  },
  {
    term: "PHF",
    definition:
      "Personal Health Fund, behaviour-linked day-to-day funding via the Discovery Health app (steps, sleep, health checks). 2026 materials describe advances and earnable top-ups; confirm current limits for your plan.",
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
      "Strong hospital cover with high MSA and limited ATB, suited where chronic or specialist utilisation is expected.",
    premiums: ["Classic Smart from ~R8,576", "Classic from ~R10,037"],
    filter: "premium",
  },
  {
    series: "Priority",
    avatar: "ATB without Comprehensive cost",
    mechanism: "Hospital cover with moderate MSA and limited ATB, pragmatic middle path.",
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

type Props = { faqs: FAQItem[]; contentRevised: string };

export function DiscoveryHealthPageView({ faqs, contentRevised }: Props) {
  const faqItems = ensureSixFaqs(faqs);
  const revisedLabel = new Date(`${contentRevised}T12:00:00`).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header
        data-chunk-boundary
        className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
      >
        <div className={`${HOME4_WRAP} grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-7">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL }}
            >
              Discovery Health Medical Scheme · Gap Cover · FSP 17273
            </p>
            <h1
              className="mt-5 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
            >
              Discovery Health medical aid broker for South African families
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              AS Brokers CC (FSP 17273) in Krugersdorp, West Rand, helps South African households
              evaluate Discovery Health Medical Scheme plans, stack demarcation-compliant Gap Cover,
              and keep a human broker for claims, at no extra monthly premium versus joining
              Discovery direct.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#discovery-audit-form"
                className="inline-flex items-center gap-2 rounded px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Request a Discovery + Gap needs analysis
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#who-this-is-for"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                style={{ color: TEAL }}
              >
                Who this is for
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-stone-600">
              Independent Category 1.8 FSP · CMS broker remuneration framework · POPIA consent on
              every lead · Educational content until a FAIS consultation. Page revised {revisedLabel}.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Medical and wellness setting for Discovery Health medical aid structuring"
                )}
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </figure>
          </div>
        </div>
      </header>

      {/* §1(3)(a) General information disclaimer, amber */}
      <section
        id="discovery-general-disclaimer"
        className="border-b border-amber-200/80 bg-amber-50 py-8 md:py-10"
        aria-labelledby="discovery-disclaimer-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="discovery-disclaimer-heading"
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-900"
          >
            General information disclaimer
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-amber-950/90">
            {GENERAL_ADVICE_DISCLAIMER}
          </p>
        </div>
      </section>

      <section
        id="who-this-is-for"
        data-chunk-boundary
        className="scroll-mt-28 border-y py-16 md:scroll-mt-32 md:py-24"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="fit-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="fit-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Who Discovery Health brokerage with AS Brokers is for
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Honest fit beats brochure theatre. AS Brokers CC will say when Discovery Health Medical
            Scheme is a strong candidate, and when Gap Cover, another scheme path, or more homework
            is the better next step.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-px border sm:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            {FIT_ROWS.map((row) => (
              <li key={row.title} className="bg-[#F7F6F3] p-6 sm:p-8">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: TEAL }}
                >
                  {row.fit === "for" ? "Right fit when" : "Not the right fit when"}
                </p>
                <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight text-shark">
                  {row.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{row.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        data-chunk-boundary
        className="py-16 md:py-24"
        aria-labelledby="how-brokerage-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="how-brokerage-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            How AS Brokers works with Discovery Health
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            This is the real process at AS Brokers CC, not a product advert. Advice only follows a
            documented needs analysis by a licensed representative of FSP 17273.
          </p>
          <ol className="mt-10 grid grid-cols-1 gap-px border md:grid-cols-5" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            {PROCESS_STEPS.map((item) => (
              <li key={item.step} className="flex flex-col bg-[#F7F6F3] p-5 sm:p-6">
                <p className="text-xs font-semibold tabular-nums" style={{ color: TEAL }}>
                  {item.step}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold tracking-tight text-shark">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-chunk-boundary className="pb-16 md:pb-24" aria-labelledby="deficit-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 lg:sticky lg:top-28">
              Why broker vs direct
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="deficit-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Why “full cover” Discovery Health still leaves shortfalls
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Even top-tier medical aids legally limit specialist payouts to a scheme rate (often
              100%–200% of the Discovery Health Rate). If a surgeon charges multiples of that rate,
              you fund the deficit. Choosing a Discovery Health plan from a PDF brochure without Gap
              Cover stacking is a household balance-sheet risk, not a shopping exercise.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              For the 2026 benefit year, Discovery Health announced a weighted average contribution
              increase of 7.2% (plan bands vary; Active Smart held at 0% in scheme materials), with
              increases deferred to 1 April 2026 for members. AS Brokers CC translates that matrix
              into the plan that fits your risk, after a needs analysis, not a loudest-brochure race.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/solutions/medical-aid"
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                style={{ color: TEAL }}
              >
                Medical aid vs gap demarcation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={CALC_AVERAGE}
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                style={{ color: TEAL }}
              >
                View educational calculators
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        data-chunk-boundary
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
            Why use AS Brokers CC for Discovery Health
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            You pay the same contribution whether you join through a call centre or an accredited
            broker. The difference is lifelong needs analysis, Gap stacking, and claims advocacy from
            an independent Krugersdorp FSP.
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

      <section data-chunk-boundary className="py-16 md:py-24" aria-labelledby="jargon-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 lg:sticky lg:top-28">
              Plan mechanics
            </p>
          </aside>
          <div className="min-w-0 col-span-full max-w-3xl lg:col-span-9">
            <h2
              id="jargon-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Discovery Health MSA, ATB, PHF, and networks, plain English
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
        data-chunk-boundary
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
            2026 Discovery Health plan series we advise on
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Find the avatar closest to your household. AS Brokers CC then builds the exact Discovery
            Health + Gap architecture around it, education first, advice after consultation. This is
            not a full inventory of every sub-option; it is a decision map for the series we commonly
            analyse.
          </p>
          <div className="mt-10">
            <DiscoveryPlanMatrix plans={PLANS} />
          </div>
        </div>
      </section>

      <section data-chunk-boundary className="py-16 md:py-24" aria-labelledby="stack-heading">
        <div className={`${HOME4_WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <aside className="min-w-0 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 lg:sticky lg:top-28">
              Gap Cover stack
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
              Discovery Health Medical Scheme tier (for example Smart Saver where appropriate) with a
              targeted Gap Cover product, we aim to close in-hospital specialist shortfalls, scheme
              materials for Discovery Gap Comprehensive describe additional specialist cover layers,
              oncology co-payment support, and defined out-of-hospital scan benefits subject to annual
              limits.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Gap Cover is short-term insurance under Demarcation Regulations. It requires an
              underlying medical scheme and is not a substitute for Discovery Health medical aid. AS
              Brokers CC maps both layers together.
            </p>
            <Link
              href="/solutions/medical-aid"
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
              style={{ color: TEAL }}
            >
              Full medical aid &amp; gap hub
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section
        data-chunk-boundary
        className="border-y py-16 md:py-24"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="who-how-why-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="who-how-why-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Who, how, and why, in plain terms
          </h2>
          <dl className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <dt className="text-sm font-semibold text-shark">Who</dt>
              <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                AS Brokers CC (FSP 17273), an independent Category 1.8 financial services provider in
                Krugersdorp, West Rand, South Africa, not Discovery Limited and not a call centre.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-shark">How</dt>
              <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                FAIS needs analysis, Discovery Health Medical Scheme option shortlisting, Gap Cover
                stacking concepts, application support, and claims advocacy after you become a
                client.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-shark">Why</dt>
              <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                The broker fee is already in the contribution. Using AS Brokers CC costs the same
                premium as going direct, with independence, stacking discipline, and a human desk when
                claims stall.
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-sm leading-relaxed text-stone-600">
            Unit 2, The Bridge, 47 Commissioner Street, Krugersdorp, Gauteng ·{" "}
            <a href="tel:+27116601445" className="font-semibold underline-offset-2 hover:underline" style={{ color: TEAL }}>
              +27 11 660 1445
            </a>
            {" · "}
            <Link href="/contact?source=discovery_terminal" prefetch={false} className="font-semibold underline-offset-2 hover:underline" style={{ color: TEAL }}>
              Contact
            </Link>
            {" · "}
            <Link href="/insurance" prefetch={false} className="font-semibold underline-offset-2 hover:underline" style={{ color: TEAL }}>
              Insurance hub
            </Link>
          </p>
        </div>
      </section>

      <section
        id="discovery-audit-form"
        data-chunk-boundary
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
                Request a Discovery Health + Gap needs analysis
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/75">
                Submit your details. An authorised adviser at AS Brokers CC will contact you within
                one business day for a FAIS-compliant needs analysis of your current coverage,
                Krugersdorp, West Rand, or remote across South Africa.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/50">
                AS Brokers CC · FSP 17273 · Independent of Discovery Health Medical Scheme
                administration. Product recommendations follow consultation and Record of Advice.
              </p>
              <a
                href="https://wa.me/27662276044"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5EEAD4] hover:opacity-80"
              >
                WhatsApp AS Brokers
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
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
        heading="Discovery Health broker questions, answered straight"
        lead="Education first. Personal financial advice only after a needs analysis with AS Brokers CC, FSP 17273, Krugersdorp."
        primaryCta={{ href: "#discovery-audit-form", label: "Request a needs analysis" }}
        secondaryCta={{ href: "/solutions/medical-aid", label: "Medical aid & gap hub" }}
      />

      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/discovery-health")} />

      <Footer />
    </div>
  );
}
