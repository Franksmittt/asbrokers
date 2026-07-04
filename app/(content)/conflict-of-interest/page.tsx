import Link from "next/link";
import {
  WarmPageWithFooter,
  WarmProse,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_H3, WARM_LINK } from "@/lib/warm-theme";

const PAGE_TITLE = "Conflict of Interest";
const PAGE_DESCRIPTION =
  "AS Brokers CC conflict of interest policy. How we manage conflicts in the interest of our clients. FSP 17273.";

export const metadata = buildPageMetadata({
  path: "/conflict-of-interest",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function ConflictOfInterestPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/conflict-of-interest" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        kicker="Legal"
        title="Conflict of Interest"
        description="AS Brokers CC (FSP 17273) maintains a conflict of interest policy in line with FAIS and FSCA requirements. We are committed to acting in our clients' best interests and to identifying, disclosing and managing any conflicts."
      />

      <WarmSection narrow>
        <WarmProse>
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Our approach</h2>
            <p className={WARM_BODY}>
              We are an independent financial services provider and are not tied to a single product house. Our advice
              is based on your needs and objectives. We distribute products from multiple providers, including Everest
              Wealth Management (FSP 795), and receive remuneration in line with regulatory disclosure requirements. We
              identify and manage potential conflicts through our internal policies, training and compliance oversight.
            </p>
          </div>

          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Disclosure</h2>
            <p className={WARM_BODY}>
              Where a conflict or potential conflict arises that could affect the service we provide to you, we will
              disclose it and take steps to manage it in your best interest. You may request a copy of our full conflict
              of interest policy by contacting us.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/contact" prefetch={false} className={WARM_LINK}>
              Contact us →
            </Link>
            <Link href="/" prefetch={false} className={`${WARM_LINK} text-stone-500 hover:text-shark`}>
              Home
            </Link>
          </div>
        </WarmProse>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
