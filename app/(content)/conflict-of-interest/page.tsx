import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Conflict of Interest | AS Brokers CC",
  description:
    "AS Brokers CC conflict of interest policy. How we manage conflicts in the interest of our clients. FSP 17273.",
  openGraph: {
    title: "Conflict of Interest | AS Brokers CC",
    description: "Conflict of interest policy. FSCA-compliant. FSP 17273.",
  },
};

export default function ConflictOfInterestPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-cinematic-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Conflict of Interest
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            AS Brokers CC (FSP 17273) maintains a conflict of interest policy in line with FAIS and FSCA requirements. We are committed to acting in our clients’ best interests and to identifying, disclosing and managing any conflicts.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Our approach</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We are an independent financial services provider and are not tied to a single product house. Our advice is based on your needs and objectives. We distribute products from multiple providers, including Everest Wealth Management (FSP 795), and receive remuneration in line with regulatory disclosure requirements. We identify and manage potential conflicts through our internal policies, training and compliance oversight.
            </p>
          </div>
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Disclosure</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Where a conflict or potential conflict arises that could affect the service we provide to you, we will disclose it and take steps to manage it in your best interest. You may request a copy of our full conflict of interest policy by contacting us.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" prefetch={false} className="text-cinematic-teal hover:text-teal-300 font-medium">
              Contact us →
            </Link>
            <Link href="/" prefetch={false} className="text-zinc-400 hover:text-white font-medium">
              Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
