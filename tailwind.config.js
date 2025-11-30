/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'resto-red': '#DC2626',
        'resto-blue': '#1E40AF',
      },
    },
  },
  plugins: [],
}

