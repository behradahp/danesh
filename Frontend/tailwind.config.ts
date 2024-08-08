import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},

    screens: {
      dsk: '1270px',
    },

    boxShadow: {
      default: '0 3px 6px rgb(0, 0, 0, 0.16)',
      header: '0 2px 0px rgb(0, 0, 0, 0.16)',
    },

    fontFamily: {
      YekanBakhFat: ["var(--font-yekan-fat)"],
      YekanBakhMedium: ["var(--font-yekan-medium)"],
      YekanBakhBold: ["var(--font-yekan-bold)"],
      YekanBakhLight: ["var(--font-yekan-light)"],
      YekanBakhHeavy: ["var(--font-yekan-heavy)"],
      YekanBakhThin: ["var(--font-yekan-thin)"],
      YekanBakhRegular: ["var(--font-yekan-regular)"],
      YekanBakhHairline: ["var(--font-yekan-hairline)"],
    },
  },
  plugins: [],
};
export default config;
