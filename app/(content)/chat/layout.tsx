import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/chat",
  title: "Educational assistant | AS Brokers",
  description:
    "AS Brokers educational assistant for Discovery Health, Gap Cover, estate duty illustrations, and general planning concepts. Factual information only under FAIS Section 1(3)(a). Not personal financial advice. FSP 17273.",
});

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
