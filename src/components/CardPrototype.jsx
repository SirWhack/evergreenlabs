/* CardPrototype — temporary A/B compare strip for evaluating the voxel-card
   variant against the current minimal card. Mounted above the Work grid.
   Delete this file (and its mount in WorkIndex.jsx) once a direction is picked. */
import { SITE } from "../content/siteData.js";
import { ProjectCard } from "./ProjectCard.jsx";

export const CardPrototype = () => {
  const sample = SITE.projects[0];
  if (!sample) return null;

  return (
    <section
      style={{
        margin: "0 0 40px",
        padding: "24px 24px 28px",
        border: "1px dashed var(--paper-300)",
        borderRadius: 8,
        background:
          "repeating-linear-gradient(135deg, transparent 0 8px, rgba(20,20,15,0.015) 8px 9px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 16,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--clay)",
            fontWeight: 600,
          }}
        >
          prototype · cubes-as-containers
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-500)",
          }}
        >
          delete src/components/CardPrototype.jsx to remove
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--density-gap)",
        }}
      >
        <div>
          <Label text="voxel (new)" />
          <ProjectCard project={sample} variant="voxel" onClick={() => {}} />
        </div>
        <div>
          <Label text="minimal (current)" />
          <ProjectCard project={sample} variant="minimal" onClick={() => {}} />
        </div>
      </div>
    </section>
  );
};

const Label = ({ text }) => (
  <div
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--ink-500)",
      marginBottom: 8,
    }}
  >
    {text}
  </div>
);
