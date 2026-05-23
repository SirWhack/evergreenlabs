import { useState } from "react";

export const Screenshot = ({ project, aspect = "16 / 10", style = {} }) => {
  const [errored, setErrored] = useState(false);
  const hasImage = project.screenshot && !errored;

  if (hasImage) {
    return (
      <img
        src={project.screenshot}
        alt={`${project.title} screenshot`}
        onError={() => setErrored(true)}
        style={{
          width: "100%",
          aspectRatio: aspect,
          objectFit: "cover",
          borderRadius: 6,
          border: "1px solid var(--paper-200)",
          background: "var(--paper-100)",
          display: "block",
          ...style,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: aspect,
        border: "1px solid var(--paper-200)",
        borderRadius: 6,
        background: "url('/assets/pattern-cubes.svg') var(--paper-100)",
        backgroundSize: "60px 52px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(251,250,246,0.3), rgba(251,250,246,0.7))",
        }}
      />
      <span
        style={{
          position: "relative",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ink-500)",
          background: "var(--paper-50)",
          padding: "5px 10px",
          border: "1px solid var(--paper-300)",
          borderRadius: 999,
        }}
      >
        {project.slug || project.title} · screenshot
      </span>
    </div>
  );
};
