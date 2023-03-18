// Ported from a generated file by favicon.io to use Astro assets

import type { APIContext } from "astro";

import android_chrome_192x192 from "../assets/favicons/android-chrome-192x192.png";
import android_chrome_512x512 from "../assets/favicons/android-chrome-512x512.png";

const icons = [
  {
    src: android_chrome_192x192,
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: android_chrome_512x512,
    sizes: "512x512",
    type: "image/png",
  },
];

export async function get(_context: APIContext) {
  return {
    body: JSON.stringify({
      name: "Matthew Sanetra",
      short_name: "Matthew Sanetra",
      icons,
      theme_color: "#fefce8",
      background_color: "#fefce8",
      display: "standalone",
    }),
  };
}
