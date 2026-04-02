# Meridian Website

Static website for The Meridian Society — a student-run speaker forum serving Carleton University, uOttawa, and Algonquin College students in Ottawa, Canada.

Live site: `meridiansociety.ca`
GitHub remote: `https://github.com/meridiansociety/Meridian-Website.git`

## Stack

- Pure HTML5, embedded CSS, vanilla JavaScript — no frameworks, no build step
- Deployed as static files (Vercel, previously Netlify)
- Google Fonts: Cormorant Garamond (serif), Barlow Condensed (sans-serif)

## File Structure

```
index.html          # Homepage
events.html         # Events listing (reads from js/events-data.js)
team.html           # Team member profiles
404.html            # Custom error page
_headers            # HTTP caching and security headers
robots.txt          # SEO + AI crawler directives
sitemap.xml         # XML sitemap
site.webmanifest    # PWA manifest
css/
  base.css          # Reset, design tokens (:root), body, arc-btn, keyframes
  nav.css           # Nav bar, hamburger, mobile drawer
  page.css          # Page header, wrap, section, footer — used by events + team only
js/
  site.js           # Shared JS: register URL, scroll handler, reveal, mobile menu
  events-data.js    # Event data array (EVENTS) — edit here to update events
assets/
  images/           # OG image, team photos (WebP)
  favicons/         # Multi-size favicon set
```

> **Caching note**: `/assets/*` is served with `Cache-Control: immutable` (1 year) via `_headers`.
> CSS and JS files live under `/css/` and `/js/` (not `/assets/`) so edits are visible without cache-busting.

## Editing Guidelines

- **Shared styles** live in `css/base.css`, `css/nav.css`, and `css/page.css` (events + team only). Each HTML file also has a `<style>` block for page-specific styles only.
- **index.html** does not use `page.css` — it has its own footer/hero design embedded in its `<style>` block.
- **Events** are driven by `js/events-data.js`. Add/edit events there; the page renders from that data.
- **Images**: Use `.webp` for team photos. OG image is `assets/images/og-image.png`.
- **SEO**: Each page has extensive `<meta>` tags, JSON-LD structured data, and Open Graph tags. Update them when changing page content or titles.
- **Sitemap**: Update `sitemap.xml` when adding or removing pages, and when major content changes occur.

## Deployment

No build step — push to `main` and Vercel deploys automatically.

## What to Avoid

- Do not introduce external dependencies, npm packages, or a build process.
- Do not add more CSS files beyond `css/base.css`, `css/nav.css`, `css/page.css` unless explicitly asked. Page-specific styles stay embedded in each HTML file's `<style>` block.
- Do not add frameworks (React, Vue, etc.).
- Do not modify `robots.txt` AI-crawler blocks or the `_headers` security policy without explicit instruction.
