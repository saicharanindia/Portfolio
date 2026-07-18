import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        "#050505",
        surface:   "#111111",
        "surface-2": "#1A1A1A",
        red:       "#FF003C",
        "red-glow":"#FF1744",
        "red-hi":  "#FF5E7A",
        chrome:    "#EAEAEA",
        "chrome-2":"#C8C8C8",
        muted:     "#666666",
        "muted-2": "#444444",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        heading: ["'DM Sans'", "system-ui", "sans-serif"],
        body:    ["'DM Sans'", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "gradient-red":    "linear-gradient(135deg,#FF003C,#FF1744)",
        "gradient-chrome": "linear-gradient(135deg,#EAEAEA,#C8C8C8,#FFFFFF,#A0A0A0)",
        "gradient-dark":   "linear-gradient(160deg,#050505,#0D0D0D,#050505)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "red-sm":  "0 0 12px rgba(255,0,60,0.3)",
        "red-md":  "0 0 24px rgba(255,0,60,0.4)",
        "red-lg":  "0 0 48px rgba(255,0,60,0.5)",
        "red-xl":  "0 0 80px rgba(255,0,60,0.35)",
        "chrome":  "0 0 20px rgba(234,234,234,0.15)",
        "glass":   "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-red":"0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,0,60,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
        "card":    "0 4px 32px rgba(0,0,0,0.8)",
      },
      animation: {
        "pulse-red":   "pulseRed 2s ease-in-out infinite",
        "float":       "float 7s ease-in-out infinite",
        "float-delay": "float 7s ease-in-out 2s infinite",
        "scan":        "scan 3s linear infinite",
        "flicker":     "flicker 6s ease-in-out infinite",
        "chrome-shine":"chromeShine 4s linear infinite",
        "marquee":     "marquee 35s linear infinite",
        "marquee-rev": "marquee 35s linear infinite reverse",
      },
      keyframes: {
        pulseRed: { "0%,100%": { boxShadow: "0 0 12px rgba(255,0,60,0.3)" }, "50%": { boxShadow: "0 0 40px rgba(255,0,60,0.7)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-16px)" } },
        scan: { "0%": { top: "0%" }, "100%": { top: "100%" } },
        flicker: { "0%,100%": { opacity: "1" }, "48%": { opacity: "1" }, "50%": { opacity: "0.85" }, "52%": { opacity: "1" } },
        chromeShine: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      backdropBlur: { xs: "2px" },
      borderRadius: { "2xl": "16px", "3xl": "24px", "4xl": "32px" },
    },
  },
  plugins: [],
};

export default config;
