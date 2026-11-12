"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type Slide = { src: string; alt: string };

type Props = {
  slides: Slide[];
  intervalMs?: number;
  className?: string;
};

export function HeroSlider({ slides, intervalMs = 6000, className }: Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, total]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden={false}>
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(.22,.61,.36,1)]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={72}
            className={cn(
              "object-cover will-change-transform",
              i === index ? "scale-105" : "scale-100",
              "transition-transform duration-[8000ms] ease-out",
            )}
          />
        </div>
      ))}

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--ink) 55%, transparent) 0%, color-mix(in oklab, var(--ink) 25%, transparent) 40%, color-mix(in oklab, var(--ink) 65%, transparent) 100%)",
        }}
      />

      {total > 1 ? (
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2 md:bottom-8">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-1 rounded-full transition-all",
                i === index
                  ? "w-10 bg-white"
                  : "w-5 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
