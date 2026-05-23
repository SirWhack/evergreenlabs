import { SITE } from "../content/siteData.js";
import { VoxelMark } from "./VoxelMark.jsx";

export const CurrentlyBuilding = () => {
  const now = SITE.now;
  if (!now || !now.text) return null;

  return (
    <section style={{ padding: "12px 0 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          padding: "14px 0",
          borderTop: "1px solid var(--paper-200)",
          borderBottom: "1px solid var(--paper-200)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-500)",
            whiteSpace: "nowrap",
          }}
        >
          <VoxelMark size={11} color="var(--ink-500)" />
          now —
        </span>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--ink-700)",
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: now.text }}
        />
      </div>
    </section>
  );
};
