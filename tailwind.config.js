/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          900: "#4A2F18", // Deepest brown for text
          800: "#6B4423", // Primary deep brown
          700: "#8B5A2B", // Medium brown
          600: "#A67C52",
          500: "#C19A6B",
          400: "#D4A574", // Light brown
          300: "#E6C9A8",
          200: "#F0DBC2",
          100: "#F9F1E6",
          50: "#FDFBF7",
        },
        green: {
          900: "#2D3F26",
          800: "#425B39",
          700: "#5A7D4C", // Forest green
          600: "#7A9F6B",
          500: "#9ABF8B",
          400: "#BACFB0",
          300: "#D4E8D4", // Light mint
          200: "#E6F2E6",
          100: "#F2F9F2",
        },
        cream: {
          50: "#FDFDFB",
          100: "#FAF7F2", // Page background
          200: "#F5F1E8",
          300: "#EBE5D5",
        },
      },
      fontFamily: {
        sans: ["Tajawal", "Cairo", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "fade-in-right": "fadeInRight 1s ease-out forwards",
        "fade-in-left": "fadeInLeft 1s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scroll-bounce": "scrollBounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scrollBounce: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(10px)" },
          "60%": { transform: "translateY(5px)" },
        },
      },
    },
  },
  plugins: [],
};
