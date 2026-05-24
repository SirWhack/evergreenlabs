import { VoxelMark } from "./VoxelMark.jsx";
import { Screenshot } from "./Screenshot.jsx";

export const ProjectFocus = ({ project, onClose }) => {
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
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(14,38,24,0.5)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "48px 24px",
        overflowY: "auto",
        animation: "evFade 220ms cubic-bezier(0.22,0.61,0.36,1)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--paper-50)",
          border: "1px solid var(--paper-300)",
          borderRadius: 8,
          maxWidth: 760,
          width: "100%",
          padding: "40px 48px 48px",
          boxShadow: "0 8px 24px rgba(20,20,15,0.08), 0 2px 6px rgba(20,20,15,0.04)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          position: "relative",
          animation: "evPop 220ms cubic-bezier(0.22,0.61,0.36,1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            padding: "4px 10px",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-500)",
            border: "1px solid var(--paper-300)",
            borderRadius: 999,
          }}
        >
          esc
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 28,
              fontWeight: 600,
              color: project.featured
                ? "var(--accent, var(--rust))"
                : "var(--ev-500)",
              letterSpacing: "-0.01em",
              minWidth: 44,
            }}
          >
            {String(project.idx).padStart(2, "0")}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="eyebrow eyebrow-with-mark">
              <VoxelMark size={11} />
              project · {project.slug || project.title}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 40,
                fontWeight: 500,
                color: "var(--ev-700)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
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
