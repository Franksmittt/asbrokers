import Link from "next/link";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { DualPathway } from "@/components/DualPathway";
import { RunOutCalculator } from "@/components/RunOutCalculator";
import { SolutionsBento } from "@/components/SolutionsBento";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0c] pb-24 md:pb-0">
      <BackgroundOrbs />

      <Hero />

      <TrustBar />

      <DualPathway />

      <section
        id="lab"
        className="py-24 px-4 sm:px-6 md:px-8 relative z-10 bg-black/40 border-y border-white/5 backdrop-blur-3xl"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
              The Interactive Calculator Hub.
            </h2>
            <p className="text-zinc-400 text-lg max-w-3xl">
              A bold claim requires concrete math. Adjust the sliders below to see precisely when your capital might face the &quot;cliff&quot; based on current withdrawal rates. <Link href="/calculators" className="text-blue-400 hover:underline font-medium">View all calculators</Link> (retirement, tax, estate, life insurance, Everest Wealth).
            </p>
          </div>
          <RunOutCalculator />
        </div>
      </section>

      <section id="solutions" className="py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-24">
        <span id="wealth" className="block absolute -translate-y-24" aria-hidden />
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white text-center">
          Architectural Solutions.
        </h2>
        <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-12">
          Wealth engineering, asset protection, and legacy planning. Built around you.
        </p>
        <SolutionsBento />
      </section>

      <Footer />
    </div>
  );
}
