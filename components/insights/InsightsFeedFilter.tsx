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

const INK = "#1D1D1F";
const BODY = "#2B2B2E";
const TEAL = "#008080";

type DatePreset = "all" | "6m" | "1y" | "custom";

type TopicNavItem =
  | { id: string; label: string; categories: InsightCategoryValue[] }
  | { id: string; label: string; href: string };

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type Props = {
  articles: InsightFeedItem[];
  topicNav?: readonly TopicNavItem[];
  activeTopicId?: string | null;
  onClearTopic?: () => void;
};

export function InsightsFeedFilter({
  articles,
  topicNav = [],
  activeTopicId = null,
  onClearTopic,
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const topicCategories = useMemo(() => {
    if (!activeTopicId) return [] as string[];
    const topic = topicNav.find((t) => t.id === activeTopicId);
    if (!topic || !("categories" in topic)) return [];
    return topic.categories;
  }, [activeTopicId, topicNav]);

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
    const topicSet = new Set(topicCategories);

    return articles.filter((a) => {
      const publishedMs = new Date(a.publishedAt).getTime();
      if (fromMs != null && Number.isFinite(fromMs) && publishedMs < fromMs) return false;
      if (toMs != null && Number.isFinite(toMs) && publishedMs > toMs) return false;

      if (topicSet.size > 0) {
        const itemCategories = a.categories ?? [];
        if (itemCategories.length === 0) return false;
        if (!itemCategories.some((c) => topicSet.has(c))) return false;
      }

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
  }, [articles, dateRange, selectedCategories, topicCategories]);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    datePreset !== "all" ||
    Boolean(fromDate) ||
    Boolean(toDate) ||
    topicCategories.length > 0;

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
    onClearTopic?.();
  }

  function selectDatePreset(preset: DatePreset) {
    setDatePreset(preset);
    if (preset !== "custom") {
      setFromDate("");
      setToDate("");
    }
  }

  const activeTopicLabel = topicNav.find((t) => t.id === activeTopicId)?.label;

  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/90">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 px-5 py-4 sm:px-6">
          <div>
            <p
              className="font-semibold uppercase tracking-[0.16em]"
              style={{ fontSize: "0.6875rem", color: TEAL }}
            >
              Refine
            </p>
            <p className="mt-0.5 text-sm font-medium" style={{ color: BODY }}>
              {filtered.length} of {articles.length} article{articles.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
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
              {filtersOpen ? "Hide filters" : "More filters"}
            </button>
          </div>
        </div>

        {activeTopicLabel ? (
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-200/80 px-5 py-3 sm:px-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Topic</span>
            <button
              type="button"
              onClick={() => onClearTopic?.()}
              className="inline-flex items-center gap-1.5 rounded-full bg-cinematic-teal/10 pl-3 pr-2 py-1 text-xs font-semibold text-cinematic-teal ring-1 ring-cinematic-teal/20"
            >
              {activeTopicLabel}
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cinematic-teal/15 text-[10px]">
                ×
              </span>
            </button>
          </div>
        ) : null}

        {filtersOpen && (
          <div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
            {visibleCategories.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
                  Topics
                </p>
                <div className="relative -mx-1">
                  <div className="flex gap-2 overflow-x-auto pb-1 px-1">
                    {visibleCategories.map((cat) => {
                      const active = selectedCategories.includes(cat.value);
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => toggleCategory(cat.value)}
                          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                            active
                              ? "bg-cinematic-teal/15 text-cinematic-teal ring-1 ring-cinematic-teal/30"
                              : "bg-stone-100 text-stone-800 ring-1 ring-stone-200 hover:bg-stone-200"
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">Published</p>
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
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        active
                          ? "bg-samsung-blue text-white shadow-sm"
                          : "bg-stone-100 text-stone-800 ring-1 ring-stone-200 hover:bg-stone-200"
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
                    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-stone-600">
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
                    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-stone-600">
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
      </div>

      {articles.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white p-10 text-center ring-1 ring-stone-200/90 md:p-14">
          <p
            className="mx-auto mb-8 max-w-md leading-relaxed"
            style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
          >
            Our insight articles and resource hub are coming soon. We&apos;ll share regular updates on estate
            planning, retirement income, and Everest Wealth so you stay ahead.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/calculators"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3 font-semibold text-white shadow-md shadow-samsung-blue/20 hover:bg-[#004a9e]"
            >
              Use our calculators
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3 font-semibold text-shark ring-1 ring-stone-200 hover:bg-stone-200"
            >
              Get in touch
            </Link>
          </div>
        </div>
      ) : filtered.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 md:gap-8">
          {filtered.map((a) => (
            <li key={`${a.id}::${a.slug}::${a.locale}`}>
              <Link
                href={`/insights/${a.slug}?locale=${a.locale}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(29,29,31,0.07)] ring-1 ring-stone-200/90 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,128,128,0.1)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <img
                    src={a.thumbnailUrl ?? "/images/insights-inset-1x1.jpg"}
                    alt={getAlt(a.thumbnailUrl ?? "/images/insights-inset-1x1.jpg", a.title)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <time
                      className="text-xs font-semibold uppercase tracking-wider text-stone-600"
                      dateTime={a.publishedAt}
                    >
                      {formatDateShort(a.publishedAt)}
                    </time>
                    {a.source === "studio" && (
                      <span className="rounded-full bg-cinematic-teal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cinematic-teal">
                        New
                      </span>
                    )}
                  </div>
                  <h3
                    className="mt-3 font-bold leading-snug tracking-tight transition-colors group-hover:text-samsung-blue"
                    style={{ fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", color: INK }}
                  >
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p
                      className="mt-2 line-clamp-3 flex-1 leading-relaxed"
                      style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
                    >
                      {a.excerpt}
                    </p>
                  )}
                  {(a.categories?.length ?? 0) > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {a.categories.slice(0, 2).map((value) => (
                        <span
                          key={value}
                          className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-700 ring-1 ring-stone-200"
                        >
                          {INSIGHT_CATEGORY_LABEL_BY_VALUE[value as InsightCategoryValue] ?? value}
                        </span>
                      ))}
                      {a.categories.length > 2 && (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                          +{a.categories.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-samsung-blue group-hover:text-cinematic-teal"
                  >
                    Read article
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl bg-white p-10 text-center ring-1 ring-stone-200/90 md:p-12">
          <p className="text-lg font-bold" style={{ color: INK }}>
            No articles match
          </p>
          <p
            className="mx-auto mt-2 max-w-sm"
            style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
          >
            Try clearing a topic or widening the date range to see more insights.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3 font-semibold text-white shadow-md hover:bg-[#004a9e]"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
