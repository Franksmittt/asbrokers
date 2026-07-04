import Link from "next/link";
import { ChatPageClient } from "@/components/chat/ChatPageClient";
import { WarmPageWithFooter, WarmSection, WarmSimpleHero } from "@/components/warm/WarmShell";
import { WARM_LINK, WARM_WRAP } from "@/lib/warm-theme";

export default function ChatPage() {
  return (
    <WarmPageWithFooter>
      <WarmSimpleHero
        kicker="AS Brokers"
        title="Digital Wealth Assistant"
        description="Ask about estate duty, Everest 12.8% Strategic Income, or Amethyst Living Annuity. Calculations use deterministic SA tax and product rules. Not financial advice."
      >
        <p className="mt-2 text-xs text-stone-500">
          FSP 17273 · Minimum investment R100,000 · 120-day notice &amp; 15% early exit may apply on voluntary
          products.
        </p>
      </WarmSimpleHero>

      <ChatPageClient />

      <WarmSection alt className="py-8">
        <div className={`${WARM_WRAP} max-w-3xl flex flex-wrap gap-4 text-sm`}>
          <Link href="/calculators" prefetch={false} className={WARM_LINK}>
            All calculators
          </Link>
          <Link href="/everest-wealth" prefetch={false} className={WARM_LINK}>
            Everest Wealth
          </Link>
          <Link href="/contact" prefetch={false} className={WARM_LINK}>
            Contact AS Brokers
          </Link>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
