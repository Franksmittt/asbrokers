import Link from "next/link";
import { Everest142Calculator } from "@/components/Everest142Calculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_H3, WARM_LINK } from "@/lib/warm-theme";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "Immediate Higher Income Calculator | 14.2% Gross Assumption";
const PAGE_DESCRIPTION =
  "Everest 14.2% investment calculator. Estimated monthly income from a targeted 14.2% annual return profile, 20% dividend tax.";

export const metadata = buildPageMetadata({
  path: "/immediate-higher-income-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function ImmediateHigherIncomePage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/immediate-higher-income-calculator" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        centered
        kicker="Code 1.8 Wealth Engineering"
        title="Maximum Liquidity: 14.2% Onyx Income+"
        description="Engineered for maximum day-one cash flow. Model a targeted 14.2% annual return profile while reviewing product risk, liquidity, and suitability."
      />

      <WarmSection narrow>
        <div className={WARM_CARD}>
          <Everest142Calculator />
        </div>
      </WarmSection>

      <WarmSection alt>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-1 md:grid-cols-2">
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>The Mathematical Advantage</h2>
            <p className={WARM_BODY}>
              This option is designed for absolute income certainty, entirely divorced from daily market fluctuations. Your yield is fixed, transparent, and not affected by headlines, volatility, or timing.
            </p>
          </div>
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Ideal Capital Deployment</h2>
            <ul className={`space-y-3 ${WARM_BODY}`}>
              {[
                "Maximum immediate income from day one",
                "Willingness to trade the 10% maturity bonus for higher monthly yield",
                "Preference for dividend tax efficiency over interest-based tax",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cinematic-teal/20 text-cinematic-teal" aria-hidden>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </WarmSection>

      <WarmSection narrow>
        <div className={`${WARM_CARD} text-center`}>
          <WarmPrimaryLink href="/contact">Request Official Onyx Term Sheet →</WarmPrimaryLink>
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="https://wa.me/27662276044" target="_blank" rel="noopener noreferrer" className={WARM_LINK}>
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
