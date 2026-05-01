import Link from "next/link";
import { Footer } from "@/components/Footer";

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
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-cinematic-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Terms of Use
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            These terms govern your use of the AS Brokers CC website and related tools. By using this site you agree to these terms. FSP 17273.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Use of website and tools</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              The content and calculators on this website are for general information and illustration only. They do not constitute financial advice. You should seek advice from an authorised financial adviser before making any financial decisions. AS Brokers CC (FSP 17273) provides advice only when you engage our services through a formal advisory process.
            </p>
          </div>
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Accuracy and availability</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We endeavour to keep the website accurate and up to date but do not warrant that content or tools are error-free or suitable for your circumstances. We may change or withdraw content or services without notice.
            </p>
          </div>
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Intellectual property</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              The content, design and branding on this website are owned by AS Brokers CC or our licensors. You may not copy, reproduce or use them for commercial purposes without our written consent.
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
