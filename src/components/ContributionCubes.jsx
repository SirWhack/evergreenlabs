import { SITE } from "../content/siteData.js";

const COLS = 13;
const ROWS = 7;
const STRIDE_X = 52;
const STRIDE_Y = 42;
const ROW_OFFSET_X = 26;
const CUBE_W = 52;
const CUBE_H = 56;
const PAD = 4;

const TOP_FACE = "30,4 56,18 30,32 4,18";
const LEFT_FACE = "4,18 30,32 30,60 4,46";
const RIGHT_FACE = "56,18 30,32 30,60 56,46";

const RAMP = [
  ["#e4ddc8", "#cdc4a8", "#a89e7e"],
  ["#f0c79a", "#d99a5a", "#a86d34"],
  ["#e89e5e", "#c46b3a", "#8b4520"],
  ["#d97a32", "#a85522", "#6e3514"],
  ["#c4651e", "#83400f", "#4a2308"],
];

function buildGrid(contributions) {
  const grid = Array.from({ length: COLS }, () => Array(ROWS).fill(0));
  const weeks = contributions?.weeks ?? [];
  if (!weeks.length) return grid;
  const tail = weeks.slice(-COLS);
  tail.forEach((week, c) => {
    (week.days || []).forEach((day, r) => {
      if (r < ROWS) grid[c][r] = Math.max(0, Math.min(4, day.level ?? 0));
    });
  });
  return grid;
}

export const ContributionCubes = ({ style, opacity = 0.85 }) => {
  const grid = buildGrid(SITE.contributions);
  const vbW = (COLS - 1) * STRIDE_X + ROW_OFFSET_X + CUBE_W + PAD * 2;
  const vbH = (ROWS - 1) * STRIDE_Y + CUBE_H + PAD * 2;

  const cubes = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const level = grid[c][r];
      const [top, left, right] = RAMP[level];
      const tx = c * STRIDE_X + (r % 2) * ROW_OFFSET_X;
      const ty = r * STRIDE_Y;
      cubes.push(
        <g key={`${c}-${r}`} transform={`translate(${tx} ${ty})`}>
          <polygon points={TOP_FACE} fill={top} />
          <polygon points={LEFT_FACE} fill={left} />
          <polygon points={RIGHT_FACE} fill={right} />
        </g>
      );
    }
  }

  return (
    <svg
      viewBox={`-${PAD} -${PAD} ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 85% at 65% 50%, black 35%, transparent 82%)",
        maskImage:
          "radial-gradient(ellipse 75% 85% at 65% 50%, black 35%, transparent 82%)",
        ...style,
      }}
    >
      <g stroke="#1f3f2c" strokeOpacity="0.18" strokeWidth="0.75" strokeLinejoin="round">
        {cubes}
      </g>
    </svg>
  );
};
