import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    password: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    password: z.string().optional(),
    role: z.array(z.string()).optional(),
    team: z.array(z.string()).optional(),
    duration: z.string().optional(),
    summary: z.string().optional(),
    solutions: z.array(z.object({
      title: z.string(),
      summary: z.string(),
    })).optional(),
    impact: z.object({
      summary: z.string(),
      metrics: z.array(z.object({
        value: z.string(),
        label: z.string(),
      })),
    }).optional(),
  }),
});

export const collections = { blog, work };
