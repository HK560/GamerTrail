/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./src/**/*.{html,js}"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blurIn: "blurIn 1s linear "
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        blurIn: {
          from: {
            filter: "blur(0px)"
          },
          to: {
            filter: "blur(10px)"
          }
        }
      }
    }
  },
  plugins: []
};
