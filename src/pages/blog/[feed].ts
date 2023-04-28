import type { APIContext } from "astro";
import type { Feed } from "feed";

import { getFeed } from "~schemas/blog";

export interface Props {
  type: "rss" | "atom" | "json";
  feed: Feed;
}

const feedFilenames = {
  rss: "rss.xml",
  atom: "atom.xml",
  json: "feed.json",
};

export async function getStaticPaths() {
  const site = "https://mattsanetra.uk/";

  const feed = await getFeed(feedFilenames, site);

  return Object.entries(feedFilenames).map(([type, filename]) => ({
    params: { feed: filename },
    props: { type, feed },
  }));
}

export async function get({ props: { type, feed } }: APIContext<Props>) {
  switch (type) {
    case "rss":
      return { body: feed.rss2() };
    case "atom":
      return { body: feed.atom1() };
    case "json":
      return { body: feed.json1() };
  }
}
