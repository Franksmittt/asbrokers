import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HomeCallbackFormDeferred } from "@/components/home/HomeCallbackFormDeferred";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import {
  Home4CalculatorTile,
  Home4JourneyFunnel,
  Home4Reveal,
  Home4SectionHeader,
  Home4TestimonialCard,
  HOME4_WRAP,
} from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import {
  HOME4_CALCULATOR_TILES,
  HOME4_JOURNEY_STAGES,
  HOME4_TESTIMONIALS,
  HOME4_TRUST_BADGES,
} from "@/lib/home4-journey";
import { getAlt } from "@/lib/image-alt";
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL_HREF,
} from "@/lib/office-phone";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

const GENERAL_ADVICE_DISCLAIMER =
  "The information on this website is general information under Section 1(3)(a) of the FAIS Act and is not financial advice. Personal recommendations follow a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).";

/** Home sections after goal cards, loaded after idle to protect LCP/TBT. */
export function Home4BelowFoldRest() {
  return (
    <>
      <section
        data-chunk-boundary="true"
        className="pt-16 pb-6 md:pt-24 md:pb-8"
        aria-labelledby="home4-calculators"
      >
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <Home4SectionHeader
              headingId="home4-calculators"
              kicker="Planning tools"
              title="Retirement and capital planning tools"
              description="Educational calculators for retirement capital, longevity, and purchasing power. They illustrate concepts, not your full circumstances. Personal advice follows a needs analysis."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {HOME4_CALCULATOR_TILES.map((tile) => (
                <Home4CalculatorTile key={tile.href} tile={tile} />
              ))}
            </div>
            <Link
              href="/calculators"
              prefetch={false}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue hover:text-[#006B6B]"
            >
              View educational calculators
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Home4Reveal>
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="pt-6 pb-16 md:pt-8 md:pb-24"
        aria-labelledby="home4-journey"
      >
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <Home4SectionHeader
              headingId="home4-journey"
              kicker="How it works"
              title="Tell us, we survey, you get covered"
              description="A straightforward process from first conversation to structured cover and ongoing reviews."
            />
            <Home4JourneyFunnel stages={HOME4_JOURNEY_STAGES} />
          </Home4Reveal>
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="border-y border-stone-200/80 bg-white/60 py-16 md:py-20"
        aria-labelledby="home4-pathways"
      >
        <div className={`${HOME4_WRAP} grid gap-6 lg:grid-cols-2`}>
          <Home4Reveal instant>
            <Link
              href="/business-risk-review"
              prefetch={false}
              className="group flex h-full flex-col rounded-3xl bg-gradient-to-br from-stone-50 to-white p-8 shadow-xl ring-1 ring-stone-200/70 transition-shadow hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
            >
              <h2 id="home4-pathways" className="text-2xl font-bold tracking-tight text-shark">
                Start a free Business Risk Review
              </h2>
              <p className="mt-3 flex-1 text-stone-600 leading-relaxed">
                We review your existing commercial cover, identify gaps, and compare the market,
                including Santam, Bryte, King Price, and others, at no obligation.
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3 text-sm font-semibold text-shark transition-colors group-hover:bg-stone-200">
                Get my risk review
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </Home4Reveal>
          <Home4Reveal instant>
            <div className="flex h-full flex-col rounded-3xl bg-gradient-to-br from-samsung-blue/10 via-white to-cinematic-teal/10 p-8 shadow-xl ring-1 ring-samsung-blue/15">
              <h2 className="text-2xl font-bold tracking-tight text-shark">
                Request a needs analysis
              </h2>
              <p className="mt-3 flex-1 text-stone-600 leading-relaxed">
                Speak with an authorised representative of AS Brokers CC (FSP 17273) about
                commercial cover, personal insurance, life cover, retirement, or estate planning.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact?source=home_pathways"
                  prefetch={false}
                  className="inline-flex w-fit items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-samsung-blue/25 transition hover:bg-[#004a9e]"
                >
                  Contact us online
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-shark ring-1 ring-stone-200 transition hover:bg-stone-50"
                >
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>
          </Home4Reveal>
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="py-14 md:py-20"
        aria-label="Request a callback"
      >
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <HomeCallbackFormDeferred
              source="home"
              heading="Easiest option: we call you"
              description="Two fields and a tick box. An authorised adviser phones you back within one business day about business cover, personal insurance, or planning."
              showNote
              whatsappMessage="Hi AS Brokers, please call me back."
            />
          </Home4Reveal>
        </div>
      </section>

      <section data-chunk-boundary="true" className="py-16 md:py-24" aria-labelledby="home4-trust">
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <div>
                <Home4SectionHeader
                  kicker="Why AS Brokers"
                  title="Independent broker for business owners · FSP 17273 · Est. 1998"
                  description="AS Brokers CC is an Authorised Financial Services Provider (Category 1.8) serving business owners and professionals across Gauteng since 1998. We survey the commercial market, run a proper needs analysis, place structured cover, and review it annually. Retirement, estate, and medical advice is available alongside commercial broking."
                />
                <div className="mt-6 flex flex-wrap gap-2">
                  {HOME4_TRUST_BADGES.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-600 shadow-sm ring-1 ring-stone-200/80"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/regulatory-compliance"
                    prefetch={false}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue hover:text-[#006B6B]"
                  >
                    Regulatory and compliance
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/about"
                    prefetch={false}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-shark"
                  >
                    Meet Albert &amp; Johnny
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[16rem] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-200/70 lg:min-h-0">
                <Image
                  src="/images/home-why-as-brokers-16x9.webp"
                  alt={getAlt(
                    "/images/home-why-as-brokers-16x9.webp",
                    "Independent adviser reviewing planning documents in a home study"
                  )}
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                />
              </div>
            </div>
          </Home4Reveal>

          <div className="mt-14">
            <Home4Reveal instant>
              <h3 id="home4-trust" className="text-xl font-bold text-shark sm:text-2xl">
                Client feedback
              </h3>
              <p className="mt-2 max-w-2xl text-stone-600">
                Authentic client comments about cover, clarity, and service. Individual experiences
                are not typical results and are not guarantees of future outcomes.
              </p>
            </Home4Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {HOME4_TESTIMONIALS.map((item) => (
                <Home4Reveal key={item.who} instant>
                  <Home4TestimonialCard item={item} />
                </Home4Reveal>
              ))}
            </div>
          </div>

          <section
            id="home-general-disclaimer"
            className="mt-14 rounded-2xl border border-stone-200/80 bg-stone-50/80 px-6 py-5"
            aria-label="General information disclaimer"
          >
            <p className="text-xs leading-relaxed text-stone-500">{GENERAL_ADVICE_DISCLAIMER}</p>
          </section>

          <RelatedContent variant="warm" inset links={getRelatedLinks("/")} className="mt-6" />
        </div>
      </section>

      <Footer />
    </>
  );
}
