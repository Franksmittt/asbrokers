import Link from "next/link";

const TRUST_PARTNERS = [
  { name: "Everest Wealth", abbr: "Everest Wealth" },
  { name: "Santam", abbr: "Santam" },
  { name: "Old Mutual", abbr: "Old Mutual" },
  { name: "Bryte", abbr: "Bryte" },
];

/** Server-rendered hero, no Framer Motion on critical path (Phase 9 LCP). */
export function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center bg-void overflow-hidden pt-24 md:pt-28 pb-16"
      aria-label="Hero"
    >
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-10">
        <p className="trust-hallmark text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.12em]">
          FSP 17273 · Category 1.8 · 25+ Years Experience
        </p>

        <div className="space-y-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.1]">
            You think your retirement is safe.{" "}
            <span className="text-cinematic-teal">The math might disagree.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed tracking-[0.01em]">
            Protecting Your Legacy. Engineering Your Wealth. Discover if your capital will outlive you, and how to fix it if it won&apos;t.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#lab"
            className="bg-white text-black text-lg px-8 py-4 rounded-[2rem] font-semibold hover:shadow-cta-glow-gold transition-shadow duration-300 w-full sm:w-auto text-center"
          >
            Run the Numbers
          </a>
          <Link
            href="#code18"
            className="inline-block rim-light hover:bg-white/10 text-white text-lg px-8 py-4 rounded-[2rem] font-semibold border border-white/10 transition-all duration-300 w-full sm:w-auto text-center"
          >
            Explore Code 1.8 Wealth Engineering
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-12 pt-8 border-t border-white/10">
          <p className="trust-hallmark text-xs text-zinc-400 uppercase tracking-wider w-full sm:w-auto mb-0">
            Trusted partners & product providers
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {TRUST_PARTNERS.map((p) => (
              <span
                key={p.name}
                className="text-sm text-zinc-300 hover:text-white transition-colors font-medium"
                title={p.name}
              >
                {p.abbr}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
