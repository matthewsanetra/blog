import type { CollectionEntry } from "astro:content";
import { z, getCollection } from "astro:content";

import { sharedSchema } from "./shared";

const frontmatter = sharedSchema.extend({
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
export type RootPageData = CollectionEntry<"root">["data"];

export async function entries() {
  return await getCollection("root");
}
