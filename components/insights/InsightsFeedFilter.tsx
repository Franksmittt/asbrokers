"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { InsightFeedItem } from "@/lib/insights/feed";
import {
  INSIGHT_CATEGORIES,
  UNCATEGORIZED_VALUE,
} from "@/lib/insights/insightCategories";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Props = {
  articles: InsightFeedItem[];
};

export function InsightsFeedFilter({ articles }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const filtered = useMemo(() => {
    const fromMs = fromDate ? new Date(`${fromDate}T00:00:00`).getTime() : null;
    const toMs = toDate ? new Date(`${toDate}T23:59:59.999`).getTime() : null;

    const selected = new Set(selectedCategories);
    const selectedCategoryValues = selectedCategories.filter((c) => c !== UNCATEGORIZED_VALUE);

    return articles.filter((a) => {
      const publishedMs = new Date(a.publishedAt).getTime();
      if (fromMs != null && Number.isFinite(fromMs) && publishedMs < fromMs) return false;
      if (toMs != null && Number.isFinite(toMs) && publishedMs > toMs) return false;

      if (selected.size > 0) {
        const itemCategories = a.categories ?? [];
        const hasUncategorized = itemCategories.length === 0;
        const wantsUncategorized = selected.has(UNCATEGORIZED_VALUE);
        if (wantsUncategorized && hasUncategorized) return true;

        if (selectedCategoryValues.length === 0) return false;
        return selectedCategoryValues.some((c) => itemCategories.includes(c));
      }

      // No category filter selected.
      return true;
    });
  }, [articles, fromDate, selectedCategories, toDate]);

  const categoryOptions = useMemo(() => {
    const uncategorizedLabel = "Uncategorized";
    return [
      ...INSIGHT_CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
      { value: UNCATEGORIZED_VALUE, label: uncategorizedLabel },
    ];
  }, []);

  function toggleCategory(value: string) {
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  return (
    <div className="mt-8">
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-6 rounded-2xl bg-[#151518] border border-white/10 p-4 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400/90">Filter by category</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3">
            {categoryOptions.map((opt) => {
              const checked = selectedCategories.includes(opt.value);
              return (
                <label key={opt.value} className="inline-flex items-center gap-2 text-sm text-zinc-300">
                  <input type="checkbox" checked={checked} onChange={() => toggleCategory(opt.value)} />
                  <span className="select-none">{opt.label}</span>
                </label>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setSelectedCategories([])}
            className="mt-4 text-xs font-semibold text-teal-400 hover:text-teal-300"
          >
            Clear categories
          </button>
        </div>

        <div className="lg:col-span-6 rounded-2xl bg-[#151518] border border-white/10 p-4 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400/90">Filter by date</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full mt-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full mt-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}
            className="mt-4 text-xs font-semibold text-teal-400 hover:text-teal-300"
          >
            Clear dates
          </button>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl bg-[#151518] border border-white/10 p-8 md:p-12 text-center">
          <p className="text-zinc-400 mb-6">
            Our insight articles and resource hub are coming soon. We&apos;ll share regular updates on SA budget impact, estate planning,
            retirement income, and Everest Wealth so you stay ahead.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/calculators"
              prefetch={false}
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
            >
              Use our calculators
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      ) : filtered.length > 0 ? (
        <div className="rounded-2xl bg-[#151518] border border-white/10 p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-zinc-500">
              Showing <span className="text-zinc-200 font-semibold">{filtered.length}</span> article{filtered.length === 1 ? "" : "s"}
            </p>
            {(selectedCategories.length > 0 || fromDate || toDate) && (
              <p className="text-xs text-zinc-500">
                Filtered
              </p>
            )}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <li key={`${a.id}::${a.slug}::${a.locale}`}>
                <Link
                  href={`/insights/${a.slug}?locale=${a.locale}`}
                  className="group block h-full overflow-hidden rounded-2xl bg-[#151518] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                    <img
                      src={a.thumbnailUrl ?? "/images/insights-inset-1x1.jpg"}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <time className="text-xs text-zinc-500 uppercase tracking-wider" dateTime={a.publishedAt}>
                        {formatDate(a.publishedAt)}
                      </time>
                      {a.source === "studio" && (
                        <span className="text-[10px] uppercase tracking-wider text-teal-500/90 shrink-0">Studio</span>
                      )}
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-white leading-snug">{a.title}</h2>
                    {a.excerpt && <p className="mt-2 text-zinc-400 line-clamp-3 text-sm">{a.excerpt}</p>}
                    <p className="mt-3 text-xs uppercase tracking-wider text-zinc-500">By {a.author}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#151518] border border-white/10 p-8 md:p-12 text-center">
          <p className="text-zinc-400 mb-6">No articles match your current filters.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategories([]);
              setFromDate("");
              setToDate("");
            }}
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

