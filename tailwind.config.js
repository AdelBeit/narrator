/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [require('daisyui')],
  daisyui:{
    themes:[
    "fantasy",
    "emerald",
    "halloween",
    "cupcake",
    "bumblebee",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk"
    ]
  }
}
