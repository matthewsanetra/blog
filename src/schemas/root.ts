import type { CollectionEntry } from "astro:content";
import { z, getCollection } from "astro:content";

import { sharedSchema } from "./shared";

// Importing with @alias doesn't work inside content/config.ts for some reason.
// (this file is imported there)
import { previews } from "../components/mdx/socialPreviews";

const frontmatter = sharedSchema.extend({
  socialPreview: z
    .string()
    .default("default")
    .refine((preview) => Object.keys(previews).includes(preview))
    .transform((preview) => preview as keyof typeof previews),
});

export const schema = frontmatter.strict().transform((data) => ({
  // Process overrides and shape into useful format
  meta: {
    title: data.title,
    description: data.description,
    socialPreview: data.socialPreview,
  },
  heading: data.headingOverride ?? data.title,
}));

export type RootPageEntry = CollectionEntry<"root">;
export type RootPageData = CollectionEntry<"root">["data"];

export async function entries() {
  const pages: RootPageEntry[] = await getCollection("root");
  return pages;
}
