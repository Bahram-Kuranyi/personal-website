/** Deterministic art coordinates in the existing 1200 × 660 SVG viewBox. */
export const humanPose = { angle: 45, x: 580, y: 304 } as const;
export const robotPose = { angle: 25, x: 608, y: 300 } as const;

export const systemNodes = [
  [330, 350], [460, 275], [595, 330], [740, 270],
  [865, 350], [455, 440], [620, 425], [775, 445],
] as const;

export const systemLinks = [
  [0, 1], [0, 5], [1, 2], [2, 3], [2, 6],
  [3, 4], [4, 7], [5, 6], [6, 7],
] as const;

// Sources follow the fingers, palms, and wrists rather than a random field.
const humanSources = [
  [70, 445], [120, 418], [171, 383], [214, 352],
  [258, 321], [302, 300], [355, 288], [405, 309],
  [464, 304], [542, 305], [281, 342], [336, 349],
  [382, 387], [410, 425], [446, 395], [466, 365],
] as const;
const robotSources = [
  [1130, 236], [1080, 255], [1028, 284], [974, 301],
  [934, 310], [886, 302], [844, 305], [793, 305],
  [739, 297], [657, 302], [890, 244], [929, 353],
  [881, 432], [841, 401], [815, 359], [791, 345],
] as const;
const tokens = ["01", "{}", "0", "=>", "1", "[]", "::", "</>"];
const clusterOffsets = [[-27, -15], [16, 19], [-19, 31], [26, -24]] as const;

export const morphFragments = [...humanSources, ...robotSources].map(([x, y], index) => {
  // Match the silhouette's rotation so dissolving fragments start on the hand.
  const pose = index < humanSources.length ? humanPose : robotPose;
  const radians = pose.angle * Math.PI / 180;
  const sourceX = pose.x + (x - pose.x) * Math.cos(radians) - (y - pose.y) * Math.sin(radians);
  const sourceY = pose.y + (x - pose.x) * Math.sin(radians) + (y - pose.y) * Math.cos(radians);
  const node = systemNodes[index % systemNodes.length];
  const offset = clusterOffsets[Math.floor(index / systemNodes.length)];
  return {
    x: sourceX, y: sourceY,
    targetX: node[0] + offset[0],
    targetY: node[1] + offset[1],
    token: tokens[index % tokens.length],
    side: index < humanSources.length ? "human" : "robot",
    // A gentle intermediate arc, with four interleaved departure times.
    bend: (index % 2 === 0 ? -1 : 1) * (22 + (index % 3) * 9),
    delay: (index % 4) * 0.035,
  };
});

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

// All fragments have landed by 0.735; network opacity finishes at 0.75.
export const MORPH_END = 0.75;

/** Pure scroll-to-scene mapping: no elapsed time, random values, or accumulated drift. */
export function getMorphFrame(progress: number) {
  const p = clamp(progress);
  return {
    handOpacity: 1 - smooth((p - 0.035) / 0.43),
    fragmentOpacity: smooth((p - 0.02) / 0.16),
    networkOpacity: smooth((p - 0.4) / 0.35),
    // Retain Stage 2 travel while the hand structure is still visible.
    travel: p * 160,
    fragments: morphFragments.map((fragment) => {
      const t = smooth((p - 0.05 - fragment.delay) / 0.58);
      const arc = Math.sin(Math.PI * t) * fragment.bend;
      const handX = p * 160 * (fragment.side === "human" ? -0.65 : 1);
      const handY = p * 160 * (fragment.side === "human" ? 0.2 : 0.3);
      return {
        x: (fragment.targetX - fragment.x) * t + handX * (1 - t),
        y: (fragment.targetY - fragment.y) * t + handY * (1 - t) + arc,
      };
    }),
  };
}
