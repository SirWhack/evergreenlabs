import { SITE } from "../content/siteData.js";

export const Hero = () => {
  const { name, location, headline } = SITE.profile;
  return (
    <header style={{ padding: "var(--density-hero)", position: "relative", overflow: "hidden" }}>
      <div
        className="cube-bg"
        style={{
          top: -20,
          right: -80,
          width: 460,
          height: 380,
          WebkitMaskImage: "radial-gradient(circle at 72% 38%, black 22%, transparent 68%)",
          maskImage: "radial-gradient(circle at 72% 38%, black 22%, transparent 68%)",
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 64,
          alignItems: "end",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 720 }}>
          <span className="eyebrow">
            {[name, location].filter(Boolean).join(" · ").toLowerCase()}
          </span>
          <h1 className="h-display">{name}.</h1>
          <p className="lede" style={{ marginTop: -8 }}>
            {headline}
          </p>
        </div>
        <img
          src="/assets/mark-tree-primary.png"
          alt=""
          style={{
            width: 96,
            height: 96,
            objectFit: "contain",
            opacity: 0.9,
            alignSelf: "end",
            marginBottom: 6,
          }}
        />
      </div>
    </header>
  );
};
