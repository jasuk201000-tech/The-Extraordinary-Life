# The Extra Ordinary Life

Marketing website for a psychology & self-development seminar organisation for
**13–25 year olds in Canberra, ACT**. Designed to feel emotionally intelligent,
warm, modern and trustworthy — never salesy.

The site is organised around the brand's **Four-Stage Staircase** framework
(Self-Belief → Perspective → Connection → Meaning), with the paper-plane
wordmark logo, participant stories, and pull-quote banner interludes.

**Live:** <https://theextraordinary.life> · hosted on GitHub Pages from `main`.

## Run it

Static site, no build step. Open `index.html`, or serve the folder:

```bash
node .claude/static-server.js   # http://localhost:4321 (auto-picks a free port)
```

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — trust, the interactive Four-Stage Staircase, session arc, stories |
| `the-experience.html` | Step-by-step walkthrough of a session + what we'll never do |
| `the-programme.html` | Philosophy, the framework, principles, promise to parents (`#parents`) |
| `stories.html` | Participant testimonials, in their own words |
| `apply.html` | Booking (Calendly) and contact details |
| `privacy.html` | Privacy policy — Australian Privacy Principles |
| `safeguarding.html` | Safeguarding commitments and how to raise a concern |
| `404.html` | Not-found page (GitHub Pages serves this automatically) |

Sessions are **$30**. The Four-Stage Staircase and the session arc are
click-to-expand (progressive enhancement — full text shows if JS is off).

## Structure

```
assets/
  css/styles.css   Design system (tokens, components, responsive)
  js/main.js       Header, mobile menu, scroll reveals, disclosures, Calendly
  img/*.webp       Photography (WebP, with .jpeg fallbacks via <picture>)
  img/*.svg        Lightweight illustration placeholders
CNAME              Custom domain for GitHub Pages
robots.txt         Points crawlers at the sitemap
sitemap.xml        All indexable URLs
```

## Bookings (Calendly)

There are **no forms on this site**. Every "Save your place" button opens a
Calendly popup, wired once in `assets/js/main.js`. Calendly's assets are loaded
**on first interaction** (hover/focus warms the connection, click opens the
popup) so visitors who never book never pay the download cost. If the widget is
blocked, the button falls back to its `href`.

To change the event or theme, edit the single `CAL_URL` constant in that block.

## SEO & local search

- Per-page `<title>`, meta description, canonical, Open Graph and Twitter cards
- JSON-LD: `LocalBusiness` + `EducationalOrganization`, `WebSite`, `Course`,
  and `BreadcrumbList`, all scoped to Canberra / ACT
- `robots.txt` + `sitemap.xml`, `lang="en-AU"`, `geo.*` meta tags

**Still to do by hand:** claim the Google Business Profile for Canberra, and
add real social URLs (the placeholder icons were removed rather than left
pointing at `#`).

## Accessibility

Targets WCAG 2.1 AA: skip link, `<main>` landmark, visible focus rings, 44px
touch targets, AA contrast throughout, `prefers-reduced-motion` respected, and
the expand/collapse blocks use real `<button>` elements with
`aria-expanded`/`aria-controls`. The mobile menu traps focus and closes on
<kbd>Esc</kbd>.

## Design notes

Minimalist and banner-led, styled after the clean look of
[unyouth.org.au](https://unyouth.org.au/).

- **Palette** — warm ivory surfaces, deep teal grounding, gold accents. Applied
  minimally: mostly white space, colour reserved for banner bands and a single
  gold accent.
- **Type** — **Sora** (display) + **Inter** (body), loaded via `<link>` in each
  page's `<head>`. Do not move these back into a CSS `@import` — that serialises
  the request behind the stylesheet and blocks first paint.
- **Banner bands** — full-bleed colour blocks (`.band` + `.band--coral/teal/…`)
  with a bold heading, one short line, and a single CTA.

## Known gaps

- Contact email is `hello@extraordinarylife.org` but the site is
  `theextraordinary.life` — worth aligning.
- `privacy.html` and `safeguarding.html` contain `[confirm]` markers for details
  only the organisation can supply (ABN, WWVP registration, retention periods).
- Header/nav/footer markup is duplicated across every page. A small static-site
  generator would remove a whole class of merge conflict.
