/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '85': '0.85',
      },
      colors: {
        'youtube-red': '#ff1919',
      },
      fontWeight: {
        'semi-bolder': '650',
      },
      width: {
        '66': '270px',
        '18': '70px',
      }
    },
  },
  plugins: [scrollbarHide],
}