import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|divider|autocomplete|input|table|dropdown|select|pagination|modal|card).js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        sidebar: "270px auto",
        "sidebar-collapsed": "64px auto",
      },
      colors: {
        "light-black": "#242424",
        "custom-blue": "blue-600",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
