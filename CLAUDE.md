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
events.html         # Events listing (reads from events-data.js)
team.html           # Team member profiles
404.html            # Custom error page
events-data.js      # Event data as a JS object
_headers            # HTTP caching and security headers
robots.txt          # SEO + AI crawler directives
sitemap.xml         # XML sitemap
site.webmanifest    # PWA manifest
assets/
  images/           # OG image, team photos (WebP)
  favicons/         # Multi-size favicon set
```

## Editing Guidelines

- **Styles are embedded** in each HTML file — there is no shared stylesheet. Look for `<style>` blocks inside the file you're editing.
- **Events** are driven by `events-data.js`. Add/edit events there; the page renders from that data.
- **Images**: Use `.webp` for team photos. OG image is `assets/images/og-image.png`.
- **SEO**: Each page has extensive `<meta>` tags, JSON-LD structured data, and Open Graph tags. Update them when changing page content or titles.
- **Sitemap**: Update `sitemap.xml` when adding or removing pages, and when major content changes occur.

## Deployment

No build step — push to `main` and Vercel deploys automatically.

## What to Avoid

- Do not introduce external dependencies, npm packages, or a build process.
- Do not split CSS into separate files unless explicitly asked — the embedded style approach is intentional.
- Do not add frameworks (React, Vue, etc.).
- Do not modify `robots.txt` AI-crawler blocks or the `_headers` security policy without explicit instruction.
