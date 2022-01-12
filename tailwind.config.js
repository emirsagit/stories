const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},

    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.slate,
      yellow: colors.amber,
      red: colors.red,
      green: colors.lime,
      white: colors.white
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
