import { Home4Preview } from "@/components/home4/Home4Preview";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/home4",
  title: "Homepage preview v4 — warm public-facing",
  description:
    "Version 4 homepage preview: audience split, journey cards, calculators, dual pathways, and trust — warm premium aesthetic. Not indexed.",
  noIndex: true,
});

export default function Home4Page() {
  return (
    <>
      <PageJsonLd
        path="/home4"
        webPage={{
          name: "AS Brokers homepage preview v4",
          description:
            "Question-led, journey-based homepage with education-first calculators and independent advice pathways.",
        }}
      />
      <Home4Preview />
    </>
  );
}
