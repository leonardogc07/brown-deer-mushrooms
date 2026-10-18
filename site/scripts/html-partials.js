import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const partialsDir = resolve(rootDir, "partials");

const INCLUDE_RE = /<!--\s*@include\s+([\w./-]+)(?:\s+(\w+))?\s*-->/g;

// Injected after Vite's HTML transform so the external beacon is not bundled or rewritten.
const CF_BEACON =
  "<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{\"token\": \"ceb15db0f15d446aa2f193936f321819\"}'></script><!-- End Cloudflare Web Analytics -->";

const HEADER_VARIANTS = {
  home: {
    headerClass: "",
    background: true,
    logoLink: false,
    logoStatic: true,
    nav: true,
    cta: true,
    imageAttrs: 'fetchpriority="high"',
  },
  compact: {
    headerClass: " site-header--compact",
    background: true,
    logoLink: true,
    logoStatic: false,
    nav: true,
    cta: false,
    imageAttrs: "",
  },
  minimal: {
    headerClass: " site-header--minimal",
    background: false,
    logoLink: true,
    logoStatic: false,
    nav: true,
    cta: false,
    imageAttrs: "",
  },
};

function renderTemplate(template, vars) {
  const withBlocks = template.replace(
    /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g,
    (_, key, block) => (vars[key] ? block : ""),
  );

  return withBlocks.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? "");
}

function loadPartial(relativePath, variant) {
  const filePath = resolve(rootDir, relativePath);
  let content = readFileSync(filePath, "utf-8");

  if (relativePath === "partials/header.html") {
    const preset = HEADER_VARIANTS[variant ?? "home"] ?? HEADER_VARIANTS.home;
    content = renderTemplate(content, preset);
  }

  return content;
}

export function htmlPartials() {
  return {
    name: "html-partials",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(INCLUDE_RE, (_, partialPath, variant) =>
          loadPartial(partialPath, variant),
        );
      },
    },
  };
}

export function cloudflareWebAnalytics() {
  return {
    name: "cloudflare-web-analytics",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        if (html.includes("static.cloudflareinsights.com/beacon.min.js")) {
          return html;
        }
        if (!html.includes("</body>")) {
          return html;
        }
        return html.replace("</body>", `${CF_BEACON}</body>`);
      },
    },
  };
}
