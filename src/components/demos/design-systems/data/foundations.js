export const canvasSwatches = [
  { id: "a", hex: "#FF5A3D", label: "CTA / Home", files: 11 },
  { id: "b", hex: "#FF5C35", label: "Primary btn", files: 7 },
  { id: "c", hex: "#E03E2F", label: "Alert", files: 4 },
  { id: "d", hex: "#DC2626", label: "New pick", files: 2 },
  { id: "e", hex: "#111111", label: "Text", files: 19 },
  { id: "f", hex: "#0A0A0A", label: "Ink", files: 8 },
];

export const typeRoles = [
  {
    id: "display",
    label: "Display",
    family: "var(--font-serif)",
    size: "2rem",
    weight: 450,
    sample: "Ship with intent.",
  },
  {
    id: "body",
    label: "Body",
    family: "var(--font-sans)",
    size: "1.0625rem",
    weight: 400,
    sample: "Make the decision easy to understand.",
  },
  {
    id: "meta",
    label: "Meta",
    family: "var(--font-mono)",
    size: "0.6875rem",
    weight: 400,
    sample: "ROLE · SIZE · WEIGHT",
    uppercase: true,
  },
];

export const spacingScale = [
  { token: "space.1", px: 4 },
  { token: "space.2", px: 8 },
  { token: "space.3", px: 16 },
  { token: "space.4", px: 24 },
  { token: "space.5", px: 32 },
  { token: "space.6", px: 48 },
];

export const breakpoints = [
  { id: "sm", width: 480, cols: 1 },
  { id: "md", width: 768, cols: 2 },
  { id: "lg", width: 1024, cols: 3 },
  { id: "xl", width: 1280, cols: 4 },
];
