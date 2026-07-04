import Link from "next/link";
import {
  WarmPageWithFooter,
  WarmProse,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_H3, WARM_LINK } from "@/lib/warm-theme";

export const metadata = {
  title: "Terms of Use | AS Brokers CC",
  description:
    "Terms of Use for the AS Brokers CC website. FSP 17273. Use of calculators, content and services.",
  openGraph: {
    title: "Terms of Use | AS Brokers CC",
    description: "Terms governing use of the AS Brokers CC website and tools. FSP 17273.",
  },
};

export default function TermsPage() {
  return (
    <WarmPageWithFooter>
      <WarmSimpleHero
        kicker="Legal"
        title="Terms of Use"
        description="These terms govern your use of the AS Brokers CC website and related tools. By using this site you agree to these terms. FSP 17273."
      />

      <WarmSection narrow>
        <WarmProse>
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Use of website and tools</h2>
            <p className={WARM_BODY}>
              The content and calculators on this website are for general information and illustration only. They do
              not constitute financial advice. You should seek advice from an authorised financial adviser before
              making any financial decisions. AS Brokers CC (FSP 17273) provides advice only when you engage our
              services through a formal advisory process.
            </p>
          </div>

          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Accuracy and availability</h2>
            <p className={WARM_BODY}>
              We endeavour to keep the website accurate and up to date but do not warrant that content or tools are
              error-free or suitable for your circumstances. We may change or withdraw content or services without
              notice.
            </p>
          </div>

          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>Intellectual property</h2>
            <p className={WARM_BODY}>
              The content, design and branding on this website are owned by AS Brokers CC or our licensors. You may not
              copy, reproduce or use them for commercial purposes without our written consent.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/contact" prefetch={false} className={WARM_LINK}>
              Contact us →
            </Link>
            <Link href="/" prefetch={false} className={`${WARM_LINK} text-stone-500 hover:text-shark`}>
              Home
            </Link>
          </div>
        </WarmProse>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
