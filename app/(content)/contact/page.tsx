import { ContactPageView } from "@/components/contact/ContactPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Contact AS Brokers | Request a Wealth Engineering Call";
const PAGE_DESCRIPTION =
  "Request a consultation with independent advisers in Krugersdorp (FSP 17273). Retirement, investments, insurance, and estate planning. Not a call centre. Submitting an enquiry is not FAIS advice.";

const contactFAQs = [
  {
    question: "How do I book a consultation with AS Brokers?",
    answer:
      "Complete the enquiry form on this page, WhatsApp +27 66 227 6044, or email albert@asbrokers.co.za. An authorised FSP 17273 adviser will respond personally — not via a call centre.",
  },
  {
    question: "Does submitting the form constitute financial advice?",
    answer:
      "No. An enquiry is a request for contact. Advice under the FAIS Act is only rendered after a documented needs analysis and risk profiling by a licensed representative.",
  },
  {
    question: "What should I prepare before our first meeting?",
    answer:
      "Bring goals, existing policies or investments, and questions about retirement income, Everest Wealth, insurance, or estate planning. Calculators on our site can help you prepare illustrative numbers in advance.",
  },
  {
    question: "Does AS Brokers charge for an initial conversation?",
    answer:
      "We explain our advice process and any fees during consultation. There is no obligation to proceed after an initial discussion.",
  },
  {
    question: "How is my personal information used (POPIA)?",
    answer:
      "We process your details to respond to your enquiry and initiate a capital assessment. Consent is voluntary and specific. See our Privacy Policy for rights and contact details for privacy queries.",
  },
  {
    question: "Should I use WhatsApp or the form?",
    answer:
      "Either works. The form helps us capture topics and route correctly. WhatsApp suits quick follow-ups. Existing clients should contact their adviser directly.",
  },
];

export const metadata = buildPageMetadata({
  path: "/contact",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function ContactPage() {
  return (
    <>
      <PageJsonLd
        path="/contact"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={contactFAQs}
      />
      <ContactPageView faqs={contactFAQs} />
    </>
  );
}
