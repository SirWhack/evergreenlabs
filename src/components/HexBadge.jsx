export const HexBadge = ({
  size = 48,
  children,
  framed = false,
  fill = "var(--ev-600)",
  color = "var(--paper-50)",
  style = {},
}) => {
  const clip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
  if (framed) {
    return (
      <div style={{ position: "relative", width: size, height: size, ...style }}>
        <div style={{ position: "absolute", inset: 0, clipPath: clip, background: fill }} />
        <div
          style={{
            position: "absolute",
            inset: Math.max(2, Math.round(size * 0.03)),
            clipPath: clip,
            background: "var(--paper-50)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ev-700)",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: size * 0.22,
            letterSpacing: "0.04em",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        clipPath: clip,
        background: fill,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        fontSize: size * 0.24,
        letterSpacing: "0.04em",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
