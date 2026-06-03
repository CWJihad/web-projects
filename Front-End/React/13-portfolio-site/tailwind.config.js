/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        ink: "#0D0D0D",
        paper: "#F5F2EB",
        accent: "#E84B2E",
        muted: "#8A8780",
        card: "#EDEBE3",
        border: "#D5D2C8",
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
}
