module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./hoc/**/*.{js,ts,jsx,tsx}", "./containers/**/*.{js,ts,jsx,tsx}"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [
    require("tailwindcss-rtl"),
    require('tailwindcss'),
    require('precss'),
    require('autoprefixer')],
  corePlugins: {
    preflight: false,
  },
};
