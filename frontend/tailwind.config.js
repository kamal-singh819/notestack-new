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
        accentPurple: '#8338ec',
        darkColor: "#14213d",
        greyColorOne: "#778da9",
        greyColorTwo: "#979dac",
        cardBgColor: "#023047"
      }
    },
  },
  plugins: [],
}