import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
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
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

const GENERAL_ADVICE_DISCLAIMER =
  "The information on this website is provided for general informational purposes only and constitutes factual information as contemplated in Section 1(3)(a) of the Financial Advisory and Intermediary Services Act, 37 of 2002 (FAIS Act). It does not constitute financial, investment, legal, tax, or other professional advice. No recommendation is made regarding the suitability of any financial product for any individual. Personal advice is provided only after a Financial Needs Analysis by an authorised representative of AS Brokers CC (FSP 17273).";

/** Home sections after goal cards, loaded after idle to protect LCP/TBT. */
export function Home4BelowFoldRest() {
  return (
    <>
      <section
        id="home-general-disclaimer"
        className="border-b border-amber-200/80 bg-amber-50 py-8 md:py-10"
        aria-labelledby="home-disclaimer-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="home-disclaimer-heading"
            className="font-serif text-lg font-semibold tracking-tight text-shark sm:text-xl"
          >
            General information disclaimer
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-700">
            {GENERAL_ADVICE_DISCLAIMER}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-700">
            Calculator outputs are illustrative only. Actual outcomes may differ because of
            investment performance, fees, taxation, inflation, withdrawals, and legislative change.
            Past performance is not necessarily indicative of future results.
          </p>
        </div>
      </section>

      <section
        data-chunk-boundary="true"
        className="pt-16 pb-6 md:pt-24 md:pb-8"
        aria-labelledby="home4-calculators"
      >
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <Home4SectionHeader
              headingId="home4-calculators"
              kicker="Educational calculators"
              title="Illustrative tools available during review"
              description="Selected educational calculators for retirement capital, longevity, and purchasing power. They do not assess your full circumstances or product suitability."
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
              View available educational calculators
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
              kicker="Your journey"
              title="Educate, calculate, then request advice"
              description="A factual path from educational content to a needs analysis. No product catalogue on the homepage."
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
              href="/calculators"
              prefetch={false}
              className="group flex h-full flex-col rounded-3xl bg-gradient-to-br from-stone-50 to-white p-8 shadow-xl ring-1 ring-stone-200/70 transition-shadow hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
            >
              <h2 id="home4-pathways" className="text-2xl font-bold tracking-tight text-shark">
                Start with educational calculators
              </h2>
              <p className="mt-3 flex-1 text-stone-600 leading-relaxed">
                Selected educational calculators remain available while product-specific tools
                complete compliance review.
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3 text-sm font-semibold text-shark transition-colors group-hover:bg-stone-200">
                Open calculators
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
                Speak with an authorised representative of AS Brokers CC (FSP 17273). Bring
                calculator results if you have them for retirement, insurance, or estate
                discussions.
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

      <section data-chunk-boundary="true" className="py-16 md:py-24" aria-labelledby="home4-trust">
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <div>
                <Home4SectionHeader
                  kicker="Why AS Brokers"
                  title="Authorised FSP 17273, education before advice"
                  description="AS Brokers CC is an Authorised Financial Services Provider with Category 1.8 authorisation. We provide factual education first. Personal product recommendations are made only after a needs analysis. Insurance, medical, and estate information remain available as separate service areas."
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
                  src="/images/home-why-as-brokers-16x9.jpg"
                  alt={getAlt(
                    "/images/home-why-as-brokers-16x9.jpg",
                    "Independent adviser reviewing planning documents in a home study"
                  )}
                  fill
                  quality={70}
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
                Authentic client comments about clarity and service. Individual experiences are not
                typical results and are not guarantees of future outcomes.
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

          <RelatedContent variant="warm" inset links={getRelatedLinks("/")} className="mt-14" />
        </div>
      </section>

      <Footer />
    </>
  );
}
