import { ContactPageView } from "@/components/contact/ContactPageView";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact AS Brokers",
  description:
    "Book a consultation with AS Brokers CC in Krugersdorp. Retirement, Everest Wealth, insurance, and estate planning. FSP 17273.",
});

export default function ContactPage() {
  return <ContactPageView />;
}
