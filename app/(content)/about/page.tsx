import Image from "next/image";
import {
  WarmHero,
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmProse,
  WarmSecondaryLink,
  WarmSection,
} from "@/components/warm/WarmShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getAlt } from "@/lib/image-alt";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_H2, WARM_MEDIA_FRAME, WARM_META } from "@/lib/warm-theme";

const HERO_IMAGE = "/images/about-krugersdorp-trust-16x9.jpg";

export const metadata = buildPageMetadata({
  path: "/about",
  title: "About AS Brokers CC | Your Trusted Financial Partner",
  description:
    "Learn about AS Brokers CC, an Authorised Financial Services Provider (FSP 17273, Category 1.8) delivering structured financial advice in Krugersdorp and the West Rand.",
});

export default function AboutPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path="/about"
        webPage={{
          name: "About AS Brokers CC | Your Trusted Financial Partner | FSP 17273",
          description:
            "Learn more about AS Brokers CC, an Authorised Financial Services Provider (FSP 17273, Category 1.8) dedicated to delivering structured financial advice in Krugersdorp and the West Rand.",
        }}
      />

      <WarmHero
        kicker="About us"
        title="Independent Financial Advisor Krugersdorp"
        description="AS Brokers CC is an independent, authorised financial services provider based in Krugersdorp, West Rand, Gauteng. We hold FSP 17273 and a Category 1.8 (Securities and Instruments: Shares) license, enabling us to advise on and distribute unlisted alternative investments, including Everest Wealth products, alongside retirement planning, insurance, and estate structuring."
        imageSrc={HERO_IMAGE}
        imageAlt={getAlt(HERO_IMAGE, "AS Brokers independent financial advisers in Krugersdorp")}
        priority
        maxWidth="4xl"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <WarmPrimaryLink href="/how-we-work">See how we work</WarmPrimaryLink>
          <WarmSecondaryLink href="/contact">Contact us</WarmSecondaryLink>
        </div>
      </WarmHero>

      <WarmSection narrow alt>
        <WarmProse>
          <h2 className={WARM_H2}>Why an independent advisor in Krugersdorp</h2>
          <p className={WARM_BODY}>
            We are not tied to a single product house. Our advice is built around your goals: retirement income, estate
            duty mitigation, business continuity, and tax-efficient structures. As a Code 1.8 FSP broker, we can offer
            Everest Wealth structured return and living annuity solutions that many advisers cannot distribute.
          </p>

          <div className={`${WARM_MEDIA_FRAME} aspect-[4/3]`}>
            <Image
              src="/images/about-fiduciary-plaque-4x3.jpg"
              alt={getAlt("/images/about-fiduciary-plaque-4x3.jpg", "Fiduciary trust and regulatory compliance")}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          <p className={WARM_META}>FSP 17273 · Krugersdorp, West Rand, Gauteng · Est. 1998 · 25+ years experience</p>
        </WarmProse>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
