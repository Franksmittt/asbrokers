import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { HomeClientReviews } from "@/components/HomeClientReviews";
import { HomeCtaStrip } from "@/components/HomeCtaStrip";
import {
  Home3ArticleList,
  Home3CalcGrid,
  Home3EstatePanel,
  Home3LearnHub,
  Home3PillarCard,
  Home3PreviewBanner,
  Home3RetirementFunnel,
  Home3RetirementPaths,
  Home3Section,
  Home3SectionHeader,
  Home3SolutionGrid,
  Home3WhyPhilosophy,
  Home3WorryPills,
  HOME3_WRAP,
} from "@/components/home3/Home3Blocks";
import {
  HOME3_ESTATE_ITEMS,
  HOME3_ESTATE_JOURNEY,
  HOME3_INSURANCE_GROUPS,
  HOME3_INVESTMENT_GROUPS,
  HOME3_LATEST_ARTICLES,
  HOME3_LEARN_HUB,
  HOME3_POPULAR_CALCULATORS,
  HOME3_PRIMARY_PILLARS,
  HOME3_RETIREMENT_FUNNEL,
  HOME3_RETIREMENT_PATHS,
  HOME3_WHY_PILLARS,
  HOME3_WORRY_QUESTIONS,
} from "@/lib/home3-journey";

export function Home3Preview() {
  return (
    <div className="relative bg-void min-h-screen pb-24 md:pb-0">
      <Home3PreviewBanner />

      {/* Section 1 — Hero */}
      <div className="relative overflow-hidden">
        <BackgroundOrbs />
        <header className="relative pt-28 md:pt-32 pb-14 md:pb-20">
          <div className={`${HOME3_WRAP} text-center`}>
            <p className="trust-hallmark text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.12em]">
              FSP 17273 · Education first · Independent advice
            </p>
            <p className="mt-6 text-lg sm:text-xl md:text-2xl font-semibold text-cinematic-teal tracking-tight">
              Financial Advice. Financial Education. Better Decisions.
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-4xl mx-auto">
              What do you need help with today?
            </h1>
            <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Every click moves you from question to education to understanding — advice comes when you are ready.
            </p>
          </div>

          <div className={`${HOME3_WRAP} mt-12 md:mt-16`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {HOME3_PRIMARY_PILLARS.map((pillar) => (
                <Home3PillarCard key={pillar.id} pillar={pillar} />
              ))}
            </div>
          </div>
        </header>
      </div>

      {/* Section 2 — Popular calculators */}
      <Home3Section id="calculators">
        <Home3SectionHeader
          kicker="Tools"
          title="Popular calculators"
          description="Illustrative numbers first — then speak to an adviser when you understand your gap."
          href="/calculators"
          linkLabel="View all calculators"
        />
        <Home3CalcGrid items={HOME3_POPULAR_CALCULATORS} />
      </Home3Section>

      {/* Section 3 — Start your retirement journey */}
      <Home3Section id="retirement-journey" highlight>
        <Home3SectionHeader
          kicker="Retirement"
          title="Start your retirement journey"
          description="“I don’t think I’ll have enough money” — one of our biggest opportunities. Many people don’t know where they stand. This path guides you from worry to clarity."
          href="/retirement"
          linkLabel="Retirement hub"
        />
        <Home3WorryPills items={HOME3_WORRY_QUESTIONS} />
        <div className="mt-10">
          <p className="text-sm font-medium text-zinc-400 mb-4">Suggested journey</p>
          <Home3RetirementFunnel steps={HOME3_RETIREMENT_FUNNEL} />
        </div>
        <Home3RetirementPaths paths={HOME3_RETIREMENT_PATHS} />
      </Home3Section>

      {/* Section 4 — Investment solutions */}
      <Home3Section>
        <Home3SectionHeader
          kicker="Investments"
          title="Investment solutions"
          description="Split by life stage — calculators, articles, education, then advice inside each pathway."
          href="/everest-wealth"
          linkLabel="Explore investments"
        />
        <Home3SolutionGrid groups={HOME3_INVESTMENT_GROUPS} />
      </Home3Section>

      {/* Section 5 — Insurance */}
      <Home3Section>
        <Home3SectionHeader
          kicker="Insurance"
          title="Insurance solutions"
          description="Organised by life event — health, protection, personal assets, and business continuity."
          href="/solutions/personal-insurance"
          linkLabel="Explore insurance"
        />
        <Home3SolutionGrid groups={HOME3_INSURANCE_GROUPS} />
      </Home3Section>

      {/* Section 6 — Estate planning */}
      <Home3Section>
        <Home3SectionHeader
          kicker="Legacy"
          title="Estate planning"
          description="Legacy outcomes first — calculators and articles before any structuring conversation."
          href="/solutions/estate-planning"
          linkLabel="Estate planning hub"
        />
        <Home3EstatePanel items={HOME3_ESTATE_ITEMS} journey={HOME3_ESTATE_JOURNEY} />
      </Home3Section>

      {/* Learn hub strip */}
      <Home3Section>
        <Home3SectionHeader
          kicker="Authority"
          title="Learn"
          description="Our education engine — articles, guides, and resources that support every business unit."
          href="/insights"
          linkLabel="Browse all content"
        />
        <Home3LearnHub items={HOME3_LEARN_HUB} />
      </Home3Section>

      {/* Section 7 — Why AS Brokers */}
      <Home3Section bordered={false}>
        <Home3SectionHeader
          title="Why AS Brokers"
          description="A premium financial platform — independence, education, and advice integrated into one journey."
        />
        <Home3WhyPhilosophy pillars={HOME3_WHY_PILLARS} />
      </Home3Section>

      {/* Section 8 — Testimonials */}
      <HomeClientReviews />

      {/* Section 9 — Latest articles */}
      <Home3Section>
        <Home3SectionHeader
          kicker="Insights"
          title="Latest articles"
          href="/insights"
          linkLabel="View all articles"
        />
        <Home3ArticleList articles={HOME3_LATEST_ARTICLES} />
      </Home3Section>

      {/* Section 10 — CTA + Footer */}
      <HomeCtaStrip />
      <Footer />
    </div>
  );
}
