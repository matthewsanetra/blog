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

  navbar: z
    .object({
      index: z.number(),
      title: z.string(),
    })
    .optional(),
});

export const schema = frontmatter.strict().transform((data) => ({
  // Process overrides and shape into useful format
  meta: {
    title: data.title,
    description: data.description,
    socialPreview: data.socialPreview,
    lastModified: data.lastModified,
  },
  heading: data.headingOverride ?? data.title,
  navbar: data.navbar,
}));

export type RootPageEntry = CollectionEntry<"root">;
export type RootPageData = CollectionEntry<"root">["data"];

export async function entries() {
  const pages: RootPageEntry[] = await getCollection("root");
  return pages;
}

export async function getNavbarList() {
  const pages = await entries();
  const navbarList = pages.flatMap((page) => {
    if (page.data.navbar) {
      return {
        index: page.data.navbar.index,
        title: page.data.navbar.title,
        href: page.slug == "index" ? "/" : `/${page.slug}/`,
      };
    } else {
      return [];
    }
  });

  navbarList.sort((a, b) => a.index - b.index);

  return navbarList;
}
