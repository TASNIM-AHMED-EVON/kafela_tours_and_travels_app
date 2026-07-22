import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core brand.
        primary: {
          DEFAULT: "#fb0202", // antique gold — premium, not bright yellow
          hover: "#fb0202",
          soft: "#F3E9CE",
        },
        dark: "#0A0A10", // near-black — header, footer, admin bar
        navy: "#101B3D", // deep blue — every page's main background
        surface: "#172652", // elevated card panels on top of navy

        // One distinct accent per package category.
        lagoon: { DEFAULT: "#17A6A8", soft: "#94eb87" },
        vermillion: { DEFAULT: "#f1441d", soft: "#94eb87" },
        coral: { DEFAULT: "#F5748C", soft: "#94eb87" },
        iris: { DEFAULT: "#8B7AE0", soft: "#94eb87" },
        meadow: { DEFAULT: "#00ff0d", soft: "#daead7" },
        marigold: { DEFAULT: "#3041c5", soft: "#94eb87" }, // warm bronze-amber, distinct from primary
      },
      fontFamily: {
        sans: ["'Hind Siliguri'", "'Poppins'", "sans-serif"],
        display: ["'Baloo Da 2'", "'Hind Siliguri'", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        pill: "30px",
      },
      backgroundImage: {
        "dusk-sky":
          "radial-gradient(120% 100% at 50% 0%, #1D2F66 0%, #101B3D 55%, #060A18 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
