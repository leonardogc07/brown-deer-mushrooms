# Brown Deer Mushrooms — website

Refactored static site for [browndeermushrooms.com](https://browndeermushrooms.com): shared CSS, consistent asset paths, and Vite for local dev and production builds.

## Project layout

```
site/
├── css/site.css          # Shared styles (all pages)
├── partials/
│   ├── header.html       # Shared header (index is the template)
│   └── footer.html       # Shared footer
├── scripts/html-partials.js  # Injects partials at build/dev time
├── index.html            # Homepage
├── recipes.html          # Recipe index (external links by variety)
├── shop.html             # Shop (products rendered from JSON)
├── js/shop.js            # Fetches products and builds product cards
├── public/data/products.json  # Product catalog — add items here
├── contact-us.html       # Order / contact forms
├── thank-you.html        # Form success page
├── public/
│   ├── favicon.ico
│   └── assets/images/    # Lowercase, URL-safe filenames
├── package.json
├── vite.config.js
└── netlify.toml
```

## Asset naming

Images use lowercase extensions and hyphenated names (works on case-sensitive hosts like Netlify/Linux):

| File | Used for |
|------|----------|
| `logo.png` | Logo, social preview |
| `header-bg.png` | Hero background |
| `chestnut.jpg`, `oyster.jpg`, `lionsmane.jpg`, `golden-enoki.png` | Product photos |
| `bdmvideo.mp4` | Benefits section video |

## Shared header & footer

Each page includes partials with HTML comments (processed by Vite, not visible in the browser):

```html
<!-- @include partials/header.html home -->
<!-- @include partials/footer.html -->
```

Header variants (same markup as `index.html`, different layout):

| Variant   | Used on        | Behavior                                      |
|-----------|----------------|-----------------------------------------------|
| `home`    | `index.html`   | Full hero, logo, weekly email CTA             |
| `compact` | `contact-us.html` | Shorter hero, logo links home              |
| `minimal` | `thank-you.html`  | Simple bar, logo links home, no background |

Edit `partials/header.html` or `partials/footer.html` once to update every page.

## Commands

```bash
cd site
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
npm run preview  # preview production build
```

## Shop & Stripe

Products live in `public/data/products.json`. Each entry needs:

`id`, `title`, `price`, `description`, `imageUrl`, `stripePaymentLink`

To add a product, append a new object to the JSON array and redeploy. Put images in `public/assets/images/`.

Replace `"stripePaymentLink": "#"` with your [Stripe Payment Link](https://dashboard.stripe.com/payment-links) URL (e.g. `https://buy.stripe.com/...`).

## Deploy (Netlify)

1. Connect this repo (or deploy only the `site/` directory).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Forms use `data-netlify="true"` — ensure Netlify Forms is enabled on the site.

The legacy HTML at the repo root is unchanged; this `site/` folder is the maintained version.
