import { DiscoveryHealthPageView } from "@/components/solutions/DiscoveryHealthPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Discovery Health Medical Aid & Gap Cover | AS Brokers";
const PAGE_DESCRIPTION =
  "Independent Discovery Health Medical Scheme guidance for 2026 plans, MSA/ATB/PHF mechanics, and Gap Cover stacking. FAIS-compliant audit at no extra broker cost. FSP 17273.";

const faqs = [
  {
    question: "Does using a broker make Discovery Health more expensive?",
    answer:
      "No. Under the Medical Schemes Act, broker remuneration is capped and built into medical aid contributions. You typically pay the same monthly premium whether you join via Discovery’s channels or an accredited broker such as AS Brokers (FSP 17273). If you go direct, the scheme retains the built-in broker allocation.",
  },
  {
    question: "What is the difference between medical aid and Gap Cover?",
    answer:
      "Medical schemes (including Discovery Health Medical Scheme) are governed by the Medical Schemes Act and must provide Prescribed Minimum Benefits. Gap Cover is short-term insurance under Demarcation Regulations, usually for in-hospital specialist shortfalls, and requires an underlying medical scheme. It is not a substitute for medical aid.",
  },
  {
    question: "Are the 2026 premiums on this page guaranteed quotes?",
    answer:
      "No. Figures are illustrative starting contributions drawn from publicly available Discovery Health Medical Scheme materials for the 2026 benefit year. Exact premiums depend on dependents, income bands (KeyCare), and selected options. Confirm with a licensed representative of FSP 17273.",
  },
  {
    question: "What happens after I submit the audit form?",
    answer:
      "Your details are stored securely for follow-up under POPIA. An authorised adviser contacts you to complete a needs analysis and Record of Advice before any product recommendation. Submitting the form is not advice and does not bind you to a plan.",
  },
  {
    question: "Can AS Brokers help if a Discovery claim is rejected?",
    answer:
      "Yes. Part of the broker role is operational support on authorisations, shortfalls, and, where appropriate, statutory dispute pathways under the Medical Schemes Act (including Section 47 complaints to the Registrar). Outcomes depend on scheme rules and clinical facts.",
  },
  {
    question: "Is this page affiliated with Discovery Limited?",
    answer:
      "No. This is an independent educational page from AS Brokers CC (FSP 17273). Discovery Health Medical Scheme and Discovery Gap products are third-party offerings. We place cover across the market where suitable; Discovery is one option we help clients evaluate.",
  },
];

export const metadata = buildPageMetadata({
  path: "/solutions/discovery-health",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Discovery Health medical aid broker",
    "Discovery Health 2026 plans",
    "Discovery Gap Cover",
    "medical aid broker South Africa",
    "MSA ATB Personal Health Fund",
    "FSP 17273",
  ],
});

export default function DiscoveryHealthPage() {
  return (
    <>
      <PageJsonLd
        path="/solutions/discovery-health"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={faqs}
        service={{
          name: "Discovery Health medical aid and gap cover structuring",
          description: PAGE_DESCRIPTION,
          serviceType: "Medical Aid Advice, Gap Cover, Discovery Health",
        }}
      />
      <DiscoveryHealthPageView faqs={faqs} />
    </>
  );
}
