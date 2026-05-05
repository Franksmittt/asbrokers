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
      const scriptText = oldScript.textContent ?? "";
      if (!oldScript.src && scriptText.trim()) {
        const originalAddEventListener = document.addEventListener.bind(document) as (
          type: string,
          listener: EventListenerOrEventListenerObject,
          options?: boolean | AddEventListenerOptions
        ) => void;
        const domReadyEvent = new Event("DOMContentLoaded");
        const patchedAddEventListener = ((type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions) => {
          if (type === "DOMContentLoaded") {
            if (typeof listener === "function") {
              listener.call(document, domReadyEvent);
            } else if (listener && typeof listener === "object" && "handleEvent" in listener) {
              listener.handleEvent(domReadyEvent);
            }
            return;
          }
          if (!listener) return;
          originalAddEventListener(type, listener, options);
        }) as Document["addEventListener"];
        document.addEventListener = patchedAddEventListener;
        try {
          // eslint-disable-next-line no-new-func
          new Function(scriptText)();
        } finally {
          document.addEventListener = originalAddEventListener;
        }
        oldScript.remove();
        return;
      }

      const nextScript = document.createElement("script");
      for (const attr of oldScript.attributes) {
        nextScript.setAttribute(attr.name, attr.value);
      }
      oldScript.replaceWith(nextScript);
    });
  }, [html]);

  return <div ref={containerRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
