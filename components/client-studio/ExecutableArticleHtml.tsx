"use client";

import { useEffect, useRef } from "react";

type Props = {
  html: string;
  className?: string;
};

export function ExecutableArticleHtml({ html, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const scripts = root.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const nextScript = document.createElement("script");
      for (const attr of oldScript.attributes) {
        nextScript.setAttribute(attr.name, attr.value);
      }
      if (!oldScript.src) {
        nextScript.textContent = oldScript.textContent;
      }
      oldScript.replaceWith(nextScript);
    });
  }, [html]);

  return <div ref={containerRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
