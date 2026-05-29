import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { SITE } from "../content/siteData.js";

const COLS = 13;
const ROWS = 7;
const STRIDE_X = 52;
const STRIDE_Y = 42;
const ROW_OFFSET_X = 26;
const CUBE_H = 56;
const PAD = 4;
const POP_PX = 10;

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

const RAMP_HOVER = [
  ["#f0ebe0", "#ddd6c0", "#c0b89a"],
  ["#fad8b2", "#e8b07a", "#c4854e"],
  ["#f4b87e", "#d9844e", "#a8603a"],
  ["#e89448", "#c46e38", "#884a22"],
  ["#d87e30", "#9c5818", "#663414"],
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(iso) {
  if (!iso) return "No data";
  const d = new Date(iso + "T12:00:00");
  const mon = d.toLocaleString("en-US", { month: "short" });
  return `${WEEKDAYS[d.getDay()]}, ${mon} ${d.getDate()}`;
}

function localISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Anchor the grid to *today*, not to the last week in the data. The window is
// always the COLS weeks ending in the current (Sunday-start) week, so the cubes
// scroll over on their own as the day changes. Days we have data for are filled
// from `contributions`; past/today days with no data render as empty 0-count
// cells (real date in the tooltip); future days stay null ("No data").
function buildGrid(contributions, today = new Date()) {
  const grid = Array.from({ length: COLS }, () => Array(ROWS).fill(null));

  const byDate = new Map();
  (contributions?.weeks ?? []).forEach((week) =>
    (week.days || []).forEach((day) => {
      if (day && day.date) byDate.set(day.date, day);
    })
  );

  const todayStr = localISO(today);
  const lastSunday = new Date(today);
  lastSunday.setHours(12, 0, 0, 0);
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());

  for (let c = 0; c < COLS; c++) {
    const weekStart = new Date(lastSunday);
    weekStart.setDate(weekStart.getDate() - (COLS - 1 - c) * 7);
    for (let r = 0; r < ROWS; r++) {
      const cell = new Date(weekStart);
      cell.setDate(cell.getDate() + r);
      const dateStr = localISO(cell);
      if (dateStr > todayStr) continue; // future day → leave as null
      const day = byDate.get(dateStr);
      grid[c][r] = {
        date: dateStr,
        count: day?.count ?? 0,
        level: Math.max(0, Math.min(4, day?.level ?? 0)),
        additions: day?.additions,
        deletions: day?.deletions,
      };
    }
  }
  return grid;
}

function cubeCenter(c, r) {
  return [c * STRIDE_X + (r % 2) * ROW_OFFSET_X + 30, r * STRIDE_Y + 18];
}

export const ContributionCubes = ({ style, opacity = 0.85 }) => {
  const [hovered, setHovered] = useState(null);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const grid = useRef(buildGrid(SITE.contributions)).current;

  const vbW = (COLS - 1) * STRIDE_X + ROW_OFFSET_X + 52 + PAD * 2;
  const vbH = (ROWS - 1) * STRIDE_Y + CUBE_H + PAD * 2;
  const maxHitDist = STRIDE_X * 0.55;

  const hitTest = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const { x, y } = pt.matrixTransform(svg.getScreenCTM().inverse());

    let best = null;
    let bestDist = Infinity;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const [cx, cy] = cubeCenter(c, r);
        const d = Math.hypot(x - cx, y - cy);
        if (d < bestDist && d < maxHitDist) {
          bestDist = d;
          best = { col: c, row: r };
        }
      }
    }
    return best;
  }, [maxHitDist]);

  const resolve = useCallback((e) => {
    const hit = hitTest(e);
    if (hit) {
      const day = grid[hit.col][hit.row] ?? { date: null, count: 0, level: 0 };
      setHovered((prev) =>
        prev?.col === hit.col && prev?.row === hit.row ? prev : { ...hit, day }
      );
      return;
    }
    setHovered(null);
  }, [hitTest, grid]);

  const clear = useCallback(() => setHovered(null), []);

  const getTooltipPos = useCallback(
    (col, row) => {
      const svg = svgRef.current;
      const cont = containerRef.current;
      if (!svg || !cont) return null;
      const sr = svg.getBoundingClientRect();
      const cr = cont.getBoundingClientRect();
      const [sx, sy] = cubeCenter(col, row);
      return {
        x: sr.left - cr.left + (sx + PAD) * (sr.width / vbW),
        y: sr.top - cr.top + (sy - 14 + PAD) * (sr.height / vbH),
      };
    },
    [vbW, vbH]
  );

  const cubes = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const day = grid[c][r];
      const level = day?.level ?? 0;
      const active = hovered?.col === c && hovered?.row === r;
      const [top, left, right] = (active ? RAMP_HOVER : RAMP)[level];
      const tx = c * STRIDE_X + (r % 2) * ROW_OFFSET_X;
      const ty = r * STRIDE_Y;

      cubes.push(
        <g key={`${c}-${r}`} transform={`translate(${tx} ${ty})`}>
          <g
            style={{
              transform: active ? `translateY(-${POP_PX}px)` : "translateY(0)",
              transition: active
                ? "transform 0.1s ease-out"
                : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <polygon points={TOP_FACE} fill={top} />
            <polygon points={LEFT_FACE} fill={left} />
            <polygon points={RIGHT_FACE} fill={right} />
          </g>
        </g>
      );
    }
  }

  useLayoutEffect(() => {
    const el = tooltipRef.current;
    const cont = containerRef.current;
    if (!el || !cont || !hovered) return;
    const tp = getTooltipPos(hovered.col, hovered.row);
    if (!tp) return;

    const MARGIN = 8;
    const ttW = el.offsetWidth;
    const ttH = el.offsetHeight;
    const contW = cont.offsetWidth;

    let left = tp.x - ttW / 2;
    let top = tp.y - ttH - 12;

    left = Math.max(MARGIN, Math.min(left, contW - ttW - MARGIN));
    if (top < MARGIN) top = tp.y + 24;

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    el.style.visibility = "visible";
  }, [hovered, getTooltipPos]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}
    >
      <svg
        ref={svgRef}
        viewBox={`-${PAD} -${PAD} ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        onPointerMove={resolve}
        onPointerDown={resolve}
        onPointerLeave={clear}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity,
          pointerEvents: "auto",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 85% at 65% 50%, black 35%, transparent 82%)",
          maskImage:
            "radial-gradient(ellipse 75% 85% at 65% 50%, black 35%, transparent 82%)",
        }}
      >
        <g
          stroke="#1f3f2c"
          strokeOpacity="0.18"
          strokeWidth="0.75"
          strokeLinejoin="round"
        >
          {cubes}
        </g>
      </svg>

      {hovered && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            background: "var(--ev-800, #0e2618)",
            color: "var(--paper-50, #fbfaf6)",
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 12,
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 2 }}>
            {formatDate(hovered.day.date)}
          </div>
          <div style={{ color: "var(--ev-200, #aac8b3)" }}>
            {hovered.day.count}{" "}
            {hovered.day.count === 1 ? "contribution" : "contributions"}
          </div>
          {(hovered.day.additions != null || hovered.day.deletions != null) && (
            <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
              {hovered.day.additions != null && (
                <span style={{ color: "#7faa8c" }}>+{hovered.day.additions}</span>
              )}
              {hovered.day.deletions != null && (
                <span style={{ color: "#c46b3a" }}>
                  −{hovered.day.deletions}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
