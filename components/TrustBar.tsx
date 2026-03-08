"use client";

export function TrustBar() {
  const partners = [
    { name: "Santam", abbr: "Santam" },
    { name: "Old Mutual", abbr: "Old Mutual" },
    { name: "Everest Wealth", abbr: "Everest" },
    { name: "Bryte", abbr: "Bryte" },
  ];

  const badges = [
    { label: "FSP 17273", highlight: true },
    { label: "Category 1.8", sub: "Securities & instruments" },
    { label: "25+ Years", sub: "Experience" },
    { label: "Est. 1998", sub: null },
  ];

  return (
    <section
      className="relative z-10 py-10 sm:py-12 px-4 sm:px-6 border-y border-white/10 bg-shark/90 backdrop-blur-2xl"
      aria-label="Trust and authority"
    >
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Regulatory badges — engraved pill style */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          {badges.map((b) => (
            <div
              key={b.label}
              className={`
                inline-flex flex-col items-center justify-center min-w-[7rem] sm:min-w-[8rem] py-3 px-4 rounded-2xl
                bg-white/[0.06] border border-white/10
                shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]
              `}
            >
              <span
                className={`trust-hallmark text-center font-bold tracking-wide ${
                  b.highlight ? "text-base sm:text-lg text-white" : "text-sm text-zinc-300"
                }`}
              >
                {b.label}
              </span>
              {b.sub && (
                <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider mt-0.5">
                  {b.sub}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Partners — clean label + names */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <span className="text-zinc-500 text-[10px] font-semibold uppercase tracking-[0.2em]">
            Recognised partners
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            {partners.map((p, i) => (
              <span key={p.name} className="flex items-center gap-x-4 sm:gap-x-6">
                <span
                  className="text-zinc-400 text-sm font-medium hover:text-zinc-200 transition-colors duration-300"
                  title={p.name}
                >
                  {p.abbr}
                </span>
                {i < partners.length - 1 && (
                  <span className="w-px h-3.5 bg-white/15 flex-shrink-0" aria-hidden />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
