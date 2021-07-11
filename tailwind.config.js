// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  prefix: 'tw-',
  theme: {
    extend: {},
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1.125rem',
        md: '1.5rem',
        lg: '1rem',
        xl: '1.875rem',
        '2xl': '2.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
