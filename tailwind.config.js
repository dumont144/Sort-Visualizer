/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        ink: '#0a0a0f',
        paper: '#f5f1e8',
        accent: '#ff5733',
        sage: '#7a9b76',
        gold: '#d4a017',
      },
    },
  },
  plugins: [],
}
