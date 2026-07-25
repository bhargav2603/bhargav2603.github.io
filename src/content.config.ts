import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default("research"),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    toc: z.boolean().default(true),
    readingTime: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    summary: z.string(),
    question: z.string(),
    currentFocus: z.string(),
    technologies: z.array(z.string()),
    repoUrl: z.url(),
    externalUrl: z.url().optional(),
    category: z.string(),
    order: z.number(),
    status: z.string(),
    accent: z.enum(["coral", "ink", "stone"]).default("coral"),
  }),
});

const interests = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/interests" }),
  schema: z.object({
    title: z.string(),
    creator: z.string(),
    category: z.enum(["Books", "Articles", "Music", "People", "Stories"]),
    status: z.enum(["Consumed", "Recommended"]),
    url: z.url(),
    note: z.string(),
    year: z.number().optional(),
    order: z.number(),
  }),
});

export const collections = { blog, projects, interests };
