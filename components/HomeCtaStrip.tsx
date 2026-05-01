import Link from "next/link";

export function HomeCtaStrip() {
  return (
    <section className="relative z-10 py-16 md:py-20 px-4 sm:px-6 md:px-8 border-y border-white/10 bg-gradient-to-b from-cinematic-teal/10 to-transparent">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
          Ready for a conversation?
        </h2>
        <p className="text-gray-400 mb-8 tracking-[0.01em]">
          Book a consultation or reach us on WhatsApp. We respond personally.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-[2rem] hover:bg-zinc-200 hover:scale-[1.03] hover:shadow-cta-glow-gold transition-all duration-500"
          >
            Book a consultation
          </Link>
          <a
            href="https://wa.me/27672429946"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-[2rem] hover:scale-[1.03] transition-all duration-500"
          >
            WhatsApp 067 242 9946
          </a>
        </div>
      </div>
    </section>
  );
}
