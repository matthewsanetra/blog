import { defineCollection } from "astro:content";

import { schema as blogSchema } from "../schemas/blog";
import { schema as rootSchema } from "../schemas/root";

export const collections = {
  blog: defineCollection({ schema: blogSchema }),
  root: defineCollection({ schema: rootSchema }),
};
