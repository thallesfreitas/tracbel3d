import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        footer: "url('images/footer/bg-footer.png')",
        contact: "url('/images/form/banner-form.webp')",
        contact2: "url('/projetos/tracbel/lp/images/form/banner-form.webp')",
        // contactIa: "url('images/fundo-ia.jpg')2",
      },
      fontFamily: {
        abeezee: ["ABeeZee-Regular", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      screens: {
        md: "769px",
        lg: "1025px",
      },
    },
  },
  plugins: [],
};
export default config;
