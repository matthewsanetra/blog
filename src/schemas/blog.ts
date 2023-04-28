import type { CollectionEntry } from "astro:content";
import { z, getCollection } from "astro:content";

import { Feed } from "feed";

import { sharedSchema } from "./shared";

// Importing with ~alias doesn't work inside content/config.ts for some reason.
// (this file is imported there)
import { previews } from "../components/mdx/socialPreviews";

const frontmatter = sharedSchema.extend({
  date: z.date(),
  socialPreview: z
    .string()
    .default("default")
    .refine((preview) => Object.keys(previews).includes(preview))
    .transform((preview) => preview as keyof typeof previews),
  toc: z.boolean().default(false),
});

export const schema = frontmatter.strict().transform((data) => {
  const date = new Date(data.date);

  // Month index below is 0-indexed, day index is not
  if (date >= new Date(2023, 2, 15, 0, 0, 0, 0)) {
    // Since 2023-03-15, we are initiating deployment at 15:00 UTC,
    // so change post publish date to reflect that.

    date.setUTCHours(15, 0, 0, 0);
  }

  // Process overrides and shape into useful format
  return {
    meta: {
      title: data.title,
      description: data.description,
      socialPreview: data.socialPreview,
      lastModified: data.lastModified,
    },
    heading: data.headingOverride ?? data.title,
    date,
    toc: data.toc,
  };
});

export type BlogEntry = CollectionEntry<"blog">;
export type BlogData = CollectionEntry<"blog">["data"];

export async function entries() {
  const all: BlogEntry[] = await getCollection("blog");

  // Filter out posts that are scheduled to be published in the future
  const filtered = all.filter((post) => !ignore(post));

  // Make sure most recent post appears first
  const key = ({ data: { date } }: BlogEntry) => date.valueOf();
  filtered.sort((a, b) => key(b) - key(a));

  return filtered;
}

export async function getFeed(
  feedNames: { rss: string; atom: string; json: string },
  site: string
) {
  const posts = await entries();

  const feeds = Object.fromEntries(
    Object.entries(feedNames).map(([type, filename]) => [
      type,
      new URL(`/blog/${filename}`, site).href,
    ])
  );

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
    feedLinks: feeds,
  });

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

  return feed;
}

function ignore(post: BlogEntry): boolean {
  // Ignore clearly scheduled posts

  const now = new Date();

  const postDate = post.data.date;
  if (postDate <= now) {
    return false;
  }

  const cutoff = new Date();
  cutoff.setUTCHours(14, 55, 0, 0);

  if (isScheduledForToday(postDate) && now >= cutoff) {
    // If it's after 14:55 UTC, we are initiating deployment at 15:00 UTC,
    // so don't ignore posts scheduled to be published at 15:00 UTC.

    return false;
  }

  return true;
}

function isScheduledForToday(date: Date): boolean {
  const now = new Date();

  const today = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const tomorrow = new Date(today.valueOf() + 24 * 60 * 60 * 1000);

  return date >= today && date < tomorrow;
}
