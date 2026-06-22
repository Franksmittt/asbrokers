import Link from "next/link";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { HeroSection } from "@/components/HeroSection";
import { PageMediaStrip } from "@/components/PageMediaStrip";
import { HomeAnimatedSections } from "@/components/home/HomeAnimatedSections";
import {
  HomeDeferredAnimatedSections,
  HomeDeferredCalculator,
  HomeDeferredFloatingChat,
  HomeDeferredValueProps,
} from "@/components/home/HomeDeferredBlocks";
import { HomeStatsSection } from "@/components/HomeStatsSection";
import { HomeClientReviews } from "@/components/HomeClientReviews";
import { HomeInsightsTeaserStatic } from "@/components/HomeInsightsTeaserStatic";
import { HomeCtaStrip } from "@/components/HomeCtaStrip";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/seo/PageJsonLd";

export const metadata = buildPageMetadata({
  path: "/",
  title: "Independent Financial Advisor Krugersdorp",
  description:
    "25+ years helping South Africans with retirement planning, Everest Wealth, insurance, estate structuring, and business continuity. FSP 17273, Krugersdorp.",
});

export default function HomePage() {
  return (
    <div className="relative bg-void min-h-screen pb-24 md:pb-0">
      <PageJsonLd
        path="/"
        webPage={{
          name: "AS Brokers CC | Comprehensive Financial Planning & Investment Solutions | FSP 17273",
          description:
            "AS Brokers CC is an Authorised Financial Services Provider (FSP 17273) offering expert financial planning, investment, and insurance solutions in Krugersdorp and the West Rand, Gauteng.",
        }}
        primaryImagePath="/opengraph-image"
      />
      <div className="min-h-[85vh] relative overflow-hidden">
        <BackgroundOrbs />
        <HeroSection />
      </div>

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
            <PageMediaStrip variant="primary" src="/images/home-actuarial-engine-16x9.jpg" />
          </div>
        </div>
        <HomeDeferredCalculator />
      </section>

      <HomeDeferredAnimatedSections>
        <HomeAnimatedSections />
      </HomeDeferredAnimatedSections>

      <HomeStatsSection />
      <HomeDeferredValueProps />
      <HomeClientReviews />
      <HomeInsightsTeaserStatic />
      <HomeCtaStrip />

      <Footer />
      <HomeDeferredFloatingChat />
    </div>
  );
}
