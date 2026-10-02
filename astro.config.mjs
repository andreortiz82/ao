// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

/**
 * GitHub project Pages is served at https://andreortiz82.github.io/ao/.
 * `site` stays https://andreortiz.com so canonical URLs are ready for the
 * custom domain. When that domain points at this site, set BASE back to "/".
 */
const BASE = "/ao/";

/**
 * Markdown and MDX keep root-absolute public URLs (`/art/…`, `/blog/…`).
 * Rewrite them with the configured base so they resolve on project Pages.
 * @param {string} base
 */
function rehypeBasePaths(base) {
  const prefix = base.endsWith("/") ? base : `${base}/`;
  const rooted = prefix === "/" ? "" : prefix;

  /** @param {unknown} value */
  function rewriteUrl(value) {
    if (typeof value !== "string") return value;
    if (!value.startsWith("/") || value.startsWith("//")) return value;
    if (!rooted || value === rooted || value.startsWith(rooted)) return value;
    return `${rooted}${value.slice(1)}`;
  }

  /** @param {string} html */
  function rewriteRaw(html) {
    if (!rooted) return html;
    return html.replace(
      /(\s(?:src|href|poster)\s*=\s*["'])\/(?!\/)/gi,
      `$1${rooted}`,
    );
  }

  return () => (tree) => {
    /** @param {any} node */
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      if (node.type === "element" && node.properties) {
        for (const attr of ["src", "href", "poster"]) {
          if (attr in node.properties) {
            node.properties[attr] = rewriteUrl(node.properties[attr]);
          }
        }
        if (typeof node.properties.srcset === "string" && rooted) {
          node.properties.srcset = node.properties.srcset
            .split(",")
            .map((part) => {
              const pieces = part.trim().split(/\s+/);
              pieces[0] = /** @type {string} */ (rewriteUrl(pieces[0]));
              return pieces.join(" ");
            })
            .join(", ");
        }
      }
      if (node.type === "raw" && typeof node.value === "string") {
        node.value = rewriteRaw(node.value);
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://andreortiz.com",
  base: BASE,
  markdown: {
    rehypePlugins: [rehypeBasePaths(BASE)],
  },
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
