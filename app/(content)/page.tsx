import Link from "next/link";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { HeroSection } from "@/components/HeroSection";
import { RunOutCalculator } from "@/components/RunOutCalculator";
import { EverestWealthBento } from "@/components/EverestWealthBento";
import { Code18Advantage } from "@/components/Code18Advantage";
import { RiskArchitectureCarousel } from "@/components/RiskArchitectureCarousel";
import { HomeStatsSection } from "@/components/HomeStatsSection";
import { HomeValueProps } from "@/components/HomeValueProps";
import { HomeInsightsTeaser } from "@/components/HomeInsightsTeaser";
import { HomeCtaStrip } from "@/components/HomeCtaStrip";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";

export default function HomePage() {
  return (
    <div className="relative bg-void min-h-screen pb-24 md:pb-0">
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
        </div>
        <RunOutCalculator />
      </section>

      {/* 2. The Solution: Everest Wealth */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <EverestWealthBento />
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
      <HomeInsightsTeaser />
      <HomeCtaStrip />

      <Footer />

      <FloatingChat />
    </div>
  );
}
