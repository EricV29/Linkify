/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      display: ['group-hover'],
      fontFamily: {
        primary: 'Aileron-Regular',
        bold: 'Aileron-Bold',
        semibold: 'Aileron-SemiBold'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui(), require('tailwindcss-animated')]
}
