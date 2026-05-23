import { HexBadge } from "./HexBadge.jsx";

export const ProjectCard = ({ project, variant = "hex", onClick }) => {
  const { idx, title, blurb, tags = [], meta, featured } = project;
  const padIdx = String(idx).padStart(2, "0");

  if (variant === "list") {
    return (
      <article className="project-card list" onClick={onClick}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: featured ? "var(--accent, var(--rust))" : "var(--ev-500)",
            letterSpacing: "0.04em",
          }}
        >
          {padIdx}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
            <h3 className="h3">{title}</h3>
            {featured && <span className="tag featured">featured</span>}
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--ink-700)",
            }}
          >
            {blurb}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            justifySelf: "end",
            alignSelf: "start",
            paddingTop: 4,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            maxWidth: 220,
          }}
        >
          {tags.slice(0, 2).map((t) => (
            <span key={t} className="tag muted">
              {t}
            </span>
          ))}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-500)",
              width: "100%",
              textAlign: "right",
              marginTop: 2,
            }}
          >
            {meta}
          </span>
        </div>
      </article>
    );
  }

  if (variant === "minimal") {
    return (
      <article
        className="project-card minimal"
        onClick={onClick}
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: featured ? "var(--accent, var(--rust))" : "var(--ev-500)",
            letterSpacing: "0.04em",
            paddingTop: 2,
            fontWeight: 600,
          }}
        >
          {padIdx}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h3 className="h3">{title}</h3>
            {featured && <span className="tag featured">featured</span>}
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--ink-700)",
            }}
          >
            {blurb}
          </p>
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 4,
            }}
          >
            {tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
            <span style={{ flex: 1 }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-500)",
              }}
            >
              {meta}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="project-card" onClick={onClick}>
      <HexBadge size={48} fill={featured ? "var(--accent, var(--rust))" : "var(--ev-600)"}>
        {padIdx}
      </HexBadge>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 className="h3">{title}</h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--ink-700)",
          }}
        >
          {blurb}
        </p>
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 4,
          }}
        >
          {tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
          <span style={{ flex: 1 }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-500)",
            }}
          >
            {meta}
          </span>
        </div>
      </div>
    </article>
  );
};
