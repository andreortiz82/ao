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
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    500: "#dc2626",
    600: "#b91c1c",
  },
  green: {
    50: "#f0fdf4",
    500: "#16a34a",
  },
  amber: {
    50: "#fffbeb",
    500: "#d97706",
  },
  blue: {
    50: "#eff6ff",
    500: "#2563eb",
    600: "#1d4ed8",
  },
  teal: {
    50: "#f0fdfa",
    500: "#0f766e",
    600: "#0d9488",
  },
};

export const brands = {
  lumen: {
    label: "Lumen",
    note: "Original product",
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
    },
  },
  harbor: {
    label: "Harbor",
    note: "Partner brand",
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
    },
  },
  cinder: {
    label: "Cinder",
    note: "Warm line",
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
    },
  },
};

export const semanticKeys = [
  { key: "bg", role: "bg", label: "Background", maps: { lumen: "neutral.50" } },
  { key: "surface", role: "bg", label: "Surface", maps: { lumen: "#ffffff" } },
  { key: "text", role: "text", label: "Text", maps: { lumen: "neutral.950" } },
  {
    key: "textMuted",
    role: "text",
    label: "Text muted",
    maps: { lumen: "neutral.600" },
  },
  { key: "border", role: "border", label: "Border", maps: { lumen: "neutral.200" } },
  { key: "accent", role: "accent", label: "Accent", maps: { lumen: "red.500" } },
  {
    key: "accentText",
    role: "text",
    label: "Accent text",
    maps: { lumen: "#ffffff" },
  },
  { key: "danger", role: "danger", label: "Danger", maps: { lumen: "red.500" } },
  { key: "success", role: "success", label: "Success", maps: { lumen: "green.500" } },
];

export const typeRoles = [
  {
    id: "display",
    label: "Display",
    font: "Fraunces",
    cssFamily: "var(--font-serif)",
    size: "2.25rem",
    weight: "450",
    tracking: "-0.03em",
    sample: "Ship the system, not the hex.",
  },
  {
    id: "body",
    label: "Body",
    font: "Instrument Sans",
    cssFamily: "var(--font-sans)",
    size: "1.0625rem",
    weight: "400",
    tracking: "0",
    sample:
      "Tokens are the contract. Components keep the promise. The team compounds.",
  },
  {
    id: "meta",
    label: "Meta",
    font: "JetBrains Mono",
    cssFamily: "var(--font-mono)",
    size: "0.6875rem",
    weight: "400",
    tracking: "0.1em",
    sample: "TOKEN · COLOR · ACCENT",
  },
];

export const typeScale = [
  {
    id: "display",
    role: "Display",
    family: "var(--font-serif)",
    font: "Fraunces",
    size: "2.25rem",
    weight: 450,
    tracking: "-0.03em",
    lh: 1.08,
  },
  {
    id: "title",
    role: "Title",
    family: "var(--font-serif)",
    font: "Fraunces",
    size: "1.5rem",
    weight: 450,
    tracking: "-0.02em",
    lh: 1.2,
  },
  {
    id: "body",
    role: "Body",
    family: "var(--font-sans)",
    font: "Instrument Sans",
    size: "1.0625rem",
    weight: 400,
    tracking: "0",
    lh: 1.55,
  },
  {
    id: "ui",
    role: "UI",
    family: "var(--font-sans)",
    font: "Instrument Sans",
    size: "0.8125rem",
    weight: 500,
    tracking: "-0.005em",
    lh: 1.3,
  },
  {
    id: "meta",
    role: "Meta",
    family: "var(--font-mono)",
    font: "JetBrains Mono",
    size: "0.6875rem",
    weight: 400,
    tracking: "0.12em",
    lh: 1.4,
  },
];

export function primitiveName(hex) {
  const target = hex.toLowerCase();
  for (const [name, ramp] of Object.entries(primitives)) {
    for (const [step, value] of Object.entries(ramp)) {
      if (value.toLowerCase() === target) return `${name}.${step}`;
    }
  }
  return hex;
}

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
  };
}

export function tokensToJs(t) {
  return `{
  color: {
    bg: "${t.bg}",
    surface: "${t.surface}",
    text: "${t.text}",
    textMuted: "${t.textMuted}",
    border: "${t.border}",
    accent: "${t.accent}",
    danger: "${t.danger}",
    success: "${t.success}"
  }
}`;
}

export function tokensToCss(t) {
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

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function contrastRatio(a, b) {
  const lum = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    const toLin = (c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  };
  const L1 = lum(a);
  const L2 = lum(b);
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

export const figmaSwatches = [
  { id: "a", hex: "#FF5A3D", label: "CTA / Home", files: 11, note: "Marketing" },
  { id: "b", hex: "#FF5C35", label: "Primary btn", files: 7, note: "App" },
  { id: "c", hex: "#E03E2F", label: "Alert", files: 4, note: "Close, not same" },
  { id: "d", hex: "#DC2626", label: "New pick", files: 2, note: "Last Tuesday" },
  { id: "e", hex: "#111111", label: "Text", files: 19, note: "Almost black" },
  { id: "f", hex: "#0A0A0A", label: "Ink", files: 8, note: "Also text" },
];
