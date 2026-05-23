import { SITE } from "../content/siteData.js";

export const Footer = () => {
  const { name } = SITE.profile;
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        padding: "48px 0 64px",
        borderTop: "1px solid var(--paper-200)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        position: "relative",
      }}
    >
      <div
        className="cube-band"
        style={{ position: "absolute", top: -27, left: 0, right: 0 }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.04em",
          color: "var(--ink-500)",
        }}
      >
        {(name || "sam").toLowerCase()} · {year}
      </span>
      <a
        href="/feed.xml"
        onClick={(e) => e.preventDefault()}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-500)",
          letterSpacing: "0.04em",
        }}
      >
        rss
      </a>
    </footer>
  );
};
