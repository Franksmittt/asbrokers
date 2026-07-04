import Link from "next/link";
import {
  WarmPageWithFooter,
  WarmProse,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_H3, WARM_LINK } from "@/lib/warm-theme";

export const metadata = {
  title: "Privacy Policy | AS Brokers CC",
  description:
    "Privacy Policy for AS Brokers CC. How we collect, use and protect your personal information in line with POPIA. FSP 17273.",
  openGraph: {
    title: "Privacy Policy | AS Brokers CC",
    description: "How AS Brokers CC handles your personal information. POPIA compliant. FSP 17273.",
  },
};

export default function PrivacyPage() {
  return (
    <WarmPageWithFooter>
      <WarmSimpleHero
        kicker="Legal"
        title="Privacy Policy"
        description="AS Brokers CC (FSP 17273) is committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA) and applicable data protection laws."
      />

      <WarmSection narrow>
        <WarmProse>
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Information we collect</h2>
            <p className={WARM_BODY}>
              We may collect and process personal information you provide when you contact us, complete forms on our
              website, use our calculators, or engage our services. This may include your name, contact details,
              financial information, and identification details where required for regulatory or product purposes.
            </p>
          </div>

          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>How we use your information</h2>
            <p className={WARM_BODY}>
              We use your information to provide financial advice and services, to comply with legal and regulatory
              obligations (including FAIS and FSCA requirements), to communicate with you, and to improve our services.
              We do not sell your personal information to third parties.
            </p>
          </div>

          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Your rights</h2>
            <p className={WARM_BODY}>
              You have the right to access, correct, or delete your personal information, and to object to or restrict
              certain processing. To exercise these rights or for any privacy-related queries, please contact us.
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
