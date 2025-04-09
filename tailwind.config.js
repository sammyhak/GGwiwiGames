/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#090c13",
        primary: "#cf2728",
      },
      keyframes: {
        turn: {
          "0%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(33deg)" },
        },
      },
      animation: {
        turn: "turn 16s forwards",
      },
    },
  },
  plugins: [],
};
