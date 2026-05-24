import { useEffect } from "react";
import { VoxelMark } from "./VoxelMark.jsx";
import { Screenshot } from "./Screenshot.jsx";

export const ProjectFocus = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [project]);

  if (!project) return null;

  const links = project.links || {};
  const externalLinks = [];
  if (links.repo) {
    const href = links.repo.startsWith("http") ? links.repo : `https://${links.repo}`;
    externalLinks.push({ label: "github ↗", href });
  }
  if (links.demo) externalLinks.push({ label: "live demo ↗", href: links.demo });
  if (links.writeup) externalLinks.push({ label: "full writeup ↗", href: links.writeup });

  return (
    <div
      className="focus-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="focus-title"
    >
      <div className="focus-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="focus-close"
          aria-label="Close project view"
        >
          <span aria-hidden="true">esc</span>
        </button>

        <div className="focus-header">
          <span
            className="focus-idx"
            style={{
              color: project.featured
                ? "var(--accent, var(--rust))"
                : "var(--ev-500)",
            }}
          >
            {String(project.idx).padStart(2, "0")}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <span className="eyebrow eyebrow-with-mark">
              <VoxelMark size={11} />
              project · {project.slug || project.title}
            </span>
            <h2 id="focus-title" className="focus-title">
              {project.title}
            </h2>
          </div>
        </div>

        <Screenshot project={project} />

        <p className="lede" style={{ marginTop: -4 }}>
          {project.longBlurb || project.blurb}
        </p>

        {project.writeup && (
          <div
            className="writeup"
            dangerouslySetInnerHTML={{ __html: project.writeup }}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 18,
            background: "var(--ev-50)",
            borderRadius: 6,
            border: "1px solid var(--ev-200)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ev-600)",
            }}
          >
            metadata
          </span>
          <div className="focus-meta-grid">
            <div>
              <b style={{ color: "var(--ev-700)" }}>tags</b>
              <br />
              {project.tags.join(" · ")}
            </div>
            <div>
              <b style={{ color: "var(--ev-700)" }}>version</b>
              <br />
              {project.meta}
            </div>
            <div>
              <b style={{ color: "var(--ev-700)" }}>status</b>
              <br />
              {project.status}
            </div>
          </div>
          {project.stack && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-700)",
                marginTop: 4,
              }}
            >
              <b style={{ color: "var(--ev-700)" }}>stack</b>
              <br />
              {project.stack}
            </div>
          )}
        </div>

        {externalLinks.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {externalLinks.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={i === 0 ? "btn-primary" : "btn-ghost"}
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
