import { SITE } from "../content/siteData.js";
import { VoxelMark } from "./VoxelMark.jsx";

export const TinkeringLog = () => {
  const entries = SITE.log || [];
  if (entries.length === 0) return null;

  return (
    <section id="log" className="section">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="eyebrow eyebrow-with-mark">
            <VoxelMark size={12} />
            03 / log
          </span>
          <h2 className="h1">Log</h2>
        </div>
        <span className="meta">small notes, mostly to remember what I tried</span>
      </div>

      <div style={{ borderTop: "1px solid var(--paper-200)" }}>
        {entries.map((entry, i) => (
          <div key={i} className="log-entry">
            <div className="log-date">
              <div style={{ color: "var(--ev-700)", fontWeight: 500 }}>{entry.date}</div>
              <div style={{ color: "var(--ink-300)", marginTop: 2 }}>{entry.year}</div>
            </div>
            <div className="log-body">
              <p dangerouslySetInnerHTML={{ __html: entry.body }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
