"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "retirement", label: "Retirement & Investment" },
  { id: "insurance", label: "Insurance & Risk" },
  { id: "medical", label: "Medical & Wellness" },
  { id: "estate", label: "Estate & Structuring" },
];

export function SolutionsSectionNav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          if (sections.some((s) => s.id === id)) setActiveId(id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky top-[72px] z-40 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-3 bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/5"
      aria-label="Solutions sections"
    >
      <div className="max-w-6xl mx-auto flex overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap items-center gap-2 scroll-smooth">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeId === s.id
                ? "bg-white text-black"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
