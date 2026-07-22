import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core brand.
        primary: {
          DEFAULT: "#F5A524", // marigold accent — pops against the dark theme
          hover: "#C97F0E",
          soft: "#FDF1DC",
        },
        dark: "#0A0A10", // near-black — header, footer, admin bar
        navy: "#101B3D", // deep blue — every page's main background
        surface: "#172652", // elevated card panels on top of navy

        // One distinct accent per package category.
        lagoon: { DEFAULT: "#17A6A8", soft: "#E3F3F2" },
        vermillion: { DEFAULT: "#F0603E", soft: "#FCE7E1" },
        coral: { DEFAULT: "#F5748C", soft: "#FDEAEE" },
        iris: { DEFAULT: "#8B7AE0", soft: "#EAE6F7" },
        meadow: { DEFAULT: "#4FB454", soft: "#E7F3E7" },
        marigold: { DEFAULT: "#F5A524", soft: "#FDF1DC" },
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
