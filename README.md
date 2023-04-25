# Matthew Sanetra's Blog

A very over-engineered blog. Everything
is type-safe, and every page is written in
Markdown (mostly MDX to allow custom components).

At compile-time, all assets and pages are optimised
as much as possible.

100% Lighthouse scores.

## License

- The software is licensed under the [MIT License](./LICENSE)
- The content of the blog is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/)
- The character images are not to be used without contacting me first. I hold full rights to the characters.

## Tech stack

- [Astro](https://astro.build)
- [TailwindCSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
- [TypeScript](https://typescriptlang.org)
- [Cloudflare Pages](https://pages.dev)

## Scheduled deployments

I use a Cloudflare Worker with a `cron` trigger to
ping a deploy hook at 15:00 UTC daily.

The worker source code can be found here: [deploy-worker](https://github.com/matthewsanetra/deploy-worker).

## TODO

- [ ] Add estimated reading time
- [ ] Add bionic reading toggle
