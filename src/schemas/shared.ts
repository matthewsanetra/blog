import { z } from "astro:content";

export const sharedSchema = z.object({
  // From Bing Webmaster tools,
  // "These pages have title length less than 15 characters.
  // If the title is too short, it may not provide us and users with
  // enough information to understand the relevance of your page."
  title: z
    .string()
    .min(15, { message: "Below Bing recommended title length" })
    .max(70, { message: "Title is too long for Twitter card" }),

  // If we want a different page heading than the title that appears
  // in the meta tags, we can override it here.
  headingOverride: z.string().optional(),

  // From Bing Webmaster tools,
  // "Change the description in the <meta description> tag in the page
  // source to be between 25 and 160 characters in length."
  description: z
    .string()
    .min(25, { message: "Below Bing recommended description length" })
    .max(160, { message: "Above Bing recommended description length" }),
});
