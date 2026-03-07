export function HomeStatsSection() {
  const stats = [
    { value: "25+", label: "Years experience" },
    { value: "FSP 17273", label: "Authorised provider" },
    { value: "1.8", label: "Shares authority" },
  ];

  return (
    <section className="relative z-10 py-16 md:py-20 px-4 sm:px-6 md:px-8 border-y border-white/10 bg-shark/60 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="trust-hallmark text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm font-semibold uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
