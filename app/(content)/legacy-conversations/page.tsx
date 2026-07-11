import { LegacyConversationsHub } from "@/components/legacy/LegacyConversationsHub";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/legacy-conversations",
  title: "Legacy Conversations™ | Health · Wealth · Legacy",
  description:
    "Legacy Conversations™, a structured journey across Health, Wealth, and Legacy planning for South African families. FSP 17273.",
});

export default function LegacyConversationsPage() {
  return <LegacyConversationsHub />;
}
