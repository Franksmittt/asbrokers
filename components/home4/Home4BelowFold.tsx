import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import {
  Home4GoalCard,
  Home4JourneyFunnel,
  Home4Reveal,
  Home4SectionHeader,
  Home4TestimonialCard,
  HOME4_WRAP,
} from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import {
  HOME4_GOAL_CARDS,
  HOME4_JOURNEY_STAGES,
  HOME4_TESTIMONIALS,
  HOME4_TRUST_BADGES,
} from "@/lib/home4-journey";
import { getAlt } from "@/lib/image-alt";

/**
 * Legacy combined below-fold home — kept in sync with GoalCards + BelowFoldRest.
 * Prefer Home4GoalCards + Home4RestDeferred on the live homepage.
 */
export function Home4BelowFold() {
  return (
    <>
      <section
        id="home-pathways"
        data-chunk-boundary="true"
        className="scroll-mt-24 bg-warm-canvas py-16 md:py-24"
        aria-labelledby="home-pathways-heading"
      >
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <h2
              id="home-pathways-heading"
              className="max-w-2xl font-serif text-3xl tracking-tight text-shark sm:text-4xl"
            >
              What do you need help with?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
              Pick a path. Each one leads to clear guidance, not a product catalogue.
            </p>
          </Home4Reveal>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
            {HOME4_GOAL_CARDS.map((card) => (
              <Home4Reveal key={card.id} instant>
                <Home4GoalCard card={card} />
              </Home4Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-chunk-boundary="true" className="border-t border-stone-200/70 py-16 md:py-24" aria-labelledby="home4-journey">
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <Home4SectionHeader
              headingId="home4-journey"
              kicker="Your journey"
              title="Start where you are"
              description="Education first. Numbers when you want them. Advice when you're ready."
            />
          </Home4Reveal>
          <Home4JourneyFunnel stages={HOME4_JOURNEY_STAGES} />
        </div>
      </section>

      <section data-chunk-boundary="true" className="py-16 md:py-20" aria-labelledby="home4-pathways">
        <div className={`${HOME4_WRAP} grid gap-10 lg:grid-cols-2 lg:gap-12`}>
          <Home4Reveal instant>
            <div className="group relative">
              <Link
                href="/insights"
                prefetch={false}
                className="absolute inset-0 z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
                aria-label="Explore resources and articles"
              />
              <div className="relative aspect-[16/10] overflow-hidden pointer-events-none">
                <Image
                  src="/images/insights-inset-1x1.jpg"
                  alt={getAlt("/images/insights-inset-1x1.jpg", "Articles and guides for South African investors")}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <h2 id="home4-pathways" className="relative z-10 mt-5 text-2xl font-bold tracking-tight text-shark">
                Prefer to explore on your own?
              </h2>
              <p className="relative z-10 mt-3 text-stone-600 leading-relaxed">
                Access articles and guides at your own pace. No forms, no pressure.
              </p>
              <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue">
                Explore resources
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </Home4Reveal>
          <Home4Reveal instant>
            <div className="group relative">
              <Link
                href="/contact"
                prefetch={false}
                className="absolute inset-0 z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
                aria-label="Book an actuarial consultation"
              />
              <div className="relative aspect-[16/10] overflow-hidden pointer-events-none">
                <Image
                  src="/images/contact-trust.jpg"
                  alt={getAlt("/images/contact-trust.jpg", "Book a consultation with AS Brokers")}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <h2 className="relative z-10 mt-5 text-2xl font-bold tracking-tight text-shark">
                Need personalised guidance?
              </h2>
              <p className="relative z-10 mt-3 text-stone-600 leading-relaxed">
                Speak with a licensed independent fiduciary who can tailor retirement, investment, and estate
                advice to your situation.
              </p>
              <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue">
                Book a consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </Home4Reveal>
        </div>
      </section>

      <section data-chunk-boundary="true" className="border-t border-stone-200/70 py-16 md:py-24" aria-labelledby="home4-trust">
        <div className={HOME4_WRAP}>
          <Home4Reveal instant>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <Home4SectionHeader
                  kicker="Why AS Brokers"
                  title="Access investments many advisers cannot offer"
                  description="As a Category 1.8 authorised financial services provider, we can guide suitable clients toward traditional and selected alternative investments, including Everest Wealth solutions, while remaining fully independent. For more than 25 years we have served families and business owners across the West Rand without tying advice to a single product house."
                />
                <p className="mt-6 text-sm text-stone-500">
                  {HOME4_TRUST_BADGES.join(" · ")}
                </p>
                <Link
                  href="/about"
                  prefetch={false}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue hover:text-[#006B6B]"
                >
                  Learn about our independence
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/about-krugersdorp-trust-16x9.jpg"
                  alt={getAlt(
                    "/images/about-krugersdorp-trust-16x9.jpg",
                    "AS Brokers serving families across Krugersdorp and the West Rand"
                  )}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                />
              </div>
            </div>
          </Home4Reveal>

          <div className="mt-16">
            <Home4Reveal instant>
              <h3 id="home4-trust" className="font-serif text-2xl tracking-tight text-shark sm:text-3xl">
                Stories from clients we serve
              </h3>
              <p className="mt-2 max-w-2xl text-stone-600">
                Real feedback from families and business owners: retirement clarity, insurance that makes sense,
                and advice without the hard sell.
              </p>
            </Home4Reveal>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
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
