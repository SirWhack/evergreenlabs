import { useMemo, useState } from "react";
import { SITE } from "../content/siteData.js";
import { WorkMark } from "./VoxelMark.jsx";
import { ProjectCard } from "./ProjectCard.jsx";

export const WorkIndex = ({ onOpenProject, cardStyle = "hex" }) => {
  const [filter, setFilter] = useState("ALL");
  const projects = SITE.projects;

  const allTags = useMemo(() => {
    const t = new Set();
    projects.forEach((p) => p.tags.forEach((tag) => t.add(tag)));
    return ["ALL", ...Array.from(t)];
  }, [projects]);

  const visible = filter === "ALL" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="work" className="section">
      <div className="section-header">
        <div className="section-header-title">
          <WorkMark />
          <span className="eyebrow">01 / work</span>
        </div>
        <span className="meta">
          {visible.length} {visible.length === 1 ? "entry" : "entries"} · sorted newest first
        </span>
      </div>

      <div className="filter-bar" style={{ marginBottom: 24 }}>
        {allTags.map((t) => (
          <button
            key={t}
            className={"filter-chip" + (filter === t ? " active" : "")}
            onClick={() => setFilter(t)}
          >
            {t.toLowerCase()}
          </button>
        ))}
      </div>

      <div
        className={
          "work-grid" +
          (cardStyle === "voxel" ? " voxel-grid" : "") +
          (cardStyle === "list" ? " list-layout" : "")
        }
      >
        {visible.map((p) => (
          <ProjectCard
            key={p.idx}
            project={p}
            variant={cardStyle}
            onClick={() => onOpenProject(p)}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--ink-500)",
            padding: "32px 0",
            textAlign: "center",
          }}
        >
          nothing tagged <code>{filter.toLowerCase()}</code> yet.
        </p>
      )}
    </section>
  );
};
