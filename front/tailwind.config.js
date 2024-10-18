/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-greenblue": "#009999", // Replace this with your color code
        "custom-darkblue": " #004d4d",
      }, // Example of another custom color
      backgroundImage: {
        "hero-bg": "url('../../Images/haro.jpg')", // Path to the hero image        },
      },
    },
  },
  plugins: [],
  
};
