import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        custom: ['"Custom Font"', "sans-serif"], 
        caveat: ['"Caveat"', 'cursive'],
      },
      screens: {
        xxs: "400px", 
      },
    },
  },
  plugins: [],
};

export default config;
