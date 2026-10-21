import { resolve } from "node:path";
import { defineConfig } from "vite";
import { cloudflareWebAnalytics, htmlPartials } from "./scripts/html-partials.js";

function extensionlessPages() {
  const routes = {
    "/pickup": "/pickup.html",
    "/pickup/": "/pickup.html",
    "/pickup-thanks": "/pickup-thanks.html",
    "/pickup-thanks/": "/pickup-thanks.html",
  };

  const rewrite = (req, _res, next) => {
    const path = req.url.split("?")[0];
    if (routes[path]) {
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      req.url = routes[path] + query;
    }
    next();
  };

  return {
    name: "extensionless-pages",
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [extensionlessPages(), htmlPartials(), cloudflareWebAnalytics()],
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
        pickup: resolve(__dirname, "pickup.html"),
        pickupThanks: resolve(__dirname, "pickup-thanks.html"),
        guide: resolve(__dirname, "guide/index.html"),
        guideLionsMane: resolve(__dirname, "guide/lions-mane.html"),
        guideOyster: resolve(__dirname, "guide/oyster.html"),
        guideChestnut: resolve(__dirname, "guide/chestnut.html"),
        guideGoldenEnoki: resolve(__dirname, "guide/golden-enoki.html"),
      },
    },
  },
});
