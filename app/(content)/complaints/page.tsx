import Link from "next/link";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmProse,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_H3, WARM_LINK } from "@/lib/warm-theme";

const PAGE_TITLE = "Complaints Procedure";
const PAGE_DESCRIPTION =
  "How to lodge a complaint with AS Brokers CC. FSCA-compliant complaints procedure. FSP 17273.";

export const metadata = buildPageMetadata({
  path: "/complaints",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function ComplaintsPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/complaints" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        kicker="Legal"
        title="Complaints Procedure"
        description="AS Brokers CC (FSP 17273) is committed to treating complaints fairly and in line with FSCA requirements. If you are not satisfied with our service, please follow the procedure below."
      />

      <WarmSection narrow>
        <WarmProse>
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>How to lodge a complaint</h2>
            <p className={`${WARM_BODY} mb-4`}>
              Please contact us in writing (email or post) or by phone. Include your name, contact details, a clear
              description of the complaint, and any reference numbers or documentation. We will acknowledge your
              complaint and provide a reference number.
            </p>
            <p className={WARM_BODY}>
              <strong className="font-semibold text-shark">Contact:</strong> Use our contact form at the link below,
              or WhatsApp +27 66 227 6044. Our compliance officer will respond in line with our internal complaints
              policy and regulatory timeframes.
            </p>
          </div>

          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>What happens next</h2>
            <p className={WARM_BODY}>
              We will investigate your complaint and aim to resolve it as quickly as possible. You will receive updates
              and a final response. If you are not satisfied with our response, you may refer the matter to the FAIS
              Ombud or the FSCA, as applicable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <WarmPrimaryLink href="/contact">Contact us</WarmPrimaryLink>
            <Link href="/" prefetch={false} className={`${WARM_LINK} text-stone-500 hover:text-shark`}>
              Home
            </Link>
          </div>
        </WarmProse>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
