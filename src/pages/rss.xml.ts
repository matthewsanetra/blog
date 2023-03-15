import type { APIContext } from "astro";

import rss from "@astrojs/rss";

import { entries } from "src/schemas/blog";

export async function get(context: APIContext) {
  // See https://docs.astro.build/en/reference/api-reference/#contextsite
  const site = context.site?.toString() ?? "not possible";

  const posts = await entries();

  return rss({
    title: "Matthew Sanetra's Blog",
    description: "Join me on my adventures in software development",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
  });
}
