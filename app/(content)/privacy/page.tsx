import { LegalDocumentLayout, LegalSection } from "@/components/legal/LegalDocumentLayout";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Privacy Policy | AS Brokers CC";
const PAGE_DESCRIPTION =
  "Privacy Policy for AS Brokers CC. How we collect, use and protect your personal information in line with POPIA. FSP 17273.";

export const metadata = buildPageMetadata({
  path: "/privacy",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function PrivacyPage() {
  return (
    <>
      <PageJsonLd
        path="/privacy"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <LegalDocumentLayout
        kicker="Legal · POPIA"
        title="Privacy Policy"
        description="AS Brokers CC (FSP 17273) is committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA) and applicable data protection laws."
        lastUpdated="July 2026"
        pillTags={["FSP 17273", "POPIA compliant"]}
        footerLinks={[
          { href: "/manage-cookies", label: "Manage cookies" },
          { href: "/contact", label: "Contact us" },
          { href: "/", label: "Home" },
        ]}
      >
        <LegalSection title="Information we collect">
          <p>
            We may collect and process personal information you provide when you contact us, complete forms on our
            website, use our calculators, or engage our services. This may include your name, contact details,
            financial information, and identification details where required for regulatory or product purposes.
          </p>
        </LegalSection>

        <LegalSection title="How we use your information">
          <p>
            We use your information to provide financial advice and services, to comply with legal and regulatory
            obligations (including FAIS and FSCA requirements), to communicate with you, and to improve our services.
            We do not sell your personal information to third parties.
          </p>
        </LegalSection>

        <LegalSection title="Data retention & security">
          <p>
            Personal information is retained only for as long as necessary for the purposes for which it was collected,
            or as required by law. We implement appropriate technical and organisational measures to protect your
            data against unauthorised access, loss, or misuse.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            You have the right to access, correct, or delete your personal information, and to object to or restrict
            certain processing. To exercise these rights or for any privacy-related queries, please contact us.
          </p>
        </LegalSection>
      </LegalDocumentLayout>
    </>
  );
}
