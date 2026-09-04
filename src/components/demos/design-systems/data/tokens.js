import { primitives } from "./brands.js";

export const semanticTokens = [
  { key: "bg", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "text", label: "Text" },
  { key: "textMuted", label: "Text muted" },
  { key: "border", label: "Border" },
  { key: "accent", label: "Accent" },
  { key: "danger", label: "Danger" },
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
];

export const themeBridge = [
  { demo: "accent", tailwind: "--color-accent", shadcn: "--color-primary" },
  { demo: "text", tailwind: "--color-ink", shadcn: "--color-foreground" },
  { demo: "surface", tailwind: "--color-paper", shadcn: "--color-card" },
  { demo: "textMuted", tailwind: "--color-ink-3", shadcn: "--color-muted-foreground" },
  { demo: "border", tailwind: "--color-line", shadcn: "--color-border" },
  { demo: "danger", tailwind: "--color-accent", shadcn: "--color-destructive" },
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

export function contrastRatio(a, b) {
  const lum = (hex) => {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const bl = n & 255;
    const toLin = (c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(bl);
  };
  const L1 = lum(a);
  const L2 = lum(b);
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

export { primitives };
