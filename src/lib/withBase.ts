/**
 * Prefix a site-root path with Astro `base` (`import.meta.env.BASE_URL`).
 * Leaves external, protocol-relative, hash, and mailto/data URLs unchanged.
 * Safe when `base` is `/` (custom-domain cutover).
 */
export function withBase(path: string): string {
  if (!path) return path;
  if (
    /^[a-z][a-z0-9+.-]*:/i.test(path) ||
    path.startsWith("//") ||
    path.startsWith("#") ||
    path.startsWith("?")
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const suffix = path.startsWith("/") ? path.slice(1) : path;

  if (normalizedBase === "/") return `/${suffix}`;
  if (path === normalizedBase || path.startsWith(normalizedBase)) return path;

  return `${normalizedBase}${suffix}`;
}
