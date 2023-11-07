/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgGray: "rgb(229 231 235)",
        txtBlue: "#00008b",
      },
    },
  },
  plugins: [],
};
