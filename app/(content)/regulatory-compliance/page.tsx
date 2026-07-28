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
        kicker="Compliance disclosure · FAIS"
        title="Regulatory Compliance & Licensing"
        description="AS Brokers CC operates under the Financial Sector Conduct Authority (FSCA) as an independent authorised financial services provider."
        lastUpdated="July 2026"
        pillTags={[
          "AS Brokers FSP 17273",
          "Category 1.8 · Shares",
        ]}
        footerLinks={[
          { href: "/investments", label: "Investments hub" },
          { href: "/contact", label: "Contact us" },
          { href: "/conflict-of-interest", label: "Conflict of interest" },
        ]}
      >
        <LegalSection title="Section 1(3)(a) factual information notice">
          <p>
            The information on this page is provided for general informational purposes only and constitutes factual
            information as contemplated in <strong>Section 1(3)(a) of the Financial Advisory and Intermediary Services
            Act, 37 of 2002 (FAIS Act)</strong>. It does not constitute financial, investment, legal, or tax advice.
            No recommendation is made regarding the suitability of any financial product for any individual. Personal
            advice requires a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).
          </p>
        </LegalSection>

        <LegalSection title="Category 1.8 (Securities and Instruments: Shares)">
          <p>
            The FSCA designates <strong>Category 1.8</strong> for &quot;Securities and Instruments: Shares&quot;.
            This classification requires meeting experience and qualification standards and permits the holder to
            advise on and intermediate <strong>unlisted preference shares</strong> and related alternative investment
            products.
          </p>
          <p>
            AS Brokers CC holds Category 1.8 authority. This authorisation is subject to the applicable conduct
            standards and suitability requirements under FAIS and FSCA regulations. Holding this category does not
            mean all clients are eligible for products in this category; suitability is determined through a formal
            Financial Needs Analysis.
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
              (product provider and structurer), disclosed as a product provider relationship for conflict of
              interest purposes.
            </li>
          </ul>
          <p>
            Where AS Brokers distributes products from specific providers, that relationship is disclosed in our
            conflict of interest policy and FAIS disclosure packs before you commit to any product. Distribution
            occurs through compliant, audited channels only.
          </p>
        </LegalSection>

        <LegalSection title="FAIS, FSCA & client protections">
          <p>
            We operate in strict adherence to the Financial Advisory and Intermediary Services Act (FAIS), FSCA
            conduct standards, and applicable POPIA data protection requirements. Our conflict of interest, complaints,
            and privacy policies are published on this site and available on request.
          </p>
          <p>
            All illustrations, calculators, and educational content on this website are for general information only
            and constitute factual information under Section 1(3)(a) of the FAIS Act. They do not constitute
            personalised financial advice. A formal advisory process is required before any product recommendation
            is made.
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
