import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#FCFAF7",
          100: "#FAF7F2",
          200: "#F3EDE4",
          300: "#EADBCE",
          400: "#D4C1AD",
          500: "#B89F87",
          800: "#57483B",
          900: "#2C2926",
        },
        terracotta: {
          100: "#FBECE7",
          500: "#C25E3B",
          600: "#A84C2B",
          700: "#8C3D21",
        },
        charcoal: {
          500: "#6B635B",
          700: "#443F3A",
          800: "#2C2926",
          900: "#1A1816",
        },
        sage: {
          100: "#F0F5F1",
          500: "#6E8879",
          700: "#455E50",
        },
        dusk: {
          800: "#172033",
          900: "#0B1120",
          950: "#070A12",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        handwriting: ["var(--font-handwriting)", "cursive"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
