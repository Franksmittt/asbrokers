import Link from "next/link";
import { ChatPageClient } from "@/components/chat/ChatPageClient";
import {
  HubContentSection,
  HubUtilityHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";

const GENERAL_ADVICE_DISCLAIMER =
  "The information provided by this assistant is for general informational purposes only and constitutes factual information as contemplated in Section 1(3)(a) of the Financial Advisory and Intermediary Services Act, 37 of 2002 (FAIS Act). It does not constitute financial, investment, legal, tax, or insurance advice. No recommendation is made regarding the suitability of any financial product for any individual. Personal advice requires a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).";

export default function ChatPage() {
  return (
    <PageWithFooter>
      <HubUtilityHero
        kicker="AS Brokers"
        title="Educational assistant"
        description="Ask about Discovery Health, Gap Cover, estate duty illustrations, or general planning concepts, or leave your details for a callback. Educational only. Not personal financial advice."
      >
        <p className="mt-2 text-xs text-stone-500">
          FSP 17273 · Optional callback with POPIA consent · No product recommendations or yield
          quotations in chat.
        </p>
      </HubUtilityHero>

      <HubContentSection className="border-b border-amber-200/80 bg-amber-50 py-6">
        <div className="max-w-3xl">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-900">
            General information disclaimer
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-950/90">{GENERAL_ADVICE_DISCLAIMER}</p>
        </div>
      </HubContentSection>

      <ChatPageClient />

      <HubContentSection alt className="py-8">
        <div className="flex max-w-3xl flex-wrap gap-4 text-sm">
          <Link
            href="/calculators"
            prefetch={false}
            className="font-medium text-samsung-blue hover:text-cinematic-teal"
          >
            Educational calculators
          </Link>
          <Link
            href="/solutions/discovery-health"
            prefetch={false}
            className="font-medium text-samsung-blue hover:text-cinematic-teal"
          >
            Discovery Health education
          </Link>
          <Link
            href="/investments"
            prefetch={false}
            className="font-medium text-samsung-blue hover:text-cinematic-teal"
          >
            Investments hub
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className="font-medium text-samsung-blue hover:text-cinematic-teal"
          >
            Request a needs analysis
          </Link>
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
