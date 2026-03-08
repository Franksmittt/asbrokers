"use client";

import { useState } from "react";

export type TabSlot = { id: string; label: string; content: React.ReactNode };

export function CrmDetailTabs({ tabs }: { tabs: TabSlot[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 border-b border-white/10 pb-2">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveId(id)}
            className={`px-3 py-2 rounded-t-xl text-sm font-medium transition-colors ${
              activeId === id
                ? "bg-white/10 text-white"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {active?.content}
    </div>
  );
}
