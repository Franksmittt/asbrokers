"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { InsightFeedItem } from "@/lib/insights/feed";
import {
  INSIGHT_CATEGORIES,
  INSIGHT_CATEGORY_LABEL_BY_VALUE,
  UNCATEGORIZED_VALUE,
  type InsightCategoryValue,
} from "@/lib/insights/insightCategories";
import { getAlt } from "@/lib/image-alt";
import {
  WARM_BTN_PRIMARY,
  WARM_BTN_SECONDARY,
  WARM_CARD,
  WARM_EYEBROW,
  WARM_H3,
  WARM_LINK,
  WARM_META,
} from "@/lib/warm-theme";

type DatePreset = "all" | "6m" | "1y" | "custom";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type Props = {
  articles: InsightFeedItem[];
};

export function InsightsFeedFilter({ articles }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const article of articles) {
      const cats = article.categories ?? [];
      if (cats.length === 0) {
        counts.set(UNCATEGORIZED_VALUE, (counts.get(UNCATEGORIZED_VALUE) ?? 0) + 1);
      } else {
        for (const c of cats) {
          counts.set(c, (counts.get(c) ?? 0) + 1);
        }
      }
    }
    return counts;
  }, [articles]);

  const visibleCategories = useMemo(() => {
    type FilterCategory = { value: string; label: string; count: number };
    const list: FilterCategory[] = INSIGHT_CATEGORIES.filter(
      (c) => (categoryCounts.get(c.value) ?? 0) > 0
    ).map((c) => ({
      value: c.value,
      label: c.label,
      count: categoryCounts.get(c.value) ?? 0,
    }));
    if ((categoryCounts.get(UNCATEGORIZED_VALUE) ?? 0) > 0) {
      list.push({
        value: UNCATEGORIZED_VALUE,
        label: "General",
        count: categoryCounts.get(UNCATEGORIZED_VALUE) ?? 0,
      });
    }
    return list;
  }, [categoryCounts]);

  const dateRange = useMemo(() => {
    if (datePreset === "all") return { fromMs: null as number | null, toMs: null as number | null };
    const now = new Date();
    const nowMs = now.getTime();
    if (datePreset === "6m") {
      const from = new Date(now);
      from.setMonth(from.getMonth() - 6);
      return { fromMs: from.getTime(), toMs: nowMs };
    }
    if (datePreset === "1y") {
      const from = new Date(now);
      from.setFullYear(from.getFullYear() - 1);
      return { fromMs: from.getTime(), toMs: nowMs };
    }
    const fromMs = fromDate ? new Date(`${fromDate}T00:00:00`).getTime() : null;
    const customToMs = toDate ? new Date(`${toDate}T23:59:59.999`).getTime() : null;
    return { fromMs, toMs: customToMs };
  }, [datePreset, fromDate, toDate]);

  const filtered = useMemo(() => {
    const { fromMs, toMs } = dateRange;
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

      return true;
    });
  }, [articles, dateRange, selectedCategories]);

  const hasActiveFilters =
    selectedCategories.length > 0 || datePreset !== "all" || Boolean(fromDate) || Boolean(toDate);

  function toggleCategory(value: string) {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function clearAllFilters() {
    setSelectedCategories([]);
    setDatePreset("all");
    setFromDate("");
    setToDate("");
  }

  function selectDatePreset(preset: DatePreset) {
    setDatePreset(preset);
    if (preset !== "custom") {
      setFromDate("");
      setToDate("");
    }
  }

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];
    for (const value of selectedCategories) {
      const label =
        value === UNCATEGORIZED_VALUE
          ? "General"
          : INSIGHT_CATEGORY_LABEL_BY_VALUE[value as InsightCategoryValue] ?? value;
      chips.push({
        key: `cat-${value}`,
        label,
        onRemove: () => setSelectedCategories((prev) => prev.filter((v) => v !== value)),
      });
    }
    if (datePreset === "6m") {
      chips.push({ key: "date-6m", label: "Last 6 months", onRemove: () => selectDatePreset("all") });
    } else if (datePreset === "1y") {
      chips.push({ key: "date-1y", label: "Last 12 months", onRemove: () => selectDatePreset("all") });
    } else if (datePreset === "custom" && (fromDate || toDate)) {
      const label =
        fromDate && toDate
          ? `${formatDateShort(fromDate)} – ${formatDateShort(toDate)}`
          : fromDate
            ? `From ${formatDateShort(fromDate)}`
            : `Until ${formatDateShort(toDate)}`;
      chips.push({
        key: "date-custom",
        label,
        onRemove: () => selectDatePreset("all"),
      });
    }
    return chips;
  }, [selectedCategories, datePreset, fromDate, toDate]);

  return (
    <div className="mt-10">
      {/* Filter toolbar */}
      <div className={`${WARM_CARD} overflow-hidden p-0`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 px-5 py-4 sm:px-6">
          <div>
            <p className={WARM_EYEBROW}>Refine</p>
            <p className={`mt-0.5 text-sm text-stone-600`}>
              {filtered.length} of {articles.length} article{articles.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-shark"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-shark transition hover:bg-stone-50"
              aria-expanded={filtersOpen}
            >
              {filtersOpen ? "Hide filters" : "Show filters"}
            </button>
          </div>
        </div>

        {filtersOpen && (
          <div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
            {visibleCategories.length > 0 && (
              <div>
                <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500`}>Topics</p>
                <div className="relative -mx-1">
                  <div className="flex gap-2 overflow-x-auto pb-1 px-1">
                    {visibleCategories.map((cat) => {
                      const active = selectedCategories.includes(cat.value);
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => toggleCategory(cat.value)}
                          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                            active
                              ? "bg-cinematic-teal/15 text-cinematic-teal ring-1 ring-cinematic-teal/30"
                              : "bg-stone-100 text-stone-700 ring-1 ring-stone-200 hover:bg-stone-200 hover:text-shark"
                          }`}
                        >
                          {cat.label}
                          <span className={`ml-1.5 text-xs ${active ? "text-cinematic-teal/80" : "text-stone-500"}`}>
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Published</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "all" as const, label: "All time" },
                    { id: "6m" as const, label: "Last 6 months" },
                    { id: "1y" as const, label: "Last 12 months" },
                    { id: "custom" as const, label: "Custom range" },
                  ] as const
                ).map((preset) => {
                  const active = datePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => selectDatePreset(preset.id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-samsung-blue text-white shadow-sm"
                          : "bg-stone-100 text-stone-700 ring-1 ring-stone-200 hover:bg-stone-200 hover:text-shark"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {datePreset === "custom" && (
                <div className="mt-4 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
                      From
                    </span>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-shark focus:border-cinematic-teal/50 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/25"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-stone-500">
                      To
                    </span>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-shark focus:border-cinematic-teal/50 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/25"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-stone-200/80 px-5 py-3 sm:px-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Active</span>
            {activeFilterChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 rounded-full bg-cinematic-teal/10 pl-3 pr-2 py-1 text-xs font-medium text-cinematic-teal ring-1 ring-cinematic-teal/20 transition hover:bg-cinematic-teal/20"
              >
                {chip.label}
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cinematic-teal/15 text-[10px] leading-none">
                  ×
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {articles.length === 0 ? (
        <div className={`mt-10 ${WARM_CARD} p-10 text-center md:p-14`}>
          <p className="mx-auto mb-8 max-w-md leading-relaxed text-stone-600">
            Our insight articles and resource hub are coming soon. We&apos;ll share regular updates on estate
            planning, retirement income, and Everest Wealth so you stay ahead.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calculators" prefetch={false} className={WARM_BTN_PRIMARY}>
              Use our calculators
            </Link>
            <Link href="/contact" prefetch={false} className={WARM_BTN_SECONDARY}>
              Get in touch
            </Link>
          </div>
        </div>
      ) : filtered.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((a) => (
            <li key={`${a.id}::${a.slug}::${a.locale}`}>
              <Link
                href={`/insights/${a.slug}?locale=${a.locale}`}
                className={`group flex h-full flex-col overflow-hidden ${WARM_CARD} p-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <img
                    src={a.thumbnailUrl ?? "/images/insights-inset-1x1.jpg"}
                    alt={getAlt(a.thumbnailUrl ?? "/images/insights-inset-1x1.jpg", a.title)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-shark/40 via-transparent to-transparent opacity-60" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <time className={`${WARM_META} font-semibold uppercase tracking-wider`} dateTime={a.publishedAt}>
                      {formatDateShort(a.publishedAt)}
                    </time>
                    {a.source === "studio" && (
                      <span className="rounded-full bg-cinematic-teal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cinematic-teal">
                        New
                      </span>
                    )}
                  </div>
                  <h2 className={`mt-3 ${WARM_H3} leading-snug transition-colors group-hover:text-samsung-blue`}>
                    {a.title}
                  </h2>
                  {a.excerpt && (
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-600">{a.excerpt}</p>
                  )}
                  {(a.categories?.length ?? 0) > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {a.categories.slice(0, 2).map((value) => (
                        <span
                          key={value}
                          className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600 ring-1 ring-stone-200"
                        >
                          {INSIGHT_CATEGORY_LABEL_BY_VALUE[value as InsightCategoryValue] ?? value}
                        </span>
                      ))}
                      {a.categories.length > 2 && (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-stone-500">
                          +{a.categories.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                  <span className={`mt-4 inline-flex items-center text-sm font-semibold ${WARM_LINK}`}>
                    Read article →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`mt-10 ${WARM_CARD} p-10 text-center md:p-12`}>
          <p className="text-lg font-semibold text-shark">No articles match</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-stone-600">
            Try clearing a topic or widening the date range to see more insights.
          </p>
          <button type="button" onClick={clearAllFilters} className={`mt-6 ${WARM_BTN_PRIMARY}`}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
