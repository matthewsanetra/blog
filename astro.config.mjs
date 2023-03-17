import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mattsanetra.uk/",
  integrations: [tailwind(), mdx(), compress(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
});
