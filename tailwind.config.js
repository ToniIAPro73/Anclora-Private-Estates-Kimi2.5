/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '!./src/components/ui/**/*',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Anclora Private Estates Palette - Layout Base
        anclora: {
          // Primary Colors
          teal: "#0B313F",
          "teal-dark": "#07252F",
          "teal-hover": "#124A50",
          "teal-bg": "#0F3F45",
          // Gold Colors
          gold: "#D4AF37",
          "gold-light": "#E6C96E",
          "gold-dark": "#B8962F",
          // Neutral Colors
          cream: "#F5F5F0",
          sand: "#B9915F",
          navy: "#2C3E50",
          black: "#05070A",
          // Text Colors
          "text-muted": "#B8C3C6",
          "text-primary": "#F5F5F0",
          "text-secondary": "rgba(245, 245, 240, 0.7)",
        },
        // Layout Base Colors
        pe: {
          navy: "#2C3E50",
          gold: "#D4AF37",
          "gold-light": "#E6C96E",
          cream: "#F5F5F0",
          bronze: "#B9915F",
          black: "#05070A",
          teal: "#0B313F",
          "teal-hover": "#124A50",
          "teal-bg": "#0F3F45",
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        "2xl": "28px",
        "3xl": "36px",
        "full": "9999px",
        "pill": "100px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 24px 70px rgba(0,0,0,0.35)",
        "card-hover": "0 32px 80px rgba(0,0,0,0.45)",
        "card-light": "0 24px 70px rgba(0,0,0,0.15)",
        "card-light-hover": "0 32px 80px rgba(0,0,0,0.2)",
        gold: "0 15px 35px rgba(212, 175, 55, 0.2)",
        "gold-hover": "0 20px 45px rgba(212, 175, 55, 0.3)",
        "gold-lg": "0 25px 50px rgba(212, 175, 55, 0.25)",
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        'premium': '800ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(212, 175, 55, 0)" },
        },
        "bounce": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "40%": { transform: "translateX(-50%) translateY(-10px)" },
          "60%": { transform: "translateX(-50%) translateY(-5px)" },
        },
        "blur-in": {
          "0%": { opacity: "0", filter: "blur(10px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(1.15)", filter: "blur(20px) brightness(0.6)" },
          "100%": { opacity: "1", transform: "scale(1.05)", filter: "blur(0px) brightness(0.85)" },
        },
        "floating-pulse": {
          "0%": { boxShadow: "0 10px 25px rgba(0,0,0,0.3), 0 0 0 0 rgba(212, 175, 55, 0.4)" },
          "70%": { boxShadow: "0 10px 25px rgba(0,0,0,0.3), 0 0 0 12px rgba(212, 175, 55, 0)" },
          "100%": { boxShadow: "0 10px 25px rgba(0,0,0,0.3), 0 0 0 0 rgba(212, 175, 55, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "bounce": "bounce 2s infinite",
        "blur-in": "blur-in 2s ease-out forwards",
        "scale-in": "scale-in 4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        "floating-pulse": "floating-pulse 3s infinite",
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E6C96E 100%)',
        'teal-gradient': 'linear-gradient(180deg, #0B313F 0%, #07252F 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(5, 7, 10, 0.4) 0%, rgba(5, 7, 10, 0.2) 50%, rgba(5, 7, 10, 0.6) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
