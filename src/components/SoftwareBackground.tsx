import styles from "./SoftwareBackground.module.css";
import SoftwareBackgroundMotion from "./SoftwareBackgroundMotion";

// Curved, open contours suggest a human reach; stepped contours suggest a machine.
// Keep each side independent so a later stage can transform them separately.
const contours = [
  {
    side: "human",
    outline:
      "M-80 485 C90 475 155 409 240 350 C285 319 319 323 353 300 L488 263 Q525 251 555 262 Q567 272 550 279 L400 322 C374 335 373 352 350 366 L390 357 Q421 351 417 369 L371 404 Q354 415 330 412 L358 420 Q378 432 357 443 L315 460 Q295 466 270 456 Q296 478 270 490 C242 501 208 485 185 477 L-80 583 Z",
    lines: [
      "M0 504 C129 481 164 406 252 369 Q296 350 330 361",
      "M14 542 C122 524 178 463 216 433 Q240 410 270 413",
      "M291 341 Q325 321 355 325 L493 281",
    ],
  },
  {
    side: "robot",
    outline:
      "M1280 480 L1050 405 L963 324 L904 310 L843 278 L675 258 L645 265 L635 277 L664 286 L800 309 L839 346 L804 338 L775 347 L775 365 L825 397 L860 408 L829 415 L823 434 L862 454 L896 448 L884 470 L902 488 L938 483 L1004 450 L1280 576 Z",
    lines: [
      "M1200 507 L1039 442 L949 358 L888 341 L840 311 L680 276",
      "M1200 545 L1036 477 L983 416 L928 394",
      "M1038 441 L1016 465 M975 380 L951 405 M903 332 L888 358",
    ],
  },
] as const;

type SoftwareBackgroundProps = {
  /** Unique per instance, used to scope SVG paint and clipping references. */
  id: string;
};

export default function SoftwareBackground({ id }: SoftwareBackgroundProps) {
  return (
    <SoftwareBackgroundMotion>
      <svg
        className={styles.canvas}
        viewBox="0 0 1200 660"
        fill="none"
        focusable="false"
      >
        <defs>
          <pattern id={`${id}-fragments`} width="148" height="88" patternUnits="userSpaceOnUse">
            <g fill="currentColor" fontFamily="monospace" fontSize="11">
              <text x="8" y="18">01</text>
              <text x="83" y="32">{"{}"}</text>
              <text x="31" y="65">{"=>"}</text>
              <text x="117" y="79">0</text>
              <text x="103" y="10">1</text>
            </g>
            <path d="M10 39h12m-6-6v12 M66 77h10v-10" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
            <circle cx="136" cy="49" r="1.3" fill="currentColor" />
          </pattern>
          <radialGradient id={`${id}-glow`}>
            <stop stopColor="#b8c6ff" stopOpacity="0.2" />
            <stop offset="0.22" stopColor="#818cf8" stopOpacity="0.08" />
            <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
          {contours.map(({ side, outline }) => (
            <clipPath key={side} id={`${id}-${side}`}>
              <path d={outline} />
            </clipPath>
          ))}
        </defs>

        <g data-layer="connection" className={styles.connection}>
          <ellipse cx="594" cy="272" rx="155" ry="115" fill={`url(#${id}-glow)`} />
          <path d="M571 272h13m21 0h13" stroke="#c7d2fe" strokeOpacity="0.2" />
          <circle cx="594" cy="272" r="2" fill="#dbeafe" fillOpacity="0.45" />
        </g>

        {contours.map(({ side, outline, lines }) => (
          <g key={side} data-layer={side} className={styles[side]}>
            <g clipPath={`url(#${id}-${side})`}>
              <path d={outline} fill="currentColor" fillOpacity="0.045" />
              <path d={outline} fill={`url(#${id}-fragments)`} fillOpacity="0.55" />
              {lines.map((line) => (
                <path key={line} d={line} stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.8" strokeDasharray="24 14 3 12" />
              ))}
            </g>
          </g>
        ))}
      </svg>
    </SoftwareBackgroundMotion>
  );
}
