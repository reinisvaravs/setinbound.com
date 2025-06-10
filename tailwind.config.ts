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
          DEFAULT: "#511D43", // wine
          // DEFAULT: "#511D4E", // Wine Berry
          // DEFAULT: "#461A56", // blue
          dark: "#901E3E",
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
