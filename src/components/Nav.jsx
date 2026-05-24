import { SITE } from "../content/siteData.js";

export const Nav = ({ active = "work", onNav = () => {} }) => {
  const { name, links } = SITE.profile;
  const items = [
    { key: "work", label: "Work" },
    { key: "next", label: "Next" },
    { key: "log", label: "Log" },
    { key: "about", label: "About" },
  ];
  return (
    <nav className="topnav">
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onNav("top");
        }}
        style={{ display: "flex", alignItems: "center", gap: 10 }}
      >
        <img
          src="/assets/mark-tree-primary.png"
          alt=""
          style={{ width: 26, height: 26, objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: "-0.005em",
            color: "var(--ev-700)",
          }}
        >
          {(name || "sam").toLowerCase()}
        </span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {items.map((it) => (
          <a
            key={it.key}
            href={`#${it.key}`}
            onClick={(e) => {
              e.preventDefault();
              onNav(it.key);
            }}
            className={"topnav-link" + (active === it.key ? " active" : "")}
          >
            {it.label}
          </a>
        ))}
        {links.resume && (
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: 12,
              padding: "6px 10px",
              border: "1px solid var(--paper-300)",
              borderRadius: 999,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ev-600)",
            }}
          >
            ↗ resume
          </a>
        )}
      </div>
    </nav>
  );
};
