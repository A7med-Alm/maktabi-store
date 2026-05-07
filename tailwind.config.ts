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
        ink: "var(--color-ink)",
        paper: "var(--color-paper)",
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        "surface": "var(--color-surface)",
      },
      fontFamily: {
        ar: ["var(--font-ar)"],
        en: ["var(--font-en)"],
      },
    },
  },
  plugins: [],
};
export default config;
