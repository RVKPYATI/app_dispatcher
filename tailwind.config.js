/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": { min: "1280px" },
        xl: { max: "1280px" },
        lg: { max: "1024px" },
        md: { max: "768px" },
        sm: { max: "480px" },
      },
      colors: {
        baseColor: "#f7f7f7",
        primary: "#273B76",
        primaryHover: "#0B1F5A",
        driver1: "#080F32",
        driver2: "#08320C",
        driver3: "#2F0832",
        driver4: "#846701",
      },
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-shadow")({
      shadowColor: "rgba(0, 0, 0, 0.9)",
      shadowBlur: "3px",
      shadowOffsetX: "1px",
      shadowOffsetY: "1px",
    }),
  ],
};
