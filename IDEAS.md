# IDEAS

Design ideas accepted but not yet built. Source: design review on 2026-05-23.

Status legend: **pinned** = deferred, do later · **accepted** = approved direction, build when ready · **shipped** = built and live · **rejected** = considered and dropped.

---

## Cubes as containers (shipped, v1)

**Built 2026-05-23.** Card itself = the front face of a 10px-extruded cube; top + right faces recede into the screen as parallelograms in sage (ev-200) and spruce (ev-500). Sharp corners, ev-700 forest outline, big mono index stamped upper-left on the front face. Hover: ~1.5° rotateY + ~1° rotateX with the perspective set on the grid, top face brightens to ev-100. Set as the default `CARD_STYLE` in `App.jsx`.

**Files involved.** `ProjectCard.jsx` (new `voxel` case), `styles.css` (`.project-card.voxel`, `.cube-face-top`, `.cube-face-right`, `.cube-index`, `.voxel-grid`), `WorkIndex.jsx` (perspective class on the grid).

**v2 candidates (not built).**
- **Face outlines.** Top + right faces have no border because `clip-path` clips it away. Color contrast carries v1, but proper ev-700 strokes along the back/diagonal edges would tighten the cube reading. Probably an SVG overlay rather than fighting clip-path.
- **Cube depth as a density tweak.** `--cube-depth` is hard-coded to 10px on the card. Could bind to `--density-section` so compact density gets 6px, airy gets 14px.
- **Featured-card treatment.** Currently only the index number color shifts to rust. The right face could also flip to the accent color for featured projects — would make "featured" feel structural, not just textual.

---

## Scroll-triggered cube animations (accepted)

Replace the centered radial-masked `.voxel-top` divider (which is a polite ornament) with cubes that grow out of the section boundary as you scroll past. Section eyebrow glyphs rotate as they enter the viewport. One-shot — does not repeat on scroll-back.

**Why it matters.** The site currently has zero motion. The skill flagged this: one well-orchestrated motion gesture creates more delight than many small ones. Scroll-triggered cube assembly ties the voxel theme to the act of reading the page.

**How to build (rough).**
- `IntersectionObserver` per section, fires once at ~30% visibility.
- SVG `stroke-dasharray` reveal on the cube edges — the cube "draws itself in" over ~400ms.
- Eyebrow `<VoxelMark />` rotates from -20deg to 0deg on enter.
- Respect `prefers-reduced-motion`: skip animations, render the final state.

---

## Voxel-assembly page-load animation (pinned)

On first paint, cubes stack into the brand mark — SVG `stroke-dasharray` reveals the cube edges drawing themselves. ~600ms total, never repeats (session-stored flag). One memorable opening gesture.

**Why pinned, not building yet.** Page-load animations are heavy to get right (must not delay first meaningful paint, must skip on revisits, must respect reduced-motion, must not block interaction). Scroll-triggered animations land first because they're cheaper and reach the same expressive goal.

**How to build (when revisited).**
- Hero `<VoxelMark />` (or a larger voxel-cluster variant) renders with `stroke-dasharray` set to its perimeter and `stroke-dashoffset` animating to 0.
- Stagger the three cube faces (top → left → right) by ~80ms each.
- `sessionStorage` flag so it only plays once per visit.
- `@media (prefers-reduced-motion)` and skip.

---

## Open questions for later

- If "cubes as containers" lands, does the hero `Sam.` headline survive — or does it get replaced with a voxel-constructed wordmark to match?
- Does the project modal stay as a modal, or get promoted to a real `/work/[slug]` route so each project can have its own treatment?
- If we commit harder to voxels, the rust accent might be redundant. Worth a separate session.
