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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        vault: {
          dark: "#0a0a0c",
          card: "#151518",
          "card-alt": "#121214",
        },
        void: "#000000",
        shark: "#1D1D1F",
        "warm-canvas": "#F7F6F3",
        "cinematic-teal": "#00A3A3",
        "gold-orange": "#FF7F50",
        // Darker than stock #0057B8 so body links hit WCAG AA on warm-canvas.
        "samsung-blue": "#004A9E",
        "supernova-gold": "#FF7F50",
        "athens-gray": "#F5F5F7",
        "whatsapp": {
          DEFAULT: "#25D366",
          accessible: "#0F766E",
        },
        // Stone overrides: keep 400 light for muted text on dark footer;
        // darken 500+ so body copy on warm-canvas hits WCAG AA (~4.5:1).
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#4a4540",
          600: "#3f3a36",
          700: "#292524",
          800: "#1c1917",
          900: "#0c0a09",
          950: "#0a0908",
        },
      },
      boxShadow: {
        "rim-glow": "0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 0 rgba(255,255,255,0.05)",
        "cta-glow-blue": "0 0 40px rgba(0, 87, 184, 0.4)",
        "cta-glow-gold": "0 0 40px rgba(255, 127, 80, 0.35)",
      },
      borderRadius: {
        squircle: "2rem",
        "squircle-lg": "2.5rem",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "hub-reveal": "hubReveal 0.65s cubic-bezier(0.25, 0.1, 0.25, 1) both",
        "whatsapp-flip": "whatsappFlip 0.85s cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        hubReveal: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        whatsappFlip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
