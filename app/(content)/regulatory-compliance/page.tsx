import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  openGraph: { title: 'Regulatory Compliance | AS Brokers CC FSP 17273 | Authorised Financial Services Provider', description: 'AS Brokers CC operates as an Authorised Financial Services Provider (FSP 17273, Category 1.8) in strict adherence to South African financial regulations, ensuring transparent and ethical service delivery.', url: 'https://www.asbrokers.co.za/regulatory-compliance', images: ['https://www.asbrokers.co.za/opengraph-image.jpg'], locale: 'en_ZA' },
  alternates: { canonical: 'https://www.asbrokers.co.za/regulatory-compliance' },
  title: "Regulatory Compliance | AS Brokers CC FSP 17273 | Authorised Financial Services Provider",
  description: "AS Brokers CC operates as an Authorised Financial Services Provider (FSP 17273, Category 1.8) in strict adherence to South African financial regulations, ensuring transparent and ethical service delivery.",
};

export default function RegulatoryCompliancePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"description\": \"AS Brokers CC operates as an Authorised Financial Services Provider (FSP 17273, Category 1.8) in strict adherence to South African financial regulations, ensuring transparent and ethical service delivery.\", \"@context\": \"https://schema.org\", \"name\": \"Regulatory Compliance | AS Brokers CC FSP 17273 | Authorised Financial Services Provider\", \"@type\": \"WebPage\", \"url\": \"https://www.asbrokers.co.za/regulatory-compliance\"}" }} />
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Compliance</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Code 1.8 FSP License Broker
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            AS Brokers CC operates under the Financial Sector Conduct Authority (FSCA) as an independent authorised financial services provider. Our specific license category 1.8 (Securities and Instruments: Shares) permits us to advise on and intermediate unlisted shares, a capability that standard Category I or II brokers often do not hold.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">What Category 1.8 means</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              The FSCA designates Category 1.8 for &quot;Securities and Instruments: Shares&quot;. This classification requires meeting experience and qualification standards and allows the holder to distribute unlisted preference shares and related alternative investment products. Everest Wealth Management (FSP 795) structures such products; AS Brokers CC (FSP 17273) is authorised to advise on and distribute them to qualifying clients.
            </p>
            <p className="text-zinc-500 text-sm">
              This capacity is central to our offering: fixed-return and living annuity solutions that fall outside traditional unit trust or life assurance wrappers.
            </p>
          </div>
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Regulatory identifiers</h2>
            <ul className="text-zinc-400 space-y-2 text-sm">
              <li><strong className="text-zinc-300">AS Brokers CC</strong>: FSP 17273 · Category 1.8</li>
              <li><strong className="text-zinc-300">Everest Wealth Management</strong>: FSP 795 · Category I, II & IIA</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/everest-wealth" prefetch={false} className="text-blue-400 hover:text-blue-300 font-medium">
              Everest Wealth products →
            </Link>
            <Link href="/contact" prefetch={false} className="text-blue-400 hover:text-blue-300 font-medium">
              Contact us →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
