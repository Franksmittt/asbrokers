"use client";

import { useEffect, useRef } from "react";

type Props = {
  html: string;
  className?: string;
};

function bindEverestIncomeCalculators(scope: ParentNode) {
  const calculators = Array.from(scope.querySelectorAll<HTMLElement>("#everest-income-calculator"));
  if (calculators.length === 0) return;

  const zarFormatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  calculators.forEach((root) => {
    if (root.dataset.bound === "1") return;
    root.dataset.bound = "1";

    const inputEl = root.querySelector<HTMLInputElement>("#inv-amount");
    const outMonthly = root.querySelector<HTMLElement>("#calc-out-monthly");
    const outAnnual = root.querySelector<HTMLElement>("#calc-out-annual");
    const out5Year = root.querySelector<HTMLElement>("#calc-out-5year");
    const outBonus = root.querySelector<HTMLElement>("#calc-out-bonus");
    const outTotal = root.querySelector<HTMLElement>("#calc-out-total");
    if (!inputEl || !outMonthly || !outAnnual || !out5Year || !outBonus || !outTotal) return;

    inputEl.disabled = false;
    inputEl.readOnly = false;
    inputEl.style.pointerEvents = "auto";

    const ANNUAL_RATE = 0.128;
    const NET_FACTOR = 0.8;
    const BONUS_RATE = 0.1;
    const TERM_YEARS = 5;

    const updateCalculator = () => {
      let val = Number.parseFloat(inputEl.value);
      if (!Number.isFinite(val) || val < 0) val = 0;
      const netAnnual = val * ANNUAL_RATE * NET_FACTOR;
      const netMonthly = netAnnual / 12;
      const net5Year = netAnnual * TERM_YEARS;
      const bonusNet = val * BONUS_RATE * NET_FACTOR;
      const totalNet = net5Year + bonusNet;
      outMonthly.textContent = zarFormatter.format(netMonthly);
      outAnnual.textContent = zarFormatter.format(netAnnual);
      out5Year.textContent = zarFormatter.format(net5Year);
      outBonus.textContent = zarFormatter.format(bonusNet);
      outTotal.textContent = zarFormatter.format(totalNet);
    };

    inputEl.addEventListener("input", updateCalculator);
    inputEl.addEventListener("change", updateCalculator);
    updateCalculator();
  });
}

export function ExecutableArticleHtml({ html, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const scripts = root.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const scriptText = oldScript.textContent ?? "";
      const scriptType = (oldScript.getAttribute("type") ?? "").trim().toLowerCase();
      const isModuleScript = scriptType === "module";

      if (!oldScript.src && scriptText.trim() && !isModuleScript) {
        const originalAddEventListener = document.addEventListener.bind(document) as (
          type: string,
          listener: EventListenerOrEventListenerObject,
          options?: boolean | AddEventListenerOptions
        ) => void;
        const domReadyEvent = new Event("DOMContentLoaded");
        const patchedAddEventListener = ((type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions) => {
          if (type === "DOMContentLoaded") {
            if (typeof listener === "function") {
              try {
                listener.call(document, domReadyEvent);
              } catch (error) {
                console.error("[insights] Inline calculator script failed during DOMContentLoaded handler.", error);
              }
            } else if (listener && typeof listener === "object" && "handleEvent" in listener) {
              try {
                listener.handleEvent(domReadyEvent);
              } catch (error) {
                console.error("[insights] Inline calculator script failed during DOMContentLoaded handler.", error);
              }
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
        } catch (error) {
          console.error("[insights] Inline calculator script execution failed.", error);
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
      if (!oldScript.src && scriptText.trim()) {
        nextScript.textContent = scriptText;
      }
      oldScript.replaceWith(nextScript);
    });

    // Fallback binder: keeps known calculator embeds interactive even if inline script is malformed.
    bindEverestIncomeCalculators(root);
  }, [html]);

  return <div ref={containerRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
