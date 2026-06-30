"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeightClass?: string;
};

/** Mount children only when near viewport, keeps Recharts/Framer off the critical path. */
export function DeferUntilVisible({
  children,
  fallback = null,
  rootMargin = "0px",
  minHeightClass,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={!visible ? minHeightClass : undefined}>
      {visible ? children : fallback}
    </div>
  );
}
