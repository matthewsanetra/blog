import type { CollectionEntry } from "astro:content";
import { z, getCollection } from "astro:content";

import { sharedSchema } from "./shared";

const frontmatter = sharedSchema.extend({
  date: z.date(),
  image: z.string().optional(),
});

export const schema = frontmatter
  // Using `strict` throws an error inside Astro, so we use `catchall` instead
  .catchall(
    z.lazy(() => {
      console.warn("Unknown frontmatter key");
      return z.unknown();
    })
  )
  .transform((data) => {
    const date = new Date(data.date);

    // Month index below is 0-indexed, day index is not
    if (date >= new Date(2023, 2, 15, 0, 0, 0, 0)) {
      // Since 2023-03-15, we are initiating deployment at 15:00 UTC,
      // so change post publish date to reflect that.

      date.setUTCHours(15);
      date.setUTCMinutes(0);
      date.setUTCSeconds(0);
      date.setUTCMilliseconds(0);
    }

    // Process overrides and shape into useful format
    return {
      meta: {
        title: data.title,
        description: data.description,
        image: data.image,
      },
      heading: data.headingOverride ?? data.title,
      date,
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

function ignore(post: BlogEntry) {
  // Ignore clearly scheduled posts
  return post.data.date > new Date();
}
