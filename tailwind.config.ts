import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a1b56",
          dark: "#901e2f",
        },
        secondary: {
          DEFAULT: "#200142",
          light: "#5b01ac",
        },
        accent: {
          DEFAULT: "#9BC09C",
          light: "#9446e6",
        },
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
export default config;
