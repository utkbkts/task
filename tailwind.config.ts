import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          400: "#F2A945", 
          500: "#F78410",  
          600: "#E07516",  
        },
      },
      screens: {
        sm: "500px",
        md: "768px",
        mds: "978px",
        lg: "1200px",
        xl: "1350px",
        "2xl": "1536px",
        custom: "1440px",
      },
    },
  },
  plugins: [],
} satisfies Config;
