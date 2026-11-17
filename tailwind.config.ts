import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0066CC",
          "blue-hover": "#0052A3",
          "blue-light": "#EBF4FF",
          "blue-glow": "#38BDF8",
          navy: "#0A192F",
          "navy-light": "#172A45",
          "navy-muted": "#334155",
          "sky-tint": "#F4F8FD",
          accent: "#F59E0B",
          "accent-hover": "#D97706",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "diffused": "0 10px 30px -5px rgba(10, 25, 47, 0.05), 0 4px 6px -2px rgba(10, 25, 47, 0.02)",
        "soft-blue": "0 12px 32px -8px rgba(0, 102, 204, 0.12), 0 4px 8px -2px rgba(10, 25, 47, 0.04)",
        "glass": "0 8px 30px 0 rgba(0, 102, 204, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
