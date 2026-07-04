import Link from "next/link";
import { LifeOfCapitalCalculator } from "@/components/LifeOfCapitalCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { WarmHero, WarmPageWithFooter, WarmPrimaryLink, WarmSecondaryLink, WarmSection } from "@/components/warm/WarmShell";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_LINK } from "@/lib/warm-theme";

const PAGE_TITLE = "Is Your Retirement Income Enough? | Retirement Calculator SA";
const PAGE_DESCRIPTION =
  "Will your money last in retirement? Use the Life of Capital calculator to see how long your savings will last with inflation and tax.";

export const metadata = buildPageMetadata({
  path: "/income-in-retirement",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function IncomeInRetirementPage() {
  const heroImage = getPrimaryPageImage("/income-in-retirement") ?? "/images/income-retirement-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/income-in-retirement" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />
      <WarmHero
        kicker="Code 1.8 · Capital Lifespan"
        title="The Capital Depletion Test"
        description="Run the mathematics of your current trajectory. Most traditional portfolios deplete years before expected. Expose your exact capital lifespan in 30 seconds."
        imageSrc={heroImage}
        maxWidth="4xl"
      />

      <WarmSection>
        <div className={`${WARM_CARD} overflow-hidden p-0 ring-red-400/20`}>
          <LifeOfCapitalCalculator />
        </div>
      </WarmSection>

      <WarmSection alt>
        <div className={WARM_CARD}>
          <h2 className={WARM_H2}>Does your trajectory show depletion?</h2>
          <p className={`mt-4 ${WARM_BODY}`}>
            You cannot out-save mathematical drag. To extend your capital lifespan, you must migrate to high-yield, unlisted alternative assets.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WarmPrimaryLink href="/everest-wealth">Engineer a High-Yield Solution →</WarmPrimaryLink>
            <WarmSecondaryLink href="/contact">Book Actuarial Review</WarmSecondaryLink>
          </div>
        </div>
      </WarmSection>

      <WarmSection className="py-12">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
          <span>Albert Schuurman & Johnny Farinha</span>
          <span>AS Brokers | FSP 17273</span>
          <span>Independent Authorised Financial Service Provider</span>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link href="/" className={WARM_LINK}>
            Home
          </Link>
          <Link href="/retirement" className={WARM_LINK}>
            Retirement income
          </Link>
          <Link href="/contact" className={WARM_LINK}>
            Contact
          </Link>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
