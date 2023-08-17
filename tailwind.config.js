/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      // ------ Backgrounds ------ //

      "dark-bg": "#222222",
      "dark-bg-secondary": "#282828",
      "light-bg": "#f5f5f5",
      "light-bg-secondary": "#e5e5e5",

      // ------ Text ------ //

      "dark-text": "#FFFFFF",
      "light-text": "#333333",

      // ------ Inputs ------ //

      "dark-input": "#323232",
      "light-input": "#d6d6d6",
      "dark-input-hover": "#454545",

      // ------ Buttons ------ //

      "light-btn": "#f5f5f5",
      "light-btn-hover": "#d1d1d1",
      "dark-btn": "#222222",
      "dark-btn-hover": "#333333",

      // ------ Borders ------ //
      "dark-border": "#525252",
      "light-border": "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
};
