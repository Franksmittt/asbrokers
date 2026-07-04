import Image from "next/image";
import Link from "next/link";
import {
  WarmPageWithFooter,
  WarmProse,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getAlt } from "@/lib/image-alt";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_H3, WARM_LINK, WARM_MEDIA_FRAME, WARM_META } from "@/lib/warm-theme";

const PAGE_TITLE = "Regulatory Compliance | FSP 17273 | Authorised Financial Services Provider";
const PAGE_DESCRIPTION =
  "AS Brokers CC operates as an Authorised Financial Services Provider (FSP 17273, Category 1.8) in strict adherence to South African financial regulations, ensuring transparent and ethical service delivery.";

const heroImage = getPrimaryPageImage("/regulatory-compliance") ?? "/images/regulatory-compliance-inset-1x1.jpg";

export const metadata = buildPageMetadata({
  path: "/regulatory-compliance",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function RegulatoryCompliancePage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path="/regulatory-compliance"
        webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }}
      />

      <WarmSimpleHero
        kicker="Compliance"
        title="Code 1.8 FSP License Broker"
        description="AS Brokers CC operates under the Financial Sector Conduct Authority (FSCA) as an independent authorised financial services provider. Our specific license category 1.8 (Securities and Instruments: Shares) permits us to advise on and intermediate unlisted shares, a capability that standard Category I or II brokers often do not hold."
      />

      <WarmSection narrow>
        <WarmProse>
          <div className={`${WARM_MEDIA_FRAME} aspect-[16/9] max-w-2xl`}>
            <Image
              src={heroImage}
              alt={getAlt(heroImage, "Regulatory compliance and FSP licensing")}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>

          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>What Category 1.8 means</h2>
            <p className={`${WARM_BODY} mb-4`}>
              The FSCA designates Category 1.8 for &quot;Securities and Instruments: Shares&quot;. This classification
              requires meeting experience and qualification standards and allows the holder to distribute unlisted
              preference shares and related alternative investment products. Everest Wealth Management (FSP 795)
              structures such products; AS Brokers CC (FSP 17273) is authorised to advise on and distribute them to
              qualifying clients.
            </p>
            <p className={WARM_META}>
              This capacity is central to our offering: structured return and living annuity solutions that fall
              outside traditional unit trust or life assurance wrappers.
            </p>
          </div>

          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Regulatory identifiers</h2>
            <ul className={`${WARM_BODY} space-y-2`}>
              <li>
                <strong className="font-semibold text-shark">AS Brokers CC</strong>: FSP 17273 · Category 1.8
              </li>
              <li>
                <strong className="font-semibold text-shark">Everest Wealth Management</strong>: FSP 795 · Category I,
                II & IIA
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/everest-wealth" prefetch={false} className={WARM_LINK}>
              Everest Wealth products →
            </Link>
            <Link href="/contact" prefetch={false} className={WARM_LINK}>
              Contact us →
            </Link>
          </div>
        </WarmProse>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
