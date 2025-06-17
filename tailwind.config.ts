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
          WHITE: "#fefeff",
          WHITE_DARK: "#eeefef",
        },
        secondary: {
          GRAY: "#141729",
          LIGHT_GRAY: "#242842",
        },
        accent: {
          BLUE: "#6e01ff",
          RED: "#f54337",
        },
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
export default config;
