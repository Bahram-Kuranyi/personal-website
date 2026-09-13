"use client";

import { useState } from "react";

export default function HeroCard() {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
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
          Selected Focus
        </span>

        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>

      <div>
        <p className="text-sm text-zinc-500">
          Currently building
        </p>

        <p className="mt-3 text-3xl font-medium tracking-tight">
          Software.
          <br />
          AI.
          <br />
          Products.
        </p>
      </div>

      <p className="text-sm text-zinc-500">
        Germany · 2026
      </p>
    </div>
  );
}