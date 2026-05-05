/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "primary-fixed-dim": "#00e639",
        "surface-tint": "#00e639",
        "error": "#ffb4ab",
        "secondary-fixed-dim": "#00daf8",
        "on-primary": "#003907",
        "on-secondary-fixed": "#001f25",
        "surface-container": "#1c2026",
        "primary": "#ebffe2",
        "on-error-container": "#ffdad6",
        "surface-container-highest": "#31353c",
        "primary-container": "#00ff41",
        "secondary-fixed": "#a5eeff",
        "surface-dim": "#10141a",
        "surface-container-high": "#262a31",
        "inverse-surface": "#dfe2eb",
        "surface-container-low": "#181c22",
        "on-tertiary-fixed-variant": "#860f60",
        "tertiary-fixed": "#ffd8e9",
        "surface-bright": "#353940",
        "on-surface": "#dfe2eb",
        "on-tertiary": "#620044",
        "on-background": "#dfe2eb",
        "secondary-container": "#00e0ff",
        "on-tertiary-container": "#a7317b",
        "tertiary-container": "#ffd0e5",
        "surface-variant": "#31353c",
        "secondary": "#b9f1ff",
        "surface-container-lowest": "#0a0e14",
        "on-secondary-container": "#005f6d",
        "primary-fixed": "#72ff70",
        "tertiary-fixed-dim": "#ffafd7",
        "outline-variant": "#3b4b37",
        "on-tertiary-fixed": "#3c0029",
        "inverse-on-surface": "#2d3137",
        "on-secondary-fixed-variant": "#004e5a",
        "inverse-primary": "#006e16",
        "on-primary-fixed-variant": "#00530e",
        "surface": "#10141a",
        "outline": "#84967e",
        "background": "#10141a",
        "on-primary-container": "#007117",
        "on-surface-variant": "#b9ccb2",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-primary-fixed": "#002203",
        "on-secondary": "#00363f",
        "tertiary": "#fff7f8"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "container-max": "1200px",
        "grid-unit": "8px",
        "gutter": "24px",
        "margin-page": "64px"
      },
      "fontFamily": {
        "headline-md": ["Inter"],
        "headline-xl": ["Inter"],
        "label-mono": ["JetBrains Mono"],
        "body-base": ["Inter"],
        "code-snippet": ["JetBrains Mono"]
      },
      "fontSize": {
        "headline-md": ["24px", { "lineHeight": "1.2", "fontWeight": "600" }],
        "headline-xl": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "label-mono": ["14px", { "lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "body-base": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "code-snippet": ["13px", { "lineHeight": "1.5", "fontWeight": "400" }]
      }
    }
  },
  plugins: [],
}
