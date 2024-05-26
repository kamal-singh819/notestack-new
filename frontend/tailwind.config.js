/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'customGradientOne': 'linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%)',
        'customGradientTwo': 'linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)'
      },
      colors: {
        accentOrange: "#d00000",
        accentPurple: '#8338ec',
        darkColor: "#14213d",
        greyColorOne: "#778da9",
        greyColorTwo: "#979dac",
        cardBgColor: "#023047",
        bgTwo: "linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%)"
      }
    },
  },
  plugins: [],
}