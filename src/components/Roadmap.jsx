import { SITE } from "../content/siteData.js";
import { VoxelMark } from "./VoxelMark.jsx";

const STATUS_ORDER = ["In Progress", "Blocked", "Todo", "Backlog", "Untriaged"];

const groupByStatus = (items) => {
  const buckets = new Map();
  for (const it of items) {
    const k = it.status || "Untriaged";
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(it);
  }
  return [...buckets.entries()].sort(
    ([a], [b]) => STATUS_ORDER.indexOf(a) - STATUS_ORDER.indexOf(b)
  );
};

export const Roadmap = () => {
  const items = SITE.roadmap || [];
  if (items.length === 0) return null;

  const groups = groupByStatus(items);

  return (
    <section id="next" className="section">
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
            02 / next
          </span>
          <h2 className="h1">Next</h2>
        </div>
        <span className="meta">what's queued, from the project board</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {groups.map(([status, list]) => (
          <div key={status}>
            <div
              className="meta"
              style={{
                marginBottom: 12,
                color: "var(--ev-700)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontSize: 11,
              }}
            >
              {status} · {list.length}
            </div>
            <div style={{ borderTop: "1px solid var(--paper-200)" }}>
              {list.map((it) => (
                <div
                  key={it.id}
                  className="log-entry"
                  style={{ gridTemplateColumns: "minmax(0, 1fr)" }}
                >
                  <div className="log-body">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 15,
                          color: "var(--ev-800)",
                          fontWeight: 500,
                        }}
                      >
                        {it.url ? (
                          <a
                            href={it.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {it.title}
                          </a>
                        ) : (
                          it.title
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--ink-300)",
                        }}
                      >
                        {it.kind && <span>{it.kind}</span>}
                        {it.priority && <span>· {it.priority}</span>}
                        {it.repo && <span>· {it.repo.split("/").pop()}</span>}
                      </div>
                    </div>
                    {it.commentary && (
                      <p
                        style={{
                          marginTop: 6,
                          color: "var(--ink-400)",
                          fontSize: 14,
                          lineHeight: 1.5,
                        }}
                      >
                        {it.commentary}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
