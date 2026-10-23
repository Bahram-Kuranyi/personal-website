"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { advanceLightning, newLightningVisit } from "./lightningTrigger";
import styles from "./ScrollLightning.module.css";

const bolt = "M80 20 110 140 92 175 160 260 125 245 180 390 165 445 245 525 205 510 250 660 235 710 300 810 290 870 340 980";

function LightningVisit() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visit = newLightningVisit();
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let busy = false;
    let needsMeasurement = true;
    let range = 1;

    function update() {
      frame = 0;
      if (preference.matches || document.hidden) return;
      if (needsMeasurement) {
        range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        needsMeasurement = false;
      }
      const next = advanceLightning(visit, scrollY / range, busy);
      if (next.count !== visit.count) {
        element!.dataset.count = String(next.count);
        element!.dataset.active = "true";
        busy = true;
        timer = setTimeout(() => {
          element!.dataset.active = "false";
          busy = false;
          // A quick return during the first strike is deferred until it settles.
          schedule();
        }, 1200);
      }
      visit = next;
    }
    function schedule() {
      if (!frame && !preference.matches && !document.hidden) frame = requestAnimationFrame(update);
    }
    function measure() { needsMeasurement = true; schedule(); }
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimeout(timer);
      busy = false;
      element!.dataset.active = "false";
    }
    function configure() {
      if (preference.matches || document.hidden) stop();
      else measure();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", configure);
    preference.addEventListener("change", configure);
    measure();
    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", configure);
      preference.removeEventListener("change", configure);
    };
  }, []);

  return <div ref={ref} className={styles.scene} data-lightning-visit data-count="0" aria-hidden="true" inert>
    <svg className={styles.bolt} viewBox="0 0 420 1000" fill="none" focusable="false" strokeLinecap="round" strokeLinejoin="round">
      <path className={styles.halo} pathLength="1" d={bolt} />
      <path className={styles.core} pathLength="1" d={bolt} />
      <path className={styles.branch} pathLength="1" d="M160 260 215 275 240 340 M165 445 110 470 95 525 M300 810 350 825 375 890" />
    </svg>
  </div>;
}

/** Path keys reset the two-strike allowance on navigation, including Back/Forward. */
export default function ScrollLightning() {
  return <LightningVisit key={usePathname()} />;
}
