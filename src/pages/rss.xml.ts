import type { APIContext } from "astro";

import { Feed } from "feed";

import { entries } from "~schemas/blog";

export async function get(context: APIContext) {
  // See https://docs.astro.build/en/reference/api-reference/#contextsite
  const site = context.site?.toString() ?? "not possible";
  const year = new Date().getUTCFullYear();

  const feed = new Feed({
    title: "Matthew Sanetra's Blog",
    description:
      "Hello! I'm a Computer Scientist at Magdalen College, University of Oxford. This is my personal blog - come join me on my adventures!",
    id: site,
    link: site,
    copyright: `Creative Commons Attribution-ShareAlike 4.0 International License. ${year} Matthew Sanetra`,
    language: "en",
    generator: "Astro",
    author: {
      name: "Matthew Sanetra",
      email: "matthewsanetra@gmail.com",
    },
    feedLinks: {
      rss: new URL("/rss.xml", site).href,
    },
  });

  const posts = await entries();

  for (const { data, slug } of posts) {
    feed.addItem({
      title: data.heading,
      link: new URL(`/blog/${slug}/`, site).href,
      description: data.meta.description,
      date: data.meta.lastModified ?? data.date,
      published: data.date,
      author: [
        {
          name: "Matthew Sanetra",
          email: "matthewsanetra@gmail.com",
        },
      ],
    });
  }

  return {
    body: feed.rss2(),
  };
}
