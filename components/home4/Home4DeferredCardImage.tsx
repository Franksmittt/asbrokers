"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAlt } from "@/lib/image-alt";

const SIZES = "(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 300px";

type Props = {
  src: string;
  title: string;
  className?: string;
};

/**
 * Goal-card photos load after first paint / idle so they never contend with the hero LCP
 * (same asset at a different `q=` was double-fetching the copper hero).
 */
export function Home4DeferredCardImage({ src, title, className = "object-cover" }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    const t = window.setTimeout(enable, 12_000);
    window.addEventListener("scroll", enable, { once: true, passive: true });
    window.addEventListener("pointerdown", enable, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", enable);
      window.removeEventListener("pointerdown", enable);
    };
  }, []);

  if (!ready) {
    return <div className="absolute inset-0 bg-stone-200/80" aria-hidden />;
  }

  return (
    <Image
      src={src}
      alt={getAlt(src, title)}
      fill
      quality={65}
      loading="lazy"
      className={`${className} transition-transform duration-500 ease-apple group-hover:scale-105`}
      sizes={SIZES}
    />
  );
}
