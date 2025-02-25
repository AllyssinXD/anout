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
        emerald: "#c1dc45",
        silver: "#E0E0E0", // Ajustado para um branco acinzentado mais claro
        night: "#1A202C", // Ajustado para uma cor escura menos intensa
        dark: "#121826", // Ajustado para uma cor mais escura que night
      },
    },
  },
  plugins: [],
}

