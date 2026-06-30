"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import {
  Home4CalculatorTile,
  Home4GoalCard,
  Home4JourneyFunnel,
  Home4Reveal,
  Home4SectionHeader,
  Home4TestimonialCard,
  HOME4_WRAP,
} from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import {
  HOME4_CALCULATOR_TILES,
  HOME4_GOAL_CARDS,
  HOME4_JOURNEY_STAGES,
  HOME4_TESTIMONIALS,
  HOME4_TRUST_BADGES,
} from "@/lib/home4-journey";
import { getAlt } from "@/lib/image-alt";

export function Home4Preview() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] pb-24 text-shark md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/contact-trust.jpg"
            alt={getAlt("/images/contact-trust.jpg", "Relaxed consultation with an independent adviser")}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-shark/85 via-shark/55 to-shark/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F6F3] via-transparent to-shark/20" />
        </div>

        <div className="relative pt-32 pb-36 sm:pt-36 sm:pb-44 md:pt-40 md:pb-52">
          <div className={`${HOME4_WRAP} max-w-3xl`}>
            <Home4Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
                Independent · FSP 17273 · Krugersdorp
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
                What do you need help with today?
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
                Independent financial advice, retirement planning, investments, insurance and estate planning
                for South Africans.
              </p>
            </Home4Reveal>
          </div>
        </div>

        {/* Goal cards overlapping hero */}
        <div className={`${HOME4_WRAP} relative -mt-24 pb-6 sm:-mt-28 md:-mt-32`}>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-5">
            {HOME4_GOAL_CARDS.map((card, index) => (
              <Home4Reveal key={card.id} delay={index * 0.05}>
                <Home4GoalCard card={card} />
              </Home4Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="py-16 md:py-24" aria-labelledby="home4-calculators">
        <div className={HOME4_WRAP}>
          <Home4Reveal>
            <Home4SectionHeader
              kicker="Tools"
              title="Calculate your next financial move"
              description="Friendly, illustrative calculators to help you understand the problem before any product conversation."
            />
          </Home4Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOME4_CALCULATOR_TILES.map((tile, index) => (
              <Home4Reveal key={tile.href} delay={index * 0.05}>
                <Home4CalculatorTile tile={tile} />
              </Home4Reveal>
            ))}
          </div>

          <Home4Reveal className="mt-14 rounded-3xl bg-white/70 p-6 shadow-lg ring-1 ring-stone-200/70 backdrop-blur-sm sm:p-8 md:p-10">
            <Home4SectionHeader
              kicker="Your journey"
              title="Start your journey"
              description="Move from curiosity to clarity: education first, advice when you're ready."
            />
            <Home4JourneyFunnel stages={HOME4_JOURNEY_STAGES} />
          </Home4Reveal>
        </div>
      </section>

      {/* Dual pathways */}
      <section className="border-y border-stone-200/80 bg-white/60 py-16 md:py-20" aria-labelledby="home4-pathways">
        <div className={`${HOME4_WRAP} grid gap-6 lg:grid-cols-2`}>
          <Home4Reveal>
            <div className="flex h-full flex-col rounded-3xl bg-gradient-to-br from-stone-50 to-white p-8 shadow-xl ring-1 ring-stone-200/70">
              <h2 id="home4-pathways" className="text-2xl font-bold tracking-tight text-shark">
                Prefer to explore on your own?
              </h2>
              <p className="mt-3 flex-1 text-stone-600 leading-relaxed">
                Access calculators, articles, and guides at your own pace, no forms, no pressure.
              </p>
              <Link
                href="/insights"
                prefetch={false}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3 text-sm font-semibold text-shark transition-colors hover:bg-stone-200"
              >
                Explore resources
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Home4Reveal>
          <Home4Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-3xl bg-gradient-to-br from-samsung-blue/10 via-white to-cinematic-teal/10 p-8 shadow-xl ring-1 ring-samsung-blue/15">
              <h2 className="text-2xl font-bold tracking-tight text-shark">Need personalized guidance?</h2>
              <p className="mt-3 flex-1 text-stone-600 leading-relaxed">
                Speak with a licensed independent fiduciary who can tailor retirement, investment, and estate
                advice to your situation.
              </p>
              <Link
                href="/contact"
                prefetch={false}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-samsung-blue/25 transition-all hover:bg-[#004a9e] hover:shadow-xl"
              >
                Book an actuarial consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Home4Reveal>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 md:py-24" aria-labelledby="home4-trust">
        <div className={HOME4_WRAP}>
          <Home4Reveal>
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
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-samsung-blue hover:text-cinematic-teal"
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
                  />
                </div>
              </div>
            </div>
          </Home4Reveal>

          <div className="mt-14">
            <Home4Reveal>
              <h3 id="home4-trust" className="text-xl font-bold text-shark sm:text-2xl">
                Stories from clients we serve
              </h3>
              <p className="mt-2 max-w-2xl text-stone-600">
                Real feedback from families and business owners: retirement clarity, insurance that makes sense,
                and advice without the hard sell.
              </p>
            </Home4Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {HOME4_TESTIMONIALS.map((item, index) => (
                <Home4Reveal key={item.who} delay={index * 0.06}>
                  <Home4TestimonialCard item={item} />
                </Home4Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
