"use client";

import { useState } from "react";
import Link from "next/link";
import { routes, type Locale } from "@/lib/site";
import type { Focus } from "@/sanity/lib/types";

export default function HeroCard({ focus, locale }: { focus: Focus; locale: Locale }) {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;

    setRotation({
      x: rotateX,
      y: rotateY,
    });
  }

  function handleMouseLeave() {
    setRotation({
      x: 0,
      y: 0,
    });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-card mx-auto flex h-[420px] max-w-md flex-col justify-between rounded-[2rem] border border-white/10 p-8 transition-transform duration-200"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">
          {focus.label}
        </span>

        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>

      <div>
        <p className="text-sm text-zinc-500">
          {focus.eyebrow}
        </p>

        <p className="mt-3 whitespace-pre-line text-3xl font-medium tracking-tight">
          {focus.headline}
        </p>
        {focus.project && <Link href={routes.project(locale, focus.project.slug)} className="mt-4 inline-flex min-h-11 items-center text-sm text-zinc-300 underline underline-offset-4">{focus.project.title} ↗</Link>}
      </div>

      <p className="text-sm text-zinc-500">
        {focus.secondary}
      </p>
    </div>
  );
}
