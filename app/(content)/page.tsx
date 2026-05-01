import Link from "next/link";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { PageMediaStrip } from "@/components/PageMediaStrip";
import { HeroSection } from "@/components/HeroSection";
import { RunOutCalculator } from "@/components/RunOutCalculator";
import { EverestWealthBento } from "@/components/EverestWealthBento";
import { Code18Advantage } from "@/components/Code18Advantage";
import { RiskArchitectureCarousel } from "@/components/RiskArchitectureCarousel";
import { HomeStatsSection } from "@/components/HomeStatsSection";
import { HomeValueProps } from "@/components/HomeValueProps";
import { HomeClientReviews } from "@/components/HomeClientReviews";
import { HomeInsightsTeaser } from "@/components/HomeInsightsTeaser";
import { HomeCtaStrip } from "@/components/HomeCtaStrip";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";

export default function HomePage() {
  return (
    <div className="relative bg-void min-h-screen pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"url\": \"https://www.asbrokers.co.za\", \"@type\": \"WebPage\", \"@context\": \"https://schema.org\", \"name\": \"AS Brokers CC | Comprehensive Financial Planning & Investment Solutions | FSP 17273\", \"description\": \"AS Brokers CC is an Authorised Financial Services Provider (FSP 17273) offering expert financial planning, investment, and insurance solutions in Krugersdorp and the West Rand, Gauteng. Plan your future with confidence.\"}" }} />
      <div className="h-screen relative overflow-hidden">
        <BackgroundOrbs />
        <HeroSection />
      </div>

      {/* 1. The Interactive Actuarial Engine (primary acquisition) */}
      <section
        id="lab"
        className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-24"
      >
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-2 text-white">
            The Interactive Actuarial Engine
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed tracking-[0.01em]">
            A bold claim requires concrete math. Adjust the sliders below to see precisely when your capital might face the &quot;cliff&quot; based on current withdrawal rates.{" "}
            <Link href="/calculators" className="text-cinematic-teal hover:underline font-medium">
              View all calculators
            </Link>{" "}
            (retirement, tax, estate, life insurance, Everest Wealth).
          </p>
          <div className="mt-6 md:mt-8 w-full">
            <PageMediaStrip
              variant="primary"
              src="/images/home-actuarial-engine-16x9.jpg"
              alt="Retirement drawdown planning desk: worksheet, calculator, pen, no people"
              priority
            />
          </div>
        </div>
        <RunOutCalculator />
      </section>

      {/* 2. The Solution: Everest Wealth */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <EverestWealthBento />
      </section>

      <section className="py-6 md:py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <PageMediaStrip
          variant="secondary"
          src="/images/home-yield-continuity-4x3.jpg"
          alt="Client desk with investment statements and folders for structured yield and Code 1.8 products"
        />
      </section>

      {/* 3. The Code 1.8 Advantage */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <Code18Advantage />
      </section>

      {/* 4. Protecting the Foundation (insurance) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <RiskArchitectureCarousel />
      </section>

      <HomeStatsSection />
      <HomeValueProps />
      <HomeClientReviews />
      <HomeInsightsTeaser />
      <HomeCtaStrip />

      <Footer />

      <FloatingChat />
    </div>
  );
}
