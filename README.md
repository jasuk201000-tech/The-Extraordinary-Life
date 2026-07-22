# The Extra Ordinary Life

A premium marketing website for a psychology & self-development seminar
organisation aimed at 16–25 year olds. Designed to feel emotionally
intelligent, warm, modern and trustworthy — never salesy.

The site is organised around the brand's **Four-Stage Staircase** framework
(Self-Belief → Perspective → Connection → Meaning), with the paper-plane
wordmark logo, Before/After testimonials, and pull-quote banner interludes.

## Run it

It's a static site — no build step. Just open `index.html` in a browser, or
serve the folder:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — trust, the interactive Four-Stage Staircase, session arc, stories, FAQ teaser |
| `the-experience.html` | Step-by-step walkthrough of the sessions + what we'll never do |
| `the-programme.html` | Philosophy, the interactive framework, principles, and a promise to parents (`#parents`) |
| `the-team.html` | The people/organisation — placeholder photos, names, roles and bios to fill in |
| `stories.html` | Testimonials and Before/After outcomes |
| `faq.html` | Full FAQ accordion (its own page) |
| `apply.html` | Dates, a gentle no-pressure application form, and contact |

The sessions are **free**. The Four-Stage Staircase and the session arc are
**click-to-expand** (progressive enhancement — full text shows if JS is off).

## Structure

```
assets/
  css/styles.css   Design system (tokens, components, responsive)
  js/main.js       Sticky header, mobile menu, scroll reveals, FAQ, forms
  img/*.svg        Lightweight illustrations & portraits (placeholders)
```

## Design notes (v2 — minimalist, banner-led)

Rebuilt applying two design skills:
[anthropics/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
and [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
styled after the clean, minimalist look of [unyouth.org.au](https://unyouth.org.au/).

- **Palette (kept)** — warm ivory surfaces, deep teal grounding, coral & peach
  accents. Applied *minimally*: mostly white space, colour reserved for the
  banner bands and a single coral accent.
- **Type** — **Sora** (bold geometric display) + **Inter** (body). This is a
  close match for the UN Youth character; swap both `@import` families in
  `styles.css` for the brand's exact licensed fonts if you have them.
- **Banner bands** — the signature UN Youth component: full-bleed colour blocks
  (`.band` + `.band--coral/teal/sage/ink/cream/peach`) with a bold heading,
  one short line, and a single CTA. See the empathy, pricing and final-CTA
  sections on the home page.
- **Skill rules baked in** — SVG icons only (no emoji as icons), one primary
  CTA per band, 4.5:1 contrast, visible `:focus-visible` rings, ≥44–48px touch
  targets, `prefers-reduced-motion` respected, labelled form fields.

The illustrations and portraits are SVG placeholders — swap them for real
photography (people, warm light, candid moments) before launch. Forms are
front-end only; wire `data-demo` / `data-news` submissions to a real backend
or form service.

### Bookings (Calendly)

"Save your place" buttons open a **Calendly popup**. It's wired once in
`assets/js/main.js` (the Calendly block): it injects Calendly's widget
assets, then attaches the popup to every `a.btn` whose label is
"Save your place", falling back to the button's `href` if the widget is
blocked. To change the event or theme, edit the single `CAL_URL` constant in
that block.

### Preview locally

```bash
node .claude/static-server.js   # serves the folder on http://localhost:4321
```
