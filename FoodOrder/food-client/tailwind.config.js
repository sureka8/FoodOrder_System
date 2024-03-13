/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green":"#ff5c33",
        "red":"#FF6868",
        "secoundary":"#555",
        "primaryBG":"#FCFCFC"
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ['light',],
  },
}

