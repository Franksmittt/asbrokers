import { LegalDocumentLayout, LegalSection } from "@/components/legal/LegalDocumentLayout";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

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
    <>
      <PageJsonLd
        path="/complaints"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <LegalDocumentLayout
        kicker="Legal · FSCA"
        title="Complaints Procedure"
        description="AS Brokers CC (FSP 17273) is committed to treating complaints fairly and in line with FSCA requirements."
        lastUpdated="July 2026"
        pillTags={["FSP 17273", "FAIS Ombud"]}
        footerLinks={[
          { href: "/contact", label: "Contact us" },
          { href: "/regulatory-compliance", label: "Regulatory compliance" },
          { href: "/", label: "Home" },
        ]}
      >
        <LegalSection title="How to lodge a complaint">
          <p>
            Please contact us in writing (email or post) or by phone. Include your name, contact details, a clear
            description of the complaint, and any reference numbers or documentation. We will acknowledge your
            complaint and provide a reference number.
          </p>
          <p>
            <strong>Contact:</strong> Use our contact form, or WhatsApp +27 66 227 6044. Our compliance officer will
            respond in line with our internal complaints policy and regulatory timeframes.
          </p>
        </LegalSection>

        <LegalSection title="What happens next">
          <p>
            We will investigate your complaint and aim to resolve it as quickly as possible. You will receive updates
            and a final response. If you are not satisfied with our response, you may refer the matter to the{" "}
            <strong>FAIS Ombud</strong> or the <strong>FSCA</strong>, as applicable.
          </p>
        </LegalSection>

        <LegalSection title="Our commitment">
          <p>
            We treat every complaint as an opportunity to improve our service. All complaints are logged, investigated
            fairly, and escalated where necessary. We do not retaliate against clients who raise concerns in good
            faith.
          </p>
        </LegalSection>
      </LegalDocumentLayout>
    </>
  );
}
