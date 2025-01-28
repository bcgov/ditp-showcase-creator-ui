import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
