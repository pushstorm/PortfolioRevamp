const { transform } = require("next/dist/build/swc");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Cabinet: ["Cabinet Grotesk", "sans-serif"],
        WorkSans: ["Work Sans", "sans-serif"],
        Satoshi: ["Satoshi", "sans-serif"],
        pacifico: ['var(--font-pacifico)']
      },
      container: {
        center: true, // Centers the container
        padding: {
          DEFAULT: "1rem", // Default padding
        },
        screens:{
          sm:"95%"
        }
      },
    },
  },
  plugins: [
    require("@codaworks/react-glow/tailwind"),
    require("tailwindcss-animate"),
  ],
};
