import styles from "./SoftwareBackground.module.css";
import SoftwareBackgroundMotion from "./SoftwareBackgroundMotion";
import { humanPose, robotPose, morphFragments, systemLinks, systemNodes } from "./softwareBackgroundMorph";

// A relaxed human wrist meets a deliberate mechanical reach across a small gap.
// Keep each side independent so a later stage can transform them separately.
const contours = [
  {
    side: "human",
    outline:
      "M-80 420 C80 410 182 332 270 286 C307 260 342 258 372 270 C394 283 413 292 438 294 L500 286 C529 286 553 292 574 299 Q586 304 575 311 C552 316 531 307 506 309 L446 325 Q437 330 448 338 L480 352 Q493 362 483 372 Q474 382 460 374 L422 354 Q413 351 414 361 L455 384 Q470 396 459 406 Q450 414 435 403 L396 375 Q386 371 390 386 L421 415 Q432 429 419 439 Q410 445 400 432 L365 400 C343 398 316 378 300 362 Q279 350 252 364 C177 414 76 490 -80 518 Z",
    lines: [
      "M0 451 C126 427 197 357 273 321 Q314 300 359 311",
      "M292 282 Q313 319 307 350 M331 295 Q355 307 378 339",
      "M365 286 Q404 316 442 309 L502 297 M357 341 Q378 347 402 371",
    ],
  },
  {
    side: "robot",
    outline:
      "M1280 140 L1080 218 L992 262 L946 270 L914 248 L899 222 L878 218 L872 230 L887 260 L900 277 L845 282 L801 289 L737 278 L657 287 L615 292 Q602 296 610 304 L634 309 L733 303 L803 317 L821 333 L786 327 L767 338 L773 355 L817 375 L846 373 L815 389 L816 407 L848 418 L872 405 L858 429 L869 446 L896 444 L940 399 L996 336 L1100 306 L1280 240 Z",
    lines: [
      "M1200 209 L1052 268 L978 301 L929 301 L873 313 L806 303 L737 291 L652 298",
      "M1200 254 L1036 306 L985 319 L920 369 L875 417",
      "M989 266 L1004 329 M953 279 L969 335 M887 291 L898 323 M837 291 L834 318 M706 285 L708 306",
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
          <pattern id={`${id}-fragments`} width="148" height="72" patternUnits="userSpaceOnUse">
            <g fill="currentColor" fontFamily="monospace" fontSize="11">
              <text x="5" y="14">0101</text>
              <text x="53" y="19">{"{}"}</text>
              <text x="94" y="12">const</text>
              <text x="20" y="39">{"=>"}</text>
              <text x="61" y="42">101</text>
              <text x="113" y="36">{"</>"}</text>
              <text x="3" y="65">{"[]"}</text>
              <text x="42" y="64">0</text>
              <text x="76" y="67">{"::"}</text>
              <text x="105" y="63">110</text>
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
          <ellipse cx="594" cy="302" rx="110" ry="85" fill={`url(#${id}-glow)`} />
          <circle cx="594" cy="302" r="1.5" fill="#dbeafe" fillOpacity="0.45" />
        </g>

        {contours.map(({ side, outline, lines }) => (
          <g key={side} data-layer={side} className={styles[side]}>
            <g transform={side === "human" ? `rotate(${humanPose.angle} ${humanPose.x} ${humanPose.y})` : `rotate(${robotPose.angle} ${robotPose.x} ${robotPose.y})`}>
            <g clipPath={`url(#${id}-${side})`}>
              <path d={outline} fill="currentColor" fillOpacity="0.045" />
              <path d={outline} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
              <path d={outline} fill={`url(#${id}-fragments)`} fillOpacity="0.55" />
              {lines.map((line) => (
                <path key={line} d={line} stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.8" strokeDasharray="24 14 3 12" />
              ))}
            </g>
            </g>
          </g>
        ))}

        <g className={styles.network} data-layer="system" stroke="#93c5fd" strokeWidth="0.8">
          {systemLinks.map(([from, to]) => {
            const start = systemNodes[from];
            const end = systemNodes[to];
            const middleX = (start[0] + end[0]) / 2;
            return (
              <path
                key={`${from}-${to}`}
                d={`M${start[0]} ${start[1]} C${middleX} ${start[1]} ${middleX} ${end[1]} ${end[0]} ${end[1]}`}
                opacity="0.3"
              />
            );
          })}
          {systemNodes.map(([x, y], index) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="2.5" fill="#c7d2fe" stroke="none" opacity="0.65" />
              <circle cx={x} cy={y} r="9" opacity="0.22" />
              {index % 2 === 0 && (
                <path d={`M${x - 38} ${y - 25} v-12 h18 M${x + 38} ${y + 25} v12 h-18`} opacity="0.3" />
              )}
            </g>
          ))}
        </g>
        <g className={styles.fragments} fontFamily="monospace" fontSize="11">
          {morphFragments.map((fragment, index) => (
            <g key={index} data-morph-fragment={index}>
              <text x={fragment.x} y={fragment.y} fill={fragment.side === "human" ? "#a5b4fc" : "#7dd3fc"}>
                {fragment.token}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </SoftwareBackgroundMotion>
  );
}
