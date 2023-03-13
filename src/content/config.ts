import { z, defineCollection } from "astro:content";

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z
        .string()
        .max(70, { message: "Title is too long for Twitter card" }),
      description: z
        .string()
        .max(200, { message: "Description is too long for Twitter card" }),
      date: z.date(),
      image: z.string().optional(),
    }),
  }),
};
