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

const PAGE_TITLE = "Farm Insurance Brokers | Crop, Livestock & Assets | AS Brokers";
const PAGE_DESCRIPTION =
  "Independent farm insurance brokers serving Gauteng and North West. Crop (hail), livestock, equipment, veld fire, and claims advocacy. AS Brokers CC, FSP 17273.";

const WHATSAPP_MESSAGE = "Hi AS Brokers, please call me back about farm insurance.";

// TODO: Replace /images/insurance-domain-business-21x9.webp with authentic farm photography
// showing Gauteng/North West agricultural operations (maize, sunflower, livestock, pivot irrigation).
const HERO_IMAGE = "/images/insurance-domain-business-21x9.webp";

const RISKS = [
  {
    title: "Hail and crop damage",
    body: "Summer hail (October to March) can destroy a season's maize, sunflower, or soya yield in minutes. A known pressure point is the assessment dispute that arises after secondary weather, such as rain washing away dislodged crop before assessors arrive. We review policy wording, including how crop damage is assessed and what evidence is required, before you need to make a claim.",
  },
  {
    title: "Veld fire and liability",
    body: "Winter veld fires (May to August) spread across boundaries and can destroy pastures, buildings, and unharvested crops. Insurers scrutinise firebreak maintenance and compliance with the National Veld and Forest Fire Act and Fire Protection Association requirements when claims arrive. We help you understand what your policy requires before the season starts so there are no surprises at claim stage.",
  },
  {
    title: "Equipment, vehicles and irrigation",
    body: "Tractors, implements, and pivot irrigation systems are high-value assets that are frequently underinsured relative to replacement cost. Declared values can fall behind quickly as equipment prices rise. We review declared values at every annual renewal and flag gaps before they become a problem at claim stage.",
  },
  {
    title: "Livestock and theft",
    body: "Mortality, theft, and transit risks carry different cover requirements depending on how the operation runs: commercial feedlot, cow-calf, stud, or smallholding. We structure cover to match the actual operation rather than applying a generic livestock policy.",
  },
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Tell us about the farm",
    body: "Start with your operation: crop type, livestock numbers, equipment, buildings, and location. No forms to wade through, just a direct conversation with an adviser who understands agricultural risk.",
  },
  {
    step: "02",
    title: "Needs analysis with FSP 17273",
    body: "An authorised representative of AS Brokers CC (FSP 17273) documents your risk profile. Personal advice under the FAIS Act requires this step and protects both parties.",
  },
  {
    step: "03",
    title: "Market survey",
    body: "As independent brokers we survey the market: Santam, Bryte, King Price, SIS, and specialist agricultural underwriters. Naming these indicates placement capability, not exclusivity or any obligation to place with a particular insurer.",
  },
  {
    step: "04",
    title: "Pre-season reviews and claims advocacy",
    body: "We review cover before hail season (October) and before fire season (May) each year. When a claim arises, we manage the process with the insurer on your behalf and review all documentation before submission.",
  },
] as const;

const FAQS = [
  {
    question: "Do you handle crop insurance claims disputes?",
    answer:
      "Yes. We manage the claims process and review policy wording on your behalf. We cannot guarantee a specific outcome, but we know where disputes typically arise in agricultural claims and we engage the insurer with the correct documentation and evidence at each stage.",
  },
  {
    question: "Which insurers do you work with?",
    answer:
      "Our placement capability includes Santam, Bryte, King Price, SIS, and specialist agricultural underwriters. Naming these indicates placement capability only, not exclusivity or a recommendation of any one insurer over another.",
  },
  {
    question: "Do you cover smallholdings as well as commercial farms?",
    answer:
      "Yes. We structure cover for smallholdings, lifestyle farms, and commercial farming operations. Requirements differ significantly between these categories, so the needs analysis establishes the correct cover type for your situation.",
  },
  {
    question: "When should I review my farm cover?",
    answer:
      "Before hail season (October) and before fire season (May) are the natural annual review points. Additional triggers include a change in crop type, expansion of irrigation or buildings, purchase of new equipment, and changes to livestock numbers.",
  },
  {
    question: "Is the risk review free?",
    answer:
      "Yes. The initial conversation carries no obligation. Personal recommendations follow a documented needs analysis with an authorised representative of AS Brokers CC (FSP 17273), as required by FAIS. Our remuneration is commission from the insurer if cover is placed, disclosed in writing at advice stage.",
  },
  {
    question: "Do you serve Afrikaans-speaking farmers?",
    answer:
      "Yes. We advise clients in Afrikaans and English. For an Afrikaans-language page on commercial insurance, see our besigheidsversekering bladsy at /besigheidsversekering-krugersdorp.",
  },
] as const;

export const metadata = buildPageMetadata({
  path: "/farm-insurance",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "farm insurance South Africa",
    "crop insurance Gauteng",
    "agricultural insurance North West",
    "hail crop damage insurance",
    "veld fire insurance",
    "livestock insurance broker",
    "independent farm insurance broker FSP 17273",
  ],
});

export default function FarmInsurancePage() {
  return (
    <>
      <PageJsonLd
        path="/farm-insurance"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
        service={{
          name: "Farm and agricultural insurance broking",
          description: PAGE_DESCRIPTION,
          serviceType: "Agricultural Insurance Broking",
        }}
      />
      <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
        {/* Hero: message match for farm insurance Ads campaign */}
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
                Farm and crop insurance brokers for Gauteng and North West
              </h1>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                Hail season (October to March) threatens maize, sunflower, and soya. Winter veld fires
                (May to August) threaten pastures, buildings, and unharvested crops. An independent
                broker structures cover before the season turns and stands with you at claim stage.
              </p>
              <ul className="mt-6 space-y-2 text-sm leading-relaxed" style={{ color: BODY }}>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Independent: we survey Santam, Bryte, King Price, SIS, and specialist agricultural underwriters
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Pre-season reviews before hail season (October) and fire season (May)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Claims advocacy: we manage the process with the insurer on your behalf
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  href="/business-risk-review"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  Free farm risk review
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href="#callback"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                  style={{ color: TEAL }}
                >
                  Leave your number, we call you
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
            <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-stone-300/90 bg-white lg:col-span-5">
              {/* TODO: Replace with authentic farm photography (Gauteng/North West agricultural scenes). */}
              <Image
                src={HERO_IMAGE}
                alt={getAlt(HERO_IMAGE, "Farming operation in Gauteng showing crop fields and agricultural buildings")}
                width={840}
                height={360}
                priority
                className="h-full w-full object-cover object-center"
              />
            </figure>
          </div>
        </header>

        {/* Farm risks */}
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
              The risks that hit farming operations hardest
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

        {/* Process, shark */}
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
              From first conversation to structured cover
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

        {/* Callback */}
        <section
          id="callback"
          className="scroll-mt-28 py-14 md:scroll-mt-32 md:py-20"
          style={{ backgroundColor: CANVAS }}
          aria-label="Request a callback"
        >
          <div className={HOME4_WRAP}>
            <CallbackForm
              source="farm_insurance"
              showEmail={false}
              showNote
              heading="Talk to a broker who understands farm risk"
              description="Leave your name and number. An authorised adviser phones you back within one business day to discuss your farm cover, renewal, or claim."
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
              Straight answers on farm insurance
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
              Praat u Afrikaans?{" "}
              <Link
                href="/besigheidsversekering-krugersdorp"
                prefetch={false}
                className="font-semibold"
                style={{ color: TEAL }}
              >
                Lees die Afrikaanse besigheidsversekering-blad
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

        <FloatingWhatsAppButton
          message={WHATSAPP_MESSAGE}
          label="WhatsApp us about farm insurance"
          location="farm_insurance_lp"
        />

        <Footer />
      </div>
    </>
  );
}
