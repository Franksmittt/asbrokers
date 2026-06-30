import { ContactPageView } from "@/components/contact/ContactPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact AS Brokers",
  description:
    "Request a consultation with independent financial advisers in Krugersdorp. Retirement, Everest Wealth, insurance, and estate planning. FSP 17273.",
});

const contactWebPage = {
  name: "Contact AS Brokers CC | Get in Touch for Financial Advice | FSP 17273",
  description:
    "Contact AS Brokers CC for professional financial planning, investment, and insurance services. Krugersdorp, West Rand. FSP 17273.",
};

export default function ContactPage() {
  return (
    <>
      <PageJsonLd path="/contact" webPage={contactWebPage} />
      <ContactPageView />
    </>
  );
}
