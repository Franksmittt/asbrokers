import Link from "next/link";
import { Everest128Calculator } from "@/components/Everest128Calculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { WarmHero, WarmPageWithFooter, WarmSection } from "@/components/warm/WarmShell";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_EYEBROW, WARM_H2, WARM_LINK } from "@/lib/warm-theme";

export const metadata = buildPageMetadata({
  path: "/everest-128-product",
  title: "Everest Strategic Income 12.8% | AS Brokers Krugersdorp",
  description:
    "Explore the Everest Strategic Income solution targeting 12.8% returns. AS Brokers, an Authorised FSP in Krugersdorp, offers structured income growth.",
});

export default function Everest128Page() {
  const heroImage = getPrimaryPageImage("/everest-128-product") ?? "/images/everest-128-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path="/everest-128-product"
        webPage={{
          name: "Everest Strategic Income 12.8% | AS Brokers Krugersdorp",
          description:
            "Explore the Everest Strategic Income solution targeting 12.8% returns through AS Brokers CC (FSP 17273).",
        }}
        product={{
          name: "Everest Strategic Income 12.8%",
          description:
            "Voluntary investment structure targeting 12.8% annual income yield. R100,000 minimum. 120-day notice and 15% early exit penalty may apply.",
          brandName: "Everest Wealth",
        }}
      />
      <WarmHero
        kicker="Code 1.8 Wealth Engineering"
        title="Yield Engineering: 12.8% Strategic Income"
        description="Calculate the targeted monthly cash flow profile. This unlisted structure includes a 10% capital maturity bonus at year 5 and must be reviewed with its liquidity and risk disclosures."
        imageSrc={heroImage}
        maxWidth="4xl"
      />

      <WarmSection>
        <div className={`${WARM_CARD} overflow-hidden p-0 ring-samsung-blue/20`}>
          <Everest128Calculator />
        </div>
      </WarmSection>

      <WarmSection alt>
        <h2 className={WARM_H2}>Fiduciary Compliance & Structure</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className={WARM_CARD}>
            <p className={WARM_EYEBROW}>Regulated Efficiency</p>
            <p className={`mt-3 ${WARM_BODY}`}>
              All yields are subject to a flat 20% Dividend Withholding Tax (DWT), vastly outperforming standard income tax scales.
            </p>
          </div>
          <div className={WARM_CARD}>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Authority</p>
            <p className={`mt-3 ${WARM_BODY}`}>
              Albert Schuurman & Johnny Farinha · AS Brokers FSP 17273 · Code 1.8 Shares.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/everest-wealth" className={WARM_LINK}>
                Investment options
              </Link>
              <Link href="/contact" className={WARM_LINK}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
