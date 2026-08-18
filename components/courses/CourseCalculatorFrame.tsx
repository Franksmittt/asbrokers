"use client";

import { useEffect, useRef } from "react";

import { bindCalculatorIframeAutoResize } from "@/lib/client-studio/calculator-iframe-resize";

type Props = {
  embedPath: string;
  title: string;
};

export function CourseCalculatorFrame({ embedPath, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return bindCalculatorIframeAutoResize(node);
  }, [embedPath]);

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl ring-1 ring-stone-200">
      <iframe
        src={embedPath}
        title={title}
        loading="lazy"
        data-asb-calculator-embed="true"
        className="block w-full border-0 bg-[#0a0a0c]"
        style={{ minHeight: 640, height: 640 }}
      />
    </div>
  );
}
