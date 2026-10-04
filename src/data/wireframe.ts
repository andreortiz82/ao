/** Three columns, top to bottom, matching the home mock rhythm. */
export const galleryColumns: string[][] = [
  ["612 / 640", "612 / 446", "612 / 774"],
  ["612 / 446", "612 / 640", "612 / 446", "612 / 446"],
  ["612 / 774", "612 / 446", "612 / 640"],
];

export const cases = [{ slug: "01" }, { slug: "02" }];

export const posts = [
  { slug: "01", label: "Post 01" },
  { slug: "02", label: "Post 02" },
  { slug: "03", label: "Post 03" },
  { slug: "04", label: "Post 04" },
];

export function neighbors<T extends { slug: string }>(items: T[], slug: string) {
  const index = items.findIndex((item) => item.slug === slug);
  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];
  return { prev, next };
}
