"use client";

export function TrustBar() {
  const partners = [
    { name: "Santam", abbr: "Santam" },
    { name: "Old Mutual", abbr: "Old Mutual" },
    { name: "Everest Wealth", abbr: "Everest" },
    { name: "Bryte", abbr: "Bryte" },
  ];

  return (
    <section className="relative z-10 py-8 px-6 border-y border-white/10 bg-shark/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em]">Licensed & Authorised</span>
          <span className="trust-hallmark text-lg font-bold">FSP 17273</span>
        </div>
        <div className="hidden sm:block w-px h-6 bg-white/10" />
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.2em]">Recognised partners</span>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {partners.map((p) => (
              <span
                key={p.name}
                className="text-gray-500 text-sm font-medium hover:text-gray-400 transition-colors duration-300"
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
