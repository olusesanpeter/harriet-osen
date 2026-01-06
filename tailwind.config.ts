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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          red: "#D61C27",
          blue: "#054dc1",
          DEFAULT: "#D61C27",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        "sans-tight": ["var(--font-sans-tight)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      fontSize: {
        "display-lg": ["96px", { lineHeight: "1.1" }],
        "display-md": ["55px", { lineHeight: "1.1" }],
        "body-lg": ["30px", { lineHeight: "36px" }],
        "body-md": ["32px", { lineHeight: "38px" }],
      },
    },
  },
  plugins: [],
};

export default config;
