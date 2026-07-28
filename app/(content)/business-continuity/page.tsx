import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getAlt } from "@/lib/image-alt";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";

const PAGE_TITLE =
  "Key Person & Buy-and-Sell Insurance | Business Continuity | AS Brokers";
const PAGE_DESCRIPTION =
  "Independent broker structuring for key person cover and buy-and-sell funding for SA business partners. Cover is placed after a documented needs analysis with an authorised representative of AS Brokers CC, FSP 17273.";

const WHATSAPP_MESSAGE =
  "Hi AS Brokers, please call me back about key person / buy-and-sell cover.";

const RISKS = [
  {
    title: "The business loses its key person",
    body: "Revenue and bank confidence follow key people. Key person cover funds the gap while the business recovers or replaces the individual. Without it, a lender can call a facility or a major contract can lapse before a successor is in place.",
  },
  {
    title: "A partner's shares go to their estate",
    body: "Without funded buy-and-sell cover, surviving partners may find themselves co-owning the business with a grieving family. A funded buy-and-sell agreement gives the family fair value and the partners control, because the liquidity exists to make it work.",
  },
  {
    title: "The agreement and the policy do not match",
    body: "A buy-and-sell agreement without matching cover fails when tested. So does cover without a valid, current agreement. We coordinate the cover side with independent attorneys who draft the legal agreements, so both documents refer to the same valuation and event triggers.",
  },
  {
    title: "Valuations go stale",
    body: "Businesses grow. Cover amounts set years ago no longer reflect fair value. We review valuations and cover levels at least annually, so the buy-and-sell mechanism remains funded at the right amount when it is needed.",
  },
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Tell us about the business and shareholding",
    body: "Start a conversation by leaving your number below, or use the WhatsApp button. No forms to complete before we speak.",
  },
  {
    step: "02",
    title: "Needs analysis with an authorised representative",
    body: "An authorised representative of AS Brokers CC (FSP 17273) documents the shareholding structure, key-person dependencies, and existing cover. Personal advice under FAIS requires this step.",
  },
  {
    step: "03",
    title: "Structure and place cover across the market",
    body: "We place life and disability cover across the market. Placement capability includes Brightrock, Discovery Life, Momentum, and Sanlam, without exclusivity to any one provider. Independent attorneys draft the shareholders and buy-and-sell agreements; we coordinate the cover amounts with those documents.",
  },
  {
    step: "04",
    title: "Annual review of valuations and cover",
    body: "We return each year to compare the current business valuation against cover in force, update the insured amounts, and confirm the agreement still reflects the shareholding structure.",
  },
] as const;

const FAQS = [
  {
    question: "What is buy-and-sell insurance?",
    answer:
      "Buy-and-sell insurance funds a shareholders agreement on death or permanent disability. When a partner dies or becomes permanently disabled, the policy pays a lump sum to the surviving partners so they can purchase the deceased or disabled partner's shares at a pre-agreed value, rather than entering into an unplanned co-ownership with the estate or a new party.",
  },
  {
    question: "What is key person cover?",
    answer:
      "Key person cover is a life or disability policy owned by the business on the life of an individual whose skills, relationships, or revenue generation are critical to the business continuing. The policy proceeds flow to the business to fund the gap while a replacement is found or the business restructures.",
  },
  {
    question: "Do you draft the shareholders or buy-and-sell agreements?",
    answer:
      "No. We are insurance brokers, not attorneys. We coordinate the cover side: the policy amounts, ownership structure, and premium payer, to align with the legal documents. Independent attorneys draft and maintain the shareholders and buy-and-sell agreements. We can refer you to commercial attorneys who work with businesses of your size and structure.",
  },
  {
    question: "Which insurers do you work with for business life cover?",
    answer:
      "We place business life and disability cover across the market. Placement capability includes Brightrock, Discovery Life, Momentum, and Sanlam. Mentioning these providers indicates placement capability, not exclusivity or a product recommendation. A personal recommendation follows only after a documented needs analysis.",
  },
  {
    question: "How often should valuations be reviewed?",
    answer:
      "At least annually, and whenever there is a material change to the business, such as a significant revenue increase, a new shareholder joining, or a partner exiting. A valuation that has not kept pace with growth means the buy-and-sell mechanism is underfunded at the moment it is triggered.",
  },
  {
    question: "What does a consultation cost?",
    answer:
      "There is no charge for the initial conversation or the needs analysis. AS Brokers CC (FSP 17273) is compensated by the product providers once cover is placed, in accordance with our disclosure obligations under FAIS. Personal recommendations are made only after a documented needs analysis with an authorised representative.",
  },
] as const;

export const metadata = buildPageMetadata({
  path: "/business-continuity",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "buy-and-sell insurance",
    "key person insurance",
    "business continuity cover",
    "shareholder protection",
    "buy-and-sell agreement funding",
    "FSP 17273",
    "Gauteng business insurance broker",
  ],
});

export default function BusinessContinuityPage() {
  return (
    <>
      <PageJsonLd
        path="/business-continuity"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
        service={{
          name: "Key Person and Buy-and-Sell Insurance Broking",
          description: PAGE_DESCRIPTION,
          serviceType: "Business Life Insurance Broking",
        }}
      />
      <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
        {/* Hero: message match for key person / buy-and-sell searches */}
        <header className="pb-12 pt-28 md:pb-16 md:pt-36">
          <div className={`${HOME4_WRAP} grid gap-10 lg:grid-cols-12 lg:items-center`}>
            <div className="min-w-0 lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
                Authorised Financial Services Provider · FSP 17273 · Est. 1998
              </p>
              <h1
                className="mt-4 font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
              >
                Key person and buy-and-sell cover, structured properly
              </h1>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                The death or disability of a partner or key person removes the revenue, skills, or
                relationships the business depends on, and can leave surviving partners in business
                with an heir they did not choose. Cover only works if the policy, valuation, and
                shareholders agreement line up. That is structuring work, not a quote form.
              </p>
              <ul className="mt-6 space-y-2 text-sm leading-relaxed" style={{ color: BODY }}>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Independent: we survey the market across multiple life insurers
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Coordinated: cover amounts aligned with the shareholders agreement
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Annual review: valuations and cover kept in step as the business grows
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#callback"
                  className="inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  Discuss your continuity plan
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <Link
                  href="/solutions/business-insurance"
                  prefetch={false}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                  style={{ color: TEAL }}
                >
                  Business insurance overview
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
            <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-stone-300/90 bg-white lg:col-span-5">
              <Image
                src="/images/risk-arch-business-life.jpg"
                alt={getAlt(
                  "/images/risk-arch-business-life.jpg",
                  "Business partners reviewing a shareholders agreement with an insurance adviser"
                )}
                width={840}
                height={469}
                priority
                className="h-full w-full object-cover object-center"
              />
            </figure>
          </div>
        </header>

        {/* Risk cards */}
        <section
          className="border-t py-14 md:py-20"
          style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
          aria-labelledby="risks-heading"
        >
          <div className={HOME4_WRAP}>
            <h2
              id="risks-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Where continuity cover fails businesses
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {RISKS.map((risk) => (
                <article
                  key={risk.title}
                  className="border bg-white p-6 sm:p-7"
                  style={{ borderColor: HAIRLINE }}
                >
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-shark">
                    {risk.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{risk.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process, shark section */}
        <section
          className="bg-shark py-14 text-white md:py-20"
          aria-labelledby="process-heading"
        >
          <div className={HOME4_WRAP}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL_ON_DARK }}>
              How we work
            </p>
            <h2
              id="process-heading"
              className="mt-3 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              From conversation to structured continuity cover
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((item) => (
                <div key={item.step}>
                  <p className="font-serif text-2xl font-semibold" style={{ color: TEAL_ON_DARK }}>
                    {item.step}
                  </p>
                  <h3 className="mt-2 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Callback form */}
        <section
          id="callback"
          className="scroll-mt-28 py-14 md:scroll-mt-32 md:py-20"
          style={{ backgroundColor: CANVAS }}
          aria-label="Request a callback"
        >
          <div className={HOME4_WRAP}>
            <CallbackForm
              source="business_continuity"
              showEmail={false}
              showNote
              heading="Discuss your partnership's continuity plan"
              description="Leave your name and number. An authorised adviser at AS Brokers CC (FSP 17273) will call you back within one business day to discuss key person cover, buy-and-sell structuring, or an annual review."
              whatsappMessage={WHATSAPP_MESSAGE}
            />
          </div>
        </section>

        {/* FAQ */}
        <section
          className="border-t py-14 md:py-20"
          style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
          aria-labelledby="faq-heading"
        >
          <div className={HOME4_WRAP}>
            <h2
              id="faq-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Common questions
            </h2>
            <dl className="mt-8 space-y-0 border-y" style={{ borderColor: HAIRLINE }}>
              {FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="grid gap-2 border-b py-5 last:border-b-0 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-8"
                  style={{ borderColor: HAIRLINE }}
                >
                  <dt className="text-sm font-semibold text-shark">{faq.question}</dt>
                  <dd className="text-sm leading-relaxed text-stone-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm" style={{ color: BODY }}>
              Looking for short-term business cover?{" "}
              <Link href="/solutions/business-insurance" prefetch={false} className="font-semibold" style={{ color: TEAL }}>
                See our business insurance page
              </Link>
            </p>
          </div>
        </section>

        {/* Quiet Section 1(3)(a) disclaimer */}
        <section
          aria-label="General information disclaimer"
          className="border-t pb-10 pt-8"
          style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        >
          <div className={HOME4_WRAP}>
            <p className="max-w-3xl text-xs leading-relaxed text-stone-500">
              The information on this page is general information as contemplated in Section 1(3)(a)
              of the Financial Advisory and Intermediary Services Act, 37 of 2002 (FAIS Act), and
              does not constitute financial advice or a product recommendation. Personal
              recommendations are made only after a documented financial needs analysis conducted
              by an authorised representative of AS Brokers CC (FSP 17273). Mentioning Brightrock,
              Discovery Life, Momentum, and Sanlam indicates placement capability, not exclusivity
              or a product endorsement.
            </p>
          </div>
        </section>

        <FloatingWhatsAppButton
          message={WHATSAPP_MESSAGE}
          label="WhatsApp us about business continuity cover"
          location="business_continuity_lp"
        />

        <Footer />
      </div>
    </>
  );
}
