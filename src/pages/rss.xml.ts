import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import rss from "@astrojs/rss";

export async function get(context: APIContext) {
  // See https://docs.astro.build/en/reference/api-reference/#contextsite
  const site = context.site?.toString() ?? "not possible";

  const posts = await getCollection("blog");

  return rss({
    title: "Matthew Sanetra's Blog",
    description: "A blog about a student's adventures programming.",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
  });
}
