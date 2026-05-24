import { SITE } from "../content/siteData.js";
import { LogMark } from "./VoxelMark.jsx";

export const TinkeringLog = () => {
  const entries = SITE.log || [];
  if (entries.length === 0) return null;

  return (
    <section id="log" className="section">
      <div className="section-header">
        <div className="section-header-title">
          <LogMark />
          <span className="eyebrow">03 / log</span>
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
