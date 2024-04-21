/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accentOrange: "#d00000",
        accentGreen: "#70e000",
      }
    },
  },
  plugins: [],
}