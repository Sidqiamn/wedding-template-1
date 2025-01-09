/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      customGreen: "#978766",
      white: "#ffffff",
    },
    fontFamily: {
      allura: ["Allura", "cursive"],
      lora: ["Lora", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
