import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core brand — metallic gold on ink-black navy, the classic premium pairing.
        primary: {
          DEFAULT: "#CBA135", // refined metallic gold
          hover: "#A67F1D",
          light: "#E8CD7A", // highlight edge used in gold gradients/shine sweeps
          soft: "#F3E9CE",
        },
        dark: "#08080D", // ink-black — header, footer, admin bar
        navy: "#0D1730", // deep blue — every page's main background
        abyss: "#060A1C", // darkest navy, used in gradients and liquid blobs
        surface: { DEFAULT: "#152252", hover: "#1C2C63" }, // elevated glass panels

        // One distinct jewel-tone accent per package category.
        lagoon: { DEFAULT: "#17ADAF", soft: "#E3F3F2" },
        vermillion: { DEFAULT: "#E85A38", soft: "#FCE7E1" },
        coral: { DEFAULT: "#F26E88", soft: "#FDEAEE" },
        iris: { DEFAULT: "#8B7AE0", soft: "#EAE6F7" },
        meadow: { DEFAULT: "#3FAE55", soft: "#E7F3E7" },
        marigold: { DEFAULT: "#D6923C", soft: "#F6E4CD" }, // group-tour's own bronze-amber
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
          "radial-gradient(120% 100% at 50% 0%, #1B2C63 0%, #0D1730 55%, #060A1C 100%)",
        "gold-gradient": "linear-gradient(135deg, #E8CD7A 0%, #CBA135 45%, #8A6A1E 100%)",
        "gold-sheen":
          "linear-gradient(115deg, transparent 20%, rgba(232,205,122,0.5) 45%, transparent 70%)",
        "glass-panel":
          "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        "gold-glow": "0 0 40px -8px rgba(203,161,53,0.45)",
      },
      keyframes: {
        "blob-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-3%, 4%) scale(0.95)" },
        },
        "shimmer-sweep": {
          "0%": { backgroundPosition: "-150% 0" },
          "100%": { backgroundPosition: "150% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "blob-drift": "blob-drift 16s ease-in-out infinite",
        "blob-drift-slow": "blob-drift 24s ease-in-out infinite reverse",
        shimmer: "shimmer-sweep 3.5s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
