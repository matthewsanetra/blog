# Matthew Sanetra's Blog

This is my blog created with [Astro](https://astro.build/).

This is my first time using Astro and so I may not be doing
things the best way but it works! I believe the code is readable
and I think it's a great minimalistic template.

To make a new post, simply create a new file in `src/content/blog/`.
The frontmatter schema is defined in [src/schemas/blog.ts](./src/schemas/blog.ts).

# Scheduled deployments

This blog is deployed to [Cloudflare Pages](https://pages.dev/)
and I have a `cron` job set to deploy daily at 15:00 UTC.
I can also manually deploy whenever an urgent change is needed.

# TODO

## Defo wants

- [ ] Add estimated reading time
- [x] Add publish date to individual posts
- [ ] Add bionic reading toggle
- [ ] Add multiple characters
- [ ] Add multiple images/poses per character

## Tentative wants

- [ ] Add dark mode + toggle
