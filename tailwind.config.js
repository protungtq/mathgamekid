/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        kid: {
          yellow: '#FFD93D',
          orange: '#FF8E3C',
          red: '#FF6B6B',
          blue: '#4D96FF',
          green: '#6BCB77',
          purple: '#A66CFF',
          cream: '#FFF5E4'
        }
      }
    },
  },
  plugins: [],
}