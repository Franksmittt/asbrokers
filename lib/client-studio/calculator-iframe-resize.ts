const CALCULATOR_IFRAME_SELECTOR =
  'iframe[data-asb-calculator-embed="true"], iframe[src*="/embed-calculators/"]';
const MIN_CALCULATOR_IFRAME_HEIGHT = 640;

/**
 * Keeps same-origin calculator embeds tall enough for their inputs and
 * expanding result panels. Returns a cleanup function for React effects.
 */
export function bindCalculatorIframeAutoResize(scope: ParentNode): () => void {
  const cleanups = Array.from(
    scope.querySelectorAll<HTMLIFrameElement>(CALCULATOR_IFRAME_SELECTOR)
  ).map((iframe) => {
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    const timers: number[] = [];

    const resizeToContent = () => {
      try {
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc?.documentElement) return;
        const height = Math.ceil(
          Math.max(
            MIN_CALCULATOR_IFRAME_HEIGHT,
            doc.documentElement.scrollHeight,
            doc.body?.scrollHeight ?? 0
          )
        );
        iframe.height = String(height);
        iframe.style.height = `${height}px`;
      } catch {
        // Cross-origin embeds retain their configured minimum height.
      }
    };

    const attachObservers = () => {
      resizeToContent();
      try {
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc?.documentElement) return;
        resizeObserver?.disconnect();
        mutationObserver?.disconnect();
        resizeObserver = new ResizeObserver(resizeToContent);
        resizeObserver.observe(doc.documentElement);
        if (doc.body) resizeObserver.observe(doc.body);
        mutationObserver = new MutationObserver(resizeToContent);
        mutationObserver.observe(doc.documentElement, {
          attributes: true,
          childList: true,
          subtree: true,
          characterData: true,
        });
      } catch {
        // Cross-origin embeds cannot be observed.
      }
    };

    const onLoad = () => {
      attachObservers();
      timers.push(window.setTimeout(resizeToContent, 100));
      timers.push(window.setTimeout(resizeToContent, 400));
      timers.push(window.setTimeout(resizeToContent, 1000));
    };

    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    return () => {
      iframe.removeEventListener("load", onLoad);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      timers.forEach(window.clearTimeout);
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
