/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                // Root HTML file
    "./src/**/*.{js,ts,jsx,tsx}",  // All files in the `src` folder with Tailwind usage
  ],
  theme: {
    extend: {}, // Extend theme here if needed
  },
  plugins: [], // Add Tailwind plugins here if needed
}
