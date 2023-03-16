import type { CollectionEntry } from "astro:content";
import { z, getCollection } from "astro:content";

export const schema = z.object({
  title: z.string().max(70, { message: "Title is too long for Twitter card" }),
  description: z
    .string()
    .max(200, { message: "Description is too long for Twitter card" }),
  date: z.date(),
  image: z.string().optional(),
});

export async function entries() {
  const all = await getCollection("blog");
  const filtered = all.filter((post) => !ignore(post));

  const posts = filtered.map((post) => withUpdatedPublishTime(post));

  // Make sure most recent post appears first
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return posts;
}

function ignore(post: CollectionEntry<"blog">) {
  return post.data.date > new Date();
}

function withUpdatedPublishTime(post: CollectionEntry<"blog">) {
  const date = new Date(post.data.date);

  // Month index below is 0-indexed, day index is not
  if (date >= new Date(2023, 2, 15, 0, 0, 0, 0)) {
    // Since 2023-03-15, we are initiating deployment at 15:00 UTC,
    // so change post publish date to reflect that.

    date.setUTCHours(15);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
  }

  return { ...post, data: { ...post.data, date } };
}
