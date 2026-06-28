import { Home2Preview } from "@/components/home2/Home2Preview";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/home2",
  title: "Homepage preview (Albert master plan)",
  description:
    "Preview homepage structured around Health, Wealth, Legacy, and Business — create, protect, preserve. Not indexed.",
  noIndex: true,
});

export default function Home2Page() {
  return (
    <>
      <PageJsonLd
        path="/home2"
        webPage={{
          name: "AS Brokers homepage preview",
          description: "Problem-first homepage preview for stakeholder review.",
        }}
      />
      <Home2Preview />
    </>
  );
}
