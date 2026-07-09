import { LegacyReadinessLanding } from "@/components/legacy/LegacyReadinessLanding";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

const legacyChecklistFaqs = [
  {
    question: "What is the Legacy Readiness Checklist™?",
    answer:
      "A free structured review of eight estate planning areas, wills, trusts, liquidity, beneficiaries, and succession, so you can spot gaps before they become family problems.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. It is educational only. AS Brokers FSP 17273 can arrange a formal Estate Planning Review if you want personalised advice.",
  },
  {
    question: "How do I receive the checklist?",
    answer:
      "Enter your name and email. Your checklist opens immediately as a printable PDF, no waiting for an email attachment.",
  },
];

const PAGE_TITLE = "Legacy Readiness Checklist™";
const PAGE_DESCRIPTION =
  "Download the free Legacy Readiness Checklist™. Identify potential gaps in your will, trust, beneficiaries, estate liquidity, and succession planning before it is too late.";

export const metadata = buildPageMetadata({
  path: "/legacy-readiness-checklist",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function LegacyReadinessChecklistPage() {
  return (
    <>
      <PageJsonLd path="/legacy-readiness-checklist" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} faqs={legacyChecklistFaqs} />
      <LegacyReadinessLanding />
    </>
  );
}
