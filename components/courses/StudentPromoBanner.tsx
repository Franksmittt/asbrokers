"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { StudentPromoSlide } from "@/lib/courses/types";

/** Thin rotating promo strip for Albert’s service offers on the student dashboard. */
export function StudentPromoBanner({ slides }: { slides: StudentPromoSlide[] }) {
  const enabled = slides.filter((slide) => slide.enabled);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (enabled.length <= 1) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % enabled.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [enabled.length]);

  if (enabled.length === 0) return null;
  const slide = enabled[index] ?? enabled[0]!;

  return (
    <section
      aria-label="From AS Brokers"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B3B6E] via-[#0057B8] to-[#0B7A78] px-5 py-4 text-white shadow-md sm:px-6"
    >
      <div key={slide.id} className="transition-opacity duration-500 motion-reduce:transition-none">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
          From AS Brokers
        </p>
        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-base font-semibold sm:text-lg">{slide.title}</p>
            <p className="mt-1 max-w-2xl text-sm text-white/85">{slide.body}</p>
          </div>
          <Link
            href={slide.ctaHref}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0057B8] transition hover:bg-white/90"
          >
            {slide.ctaLabel}
          </Link>
        </div>
      </div>
      {enabled.length > 1 ? (
        <div className="mt-3 flex gap-1.5">
          {enabled.map((row, i) => (
            <button
              key={row.id}
              type="button"
              aria-label={`Show promo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-6 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/35 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
