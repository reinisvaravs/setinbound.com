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
      screens: {
        xs: "480px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
      },
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
          RED: "#942821",
        },
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
export default config;
