"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "retirement", label: "Private Wealth & Yield" },
  { id: "insurance", label: "Risk Architecture" },
  { id: "medical", label: "Health & Integration" },
  { id: "estate", label: "Legacy Structuring" },
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
      className="sticky top-[72px] z-40 -mx-4 border-b border-stone-200/80 bg-warm-canvas/95 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 md:-mx-8 md:px-8"
      aria-label="Solutions sections"
    >
      <div className="mx-auto flex max-w-6xl flex-nowrap items-center gap-2 overflow-x-auto scroll-smooth sm:flex-wrap no-scrollbar">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeId === s.id
                ? "bg-samsung-blue text-white shadow-sm"
                : "text-stone-600 hover:bg-stone-100 hover:text-shark"
            }`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
