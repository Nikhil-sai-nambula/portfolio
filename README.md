# Portfolio - Nikhil Sai Nambula

Personal portfolio site. Next.js 16 (App Router) + React 19 + Tailwind CSS v4,
with Motion for animation and Phosphor icons. Fully static, no tracking.

The only images are real: a screenshot of the live ShopVerse deployment, captured
from the running site.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run lint       # eslint
npx tsc --noEmit   # typecheck
npm run build      # production build -> .next/
npm start          # serve the production build
```

## Editing content

Almost everything lives in one file:

```
src/data/portfolio.ts
```

Profile, contact links, hero stats, marquee items, about copy, skill groups,
experience entries, projects, education and certifications are all plain typed
objects. Change a string there and it updates everywhere it is used.

The résumé PDF served by the "Download résumé" buttons is a static asset at
`public/resume.pdf` - replace that file to ship a new version.

## Structure

```
src/
  app/
    layout.tsx          fonts, SEO metadata, pre-paint theme script
    page.tsx            section composition
    globals.css         design tokens, theme variables, keyframes, utilities
    opengraph-image.tsx generated 1200x630 social preview
    sitemap.ts robots.ts
  components/
    nav.tsx             sticky header, scroll progress, mobile sheet
    hero.tsx            name, role rotator, terminal card, stat strip
    marquee.tsx         infinite tech scroll
    about.tsx skills.tsx experience.tsx projects.tsx journey.tsx contact.tsx
    footer.tsx          back-to-top button
    section.tsx         shared section shell + heading
    reveal.tsx          scroll-reveal wrapper (Motion whileInView)
    use-theme.ts        light/dark toggle (useSyncExternalStore)
  data/portfolio.ts     all site content
```

## Design constraints

These are deliberate and worth preserving if you edit the design:

- **One accent.** `--accent` in `globals.css`. Nothing gets a second accent.
- **One radius scale.** Panels and cards 16px, buttons and inputs 10px, tags 6px,
  full-round only for the availability dot.
- **No em-dashes or en-dashes** in any visible string. Hyphens only.
- **No eyebrow labels above section headlines.** The headline carries the
  message on its own.
- **One label per CTA intent**, defined once in `data/portfolio.ts`.
- **No raw scroll listeners.** Scroll progress reads through Motion's
  `useScroll`; visibility reads use IntersectionObserver.
- **No hand-rolled SVG icons.** Phosphor only.
- **No invented numbers.** Every metric on the page came from the resume.

## Theming

Light and dark are driven entirely by CSS custom properties in
`src/app/globals.css`. Change the values in `:root` and `.dark` to retheme the
whole site. The accent colour is `--accent`.

A small blocking script in `layout.tsx` applies the saved theme before first
paint, so there is no flash of the wrong theme on load.

## Deploy

The site prerenders to a single static route, so any static host works.

**Vercel** - import the repo, leave all defaults.

**GitHub Pages** - build and publish the `out`-style export:

```bash
npm run build
npx serve .next    # or any static server for the .next output
```

Before deploying, update the `metadataBase` URL in `src/app/layout.tsx` and the
`BASE_URL` constants in `src/app/sitemap.ts` and `src/app/robots.ts`.
