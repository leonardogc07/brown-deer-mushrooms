import { resolve } from "node:path";
import { defineConfig } from "vite";
import { htmlPartials } from "./scripts/html-partials.js";

export default defineConfig({
  plugins: [htmlPartials()],
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
        shop: resolve(__dirname, "shop.html"),
      },
    },
  },
});
