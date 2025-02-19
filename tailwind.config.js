/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: "#DE1544",
        kleinblue: "#5D5DF0",
        dark: "#0B0915",
        night: "#0D1424",
        emerald: "#c1dc45",
        silver: "#CCCDCC"
      },
    },
  },
  plugins: [],
}

