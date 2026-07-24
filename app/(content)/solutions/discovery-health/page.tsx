import { DiscoveryHealthPageView } from "@/components/solutions/DiscoveryHealthPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Discovery Health Medical Aid Broker South Africa";
const PAGE_DESCRIPTION =
  "AS Brokers CC (FSP 17273) in Krugersdorp helps South African families evaluate Discovery Health Medical Scheme plans, Gap Cover stacking, and broker support at no extra premium cost.";

const CONTENT_REVISED = "2026-07-15";

const faqs = [
  {
    question: "Does using a broker make Discovery Health more expensive?",
    answer:
      "No. Under the Medical Schemes Act, broker remuneration is capped and built into medical aid contributions. You typically pay the same monthly premium whether you join via Discovery’s channels or an accredited broker such as AS Brokers CC (FSP 17273). If you go direct, the scheme retains the built-in broker allocation.",
  },
  {
    question: "What is the difference between Discovery Health medical aid and Gap Cover?",
    answer:
      "Discovery Health Medical Scheme is a medical scheme under the Medical Schemes Act and must provide Prescribed Minimum Benefits. Gap Cover is short-term insurance under Demarcation Regulations, usually for in-hospital specialist shortfalls, and requires an underlying medical scheme. It is not a substitute for medical aid.",
  },
  {
    question: "Are the 2026 Discovery Health premiums on this page guaranteed quotes?",
    answer:
      "No. Figures are illustrative starting contributions drawn from publicly available Discovery Health Medical Scheme materials for the 2026 benefit year. Exact premiums depend on dependents, income bands (KeyCare), and selected options. Confirm with a licensed representative of FSP 17273.",
  },
  {
    question: "How does AS Brokers help with Discovery Health in Krugersdorp and Gauteng?",
    answer:
      "AS Brokers CC is based in Krugersdorp on the West Rand and advises South African households on Discovery Health Medical Scheme selection, Gap Cover stacking, applications, and claims pathways after a FAIS needs analysis. Consultations can be in person or remote.",
  },
  {
    question: "Can AS Brokers help if a Discovery claim is rejected?",
    answer:
      "Yes. Part of the broker role is operational support on authorisations, shortfalls, and, where appropriate, statutory dispute pathways under the Medical Schemes Act (including Section 47 complaints to the Registrar). Outcomes depend on scheme rules and clinical facts.",
  },
  {
    question: "Is this page affiliated with Discovery Limited?",
    answer:
      "No. This is an independent educational page from AS Brokers CC (FSP 17273). Discovery Health Medical Scheme and Discovery Gap products are third-party offerings. Personal recommendations require a needs analysis; Discovery is one market option that may be discussed during advice.",
  },
];

export const metadata = buildPageMetadata({
  path: "/solutions/discovery-health",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Discovery Health medical aid broker",
    "Discovery Health broker South Africa",
    "Discovery Gap Cover",
    "medical aid broker Krugersdorp",
    "Discovery Health 2026 plans",
    "FSP 17273",
  ],
});

export default function DiscoveryHealthPage() {
  return (
    <>
      <PageJsonLd
        path="/solutions/discovery-health"
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
          datePublished: "2026-07-14",
          dateModified: CONTENT_REVISED,
        }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insurance", path: "/insurance" },
          { name: "Medical aid & gap", path: "/solutions/medical-aid" },
          { name: "Discovery Health", path: "/solutions/discovery-health" },
        ]}
        primaryImagePath="/images/risk-arch-medical.webp"
        service={{
          name: "Discovery Health medical aid and gap cover brokerage",
          description: PAGE_DESCRIPTION,
          serviceType: "Medical Aid Advice, Gap Cover, Discovery Health Medical Scheme",
        }}
      />
      <DiscoveryHealthPageView faqs={faqs} contentRevised={CONTENT_REVISED} />
    </>
  );
}
