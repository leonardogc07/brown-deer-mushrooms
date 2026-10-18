import { resolve } from "node:path";
import { defineConfig } from "vite";
import { cloudflareWebAnalytics, htmlPartials } from "./scripts/html-partials.js";

export default defineConfig({
  plugins: [htmlPartials(), cloudflareWebAnalytics()],
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "contact-us.html"),
        thankYou: resolve(__dirname, "thank-you.html"),
        recipes: resolve(__dirname, "recipes.html"),
        about: resolve(__dirname, "about.html"),
        guide: resolve(__dirname, "guide/index.html"),
        guideLionsMane: resolve(__dirname, "guide/lions-mane.html"),
        guideOyster: resolve(__dirname, "guide/oyster.html"),
        guideChestnut: resolve(__dirname, "guide/chestnut.html"),
      },
    },
  },
});
