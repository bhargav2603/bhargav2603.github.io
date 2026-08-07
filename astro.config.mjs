import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineConfig({
  site: "https://bhargav2603.github.io",
  output: "static",
  integrations: [
    // Tag and category listings are thin, duplicative pages; keeping them out
    // of the sitemap points crawlers at the posts themselves.
    sitemap({
      filter: (page) => !["/blog/tags/", "/blog/category/"].some((path) => page.includes(path)),
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
  },
  trailingSlash: "always",
});
