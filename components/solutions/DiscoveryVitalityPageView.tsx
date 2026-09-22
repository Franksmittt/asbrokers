import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { VitalityLeadForm } from "@/components/solutions/VitalityLeadForm";
import { getAlt } from "@/lib/image-alt";
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL_HREF,
} from "@/lib/office-phone";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const HERO_IMAGE = "/images/risk-arch-medical.webp";

const GENERAL_ADVICE_DISCLAIMER =
  "The information on this page is general information under Section 1(3)(a) of the FAIS Act, 37 of 2002, and is not financial advice or a product recommendation. Discovery Vitality fees, rewards, device benefits, and partner discounts change and must be confirmed against current Discovery materials. Personal recommendations follow a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).";

const STATUS_TIERS = [
  { tier: "Blue", points: "Starting status (resets each year)" },
  { tier: "Bronze", points: "From 7,500 points (single adult)*" },
  { tier: "Silver", points: "From 25,000 points*" },
  { tier: "Gold", points: "From 40,000 points*" },
  { tier: "Diamond", points: "From 50,000 points*" },
] as const;

const POINT_PILLARS = [
  {
    title: "Vitality Health Check",
    body: "Clinical baseline (blood pressure, glucose, cholesterol, weight, smoker status). Large point allocation when results are in range; high-risk results may cap points until retest.",
  },
  {
    title: "Physical activity",
    body: "Steps, gym sessions, heart-rate workouts, races, and cardio fitness level (VO₂ max estimates via linked devices). Intensity typically earns more points than light activity.",
  },
  {
    title: "Nutrition & screenings",
    body: "HealthyFood purchase ratios at partner retailers, plus preventative screenings and vaccinations as defined in the current Vitality rules.",
  },
  {
    title: "Sleep (2026 emphasis)",
    body: "Sleep tracking via recognised wearables can earn monthly points when quality thresholds are met. Confirm device and scoring rules with Discovery before relying on them.",
  },
] as const;

const REWARD_AREAS = [
  {
    title: "Fitness partners",
    body: "Status-linked gym fee subsidies (for example Virgin Active / Planet Fitness pathways) and network workouts. Maximum discounts usually require a visit average — miss the target and the subsidy can drop.",
  },
  {
    title: "HealthyFood & retail",
    body: "Cash-back style rewards on qualifying healthy groceries and personal-care items at partner stores. Percentages scale with Vitality status and may increase when linked to Discovery Bank / Vitality Money.",
  },
  {
    title: "Travel & leisure",
    body: "Higher statuses may unlock flight, hire-car, accommodation, and cinema discounts. Treat published maxima as illustrative until confirmed for your membership type.",
  },
  {
    title: "Device benefits",
    body: "Apple Watch and Oura pathways typically use an activation fee plus activity- or sleep-linked monthly funding. Miss weekly goals and the member repayment rises — this is not a free gift with no conditions.",
  },
] as const;

const FIT_ROWS = [
  {
    fit: "for",
    title: "Households joining or reviewing Discovery Vitality",
    body: "You want an independent broker to explain how Vitality sits beside medical aid or life cover — without a brochure-only decision.",
  },
  {
    fit: "for",
    title: "Members who will actually engage",
    body: "Rewards favour people who complete health checks, move regularly, and track partners correctly. Passive membership rarely maximises value.",
  },
  {
    fit: "for",
    title: "West Rand / Gauteng clients who want a local FSP",
    body: "You prefer AS Brokers CC in Krugersdorp (or remote) for onboarding and ongoing questions, not only a national call centre.",
  },
  {
    fit: "not",
    title: "Anyone expecting guaranteed savings or health outcomes",
    body: "Published studies and averages are not promises for you. Rewards, penalties, and clinical results vary by engagement and Discovery rules.",
  },
  {
    fit: "not",
    title: "People who want Vitality instead of medical aid",
    body: "Vitality is a separate lifestyle programme with its own fee. It is not a medical scheme and does not replace Prescribed Minimum Benefits.",
  },
  {
    fit: "not",
    title: "Anyone seeking clinical treatment advice",
    body: "AS Brokers CC does not practise medicine. Clinical decisions sit with your doctors and Discovery’s managed-care rules where relevant.",
  },
] as const;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Short enquiry",
    body: "Complete the form below. POPIA consent is explicit. No advice is given from the form alone.",
  },
  {
    step: "02",
    title: "Needs conversation",
    body: "An authorised representative of FSP 17273 discusses your household, existing Discovery products, and whether Vitality is relevant.",
  },
  {
    step: "03",
    title: "Illustrative walkthrough",
    body: "We explain status, points, fees, and device/partner conditions using current public materials — then confirm live rules with Discovery.",
  },
  {
    step: "04",
    title: "Application support",
    body: "If you choose to proceed, we help with joining or linking Vitality through AS Brokers where appropriate.",
  },
] as const;

function ImagePlaceholder({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  return (
    <figure
      className="flex aspect-[16/10] flex-col items-center justify-center border border-dashed border-stone-300 bg-white px-6 text-center"
      aria-label={label}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
        Image placeholder
      </p>
      <p className="mt-3 font-serif text-lg font-semibold" style={{ color: INK }}>
        {label}
      </p>
      <figcaption className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: BODY }}>
        {caption}
      </figcaption>
    </figure>
  );
}

type Props = { faqs: FAQItem[]; contentRevised: string };

export function DiscoveryVitalityPageView({ faqs, contentRevised }: Props) {
  const faqItems = ensureSixFaqs(faqs);
  const revisedLabel = new Date(`${contentRevised}T12:00:00`).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header data-chunk-boundary className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={`${HOME4_WRAP} grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12`}>
          <div className="min-w-0 lg:col-span-7">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL }}
            >
              Discovery Vitality · Wellness programme · FSP 17273
            </p>
            <h1
              className="mt-5 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
            >
              Discovery Vitality through AS Brokers
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              Understand how Discovery Vitality’s shared-value wellness programme works — status,
              points, partners, and device benefits — then request a short signup conversation with
              AS Brokers CC (FSP 17273) in Krugersdorp.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#vitality-signup"
                className="inline-flex items-center gap-2 rounded px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Sign up interest
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#how-vitality-works"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                style={{ color: TEAL }}
              >
                How Vitality works
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-stone-600">
              Independent Category 1.8 FSP · Educational content until a FAIS consultation · Page
              revised {revisedLabel}.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
              <Image
                src={HERO_IMAGE}
                alt={getAlt(
                  HERO_IMAGE,
                  "Wellness and lifestyle setting for Discovery Vitality education"
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

      <section
        className="border-y py-10"
        style={{ borderColor: HAIRLINE, backgroundColor: "#fff" }}
        aria-label="Compliance notice"
      >
        <div className={HOME4_WRAP}>
          <p className="max-w-3xl text-sm leading-relaxed" style={{ color: BODY }}>
            {GENERAL_ADVICE_DISCLAIMER}
          </p>
        </div>
      </section>

      <section
        id="how-vitality-works"
        data-chunk-boundary
        className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-24"
        aria-labelledby="how-heading"
      >
        <div className={`${HOME4_WRAP} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-6">
            <h2
              id="how-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Shared-value wellness, not a medical scheme
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Discovery Vitality is a behavioural wellness programme. Members earn points for
              verified healthy actions; higher status can unlock larger partner rewards. Discovery
              Health Medical Scheme (the medical aid) and Discovery Vitality (the for-profit
              lifestyle programme) are separate legal arrangements. Vitality charges its own
              membership fee and does not change community-rated medical scheme premiums.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Illustrative 2026 public materials describe Vitality Premium around R429 per main
              member per month (plus dependents) and a lower-cost Vitality Active option. Confirm
              live fees with Discovery before you budget.
            </p>
          </div>
          <div className="lg:col-span-6">
            <ImagePlaceholder
              label="Vitality status journey"
              caption="Replace with approved lifestyle / activity photography (no Discovery logos without licence)."
            />
          </div>
        </div>
      </section>

      <section
        data-chunk-boundary
        className="border-y py-16 md:py-24"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="status-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="status-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Status tiers (illustrative 2026)
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Everyone starts on Blue each calendar year. Points reset on 1 January. Household
            thresholds differ for additional adults — verify the current table with Discovery.
          </p>
          <div className="mt-10 overflow-x-auto border border-stone-200 bg-white">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <caption className="sr-only">Illustrative Discovery Vitality status thresholds</caption>
              <thead>
                <tr className="border-b border-stone-200 bg-[#F7F6F3]">
                  <th scope="col" className="px-4 py-3 font-semibold" style={{ color: INK }}>
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold" style={{ color: INK }}>
                    Points (single adult)*
                  </th>
                </tr>
              </thead>
              <tbody>
                {STATUS_TIERS.map((row) => (
                  <tr key={row.tier} className="border-b border-stone-100 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium" style={{ color: INK }}>
                      {row.tier}
                    </th>
                    <td className="px-4 py-3" style={{ color: BODY }}>
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-stone-500">
            *Drawn from publicly discussed 2026 benefit-year materials. Not a quote. Subject to
            Discovery’s official rules and household composition.
          </p>
        </div>
      </section>

      <section
        data-chunk-boundary
        className="py-16 md:py-24"
        aria-labelledby="points-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="points-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Where points usually come from
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Points reflect activities Discovery treats as risk-relevant. Caps and definitions change
            — use this as orientation only.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {POINT_PILLARS.map((item) => (
              <article key={item.title} className="border border-stone-200 bg-white p-6">
                <h3 className="font-serif text-xl font-semibold" style={{ color: INK }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <ImagePlaceholder
              label="Health check & wearable tracking"
              caption="Placeholder for approved photography of health assessment / wearable lifestyle (non-clinical staging)."
            />
          </div>
        </div>
      </section>

      <section
        data-chunk-boundary
        className="border-y py-16 md:py-24"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="rewards-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="rewards-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Rewards and device funding — with conditions
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Higher status can unlock larger partner benefits. Device programmes often use loss-framed
            monthly funding: meet weekly goals and Discovery may fund the instalment; miss goals and
            you may pay more. Always read the current benefit guide before you activate a device.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {REWARD_AREAS.map((item) => (
              <article key={item.title} className="border border-stone-200 bg-white p-6">
                <h3 className="font-serif text-xl font-semibold" style={{ color: INK }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ImagePlaceholder
              label="Fitness & partner rewards"
              caption="Placeholder for gym / outdoor activity imagery."
            />
            <ImagePlaceholder
              label="Healthy shopping partners"
              caption="Placeholder for grocery / wellness retail lifestyle imagery (no trademark misuse)."
            />
          </div>
        </div>
      </section>

      <section
        id="who-this-is-for"
        data-chunk-boundary
        className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-24"
        aria-labelledby="fit-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="fit-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Who Vitality conversations with AS Brokers are for
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {FIT_ROWS.map((row) => (
              <article
                key={row.title}
                className="border border-stone-200 bg-white p-5"
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: row.fit === "for" ? TEAL : "#B45309" }}
                >
                  {row.fit === "for" ? "A good fit" : "Not a fit"}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold" style={{ color: INK }}>
                  {row.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  {row.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-chunk-boundary
        className="border-y py-16 md:py-24"
        style={{ borderColor: HAIRLINE }}
        aria-labelledby="process-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="process-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            How signup through AS Brokers works
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <li key={step.step} className="border border-stone-200 bg-white p-5">
                <p className="text-xs font-semibold" style={{ color: TEAL }}>
                  {step.step}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold" style={{ color: INK }}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm leading-relaxed" style={{ color: BODY }}>
            Prefer to talk now? Call{" "}
            <a href={OFFICE_PHONE_TEL_HREF} className="font-semibold underline-offset-2 hover:underline" style={{ color: TEAL }}>
              {OFFICE_PHONE_DISPLAY}
            </a>{" "}
            or{" "}
            <Link href="/solutions/discovery-health" className="font-semibold underline-offset-2 hover:underline" style={{ color: TEAL }}>
              review Discovery Health medical aid
            </Link>{" "}
            if you also need scheme structuring.
          </p>
        </div>
      </section>

      <section
        id="vitality-signup"
        data-chunk-boundary
        className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-24"
        aria-labelledby="signup-heading"
      >
        <div className={`${HOME4_WRAP} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2
              id="signup-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Short signup form
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
              Tell us you want to explore Discovery Vitality through AS Brokers. We will contact you
              — this form does not activate membership or recommend a product.
            </p>
            <ImagePlaceholder
              label="AS Brokers wellness consult"
              caption="Placeholder for office / adviser consultation photography."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="border border-stone-200 bg-white p-6 sm:p-8">
              <VitalityLeadForm />
            </div>
          </div>
        </div>
      </section>

      <VisibleFaqSection
        faqs={faqItems}
        headingId="vitality-faq-heading"
        heading="Discovery Vitality questions, answered straight"
        lead="Education first. Personal financial advice only after a needs analysis with AS Brokers CC, FSP 17273, Krugersdorp."
        primaryCta={{ href: "#vitality-signup", label: "Sign up interest" }}
        secondaryCta={{ href: "/solutions/discovery-health", label: "Discovery Health medical aid" }}
      />

      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/discovery-vitality")} />

      <section aria-label="General information disclaimer" className="pb-10">
        <div className={HOME4_WRAP}>
          <p className="max-w-3xl text-xs leading-relaxed text-stone-500">
            {GENERAL_ADVICE_DISCLAIMER}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
