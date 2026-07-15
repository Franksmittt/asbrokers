import Link from "next/link";
import { ChatPageClient } from "@/components/chat/ChatPageClient";
import {
  HubContentSection,
  HubUtilityHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";

export default function ChatPage() {
  return (
    <PageWithFooter>
      <HubUtilityHero
        kicker="AS Brokers"
        title="Digital Wealth Assistant"
        description="Ask about Discovery Health medical aid and Gap Cover, estate duty, Everest 12.8% Strategic Income, or Amethyst Living Annuity. Wealth calculations use deterministic SA tax and product rules. Educational only — not financial advice."
      >
        <p className="mt-2 text-xs text-stone-500">
          FSP 17273 · Discovery Health education &amp; broker pathway · Everest voluntary products: R100,000
          minimum · 120-day notice &amp; 15% early exit may apply.
        </p>
      </HubUtilityHero>

      <ChatPageClient />

      <HubContentSection alt className="py-8">
        <div className="flex max-w-3xl flex-wrap gap-4 text-sm">
          <Link href="/calculators" prefetch={false} className="font-medium text-samsung-blue hover:text-cinematic-teal">
            All calculators
          </Link>
          <Link href="/solutions/discovery-health" prefetch={false} className="font-medium text-samsung-blue hover:text-cinematic-teal">
            Discovery Health
          </Link>
          <Link href="/investments" prefetch={false} className="font-medium text-samsung-blue hover:text-cinematic-teal">
            Investments hub
          </Link>
          <Link href="/contact" prefetch={false} className="font-medium text-samsung-blue hover:text-cinematic-teal">
            Contact AS Brokers
          </Link>
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
