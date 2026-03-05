"use client";

export function TrustBar() {
  const partners = [
    { name: "Santam", abbr: "Santam" },
    { name: "Old Mutual", abbr: "Old Mutual" },
    { name: "Everest Wealth", abbr: "Everest" },
    { name: "Bryte", abbr: "Bryte" },
  ];

  return (
    <section className="relative z-10 py-8 px-6 border-y border-white/5 bg-black/20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-xs font-medium tracking-widest uppercase">Licensed & Authorised</span>
          <span className="text-white font-bold tracking-tight">FSP 17273</span>
        </div>
        <div className="hidden sm:block w-px h-6 bg-white/10" />
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <span className="text-zinc-500 text-xs font-medium tracking-widest uppercase">Recognised partners</span>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {partners.map((p) => (
              <span
                key={p.name}
                className="text-zinc-500 text-sm font-medium hover:text-zinc-400 transition-colors"
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
