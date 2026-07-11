import { LegalDocumentLayout, LegalSection } from "@/components/legal/LegalDocumentLayout";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Regulatory Compliance | FSP 17273 | Authorised Financial Services Provider";
const PAGE_DESCRIPTION =
  "AS Brokers CC operates as an Authorised Financial Services Provider (FSP 17273, Category 1.8) in strict adherence to South African financial regulations, ensuring transparent and ethical service delivery.";

export const metadata = buildPageMetadata({
  path: "/regulatory-compliance",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "FSP 17273",
    "Category 1.8",
    "Code 1.8 FSP",
    "FSCA",
    "Everest FSP 795",
    "authorised financial services provider",
  ],
});

export default function RegulatoryCompliancePage() {
  return (
    <>
      <PageJsonLd
        path="/regulatory-compliance"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <LegalDocumentLayout
        kicker="Fiduciary briefing · Compliance"
        title="Regulatory Compliance & Licensing"
        description="AS Brokers CC operates under the Financial Sector Conduct Authority (FSCA) as an independent authorised financial services provider."
        lastUpdated="July 2026"
        pillTags={[
          "AS Brokers FSP 17273",
          "Category 1.8 · Shares",
          "Everest FSP 795",
        ]}
        footerLinks={[
          { href: "/everest-wealth/about", label: "Understanding Everest" },
          { href: "/investments", label: "Investments hub" },
          { href: "/contact", label: "Contact us" },
        ]}
      >
        <LegalSection title="Category 1.8 (Securities and Instruments: Shares)">
          <p>
            The FSCA designates <strong>Category 1.8</strong> for &quot;Securities and Instruments: Shares&quot;.
            This classification requires meeting experience and qualification standards and permits the holder to
            advise on and intermediate <strong>unlisted preference shares</strong> and related alternative investment
            products.
          </p>
          <p>
            AS Brokers CC holds Category 1.8 authority, a capability many standard Category I or II brokers do not
            hold. This is central to our Everest Wealth distribution: structured return profiles and living annuity
            solutions that fall outside traditional unit trust or life assurance wrappers.
          </p>
        </LegalSection>

        <LegalSection title="Regulatory identifiers">
          <ul>
            <li>
              <strong>AS Brokers CC</strong>, FSP <strong>17273</strong> · Category{" "}
              <strong>1.8 (Securities and Instruments: Shares)</strong>
            </li>
            <li>
              <strong>Everest Wealth Management</strong>, FSP <strong>795</strong> · Category I, II &amp; IIA
              (product provider and structurer)
            </li>
          </ul>
          <p>
            Everest designs and structures investment products; AS Brokers is authorised to advise on and distribute
            them to qualifying clients through compliant, audited channels, never via unsolicited social media or
            unverified offers.
          </p>
        </LegalSection>

        <LegalSection title="FAIS, FSCA & client protections">
          <p>
            We operate in strict adherence to the Financial Advisory and Intermediary Services Act (FAIS), FSCA
            conduct standards, and applicable POPIA data protection requirements. Our conflict of interest, complaints,
            and privacy policies are published on this site and available on request.
          </p>
          <p>
            All illustrations, calculators, and educational content are for general information only and do not
            constitute personalised financial advice until you engage us through a formal advisory process.
          </p>
        </LegalSection>

        <LegalSection title="Independent intermediary status">
          <p>
            AS Brokers is an <strong>independent</strong> financial services provider. We are not tied to a single
            product house. Advice is based on your needs and objectives, with remuneration disclosed in line with
            regulatory requirements.
          </p>
        </LegalSection>
      </LegalDocumentLayout>
    </>
  );
}
