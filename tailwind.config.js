const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/*.{js,ts,jsx,tsx}", "./components/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      background: "#161616",
      transparent: "#00000000",
      text: {
        primary: "#f4f4f4",
        secondary: "#c6c6c6",
      },
      layer: {
        100: "#525252",
        200: "#393939",
        300: "#262626",
        350: "#1e1e1e",
        400: "#1a1a1a",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
