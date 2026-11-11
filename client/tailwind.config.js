/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swazi: {
          blue: "#0055A5",
          yellow: "#FFD100",
          red: "#CE1126",
          dark: "#1A202C",
          surface: "#F7FAFC"
        }
      }
    },
  },
  plugins: [],
}
