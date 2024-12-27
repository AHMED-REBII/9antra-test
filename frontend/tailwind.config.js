/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        principal: "#af2e65",
        contact: "#f9b454",
      },
      screens: {
        sm: "576px",
        md: "960px",
        lg: "1537px",
      },
    },
  },
  plugins: [],
};
