/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgGray: "rgb(229 231 235)",
        txtBlue: "rgb(59 7 100)",
        txtGreen: "rgb(21 128 61)",
        txtRed: "rgb(185 28 28)",
        txtGray: "#737373",
      },
    },
  },
  plugins: [],
};
