import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | AS Brokers CC",
  description:
    "Privacy Policy for AS Brokers CC. How we collect, use and protect your personal information in line with POPIA. FSP 17273.",
  openGraph: {
    title: "Privacy Policy | AS Brokers CC",
    description: "How AS Brokers CC handles your personal information. POPIA compliant. FSP 17273.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-cinematic-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            AS Brokers CC (FSP 17273) is committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA) and applicable data protection laws.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Information we collect</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We may collect and process personal information you provide when you contact us, complete forms on our website, use our calculators, or engage our services. This may include your name, contact details, financial information, and identification details where required for regulatory or product purposes.
            </p>
          </div>
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">How we use your information</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We use your information to provide financial advice and services, to comply with legal and regulatory obligations (including FAIS and FSCA requirements), to communicate with you, and to improve our services. We do not sell your personal information to third parties.
            </p>
          </div>
          <div className="rounded-2xl bg-[#151518] border border-white/10 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Your rights</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              You have the right to access, correct, or delete your personal information, and to object to or restrict certain processing. To exercise these rights or for any privacy-related queries, please contact us.
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
