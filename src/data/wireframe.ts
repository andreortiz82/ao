/** Three columns, top to bottom, matching the home mock rhythm. */
export const galleryColumns: string[][] = [
  ["612 / 640", "612 / 446", "612 / 774"],
  ["612 / 446", "612 / 640", "612 / 446", "612 / 446"],
  ["612 / 774", "612 / 446", "612 / 640"],
];

export const tags = ["Python", "Video", "Product Teams", "Motion"];

export const cases = [
  { slug: "01", tags: ["Python", "Video"] },
  { slug: "02", tags: ["Product Teams", "Motion"] },
];

export const posts = [
  { slug: "01", label: "Post 01", tags: ["Python", "Video"] },
  { slug: "02", label: "Post 02", tags: ["Video", "Product Teams"] },
  { slug: "03", label: "Post 03", tags: ["Product Teams", "Motion"] },
  { slug: "04", label: "Post 04", tags: ["Motion", "Python"] },
];

export function neighbors<T extends { slug: string }>(items: T[], slug: string) {
  const index = items.findIndex((item) => item.slug === slug);
  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];
  return { prev, next };
}
