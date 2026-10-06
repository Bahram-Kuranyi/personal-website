"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A server-rendered scene supplies its artwork; only this wrapper owns motion. */
export default function VisualSceneMotion({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const layers = Array.from(root.querySelectorAll<SVGElement>("[data-scene-depth]"))
      .map((element) => ({ element, depth: Number(element.dataset.sceneDepth) }));
    let frame: number | null = null;
    let range = 1;
    let measure = true;
    let previous = -1;

    const cancel = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };
    const update = () => {
      frame = null;
      if (preference.matches || document.hidden) return;
      if (measure) {
        range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        measure = false;
      }
      const progress = Math.max(0, Math.min(1, scrollY / range));
      if (progress === previous) return;
      layers.forEach(({ element, depth }) => {
        element.style.transform = `translate(${(progress * depth * 0.25).toFixed(3)}px, ${(progress * depth).toFixed(3)}px)`;
      });
      previous = progress;
    };
    const schedule = () => {
      if (!preference.matches && !document.hidden && frame === null) frame = requestAnimationFrame(update);
    };
    const resize = () => { measure = true; schedule(); };
    const configure = () => {
      window.removeEventListener("scroll", schedule);
      cancel();
      previous = -1;
      if (preference.matches) {
        layers.forEach(({ element }) => element.style.removeProperty("transform"));
      } else {
        window.addEventListener("scroll", schedule, { passive: true });
        resize();
      }
    };
    const visibility = () => { if (document.hidden) cancel(); else resize(); };
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    window.addEventListener("resize", resize);
    window.addEventListener("pageshow", resize);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", configure);
    configure();
    return () => {
      cancel();
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pageshow", resize);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", configure);
      layers.forEach(({ element }) => element.style.removeProperty("transform"));
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden="true" inert>{children}</div>;
}
