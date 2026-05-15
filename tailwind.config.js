/** @type {import('tailwindcss').Config} */

const colors = require("./src/presentation/style/palette/colors.json");
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.tsx"],
  darkMode: ["class", '[data-mode="dark"]'],
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("scrollbar", "&::-webkit-scrollbar");
    }),
    plugin(({ addVariant }) => {
      addVariant("scrollbarTrack", "&::-webkit-scrollbar-track");
    }),
  ],
  theme: {
    colors,
    screens: {
      tablet: "768px",
      laptop: "1280px",
      desktop: "1540px",
    },
  },
};
