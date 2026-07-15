"use client";

import { useEffect, useState } from "react";

const FOOTER_SELECTOR = 'footer[role="contentinfo"], footer';

/**
 * Hide fixed bottom docks (WhatsApp, chat bar) when the footer enters the viewport,
 * so they do not cover footer links. They return when the footer leaves (scroll up).
 */
export function useHideOverFooter(): boolean {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(FOOTER_SELECTOR);
    if (!footer) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setHide(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        /** Fire a little early so docks clear before covering footer chrome. */
        rootMargin: "0px 0px 24px 0px",
        threshold: 0,
      }
    );

    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return hide;
}
