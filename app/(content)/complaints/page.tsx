import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Complaints Procedure | AS Brokers CC",
  description:
    "How to lodge a complaint with AS Brokers CC. FSCA-compliant complaints procedure. FSP 17273.",
  openGraph: {
    title: "Complaints Procedure | AS Brokers CC",
    description: "Complaints procedure for AS Brokers CC. FSCA compliant. FSP 17273.",
  },
};

export default function ComplaintsPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-cinematic-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Complaints Procedure
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            AS Brokers CC (FSP 17273) is committed to treating complaints fairly and in line with FSCA requirements. If you are not satisfied with our service, please follow the procedure below.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">How to lodge a complaint</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Please contact us in writing (email or post) or by phone. Include your name, contact details, a clear description of the complaint, and any reference numbers or documentation. We will acknowledge your complaint and provide a reference number.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              <strong className="text-zinc-300">Contact:</strong> Use our contact form at the link below, or WhatsApp 067 242 9946. Our compliance officer will respond in line with our internal complaints policy and regulatory timeframes.
            </p>
          </div>
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">What happens next</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We will investigate your complaint and aim to resolve it as quickly as possible. You will receive updates and a final response. If you are not satisfied with our response, you may refer the matter to the FAIS Ombud or the FSCA, as applicable.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-zinc-200">
              Contact us
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
