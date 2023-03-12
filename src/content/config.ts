import { z, defineCollection } from "astro:content";

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      image: z.string().optional(),
    }),
  }),
};
