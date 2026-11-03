import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: "#C4A35A", light: "#D9C17F", dark: "#8F7435" },
        night: { DEFAULT: "#0B1F3A", light: "#12305A" },
        coal: "#0F1419",
        ink: "#111827",
        muted: "#6B7280",
        mist: "#F7F9FC",
        win: "#1F8A70",
        loss: "#9B1B1B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px -14px rgba(11,31,58,0.25)",
        gold: "0 18px 40px -18px rgba(196,163,90,0.55)",
      },
    },
  },
  plugins: [],
};
export default config;
