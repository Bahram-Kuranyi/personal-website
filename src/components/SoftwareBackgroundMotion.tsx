"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./SoftwareBackground.module.css";
import { getMorphFrame, MORPH_END } from "./softwareBackgroundMorph";

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
    let previousProgress: number | null = null;
    const fragments = Array.from(background.querySelectorAll<SVGGElement>("[data-morph-fragment]"));
    const properties = ["--software-travel", "--hand-opacity", "--fragment-opacity", "--network-opacity"];
    const writtenProperties = new Map<string, string>();
    const writtenTransforms: string[] = [];

    function writeProperty(property: string, value: string) {
      if (writtenProperties.get(property) === value) return;
      background?.style.setProperty(property, value);
      writtenProperties.set(property, value);
    }

    function cancelFrame() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }

    function reset() {
      properties.forEach((property) => background?.style.removeProperty(property));
      fragments.forEach((fragment) => fragment.style.removeProperty("transform"));
      writtenProperties.clear();
      writtenTransforms.length = 0;
    }

    function update() {
      frame = null;
      if (!background || preference.matches || document.hidden) return;

      // Geometry is cached: scroll frames only read the scroll position.
      if (needsMeasurement) {
        scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        needsMeasurement = false;
      }

      // Position-based movement reverses immediately on upward scrolling and
      // holds its exact position at rest, without a perpetual animation loop.
      const progress = Math.min(MORPH_END, Math.max(0, window.scrollY / scrollRange));
      if (progress === previousProgress) return;
      const scene = getMorphFrame(progress);
      // Hidden hand layers no longer need inherited transform updates.
      if (scene.handOpacity > 0) writeProperty("--software-travel", `${scene.travel}px`);
      writeProperty("--hand-opacity", String(scene.handOpacity));
      writeProperty("--fragment-opacity", String(scene.fragmentOpacity));
      writeProperty("--network-opacity", String(scene.networkOpacity));
      fragments.forEach((fragment, index) => {
        const position = scene.fragments[index];
        const transform = `translate(${position.x.toFixed(3)}px, ${position.y.toFixed(3)}px)`;
        if (writtenTransforms[index] === transform) return;
        fragment.style.transform = transform;
        writtenTransforms[index] = transform;
      });
      previousProgress = progress;
    }

    function schedule() {
      if (!preference.matches && !document.hidden && frame === null) frame = requestAnimationFrame(update);
    }

    function measure() {
      needsMeasurement = true;
      schedule();
    }

    function configureMotion() {
      window.removeEventListener("scroll", schedule);
      cancelFrame();
      previousProgress = null;
      if (preference.matches) {
        reset();
      } else {
        window.addEventListener("scroll", schedule, { passive: true });
        measure();
      }
    }

    function handleVisibility() {
      if (document.hidden) cancelFrame();
      else measure();
    }

    const observer = new ResizeObserver(measure);
    observer.observe(background);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    document.addEventListener("visibilitychange", handleVisibility);
    preference.addEventListener("change", configureMotion);
    configureMotion();

    return () => {
      cancelFrame();
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      document.removeEventListener("visibilitychange", handleVisibility);
      preference.removeEventListener("change", configureMotion);
      reset();
    };
  }, []);

  return (
    <div ref={backgroundRef} className={styles.background} aria-hidden="true" inert>
      {children}
    </div>
  );
}
