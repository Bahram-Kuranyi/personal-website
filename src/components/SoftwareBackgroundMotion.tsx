"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./SoftwareBackground.module.css";

/** Owns motion only; the SVG artwork is passed through from the server. */
export default function SoftwareBackgroundMotion({ children }: { children: ReactNode }) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    let needsMeasurement = true;
    let scrollRange = 1;
    let previousOffset: number | null = null;

    function update() {
      frame = null;
      if (!background || preference.matches) return;

      // Geometry is cached: scroll frames only read the scroll position.
      if (needsMeasurement) {
        scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        needsMeasurement = false;
      }

      // Position-based movement reverses immediately on upward scrolling and
      // holds its exact position at rest, without a perpetual animation loop.
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollRange));
      const offset = Math.round(progress * 160 * 100) / 100;
      if (offset === previousOffset) return;
      background.style.setProperty("--software-travel", `${offset}px`);
      previousOffset = offset;
    }

    function schedule() {
      if (!preference.matches && frame === null) frame = requestAnimationFrame(update);
    }

    function measure() {
      needsMeasurement = true;
      schedule();
    }

    function configureMotion() {
      window.removeEventListener("scroll", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previousOffset = null;
      if (preference.matches) {
        background?.style.removeProperty("--software-travel");
      } else {
        window.addEventListener("scroll", schedule, { passive: true });
        measure();
      }
    }

    const observer = new ResizeObserver(measure);
    observer.observe(background);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    preference.addEventListener("change", configureMotion);
    configureMotion();

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", configureMotion);
      background.style.removeProperty("--software-travel");
    };
  }, []);

  return (
    <div ref={backgroundRef} className={styles.background} aria-hidden="true">
      {children}
    </div>
  );
}
