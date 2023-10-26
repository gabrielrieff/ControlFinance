import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      grey: {
        300: "#E8E8E8",
        400: "#AAAAAA",
        700: "#292D32",
      },
      green: {
        200: "#ABFFC3",
        500: "#03A200",
      },
      blue: {
        200: "#D1ECFF",
        500: "#0500FF",
      },
      red: {
        200: "#FFA4A4",
      },
    },
  },
  plugins: [],
};
export default config;
