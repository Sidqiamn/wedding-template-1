/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#978766",
        white: "#ffffff", // boleh ditambahkan meskipun sudah default
      },
      fontFamily: {
        allura: ["Allura", "cursive"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};
