/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    fontFamily: {
      primary: ["Montserrat", "sans-serif"],
      second: ["Roboto", "serif"],
    },
    colors: {
      first: "#608FA3",
      second: "#B48F4C",
      admin: "#F0F0F0",
    },
    textColor: {
      primary: "#080808",
      second: "#888888",
      third: "#E42C14",
      light: "#FFFFFF",
      input: "#B48F4C",
      button: "#608FA3",
    },
    extend: {
      spacing: {
        50: "50px",
        60: "60px",
        200: "200px",
        300: "300px",
        400: "440px",
        500: "500px",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
