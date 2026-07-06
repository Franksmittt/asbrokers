import { ContactPageView } from "@/components/contact/ContactPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Contact AS Brokers";
const PAGE_DESCRIPTION =
  "Request a consultation with independent financial advisers in Krugersdorp. Retirement, Everest Wealth, insurance, and estate planning. FSP 17273.";

const contactFAQs = [
  {
    question: "How do I book a consultation with AS Brokers?",
    answer:
      "Complete the contact form on this page, WhatsApp us on +27 66 227 6044, or email albert@asbrokers.co.za. An authorised FSP 17273 adviser will respond personally, not via a call centre.",
  },
  {
    question: "What should I prepare before our first meeting?",
    answer:
      "Bring a rough picture of your goals, existing policies or investments, and any questions about retirement income, Everest Wealth, insurance, or estate planning. Calculators on our site can help you prepare illustrative numbers in advance.",
  },
  {
    question: "Does AS Brokers charge for an initial conversation?",
    answer:
      "We will explain our advice process and any fees during your consultation. There is no obligation to proceed after an initial discussion.",
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
      <HubLcpPreload src={HUB_LCP_IMAGES["/contact"]} />
      <PageJsonLd
        path="/contact"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={contactFAQs}
      />
      <ContactPageView faqs={contactFAQs} />
    </>
  );
}
