import { LegalDocumentLayout, LegalSection } from "@/components/legal/LegalDocumentLayout";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

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
    <>
      <PageJsonLd
        path="/conflict-of-interest"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <LegalDocumentLayout
        kicker="Legal · FAIS"
        title="Conflict of Interest"
        description="AS Brokers CC (FSP 17273) maintains a conflict of interest policy in line with FAIS and FSCA requirements."
        lastUpdated="July 2026"
        pillTags={["FSP 17273", "Client-first"]}
        footerLinks={[
          { href: "/contact", label: "Contact us" },
          { href: "/regulatory-compliance", label: "Regulatory compliance" },
          { href: "/", label: "Home" },
        ]}
      >
        <LegalSection title="Our approach">
          <p>
            We are an independent financial services provider and are not tied to a single product house. Our advice
            is based on your needs and objectives. We distribute products from multiple providers, including Everest
            Wealth Management (FSP 795), and receive remuneration in line with regulatory disclosure requirements. We
            identify and manage potential conflicts through our internal policies, training and compliance oversight.
          </p>
        </LegalSection>

        <LegalSection title="Disclosure">
          <p>
            Where a conflict or potential conflict arises that could affect the service we provide to you, we will
            disclose it and take steps to manage it in your best interest. You may request a copy of our full conflict
            of interest policy by contacting us.
          </p>
        </LegalSection>

        <LegalSection title="Remuneration transparency">
          <p>
            Advice and product remuneration structures are disclosed before you commit to a product or service. Where
            Everest or other providers pay commissions or fees, these are explained in product documentation and FAIS
            disclosure packs, not hidden in opaque pricing.
          </p>
        </LegalSection>
      </LegalDocumentLayout>
    </>
  );
}
