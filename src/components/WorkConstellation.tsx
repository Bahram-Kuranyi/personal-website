import styles from "./WorkConstellation.module.css";
import VisualSceneMotion from "./VisualSceneMotion";

const nodes = [
  { x: 360, y: 240, size: 3, label: "01" },
  { x: 520, y: 145, size: 4, label: "{}" },
  { x: 715, y: 205, size: 5, label: "API" },
  { x: 865, y: 105, size: 2, label: "::" },
  { x: 825, y: 360, size: 3, label: "[]" },
  { x: 610, y: 420, size: 4, label: "=>" },
  { x: 400, y: 485, size: 2, label: "101" },
  { x: 210, y: 400, size: 2, label: "const" },
] as const;

const paths = [
  "M360 240 C425 240 440 145 520 145",
  "M520 145 C610 145 615 205 715 205",
  "M715 205 C790 205 782 105 865 105",
  "M715 205 C715 300 825 280 825 360",
  "M825 360 C720 360 740 420 610 420",
  "M610 420 C510 420 500 485 400 485",
  "M210 400 C285 400 280 240 360 240",
  "M360 240 C460 240 480 420 610 420",
] as const;

/** Server-rendered artwork with independently drifting depth layers. */
export default function WorkConstellation() {
  return (
    <VisualSceneMotion className={styles.scene}>
      <div className={styles.atmosphere} />
      <svg className={styles.canvas} viewBox="0 0 1000 850" fill="none" focusable="false">
        <g data-work-layer="scaffolding" data-scene-depth="8" className={styles.scaffolding}>
          <path d="M320 200 585 65 930 205 665 355Z M320 218 665 373 930 223 M585 65v45 M930 205v55 M665 355v40" />
          <path d="M390 485 620 365 865 480 635 610Z M390 503 635 628 865 498" />
          <path d="M665 395v50 M635 610v62" strokeDasharray="3 9" />
        </g>

        <g data-work-layer="connections" data-scene-depth="16" className={styles.connections}>
          {paths.map((path) => <path key={path} d={path} />)}
          <path d="M520 145v65 M610 420v-65 M825 360h55" strokeDasharray="2 8" />
        </g>

        <g data-work-layer="nodes" data-scene-depth="22">
          {nodes.map(({ x, y, size, label }) => (
            <g key={label}>
              <circle cx={x} cy={y} r={size + 10} className={styles.halo} />
              <circle cx={x} cy={y} r={size} className={styles.point} />
              <text x={x + 19} y={y - 17} className={styles.label}>{label}</text>
            </g>
          ))}
          <path d="M682 185v-14h17 M747 225v14h-17 M490 130v-14h14 M636 435v14h-14" className={styles.brackets} />
        </g>

        <g data-work-layer="details" data-scene-depth="28" className={styles.details}>
          <path d="M905 315h18m-9-9v18 M325 440h14m-7-7v14 M560 550h18m-9-9v18" />
          <path d="M755 540h72v40h-72z M768 553h22m10 0h13 M768 567h40" />
          <path d="M455 315h44m-44 12h27 M820 65h32" />
          <text x="572" y="94">build / 01</text>
          <text x="685" y="332">010</text>
          <text x="355" y="563">::</text>
          <text x="868" y="448">resolve</text>
          <circle cx="455" cy="188" r="1.5" />
          <circle cx="761" cy="398" r="1.5" />
          <circle cx="284" cy="343" r="1.5" />
        </g>
      </svg>
    </VisualSceneMotion>
  );
}
