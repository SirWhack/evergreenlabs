import { SITE } from "../content/siteData.js";
import { ContributionCubes } from "./ContributionCubes.jsx";

export const Hero = () => {
  const { name, location, headline } = SITE.profile;
  return (
    <header style={{ padding: "var(--density-hero)", position: "relative", overflow: "hidden" }}>
      <ContributionCubes />
      <div className="hero-grid" style={{ pointerEvents: "none" }}>
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
