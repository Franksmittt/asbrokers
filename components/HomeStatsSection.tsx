export function HomeStatsSection() {
  const stats = [
    { value: "25+", label: "Years experience" },
    { value: "FSP 17273", label: "Authorised provider" },
    { value: "1.8", label: "Shares authority" },
  ];

  return (
    <section className="relative z-10 py-16 md:py-20 px-4 sm:px-6 md:px-8 border-y border-white/5 bg-black/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-zinc-500 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
