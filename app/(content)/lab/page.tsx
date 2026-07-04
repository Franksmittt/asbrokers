import Link from "next/link";
import { RunOutCalculator } from "@/components/RunOutCalculator";
import { WarmHero, WarmPageWithFooter, WarmSection } from "@/components/warm/WarmShell";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_H3, WARM_LINK } from "@/lib/warm-theme";

const tools = [
  { name: "Retirement run-out", desc: "When does your money run out?", href: "#calculator" },
  { name: "Retirement Reality Calculator", desc: "How much capital do you really need?", href: "/retirement" },
  { name: "Life cover needs", desc: "Rough estimate of cover needed", href: "/contact" },
  { name: "Estate liquidity", desc: "Estate duty and liquidity check", href: "/contact" },
];

export default function LabPage() {
  const heroImage = getPrimaryPageImage("/lab") ?? "/images/lab-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <WarmHero
        kicker="Calculators"
        title="The Lab"
        description="10+ free calculators for retirement, investment and risk. So you know where you stand."
        imageSrc={heroImage}
        maxWidth="4xl"
      >
        <p className="mt-4 text-sm text-white/80">
          Prefer the curated hub?{" "}
          <Link href="/calculators" prefetch={false} className="font-medium text-cinematic-teal hover:underline">
            Browse all calculators
          </Link>
        </p>
      </WarmHero>

      <WarmSection>
        <div id="calculator" className="scroll-mt-24">
        <div className="mb-12">
          <h2 className={WARM_H2}>The &quot;Run-Out&quot; Calculator</h2>
          <p className={`mt-2 max-w-3xl ${WARM_BODY}`}>
            Adjust the sliders to see when your capital might face the &quot;cliff&quot; based on current withdrawal rates.
          </p>
        </div>
        <div className={`${WARM_CARD} overflow-hidden p-0`}>
          <RunOutCalculator />
        </div>
        </div>
      </WarmSection>

      <WarmSection alt className="pb-32">
        <h2 className={`${WARM_H2} mb-6`}>More tools</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.name} href={t.href} className={`${WARM_CARD} block transition-colors hover:ring-stone-300`}>
              <h3 className={WARM_H3}>{t.name}</h3>
              <p className={`mt-1 text-sm text-stone-500`}>{t.desc}</p>
            </Link>
          ))}
        </div>
        <p className={`mt-8 text-sm text-stone-500`}>
          More calculators coming. Need something specific?{" "}
          <Link href="/contact" className={WARM_LINK}>
            Contact us
          </Link>
          .
        </p>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
