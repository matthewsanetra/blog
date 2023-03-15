import { CollectionEntry, z } from "astro:content";

export const schema = z.object({
  title: z.string().max(70, { message: "Title is too long for Twitter card" }),
  description: z
    .string()
    .max(200, { message: "Description is too long for Twitter card" }),
  date: z.date(),
  image: z.string().optional(),
});
