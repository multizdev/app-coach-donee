/** @types {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        primary: "#76A9FA",
        "primary-dark": "#538aaf",
        "my-purple": "#878afa",
        "my-green": "#76fabc",
        "my-green-dark": "#53af83",
        "my-yellow": "#fbf6b5",
        "my-pink": "#fae8fb",
        "my-aqua": "#ccf4f2",
      },
    },
  },
  plugins: [],
};
