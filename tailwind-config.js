/* ==========================================================================
   Rivil International — shared Tailwind CDN configuration
   Mirrors the Stitch homepage design system exactly so every page renders
   with the same colours, fonts and spacing rhythm. Loaded after the Tailwind
   CDN script on every page.
   ========================================================================== */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary": "#A7A9AC",
        "on-background": "#C0C0C0",
        "primary": "#556B2F",
        "error": "#ba1a1a",
        "background": "#050708",
        "on-primary-fixed": "#050708",
        "on-primary-container": "#C0C0C0",
        "tertiary-container": "#171e08",
        "outline-variant": "#2a2d2f",
        "tertiary-fixed": "#dee7c3",
        "tertiary-fixed-dim": "#c2caa8",
        "surface-variant": "#1c1b1b",
        "secondary-fixed-dim": "#c5c6ca",
        "on-tertiary-fixed-variant": "#424a30",
        "primary-fixed": "#e1e2e4",
        "on-surface": "#C0C0C0",
        "on-tertiary": "#ffffff",
        "inverse-surface": "#f3f0ef",
        "secondary-fixed": "#e1e2e6",
        "surface-container-lowest": "#050708",
        "tertiary": "#556B2F",
        "surface-bright": "#111415",
        "surface-tint": "#556B2F",
        "on-secondary": "#050708",
        "on-error-container": "#93000a",
        "on-primary-fixed-variant": "#454748",
        "on-primary": "#ffffff",
        "primary-container": "#191c1d",
        "surface-container-high": "#1c1b1b",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container": "#111415",
        "primary-fixed-dim": "#c5c7c8",
        "inverse-primary": "#c5c7c8",
        "surface-container-low": "#0c0f10",
        "on-secondary-fixed": "#191c1e",
        "surface-dim": "#050708",
        "on-secondary-container": "#C0C0C0",
        "surface": "#050708",
        "inverse-on-surface": "#111415",
        "on-tertiary-fixed": "#171e08",
        "on-surface-variant": "#A7A9AC",
        "on-secondary-fixed-variant": "#44474a",
        "secondary-container": "#1c1b1b",
        "outline": "#444749",
        "on-tertiary-container": "#7f8769",
        "surface-container-highest": "#333536",
        "pacific-turquoise": "#00A3AD",
        "bush-olive": "#556B2F",
        "silver": "#C0C0C0",
        "cave-cyan": "#00C8E8"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-mobile": "16px",
        "section-gap": "120px",
        "unit": "8px",
        "margin-desktop": "64px",
        "gutter": "24px",
        "container-max": "1280px"
      },
      fontFamily: {
        "display-lg": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "body-lg": ["Hanken Grotesk"],
        "display-lg-mobile": ["Hanken Grotesk"],
        "label-sm": ["JetBrains Mono"],
        "headline-lg": ["Hanken Grotesk"],
        "body-md": ["Hanken Grotesk"]
      },
      fontSize: {
        "display-lg": ["64px", { "lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "display-lg-mobile": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
      }
    }
  }
};
