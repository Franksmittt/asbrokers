import { WarmHero, WarmPageWithFooter, WarmPrimaryLink, WarmSecondaryLink, WarmSection } from "@/components/warm/WarmShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_H2 } from "@/lib/warm-theme";

const PAGE_TITLE = "Semigration & Retirement Villages Western Cape";
const PAGE_DESCRIPTION =
  "Semigration and retirement villages Western Cape: financial planning for HNWIs relocating from Gauteng to the coast. Retirement capital, estate planning, and lifestyle transition.";

export const metadata = buildPageMetadata({
  path: "/insights/semigration-retirement",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function SemigrationRetirementPage() {
  const heroImage = getPrimaryPageImage("/insights/semigration-retirement") ?? "/images/insights-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/insights/semigration-retirement" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />
      <WarmHero
        kicker="Insights"
        title="Semigration & Retirement Villages Western Cape"
        description="A significant demographic shift is under way: high-net-worth individuals and families are relocating from Gauteng to the Western Cape (semigration), driven by lifestyle, governance, and energy resilience. That move often involves redeploying capital, downsizing or upgrading property, and rethinking retirement income and estate planning."
        imageSrc={heroImage}
        maxWidth="4xl"
      />

      <WarmSection narrow>
        <div className="space-y-8">
          <div className={WARM_CARD}>
            <h2 className={WARM_H2}>Retirement villages Western Cape</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              Retirement villages and coastal nodes, from Hermanus and George to the Cape Winelands, attract buyers who want security, healthcare access, and community. Financing the move and sustaining income in retirement often requires a clear picture of existing retirement capital, drawdown strategies, and tax-efficient structures such as living annuities.
            </p>
          </div>
          <div className={WARM_CARD}>
            <h2 className={WARM_H2}>Planning for the transition</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              Whether you are considering semigration or already relocating, aligning your retirement capital, estate plan, and income needs with your new lifestyle is essential. We help clients structure drawdown rates, assess targeted-return and living annuity options, and ensure liquidity and tax efficiency through the transition.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <WarmPrimaryLink href="/retirement">Retirement Reality Calculator</WarmPrimaryLink>
            <WarmSecondaryLink href="/everest-amethyst-living-annuity">Amethyst Living Annuity</WarmSecondaryLink>
            <WarmSecondaryLink href="/contact">Contact us</WarmSecondaryLink>
          </div>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
