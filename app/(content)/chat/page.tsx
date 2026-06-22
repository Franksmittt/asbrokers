import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ChatPageClient } from "@/components/chat/ChatPageClient";

export default function ChatPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-[100dvh] flex flex-col">
      <section className="pt-28 pb-6 px-4 sm:px-6 md:px-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">AS Brokers</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Digital Wealth Assistant
          </h1>
          <p className="text-zinc-400 text-sm">
            Ask about estate duty, Everest 12.8% Strategic Income, or Amethyst Living Annuity. Calculations use
            deterministic SA tax and product rules. Not financial advice.
          </p>
          <p className="text-zinc-500 text-xs mt-2">
            FSP 17273 · Minimum investment R100,000 · 120-day notice &amp; 15% early exit may apply on voluntary
            products.
          </p>
        </div>
      </section>

      <ChatPageClient />

      <section className="border-t border-white/10 py-6 px-4 sm:px-6 md:px-8 shrink-0">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-4 text-sm">
          <Link href="/calculators" prefetch={false} className="text-blue-400 hover:underline">
            All calculators
          </Link>
          <Link href="/everest-wealth" prefetch={false} className="text-blue-400 hover:underline">
            Everest Wealth
          </Link>
          <Link href="/contact" prefetch={false} className="text-blue-400 hover:underline">
            Contact AS Brokers
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
