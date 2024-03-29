import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://mattsanetra.uk/",
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
    compress({
      logger: 1,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
