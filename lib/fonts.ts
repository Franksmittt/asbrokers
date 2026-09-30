import localFont from "next/font/local";

/**
 * Self-hosted UI fonts (no Google Fonts fetch at build time).
 * Keeps CI builds offline-stable when fonts.gstatic.com flakes.
 */

/** Distinctive sans for UI; avoids Inter/Roboto/Arial default stack. */
export const fontSans = localFont({
  src: [
    { path: "../fonts/figtree-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/figtree-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/figtree-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/figtree-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-sans",
});

/** Editorial serif for marketing headings. */
export const fontSerif = localFont({
  src: [
    { path: "../fonts/source-serif-4-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/source-serif-4-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-serif",
});
