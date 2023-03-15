import { defineCollection } from "astro:content";

import { schema } from "../schemas/blog";

export const collections = { blog: defineCollection({ schema }) };
