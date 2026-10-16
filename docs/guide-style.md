# Mushroom guide style

Every variety page uses the same quick-reference layout. Recolor the printed-chart structure with the site palette in `site/css/site.css`: `--color-brand`, `--color-brand-dark`, `--color-bg`, and `--color-text`. That reads as forest-brown bands, cream paper, and tan notes. Do not add a new palette.

Shared rules live in `site/guide/guide.css`. Link it after `site.css` on every guide page.

## Page sections

Use these headings, in this order, on each variety page. If a fact is missing, leave the section short. Do not invent growing methods, prices, or health claims.

1. Meet the Mushroom
2. How We Grow It
3. Storage
4. How to Cook It
5. Recipes
6. Grow It at Home

## Layout

- **Strip headers.** Each section title is a full-width band: brand background, white uppercase label, tight vertical padding. The page title can use the same band.
- **Numbered rules.** Steps and hard rules use a large brand-colored numeral beside the sentence, not a small bullet.
- **Cutout photos.** Use only images already in `site/public/assets/images/`. Float a small photo in the text. No frame, no card, no caption box.
- **Columns.** Desktop is three columns, tablet is two, phone is one. Keep copy dense. Spacing stays tight and still readable.
- **No cards.** Do not use borders, drop shadows, or boxed tiles for guide sections.
- **Callouts.** A storage or caution note is a tinted cream-tan background only. No outline and no shadow.
- **Links.** Grow-kit mentions link to `/contact-us.html` and never include a price.
