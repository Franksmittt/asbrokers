import Link from "next/link";
import { FutureValueCalculator } from "@/components/FutureValueCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmSecondaryLink,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_H3, WARM_LINK, WARM_META } from "@/lib/warm-theme";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "Future Value Calculator (Inflation) | Test Your Buying Power";
const PAGE_DESCRIPTION =
  "Understand the impact of inflation on your savings and purchasing power over time. See what today's money will be worth in the future.";

export const metadata = buildPageMetadata({
  path: "/cost-of-inflation-over-time",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function CostOfInflationPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/cost-of-inflation-over-time" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        centered
        kicker="Actuarial Reality Check"
        title="The Capital Erosion Test"
        description="Inflation is the silent destruction of wealth. Calculate the exact rate at which your current capital is losing its purchasing power, and discover the required yield to outpace it."
      />

      <WarmSection narrow className="py-8">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-500">
          <span>Future cost of living</span>
          <span>Purchasing power lost</span>
          <span>Real growth required</span>
        </div>
      </WarmSection>

      <WarmSection>
        <div className={`mx-auto max-w-4xl ${WARM_CARD} overflow-hidden`}>
          <FutureValueCalculator />
        </div>
      </WarmSection>

      <WarmSection alt>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-1 md:grid-cols-2">
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>The Mathematical Deficit</h2>
            <p className={WARM_BODY}>
              Traditional portfolios yielding 6–8% are essentially generating zero real return after inflation and tax. The nominal number on your statement masks the erosion. To preserve and grow wealth in real terms, your yield must consistently outpace both inflation and the tax drag.
            </p>
          </div>
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Outpacing the Erosion</h2>
            <p className={WARM_BODY}>
              To secure real generational wealth, capital must be deployed into high-yield alternative structures (12.8%–14.5%) that mathematically crush inflation. Unlisted preference shares and structured returns are engineered for this purpose.
            </p>
          </div>
        </div>
      </WarmSection>

      <WarmSection narrow>
        <div className={WARM_CARD}>
          <h2 className={`${WARM_H2} mb-4`}>Stop Losing Purchasing Power</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WarmPrimaryLink href="/everest-wealth">Engineer Inflation-Proof Yields →</WarmPrimaryLink>
            <WarmSecondaryLink href="/contact">Book Actuarial Review</WarmSecondaryLink>
          </div>
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <div className="text-center">
          <a
            href="https://wa.me/27662276044"
            target="_blank"
            rel="noopener noreferrer"
            className={WARM_LINK}
          >
            Contact us on WhatsApp · +27 66 227 6044
          </a>
          <p className={`mt-4 ${WARM_META}`}>
            Albert Schuurman & Johnny Farinha · AS Brokers | FSP 17273 · Independent Authorised Financial Service Provider
          </p>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
