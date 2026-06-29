import Link from "next/link";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { HomeClientReviews } from "@/components/HomeClientReviews";
import { HomeCtaStrip } from "@/components/HomeCtaStrip";
import { HomeInsightsTeaserStatic } from "@/components/HomeInsightsTeaserStatic";
import { HomeValueProps } from "@/components/HomeValueProps";
import {
  Home2ArticleList,
  Home2CalcStrip,
  Home2EstateQuick,
  Home2JourneyCard,
  Home2PreviewBanner,
  Home2Section,
  Home2SectionHeader,
  Home2SolutionGrid,
  Home2WhyAccess,
  HOME2_WRAP,
} from "@/components/home2/Home2Blocks";
import { Home2DeferredCalculator } from "@/components/home2/Home2DeferredCalculator";
import {
  HOME2_ESTATE_GROUPS,
  HOME2_ESTATE_QUICK,
  HOME2_INSURANCE_GROUPS,
  HOME2_INVESTMENT_GROUPS,
  HOME2_JOURNEY_CARDS,
  HOME2_POPULAR_CALCULATORS,
  HOME2_RETIREMENT_ARTICLES,
} from "@/lib/home2-journey";

export function Home2Preview() {
  return (
    <div className="relative bg-void min-h-screen pb-24 md:pb-0">
      <Home2PreviewBanner />

      {/* Section 1 — Hero + journey cards + calculator */}
      <div className="relative min-h-0 overflow-hidden">
        <BackgroundOrbs />
        <header className="relative pt-28 md:pt-32 pb-12 md:pb-16">
          <div className={`${HOME2_WRAP} text-center`}>
            <p className="trust-hallmark text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.12em]">
              FSP 17273 · Independent advice · Krugersdorp &amp; West Rand
            </p>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-4xl mx-auto">
              What do you need help with today?
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Independent financial advice, retirement planning, investments, insurance and estate planning for South
              Africans.
            </p>
          </div>

          <div className={`${HOME2_WRAP} mt-12 md:mt-16`}>
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {HOME2_JOURNEY_CARDS.map((card) => (
                <Home2JourneyCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </header>

        <section
          id="lab"
          className="relative z-10 py-16 md:py-20 border-t border-white/10 scroll-mt-24"
          aria-labelledby="home2-calculator-heading"
        >
          <div className={HOME2_WRAP}>
            <div className="mb-10 md:mb-12 max-w-3xl">
              <h2 id="home2-calculator-heading" className="text-2xl md:text-4xl font-bold tracking-[-0.03em] text-white">
                Will your capital last?
              </h2>
              <p className="mt-3 text-zinc-400 text-base md:text-lg leading-relaxed">
                Adjust portfolio value and monthly drawdown to see your estimated capital lifespan — then explore the
                right next step for your situation.
              </p>
            </div>
            <Home2DeferredCalculator />
          </div>
        </section>
      </div>

      {/* Section 2 — Popular calculators */}
      <Home2Section id="calculators">
        <Home2SectionHeader
          kicker="Tools"
          title="Popular calculators"
          description="Start with the question that matches your worry — calculators live inside each journey."
          href="/calculators"
          linkLabel="View all calculators"
        />
        <Home2CalcStrip items={HOME2_POPULAR_CALCULATORS} />
      </Home2Section>

      {/* Section 3 — Latest retirement education */}
      <Home2Section>
        <Home2SectionHeader
          kicker="Learn"
          title="Latest retirement education"
          description="Articles that support retirement planning — not a separate business, part of your journey."
          href="/insights"
          linkLabel="All retirement articles"
        />
        <Home2ArticleList articles={HOME2_RETIREMENT_ARTICLES} />
      </Home2Section>

      {/* Section 4 — Investment solutions */}
      <Home2Section>
        <Home2SectionHeader
          kicker="Investments"
          title="Investment solutions"
          description="Before retirement, after retirement, and alternative investments — split so you know where you fit."
          href="/everest-wealth"
          linkLabel="Explore investments"
        />
        <Home2SolutionGrid groups={HOME2_INVESTMENT_GROUPS} />
      </Home2Section>

      {/* Section 5 — Insurance solutions */}
      <Home2Section>
        <Home2SectionHeader
          kicker="Insurance"
          title="Insurance solutions"
          description="Grouped by the problems you face — health, personal protection, assets, and business risk."
          href="/solutions/personal-insurance"
          linkLabel="Explore insurance"
        />
        <Home2SolutionGrid groups={HOME2_INSURANCE_GROUPS} />
      </Home2Section>

      {/* Section 6 — Estate planning */}
      <Home2Section>
        <Home2SectionHeader
          kicker="Legacy"
          title="Estate planning"
          description="Outcomes first — wills, trusts, duty, and legacy planning that holds up."
          href="/solutions/estate-planning"
          linkLabel="Estate planning hub"
        />
        <Home2EstateQuick items={HOME2_ESTATE_QUICK} />
        <div className="mt-8">
          <Home2SolutionGrid groups={HOME2_ESTATE_GROUPS} />
        </div>
      </Home2Section>

      {/* Section 7 — Why AS Brokers */}
      <Home2Section bordered={false}>
        <HomeValueProps />
        <Home2WhyAccess />
      </Home2Section>

      {/* Section 8 — Testimonials */}
      <HomeClientReviews />

      {/* Section 9 — Latest insights */}
      <HomeInsightsTeaserStatic />

      {/* Section 10 — CTA + Footer */}
      <HomeCtaStrip />
      <Footer />
    </div>
  );
}
