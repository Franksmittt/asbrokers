import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX, PageMediaStrip } from "@/components/PageMediaStrip";
export const metadata = {
  title: "About AS Brokers CC | Your Trusted Financial Partner | FSP 17273",
  description: "Learn more about AS Brokers CC, an Authorised Financial Services Provider (FSP 17273, Category 1.8) dedicated to delivering structured financial advice and services to clients in Krugersdorp and the West Rand.",
  openGraph: { title: 'About AS Brokers CC | Your Trusted Financial Partner | FSP 17273', description: 'Learn more about AS Brokers CC, an Authorised Financial Services Provider (FSP 17273, Category 1.8) dedicated to delivering structured financial advice and services to clients in Krugersdorp and the West Rand.', url: 'https://www.asbrokers.co.za/about', images: ['https://www.asbrokers.co.za/opengraph-image.jpg'], locale: 'en_ZA' },
  alternates: { canonical: 'https://www.asbrokers.co.za/about' },
};
export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"description\": \"Learn more about AS Brokers CC, an Authorised Financial Services Provider (FSP 17273, Category 1.8) dedicated to delivering structured financial advice and services to clients in Krugersdorp and the West Rand.\", \"@context\": \"https://schema.org\", \"name\": \"About AS Brokers CC | Your Trusted Financial Partner | FSP 17273\", \"@type\": \"WebPage\", \"url\": \"https://www.asbrokers.co.za/about\"}" }} />
      <section className="pt-28 pb-12">
        <div className={PAGE_CONTENT_MAX}>
          <div className="max-w-4xl">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">About us</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Independent Financial Advisor Krugersdorp
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              AS Brokers CC is an independent, authorised financial services provider based in Krugersdorp, East Rand, Gauteng. We hold FSP 17273 and a Category 1.8 (Securities and Instruments: Shares) license, enabling us to advise on and distribute unlisted alternative investments, including Everest Wealth products, alongside retirement planning, insurance, and estate structuring.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/how-we-work"
                prefetch={false}
                className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-zinc-200"
              >
                See how we work
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <PageMediaStrip
              variant="primary"
              src="/images/about-krugersdorp-trust-16x9.jpg"
              alt="Local West Rand IFA office exterior or empty client meeting room, no people"
              priority
              rounded="3xl"
            />
          </div>
        </div>
      </section>
      <section className="py-16 border-t border-white/5">
        <div className={PAGE_CONTENT_MAX}>
          <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6">Why an independent advisor in Krugersdorp</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We are not tied to a single product house. Our advice is built around your goals: retirement income, estate duty mitigation, business continuity, and tax-efficient structures. As a Code 1.8 FSP broker, we can offer Everest Wealth fixed-return and living annuity solutions that many advisers cannot distribute.
          </p>
          <div className="my-10">
            <PageMediaStrip
              variant="secondary"
              src="/images/about-fiduciary-plaque-4x3.jpg"
              alt="FAIS compliance binders and blurred business cards on adviser desk, no readable licence text, no people"
              rounded="3xl"
            />
          </div>
          <p className="text-zinc-500 text-sm">
            FSP 17273 · Krugersdorp, East Rand, Gauteng · Est. 1998 · 25+ years experience
          </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
