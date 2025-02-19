/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kleinblue: "#3230A8",
        dark: "#101013",
        night: "#1E1E24",
        emerald: "#2BC22B",
      },
    },
  },
  plugins: [],
}

