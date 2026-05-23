export const VoxelMark = ({ size = 14, color = "var(--ev-500)", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="4 4 52 56"
    style={{ display: "inline-block", verticalAlign: "-2px", flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round">
      <polygon points="30,4 56,18 30,32 4,18" />
      <polygon points="4,18 30,32 30,60 4,46" />
      <polygon points="56,18 30,32 30,60 56,46" />
    </g>
  </svg>
);

export const VoxelCluster = ({ size = 60, color = "var(--ev-600)", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    style={{ display: "block", ...style }}
    aria-hidden="true"
  >
    <g fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" opacity="0.6">
      <polygon points="40,40 60,50 40,60 20,50" />
      <polygon points="20,50 40,60 40,76 20,66" />
      <polygon points="60,50 40,60 40,76 60,66" />
      <polygon points="40,12 60,22 40,32 20,22" />
      <polygon points="20,22 40,32 40,48 20,38" />
      <polygon points="60,22 40,32 40,48 60,38" />
    </g>
  </svg>
);
