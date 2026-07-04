import Link from "next/link";
import { WealthBuildingCalculator } from "@/components/WealthBuildingCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmSecondaryLink,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_META } from "@/lib/warm-theme";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "AS Brokers Wealth Building Calculator";
const PAGE_DESCRIPTION =
  "Calculate future wealth using compound growth, monthly contributions and annual increases. Illustrate investment growth, business growth and long-term financial freedom planning.";

export const metadata = buildPageMetadata({
  path: "/wealth-building-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function WealthBuildingCalculatorPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/wealth-building-calculator" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        centered
        kicker="Capital Lifespan & Wealth Planning"
        title="AS Brokers Wealth Building Calculator"
        description="Model how capital can grow over time, for investments, retirement savings, business growth, or financial freedom planning. No artificial limits on growth assumptions."
      />

      <WarmSection narrow>
        <div className={`${WARM_CARD} overflow-hidden`}>
          <WealthBuildingCalculator />
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-4`}>What this tool is for</h2>
        <p className={`${WARM_BODY} mb-4`}>
          This is a general-purpose compound growth calculator, not only an investment tool. Use it to illustrate how
          starting capital, monthly contributions, annual contribution increases, and your chosen growth rate combine
          over time.
        </p>
        <ul className={`space-y-2 ${WARM_META}`}>
          {[
            "Investment and wealth accumulation scenarios",
            "Retirement savings projections",
            "Business growth illustrations",
            "Financial freedom planning conversations",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-samsung-blue">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <WarmSecondaryLink href="/calculators">All calculators</WarmSecondaryLink>
          <WarmPrimaryLink href="/contact">Speak to AS Brokers</WarmPrimaryLink>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
