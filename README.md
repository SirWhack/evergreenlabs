# sam — personal portfolio

Vite + React port of the Claude Design prototype. Single-page; everything visible
lives in `src/content/siteData.js`.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve dist/ locally
```

## Updating content

The build pipeline only needs to rewrite **`src/content/siteData.js`**. The
schema and per-field comments are documented at the top of that file. Drop
screenshots into `public/assets/screenshots/` and reference them by
`/assets/screenshots/<file>` from each project's `screenshot` field.

## Baked-in design choices

The original prototype shipped a Tweaks panel (accent / density / card style /
show-currently-building). For production those collapsed to:

- accent: rust (`#c46b3a`) — set on `:root` in `src/App.jsx`
- density: regular — the default (CSS in `src/styles/styles.css`)
- card style: minimal — passed to `<WorkIndex />` in `src/App.jsx`
- "currently building" strip: shown when `SITE.now.text` is non-empty
