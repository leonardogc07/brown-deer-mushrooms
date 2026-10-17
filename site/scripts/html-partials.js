import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const partialsDir = resolve(rootDir, "partials");

const INCLUDE_RE = /<!--\s*@include\s+([\w./-]+)(?:\s+(\w+))?\s*-->/g;

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
