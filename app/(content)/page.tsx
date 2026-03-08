import Link from "next/link";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { HeroSection } from "@/components/HeroSection";
import { ChooseYourPath } from "@/components/ChooseYourPath";
import { ExpertiseHighlights } from "@/components/ExpertiseHighlights";
import { SolutionsBento } from "@/components/SolutionsBento";
import { RunOutCalculator } from "@/components/RunOutCalculator";
import { HomeStatsSection } from "@/components/HomeStatsSection";
import { HomeValueProps } from "@/components/HomeValueProps";
import { HomeInsightsTeaser } from "@/components/HomeInsightsTeaser";
import { HomeCtaStrip } from "@/components/HomeCtaStrip";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="relative bg-void min-h-screen pb-24 md:pb-0">
      <div className="h-screen relative overflow-hidden">
        <BackgroundOrbs />
        <HeroSection />
      </div>

      <ChooseYourPath />

      <ExpertiseHighlights />

      <section id="solutions" className="py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-24">
        <span id="wealth" className="block absolute -translate-y-24" aria-hidden />
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-4 text-white text-center">
          Architectural Solutions.
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-4 leading-relaxed tracking-[0.01em]">
          Wealth engineering, asset protection, and legacy planning. Built around you.
        </p>
        <p className="text-center mb-12">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-cinematic-teal font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-cinematic-teal rounded px-3 py-1"
          >
            Which fits you? Take the Financial Health Quiz →
          </Link>
        </p>
        <SolutionsBento />
      </section>

      <section
        id="lab"
        className="py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10"
      >
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-4 text-white">
            The Interactive Calculator Hub.
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed tracking-[0.01em]">
            A bold claim requires concrete math. Adjust the sliders below to see precisely when your capital might face the &quot;cliff&quot; based on current withdrawal rates.{" "}
            <Link href="/calculators" className="text-cinematic-teal hover:underline font-medium">View all calculators</Link> (retirement, tax, estate, life insurance, Everest Wealth).
          </p>
        </div>
        <RunOutCalculator />
      </section>

      <HomeStatsSection />
      <HomeValueProps />
      <HomeInsightsTeaser />
      <HomeCtaStrip />

      <Footer />
    </div>
  );
}
