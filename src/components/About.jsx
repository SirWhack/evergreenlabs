import { useState } from "react";
import { SITE } from "../content/siteData.js";
import { VoxelMark } from "./VoxelMark.jsx";

export const About = () => {
  const { bio, email, links } = SITE.profile;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(email);
    } catch (e) {
      // clipboard not available; ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const socialItems = [];
  if (links.github) socialItems.push({ label: "github", href: links.github });
  if (links.linkedin) socialItems.push({ label: "linkedin", href: links.linkedin });
  if (links.mastodon) socialItems.push({ label: "mastodon", href: links.mastodon });
  if (links.resume) socialItems.push({ label: "resume ↗", href: links.resume });

  return (
    <section id="about" className="section">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 16,
          maxWidth: 640,
        }}
      >
        <span className="eyebrow eyebrow-with-mark">
          <VoxelMark size={12} />
          03 / about
        </span>
        <h2 className="h2">About</h2>
        {bio.map((para, i) => (
          <p key={i} className="body" style={{ marginTop: i === 0 ? 6 : 0 }}>
            {para}
          </p>
        ))}
        <div
          style={{
            display: "flex",
            gap: 18,
            marginTop: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {socialItems.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="mono-link"
            >
              {s.label}
            </a>
          ))}
          {email && (
            <span
              className={"copyable mono-link" + (copied ? " copied" : "")}
              onClick={handleCopy}
              style={{ borderBottomColor: copied ? "var(--ev-500)" : undefined }}
            >
              <span className="copied-flash">copied</span>
              {copied ? "✓ copied" : email}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
