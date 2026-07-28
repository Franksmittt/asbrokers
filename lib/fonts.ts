import { Figtree, Source_Serif_4 } from "next/font/google";

/** Distinctive sans for UI; avoids Inter/Roboto/Arial default stack. */
export const fontSans = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  // Subset weights: full variable font download hurts mobile LCP/TBT.
  weight: ["400", "500", "600", "700"],
});

/** Editorial serif for marketing headings. */
export const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["600", "700"],
});
