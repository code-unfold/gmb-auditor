import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EDF4FC",
          100: "#D7E7F9",
          200: "#AECDF2",
          300: "#7FAFE9",
          400: "#4C8DDE",
          500: "#2470CE",
          600: "#1B5FB2",
          700: "#164C8F",
          800: "#123D73",
          900: "#0A2540",
        },
        accent: {
          50: "#E8F8F1",
          100: "#C9EEDD",
          200: "#93DDBB",
          300: "#54C693",
          400: "#23AC71",
          500: "#0F9960",
          600: "#0C7F50",
          700: "#0A6541",
          800: "#084E33",
          900: "#063A26",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(10, 37, 64, 0.06), 0 8px 24px -8px rgba(10, 37, 64, 0.12)",
        lift: "0 2px 4px rgba(10, 37, 64, 0.08), 0 16px 40px -12px rgba(10, 37, 64, 0.22)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-grid":
          "linear-gradient(rgba(10,37,64,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(10,37,64,0.045) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
