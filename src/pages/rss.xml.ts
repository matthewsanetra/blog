import type { APIContext } from "astro";

import rss from "@astrojs/rss";

import { entries } from "@schemas/blog";

export async function get(context: APIContext) {
  // See https://docs.astro.build/en/reference/api-reference/#contextsite
  const site = context.site?.toString() ?? "not possible";

  const posts = await entries();

  return rss({
    title: "Matthew Sanetra's Blog",
    description:
      "Hello! I'm a Computer Scientist at Magdalen College, University of Oxford. This is my personal blog - come join me on my adventures!",
    site,
    items: posts.map(({ data, slug }) => ({
      title: data.heading,
      description: data.meta.description,
      pubDate: data.date,
      link: `/blog/${slug}/`,
    })),
  });
}
