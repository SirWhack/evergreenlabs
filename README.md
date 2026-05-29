# evergreenlabs — sam's personal portfolio

The page you land on at evergreenlabs. A single-page Vite + React app (plain JS,
no TypeScript) ported from a Claude Design prototype.

The whole point of the site is that it's **data-driven**: every project, log
entry, roadmap item, and contribution cube reads from one content file, so an
automated pipeline ([evergreenlabs-bot](https://github.com/SirWhack/evergreenlabs-bot))
can keep it current by rewriting that single file — no components are ever
touched.

## Run

```bash
npm install
npm run dev        # Vite dev server on http://localhost:5173
```

## Build

```bash
npm run build      # production build to dist/
npm run preview    # serve dist/ locally
```

There are no tests, linter, or formatter configured.

## How it works

**Content is the API.** Everything visible on the site comes from a single
named export, `SITE`, in [`src/content/siteData.js`](src/content/siteData.js):
`profile`, `now`, `projects[]`, `roadmap[]`, `log[]`, and `contributions`. The
build pipeline only ever needs to rewrite that one file. HTML-bearing fields
(`now.text`, `log[].body`, `project.writeup`) are rendered with
`dangerouslySetInnerHTML` and treated as trusted input.

**Render path:** `index.html` → `src/main.jsx` → `src/App.jsx` → section
components (`Hero`, `WorkIndex`, `Roadmap`, `TinkeringLog`, `About`, …). The
project overlay (`ProjectFocus`) is an in-page modal — there is no routing.

**Design tokens** live in two CSS files loaded once in `main.jsx`:
`src/styles/colors_and_type.css` (the Evergreen Labs palette, type scale,
spacing) and `src/styles/styles.css` (page rules built on those tokens).

**Voxel motif** is the recurring design device: a typographic glyph before each
section eyebrow, a CSS cube background pattern, and the favicon. The hero's
**contribution graph** is built from the same cubes — it reads
`SITE.contributions` and anchors itself to *today*, so the grid scrolls over on
its own as the days pass, even between data refreshes from the bot.

**Static assets** live in `public/assets/` and are referenced with absolute
paths (`/assets/...`). Screenshots go in `public/assets/screenshots/` and are
referenced from a project's `screenshot` field.

## Updating content

Rewrite [`src/content/siteData.js`](src/content/siteData.js); the schema and
per-field comments are documented at the top of that file. In production this is
done by the bot, but the file can be edited by hand too.

## Baked-in design choices

The original prototype shipped a Tweaks panel (accent / density / card style /
show-currently-building). For production those collapsed to constants in
`src/App.jsx`:

- accent: rust (`#c46b3a`) — written to `:root` as `--accent`
- density: regular — the default (CSS in `src/styles/styles.css`)
- card style: `voxel` — passed to `<WorkIndex />`
- "currently building" strip: shown when `SITE.now.text` is non-empty
