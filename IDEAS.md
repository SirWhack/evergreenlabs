# IDEAS

Design ideas accepted but not yet built. Source: design review on 2026-05-23.

Status legend: **pinned** = deferred, do later · **accepted** = approved direction, build when ready · **rejected** = considered and dropped.

---

## Cubes as containers (accepted)

Promote the isometric/hex cube from a decorative motif to a structural one. The `HexBadge` component already exists at 48px as a number badge — promote it to the **card itself**. Each project card becomes a hex- or cube-clipped container, with the index carved into the front face of an isometric cube instead of sitting in a corner.

**Why it matters.** The voxel motif is the site's one true differentiator. Using it as background pattern wastes it. Using it as the container forces every visit to encounter the design theory.

**How to build (rough).**
- Extend `HexBadge` (or fork into `CubeCard`) to accept the full card body, not just children inside a 48px clip.
- Variant on `ProjectCard` that uses an isometric three-face SVG outline (the same construction as `VoxelMark`) as the card frame.
- Project number sits on the top face of the cube, title + blurb on the front face. Tags wrap around to the right face (or just sit below if that overcooks it).
- Hover: subtle isometric rotation (~2–3deg) — feels like the cube is being inspected.
- This becomes a fourth `cardStyle` ("voxel"); keep "minimal" as the safer fallback.

**Risk.** Could go from "distinctive" to "gimmicky" if the cube frame fights the text. First prototype should be one card in isolation, judged against the current minimal card.

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
