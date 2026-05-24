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

/* Per-section voxel glyphs — same isometric construction as the brand mark,
   one cube per section number (01=1, 02=2, 03=3, 04=4).
   Cubes use half-width=7 with a 4-unit gap between, so each cube
   renders at the same screen size and marks widen with cube count. */

export const WorkMark = ({ size = 24, color = "var(--ev-500)", style = {} }) => (
  <svg
    width={size}
    height={(size * 24) / 18}
    viewBox="0 0 18 24"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round">
      {/* one cube at (9,12) */}
      <polygon points="9,4 16,8 9,12 2,8" />
      <polygon points="2,8 9,12 9,20 2,16" />
      <polygon points="16,8 9,12 9,20 16,16" />
    </g>
  </svg>
);

export const NextMark = ({ size = 48, color = "var(--ev-500)", style = {} }) => (
  <svg
    width={size}
    height={(size * 24) / 36}
    viewBox="0 0 36 24"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round">
      {/* two solid cubes */}
      <polygon points="9,4 16,8 9,12 2,8" />
      <polygon points="2,8 9,12 9,20 2,16" />
      <polygon points="16,8 9,12 9,20 16,16" />
      <polygon points="27,4 34,8 27,12 20,8" />
      <polygon points="20,8 27,12 27,20 20,16" />
      <polygon points="34,8 27,12 27,20 34,16" />
    </g>
  </svg>
);

export const LogMark = ({ size = 72, color = "var(--ev-500)", style = {} }) => (
  <svg
    width={size}
    height={(size * 24) / 54}
    viewBox="0 0 54 24"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round">
      {/* three cubes — strip of moments */}
      <polygon points="9,4 16,8 9,12 2,8" />
      <polygon points="2,8 9,12 9,20 2,16" />
      <polygon points="16,8 9,12 9,20 16,16" />
      <polygon points="27,4 34,8 27,12 20,8" />
      <polygon points="20,8 27,12 27,20 20,16" />
      <polygon points="34,8 27,12 27,20 34,16" />
      <polygon points="45,4 52,8 45,12 38,8" />
      <polygon points="38,8 45,12 45,20 38,16" />
      <polygon points="52,8 45,12 45,20 52,16" />
    </g>
  </svg>
);

export const AboutMark = ({ size = 96, color = "var(--ev-500)", style = {} }) => (
  <svg
    width={size}
    height={(size * 24) / 72}
    viewBox="0 0 72 24"
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round">
      {/* four cubes — the assembled self */}
      <polygon points="9,4 16,8 9,12 2,8" />
      <polygon points="2,8 9,12 9,20 2,16" />
      <polygon points="16,8 9,12 9,20 16,16" />
      <polygon points="27,4 34,8 27,12 20,8" />
      <polygon points="20,8 27,12 27,20 20,16" />
      <polygon points="34,8 27,12 27,20 34,16" />
      <polygon points="45,4 52,8 45,12 38,8" />
      <polygon points="38,8 45,12 45,20 38,16" />
      <polygon points="52,8 45,12 45,20 52,16" />
      <polygon points="63,4 70,8 63,12 56,8" />
      <polygon points="56,8 63,12 63,20 56,16" />
      <polygon points="70,8 63,12 63,20 70,16" />
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
