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
        description="Ask about estate duty, Everest 12.8% Strategic Income, or Amethyst Living Annuity. Calculations use deterministic SA tax and product rules. Not financial advice."
      >
        <p className="mt-2 text-xs text-stone-500">
          FSP 17273 · Minimum investment R100,000 · 120-day notice &amp; 15% early exit may apply on voluntary
          products.
        </p>
      </HubUtilityHero>

      <ChatPageClient />

      <HubContentSection alt className="py-8">
        <div className="flex max-w-3xl flex-wrap gap-4 text-sm">
          <Link href="/calculators" prefetch={false} className="font-medium text-samsung-blue hover:text-cinematic-teal">
            All calculators
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
