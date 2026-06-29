import { Home3Preview } from "@/components/home3/Home3Preview";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/home3",
  title: "Homepage preview v3 — education-first platform",
  description:
    "Version 3 homepage preview: education-first journeys for retirement, investments, insurance, estate planning, and learning. Not indexed.",
  noIndex: true,
});

export default function Home3Page() {
  return (
    <>
      <PageJsonLd
        path="/home3"
        webPage={{
          name: "AS Brokers homepage preview v3",
          description: "Education-first financial platform — question, calculator, understanding, then advice.",
        }}
      />
      <Home3Preview />
    </>
  );
}
