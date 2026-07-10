import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import {
  Home4JourneyFunnel,
  Home4Reveal,
  Home4SectionHeader,
  Home4TestimonialCard,
  HOME4_WRAP,
} from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import {
  HOME4_JOURNEY_STAGES,
  HOME4_TESTIMONIALS,
  HOME4_TRUST_BADGES,
} from "@/lib/home4-journey";
import { getAlt } from "@/lib/image-alt";

/** Home sections after goal cards — loaded after idle to protect LCP/TBT. */
export function Home4BelowFoldRest() {
  return (
    <>
      <section data-chunk-boundary="true" className="py-16 md:py-24" aria-labelledby="home4-journey">
        <div className={HOME4_WRAP}>
          <Home4Reveal instant className="rounded-3xl bg-white/70 p-6 shadow-lg ring-1 ring-stone-200/70 backdrop-blur-sm sm:p-8 md:p-10">
            <Home4SectionHeader
              headingId="home4-journey"
              kicker="Your journey"
              title="Start your journey"
              description="Move from curiosity to clarity: education first, advice when you're ready."
            />
            <Home4JourneyFunnel stages={HOME4_JOURNEY_STAGES} />
          </Home4Reveal>
        </div>
      </section>

      <section data-chunk-boundary="true" className="border-y border-stone-200/80 bg-white/60 py-16 md:py-20" aria-labelledby="home4-pathways">
        <div className={`${HOME4_WRAP} grid gap-6 lg:grid-cols-2`}>
          <Home4Reveal instant>
            <Link
              href="/insights"
              prefetch={false}
              className="group flex h-full flex-col rounded-3xl bg-gradient-to-br from-stone-50 to-white p-8 shadow-xl ring-1 ring-stone-200/70 transition-shadow hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
            >
              <h2 id="home4-pathways" className="text-2xl font-bold tracking-tight text-shark">
                Prefer to explore on your own?
              </h2>
              <p className="mt-3 flex-1 text-stone-600 leading-relaxed">
                Access articles and guides at your own pace, no forms, no pressure.
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3 text-sm font-semibold text-shark transition-colors group-hover:bg-stone-200">
                Explore resources
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </Home4Reveal>
          <Home4Reveal instant>
            <Link
              href="/contact"
              prefetch={false}
              className="group flex h-full flex-col rounded-3xl bg-gradient-to-br from-samsung-blue/10 via-white to-cinematic-teal/10 p-8 shadow-xl ring-1 ring-samsung-blue/15 transition-shadow hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
            >
              <h2 className="text-2xl font-bold tracking-tight text-shark">Need personalized guidance?</h2>
              <p className="mt-3 flex-1 text-stone-600 leading-relaxed">
                Speak with a licensed independent fiduciary who can tailor retirement, investment, and estate
                advice to your situation.
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-samsung-blue/25 transition-all group-hover:bg-[#004a9e] group-hover:shadow-xl">
                Book an actuarial consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </Home4Reveal>
        </div>
      </section>

      <section data-chunk-boundary="true" className="py-16 md:py-24" aria-labelledby="home4-trust">
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <Home4SectionHeader
                  kicker="Why AS Brokers"
                  title="Access investments many advisers cannot offer"
                  description="As a Category 1.8 authorised financial services provider, we can guide suitable clients toward traditional and selected alternative investments, including Everest Wealth solutions, while remaining fully independent. For more than 25 years we have served families and business owners across the West Rand without tying advice to a single product house."
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
                <Link
                  href="/about"
                  prefetch={false}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue hover:text-[#006B6B]"
                >
                  Learn about our independence
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-200/70">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/home4-why-independence-4x3.jpg"
                    alt={getAlt(
                      "/images/home4-why-independence-4x3.jpg",
                      "Independent financial adviser discussing investment options with clients in a Krugersdorp office"
                    )}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Home4Reveal>

          <div className="mt-14">
            <Home4Reveal instant>
              <h3 id="home4-trust" className="text-xl font-bold text-shark sm:text-2xl">
                Stories from clients we serve
              </h3>
              <p className="mt-2 max-w-2xl text-stone-600">
                Real feedback from families and business owners: retirement clarity, insurance that makes sense,
                and advice without the hard sell.
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
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/")} />
      <Footer />
    </>
  );
}
