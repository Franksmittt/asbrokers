import Link from "next/link";
import { Everest145GrowthCalculator } from "@/components/Everest145GrowthCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { WarmHero, WarmPageWithFooter, WarmPrimaryLink, WarmSection } from "@/components/warm/WarmShell";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_LINK } from "@/lib/warm-theme";

const PAGE_TITLE = "Everest Strategic Growth 145 | Structured Investment Solution";
const PAGE_DESCRIPTION =
  "Discover the Everest Strategic Growth 145, a structured investment solution designed for targeted capital growth. Learn more from AS Brokers CC, your Authorised Financial Services Provider (FSP 17273).";

export const metadata = buildPageMetadata({
  path: "/everest-strategic-growth-145",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function Everest145Page() {
  const heroImage = getPrimaryPageImage("/everest-strategic-growth-145") ?? "/images/everest-growth-145-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path="/everest-strategic-growth-145"
        webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }}
        product={{
          name: "Everest Strategic Growth 14.5%",
          description:
            "Structured investment solution targeting 14.5% compound growth over a five-year term. R100,000 minimum voluntary capital.",
          brandName: "Everest Wealth",
        }}
      />
      <WarmHero
        kicker="Code 1.8 Wealth Engineering: Capital Growth"
        title="Pure Compounding: 14.5% Strategic Growth"
        description="Model a targeted 14.5% annual compound growth profile over five years, with product terms, liquidity limits, and risk disclosures reviewed before committing capital."
        imageSrc={heroImage}
        maxWidth="4xl"
      />

      <WarmSection>
        <div className={`${WARM_CARD} overflow-hidden p-0 ring-samsung-blue/20`}>
          <Everest145GrowthCalculator />
        </div>
      </WarmSection>

      <WarmSection alt>
        <div className={WARM_CARD}>
          <h2 className={WARM_H2}>The Tax Architecture</h2>
          <p className={`mt-4 ${WARM_BODY}`}>
            Growth is highly efficient. Yields are subject to a flat 20% Dividend Withholding Tax (DWT) at maturity, circumventing marginal income tax brackets.
          </p>
        </div>
      </WarmSection>

      <WarmSection>
        <h2 className={WARM_H2}>Deploy Your Capital</h2>
        <WarmPrimaryLink href="/contact" className="mt-6 w-full sm:w-auto">
          Request 14.5% Term Sheet →
        </WarmPrimaryLink>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-stone-500 sm:justify-start">
          <a href="https://wa.me/27662276044" target="_blank" rel="noopener noreferrer" className="hover:text-shark">
            WhatsApp +27 66 227 6044
          </a>
          <Link href="/everest-wealth" className={WARM_LINK}>
            Investment options
          </Link>
          <Link href="/contact" className={WARM_LINK}>
            Contact
          </Link>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
