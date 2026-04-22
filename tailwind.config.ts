import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        vault: {
          dark: "#0a0a0c",
          card: "#151518",
          "card-alt": "#121214",
        },
        void: "#000000",
        shark: "#1D1D1F",
        "cinematic-teal": "#008080",
        "gold-orange": "#FF7F50",
        "samsung-blue": "#0057B8",
        "supernova-gold": "#E8B923",
        "athens-gray": "#F5F5F7",
      },
      boxShadow: {
        "rim-glow": "0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 0 rgba(255,255,255,0.05)",
        "cta-glow-blue": "0 0 40px rgba(0, 87, 184, 0.4)",
        "cta-glow-gold": "0 0 40px rgba(232, 185, 35, 0.35)",
      },
      transitionTimingFunction: {
        "apple": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
