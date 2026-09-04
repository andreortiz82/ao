export const primitives = {
  neutral: {
    50: "#f7f7f5",
    100: "#eeeee9",
    200: "#e2e2db",
    400: "#9c9c93",
    600: "#5c5c56",
    800: "#2a2a27",
    950: "#121211",
  },
  red: { 50: "#fef2f2", 100: "#fee2e2", 500: "#dc2626", 600: "#b91c1c" },
  green: { 50: "#f0fdf4", 500: "#16a34a" },
  amber: { 50: "#fffbeb", 500: "#d97706" },
  blue: { 50: "#eff6ff", 500: "#2563eb", 600: "#1d4ed8" },
};

export const brands = {
  lumen: {
    label: "Lumen",
    light: {
      bg: primitives.neutral[50],
      surface: "#ffffff",
      text: primitives.neutral[950],
      textMuted: primitives.neutral[600],
      border: primitives.neutral[200],
      accent: primitives.red[500],
      accentText: "#ffffff",
      danger: primitives.red[500],
      success: primitives.green[500],
      warning: primitives.amber[500],
    },
    dark: {
      bg: primitives.neutral[950],
      surface: primitives.neutral[800],
      text: primitives.neutral[50],
      textMuted: primitives.neutral[400],
      border: "#3a3a35",
      accent: primitives.red[500],
      accentText: "#ffffff",
      danger: "#f87171",
      success: "#4ade80",
      warning: "#fbbf24",
    },
  },
  harbor: {
    label: "Harbor",
    light: {
      bg: "#f4f8fb",
      surface: "#ffffff",
      text: "#0b1f33",
      textMuted: "#4d6780",
      border: "#d5e2ee",
      accent: primitives.blue[600],
      accentText: "#ffffff",
      danger: primitives.red[500],
      success: primitives.green[500],
      warning: primitives.amber[500],
    },
    dark: {
      bg: "#07111c",
      surface: "#122033",
      text: "#e8f1fa",
      textMuted: "#8aa4bb",
      border: "#24384d",
      accent: "#60a5fa",
      accentText: "#07111c",
      danger: "#f87171",
      success: "#4ade80",
      warning: "#fbbf24",
    },
  },
  cinder: {
    label: "Cinder",
    light: {
      bg: "#fbf6f0",
      surface: "#fffdf9",
      text: "#1c140c",
      textMuted: "#6d5844",
      border: "#ead9c6",
      accent: primitives.amber[500],
      accentText: "#1c140c",
      danger: primitives.red[600],
      success: primitives.green[500],
      warning: primitives.amber[500],
    },
    dark: {
      bg: "#16100a",
      surface: "#261c12",
      text: "#f6ecdf",
      textMuted: "#c4a888",
      border: "#3d2e1e",
      accent: "#fbbf24",
      accentText: "#16100a",
      danger: "#f87171",
      success: "#4ade80",
      warning: "#fbbf24",
    },
  },
};

export const brandIds = Object.keys(brands);

export function tokensToCssVars(t) {
  return {
    "--ds-bg": t.bg,
    "--ds-surface": t.surface,
    "--ds-text": t.text,
    "--ds-text-muted": t.textMuted,
    "--ds-border": t.border,
    "--ds-accent": t.accent,
    "--ds-accent-text": t.accentText,
    "--ds-danger": t.danger,
    "--ds-success": t.success,
    "--ds-warning": t.warning,
  };
}

export function tokensToCssBlock(t) {
  return `:root {
  --color-bg: ${t.bg};
  --color-surface: ${t.surface};
  --color-text: ${t.text};
  --color-text-muted: ${t.textMuted};
  --color-border: ${t.border};
  --color-accent: ${t.accent};
  --color-danger: ${t.danger};
  --color-success: ${t.success};
}`;
}

export function tokensToJsBlock(t) {
  return `export const theme = {
  bg: "${t.bg}",
  surface: "${t.surface}",
  text: "${t.text}",
  textMuted: "${t.textMuted}",
  border: "${t.border}",
  accent: "${t.accent}",
  danger: "${t.danger}",
  success: "${t.success}",
};`;
}
