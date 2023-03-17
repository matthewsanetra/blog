import type { CollectionEntry } from "astro:content";
import { z } from "astro:content";

const frontmatter = z.object({
  // From Bing Webmaster tools,
  // "These pages have title length less than 15 characters.
  // If the title is too short, it may not provide us and users with
  // enough information to understand the relevance of your page."
  title: z
    .string()
    .min(15, { message: "Below Bing recommended title length" })
    .max(70, { message: "Title is too long for Twitter card" }),
  headingOverride: z.string().optional(),

  // From Bing Webmaster tools,
  // "Change the description in the <meta description> tag in the page
  // source to be between 25 and 160 characters in length."
  description: z
    .string()
    .min(25, { message: "Below Bing recommended description length" })
    .max(160, { message: "Above Bing recommended description length" }),

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
  // Process overrides and shape in to useful format
  .transform((data) => ({
    meta: {
      title: data.title,
      description: data.description,
      image: data.image,
    },
    heading: data.headingOverride ?? data.title,
  }));

export type RootPageEntry = CollectionEntry<"root">;
export type RootPageInfo = CollectionEntry<"root">["data"];
