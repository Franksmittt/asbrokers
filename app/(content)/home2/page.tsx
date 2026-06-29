import { Home2Preview } from "@/components/home2/Home2Preview";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/home2",
  title: "Homepage preview — customer journeys",
  description:
    "Problem-first homepage preview: retirement, investments, insurance, and estate planning routes for South Africans. Not indexed.",
  noIndex: true,
});

export default function Home2Page() {
  return (
    <>
      <PageJsonLd
        path="/home2"
        webPage={{
          name: "AS Brokers homepage preview — customer journeys",
          description: "Self-identify first: retirement, investments, insurance, or estate planning.",
        }}
      />
      <Home2Preview />
    </>
  );
}
