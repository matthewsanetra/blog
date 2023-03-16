import type { CollectionEntry } from "astro:content";
import { z, getCollection } from "astro:content";

export const schema = z.object({
  // From Bing Webmaster tools,
  // "These pages have title length less than 15 characters.
  // If the title is too short, it may not provide us and users with
  // enough information to understand the relevance of your page."
  title: z
    .string()
    .min(15, { message: "Below Bing recommended title length" })
    .max(70, { message: "Title is too long for Twitter card" }),
  titleHeadingOverride: z.string().optional(),

  // From Bing Webmaster tools,
  // "Change the description in the <meta description> tag in the page
  // source to be between 25 and 160 characters in length."
  description: z
    .string()
    .min(25, { message: "Below Bing recommended description length" })
    .max(160, { message: "Above Bing recommended description length" }),

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
