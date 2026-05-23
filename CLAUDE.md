# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve dist/ locally
```

No tests, no linter, no formatter are configured.

## Architecture

Single-page Vite + React (JS, no TypeScript) port of a Claude Design prototype. Render path is `index.html` → `src/main.jsx` → `src/App.jsx` → section components. Components are plain function components with inline styles for one-off layout and class names for tokens shared with the design system.

**Content is the API.** Everything visible on the site reads from a single named export in `src/content/siteData.js` (`profile`, `now`, `projects[]`, `log[]`). Schema and per-field comments are at the top of that file. A build pipeline only ever needs to rewrite this one file — components do not need to be touched. HTML-bearing fields (`now.text`, `log[].body`, `project.writeup`) are rendered with `dangerouslySetInnerHTML`; the content file is treated as trusted input.

**Design tokens live in two CSS files** loaded once in `main.jsx`:
- `src/styles/colors_and_type.css` — the Evergreen Labs palette, type scale, spacing, shadows, motion as `:root` CSS variables.
- `src/styles/styles.css` — page-level rules built on top of those tokens. Density variants are switched via `:root[data-density="compact|airy"]`. The `--accent` variable is the one knob that color-shifts featured elements (rust by default).

**Voxel motif** is the recurring design device — same construction as the brand mark. It appears three ways: as a typographic glyph (`<VoxelMark />` SVG before each section eyebrow), as a CSS background pattern (`/assets/pattern-cubes.svg` referenced by `.cube-bg`, `.cube-band`, and `Screenshot`'s placeholder), and as the favicon (`mark-tree-primary.png`).

**Static assets** live in `public/assets/` and are referenced with absolute paths (`/assets/...`) from both JSX and CSS `url()`. Anything relative will break in Vite — when adding screenshots, drop them in `public/assets/screenshots/` and reference as `/assets/screenshots/<file>` from a project's `screenshot` field.

**Baked-in design choices** (constants in `src/App.jsx`): `ACCENT = "#c46b3a"` (rust) and `CARD_STYLE = "minimal"`. The original prototype shipped a runtime Tweaks panel exposing accent / density / card style / show-currently-building; that panel was intentionally dropped for production. The prototype is preserved at `evergreen-labs-website/` (gitignored) — `evergreen-labs-website/project/tweaks-panel.jsx` is where the dropped panel lives if it ever needs to come back.

**App.jsx owns three side effects:** writing `--accent` to `:root`, a scroll listener that highlights the active nav item, and a global `Escape` keydown handler that closes the `ProjectFocus` overlay. The overlay is an in-page modal — there is no routing.
