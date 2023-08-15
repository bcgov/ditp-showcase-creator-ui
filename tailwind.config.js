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
      "light-text": "#1e293b",

      // ------ Inputs ------ //

      "dark-input": "#323232",
      "light-input": "#f1f1f1",

      // ------ Buttons ------ //

      "light-btn": "#f5f5f5",
      "light-btn-hover": "#e5e5e5",
      "dark-btn": "#222222",
      "dark-btn-hover": "#282828", 
      
      // ------ Borders ------ //
      "dark-border": "#525252",
      "light-border": "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
};
