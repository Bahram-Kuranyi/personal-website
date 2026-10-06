import type { Project } from "@/data/projects";
import VisualSceneMotion from "./VisualSceneMotion";
import styles from "./ProjectVisualScene.module.css";

// Deterministic layouts: future projects select a visual variant in their data.
const scenes = {
  components: {
    windows: [[455, 115, 170, 120], [725, 260, 195, 145], [420, 440, 160, 110]],
    nodes: [[490, 170], [610, 210], [770, 305], [870, 355], [535, 475], [680, 520]],
    paths: ["M490 170C660 170 600 305 770 305", "M610 210C680 210 690 355 870 355", "M770 305C770 475 660 475 535 475", "M535 475C590 475 610 520 680 520"],
    tokens: ["{}", "</>", "const", "[]", "01", "=>"],
  },
  windows: {
    windows: [[420, 100, 185, 125], [735, 180, 155, 115], [560, 395, 240, 145]],
    nodes: [[460, 145], [575, 185], [780, 220], [860, 260], [610, 440], [750, 500]],
    paths: ["M460 145C650 145 630 220 780 220", "M575 185C680 185 450 440 610 440", "M860 260C940 350 870 500 750 500", "M610 440C680 440 680 500 750 500"],
    tokens: ["01", "API", "[]", "::", "data", "=>"],
  },
} as const;

export default function ProjectVisualScene({ variant }: { variant: Project["visualVariant"] }) {
  const scene = scenes[variant];
  return (
    <VisualSceneMotion key={variant} className={`${styles.scene} ${styles[variant]}`}>
      <div className={styles.haze} />
      <svg className={styles.canvas} viewBox="0 0 1000 800" fill="none" focusable="false">
        <g data-scene-depth="7" className={styles.grid}>
          <path d="M380 95 900 340 620 600 295 380 M390 110v410 M520 170v410 M650 230v360 M780 290v200 M320 300l470 220 M355 210l485 225" />
          <path d="M310 590h40m-20-20v40 M905 110h24m-12-12v24" />
        </g>
        <g data-scene-depth="14" className={styles.frames}>
          {scene.windows.map(([x, y, w, h]) => (
            <g key={x}>
              <rect x={x} y={y} width={w} height={h} rx="8" />
              <path d={`M${x} ${y + 27}h${w} M${x + 14} ${y + 14}h4m6 0h4m6 0h4 M${x + 14} ${y + h - 20}h${w * 0.28}`} />
              <path d={`M${x - 9} ${y + 18}v-27h27 M${x + w - 18} ${y + h + 9}h27v-27`} />
            </g>
          ))}
        </g>
        <g data-scene-depth="20" className={styles.paths}>
          {scene.paths.map((path) => <path key={path} d={path} />)}
          <path d="M610 210v60 M680 520h85" strokeDasharray="2 9" />
        </g>
        <g data-scene-depth="27" className={styles.nodes}>
          {scene.nodes.map(([x, y], index) => (
            <g key={x}>
              <circle cx={x} cy={y} r="12" className={styles.ring} />
              <circle cx={x} cy={y} r={index % 2 === 0 ? 3.5 : 2} className={styles.point} />
              <text x={x + 19} y={y - 15}>{scene.tokens[index]}</text>
            </g>
          ))}
        </g>
        <g data-scene-depth="30" className={styles.fragments}>
          <text x="685" y="120">async</text><text x="920" y="425">101</text>
          <text x="370" y="425">::</text><text x="815" y="575">node</text>
          <path d="M675 140h30m-30 7h18 M850 460h25m-25 7h40" />
        </g>
      </svg>
    </VisualSceneMotion>
  );
}
