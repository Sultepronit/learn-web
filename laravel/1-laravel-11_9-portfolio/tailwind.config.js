/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './storage/framework/views/*.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resoirces/**/*.vue'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("./plugin")],
}

