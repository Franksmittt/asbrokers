import { LegalDocumentLayout, LegalSection } from "@/components/legal/LegalDocumentLayout";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Terms of Use | AS Brokers CC";
const PAGE_DESCRIPTION =
  "Terms of Use for the AS Brokers CC website. FSP 17273. Use of calculators, content and services.";

export const metadata = buildPageMetadata({
  path: "/terms",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function TermsPage() {
  return (
    <>
      <PageJsonLd
        path="/terms"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <LegalDocumentLayout
        kicker="Legal"
        title="Terms of Use"
        description="These terms govern your use of the AS Brokers CC website and related tools. By using this site you agree to these terms. FSP 17273."
        lastUpdated="July 2026"
        pillTags={["FSP 17273"]}
        footerLinks={[
          { href: "/contact", label: "Contact us" },
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/", label: "Home" },
        ]}
      >
        <LegalSection title="Use of website and tools">
          <p>
            The content and calculators on this website are for general information and illustration only. They do
            not constitute financial advice. You should seek advice from an authorised financial adviser before
            making any financial decisions. AS Brokers CC (FSP 17273) provides advice only when you engage our
            services through a formal advisory process.
          </p>
        </LegalSection>

        <LegalSection title="Accuracy and availability">
          <p>
            We endeavour to keep the website accurate and up to date but do not warrant that content or tools are
            error-free or suitable for your circumstances. We may change or withdraw content or services without
            notice.
          </p>
        </LegalSection>

        <LegalSection title="Intellectual property">
          <p>
            The content, design and branding on this website are owned by AS Brokers CC or our licensors. You may not
            copy, reproduce or use them for commercial purposes without our written consent.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <p>
            To the extent permitted by law, AS Brokers CC is not liable for any loss arising from reliance on website
            content or calculators. Nothing in these terms excludes liability that cannot be excluded under applicable
            law.
          </p>
        </LegalSection>
      </LegalDocumentLayout>
    </>
  );
}
