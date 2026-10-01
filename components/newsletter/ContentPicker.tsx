"use client";

import { useMemo, useState } from "react";

import type { ContentPickItem } from "@/lib/newsletter/content-types";
import { filterContentItems } from "@/lib/newsletter/content-types";

type ContentPickerProps = {
  label: string;
  hint?: string;
  items: ContentPickItem[];
  valueHref: string;
  valueLabel?: string;
  onSelect: (item: ContentPickItem | null) => void;
  allowClear?: boolean;
  emptyLabel?: string;
};

export function ContentPicker({
  label,
  hint,
  items,
  valueHref,
  valueLabel,
  onSelect,
  allowClear = true,
  emptyLabel = "Select…",
}: ContentPickerProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => filterContentItems(items, query), [items, query]);
  const selected = items.find((item) => item.href === valueHref);

  return (
    <div className="relative">
      <div className="mb-1 flex items-center justify-between gap-2">
        <label className="block text-xs font-medium text-zinc-400">{label}</label>
        {allowClear && valueHref ? (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-[10px] text-zinc-500 hover:text-zinc-300"
          >
            Clear
          </button>
        ) : null}
      </div>
      {hint ? <p className="mb-1 text-[11px] text-zinc-600">{hint}</p> : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-left text-sm text-white"
      >
        <span className="truncate">
          {selected?.label || valueLabel || valueHref || emptyLabel}
        </span>
        <span className="ml-2 shrink-0 text-zinc-500">{open ? "▲" : "▼"}</span>
      </button>

      {valueHref ? (
        <p className="mt-1 truncate text-[11px] text-zinc-600">{valueHref}</p>
      ) : null}

      {open ? (
        <div className="absolute z-30 mt-1 max-h-64 w-full overflow-hidden rounded-md border border-[#2a2a2a] bg-[#111] shadow-xl">
          <div className="border-b border-[#2a2a2a] p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded border border-[#2a2a2a] bg-black px-2 py-1.5 text-xs text-white placeholder:text-zinc-600"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-xs text-zinc-500">No matches</li>
            ) : (
              filtered.map((item) => (
                <li key={`${item.kind}-${item.id}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(item);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full flex-col gap-0.5 px-3 py-2 text-left hover:bg-white/5"
                  >
                    <span className="text-sm text-white">{item.label}</span>
                    <span className="truncate text-[11px] text-zinc-500">
                      {item.kind} · {item.href}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
