import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
				display: ["GT America", "Neue Haas Grotesk", "Inter", "sans-serif"],
			},
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
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				accent2: {
					DEFAULT: "hsl(var(--accent2))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
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
				marquee: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},

				/* === CLIP / CINEMATIC KEYFRAMES === */

				clipPolygon: {
					"0%": {
						clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
					},
					"100%": {
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
					},
				},

				clipCircleZoom: {
					"0%": {
						clipPath: "circle(0% at 50% 50%)",
						transform: "scale(0.9)",
						opacity: "0",
					},
					"60%": {
						clipPath: "circle(80% at 50% 50%)",
						transform: "scale(1.02)",
						opacity: "1",
					},
					"100%": {
						clipPath: "circle(100% at 50% 50%)",
						transform: "scale(1)",
					},
				},

				clipDiagonalUp: {
					"0%": {
						clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
						transform: "translateY(20px)",
						opacity: "0",
					},
					"100%": {
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
						transform: "translateY(0)",
						opacity: "1",
					},
				},

				clipFromCorners: {
					"0%": {
						clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
						transform: "scale(0.95)",
						opacity: "0",
					},
					"50%": {
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
						transform: "scale(1)",
						opacity: "1",
					},
					"100%": {
						clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
						transform: "scale(1)",
					},
				},

				clipCardDiagonal: {
					"0%": {
						clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
						transform: "translateY(20px) scale(0.95) rotate(-1.5deg)",
						opacity: "0",
					},
					"60%": {
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
						transform: "translateY(0) scale(1) rotate(0deg)",
						opacity: "1",
					},
					"100%": {
						clipPath: "polygon(4% 4%, 96% 2%, 98% 96%, 2% 98%)",
						transform: "translateY(0) scale(1) rotate(0.3deg)",
					},
				},

				clipHexagon: {
					"0%": {
						clipPath:
							"polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
					},
					"100%": {
						clipPath:
							"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
					},
				},

				clipInset: {
					"0%": {
						clipPath: "inset(100% 0 0 0)",
					},
					"100%": {
						clipPath: "inset(0 0 0 0)",
					},
				},

				clipEllipse: {
					"0%": {
						clipPath: "ellipse(0% 0% at 50% 50%)",
					},
					"100%": {
						clipPath: "ellipse(100% 100% at 50% 50%)",
					},
				},

				clipAngleTop: {
					"0%": {
						clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
						transform: "translateY(-20px)",
						opacity: "0",
					},
					"100%": {
						clipPath: "polygon(0 5%, 100% 0, 100% 100%, 0 100%)",
						transform: "translateY(0)",
						opacity: "1",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				marquee: "marquee 30s linear infinite",

				/* === CLIP ANIMATION SHORTCUTS === */

				"clip-polygon": "clipPolygon 1s ease-out forwards",
				"clip-circle-zoom": "clipCircleZoom 1.1s ease-out forwards",
				"clip-diagonal-up": "clipDiagonalUp 1s ease-out forwards",
				"clip-from-corners": "clipFromCorners 0.9s ease-out forwards",
				"clip-card-diagonal": "clipCardDiagonal 0.9s ease-out forwards",
				"clip-hexagon": "clipHexagon 1.2s ease-out forwards",
				"clip-inset": "clipInset 1s ease-out forwards",
				"clip-ellipse": "clipEllipse 1s ease-out forwards",
				"clip-angle-top": "clipAngleTop 0.9s ease-out forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
