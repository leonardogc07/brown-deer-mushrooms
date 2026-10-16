# Mushroom guide style

Every variety page uses the same quick-reference layout. Recolor the printed-chart structure with the site palette in `site/css/site.css`: `--color-brand`, `--color-brand-dark`, `--color-bg`, and `--color-text`. That reads as forest-brown type, cream paper, and tan notes. Do not add a new palette.

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

- **Section titles.** No full-width dark bands. Titles use Fraunces (loaded from Google Fonts in `guide.css`), brand-dark text, and a short thin brand-colored rule under the words. The page title uses the same treatment at a larger size. A small uppercase kicker above the title is fine.
- **Hero.** A variety page opens with one large photo of the mushroom, full content width, cropped with `object-fit: cover` so a tall farm photo does not push the title off a phone screen. Put new farm photos in `site/public/assets/images/`.
- **Numbered rules.** Steps and hard rules use a large brand-colored numeral beside the sentence, not a small bullet. On desktop they sit in columns.
- **Corner radius.** Homepage mushroom cards use `10px`. That value lives once as `--radius-card` in `site/css/site.css`. Guide photos, cards, and videos use `var(--radius-card)`.
- **Cutout photos.** A recipe photo that sits inside a recipe card stays a small round cutout (the uneven round radius). No frame and no caption box. A photo that is not inside a card is a rounded rectangle at `--radius-card`.
- **Farm video.** A harvest clip sits in How We Grow It: `video` with `muted`, `playsinline`, `loop`, `autoplay`, `controls`, and `preload="metadata"`, poster set to the hero photo, and one plain caption. Round the video with `--radius-card`. Do not add a soundtrack.
- **Columns.** Desktop is three columns, tablet is two, phone is one. Keep copy dense. Spacing stays tight and still readable.
- **Recipe cards.** Each recipe is its own card: soft cream or tan background, `--radius-card` corners, a subtle shadow is allowed. Keep the photo, title, text, and links. Place the cards in a grid: three columns on desktop, two on tablet, one on a phone.
- **Other sections.** Do not box the rest of the guide. No borders or drop shadows on section titles, rules, or open columns.
- **Callouts.** A storage or caution note is a tinted cream-tan background only. No outline and no shadow.
- **Difficulty badges.** A growing-difficulty line is a badge group, not a sentence. Label the group "Growing difficulty". Each level is a text pill, such as "Easy with a kit" and "Harder from scratch", with a small dot meter beside the words. The words are real text so the group is readable without the dots.
- **Links.** Grow-kit mentions link to `/contact-us.html` and never include a price.
