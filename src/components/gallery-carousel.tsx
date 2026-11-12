"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/cn";

type Photo = { src: string; alt: string };

type Props = {
  photos: Photo[];
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
};

const TILE_SHAPES = [
  "col-span-6 md:col-span-4 md:row-span-2 aspect-[4/5] md:aspect-auto md:h-full",
  "col-span-3 md:col-span-2 aspect-[4/3]",
  "col-span-3 md:col-span-2 aspect-[4/3]",
  "col-span-6 md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto md:h-full",
  "col-span-3 md:col-span-2 aspect-[4/3]",
  "col-span-3 md:col-span-2 aspect-[4/3]",
];

export function GalleryCarousel({
  photos,
  closeLabel = "Close",
  prevLabel = "Previous",
  nextLabel = "Next",
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = photos.length;
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null ? i : ((i + delta) % total + total) % total,
      ),
    [total],
  );

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const tiles = useMemo(() => photos.slice(0, 6), [photos]);

  return (
    <>
      <ul className="mt-12 grid auto-rows-[18rem] grid-cols-6 gap-3 md:auto-rows-[15rem] md:gap-4">
        {tiles.map((p, i) => (
          <li key={p.src} className={cn("relative", TILE_SHAPES[i])}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={p.alt}
              className="group relative block h-full w-full overflow-hidden rounded-lg border border-line/60 bg-bg-sunken outline-none transition-transform duration-500 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
                quality={70}
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-4 flex h-8 items-center rounded-full bg-black/55 px-3 font-mono text-[11px] tracking-wider text-white/90 backdrop-blur-sm"
              >
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3"
              >
                <span className="text-sm leading-snug text-white/95 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {p.alt}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden
                  >
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7.5 7.5M3 21l7.5-7.5" />
                  </svg>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[openIndex].alt}
          className="fixed inset-0 z-[200] flex flex-col bg-black/90 backdrop-blur-md"
          onClick={close}
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Escape") close();
          }}
        >
          <header className="relative z-10 flex items-center justify-between px-6 py-5 text-white md:px-10">
            <span className="font-mono text-xs tracking-wider text-white/70">
              {String(openIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label={closeLabel}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              <X size={18} strokeWidth={1.75} aria-hidden />
            </button>
          </header>

          <div
            className="relative flex-1"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {photos.map((p, i) => (
              <div
                key={p.src}
                className={cn(
                  "absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-500 ease-out md:p-10",
                  i === openIndex
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0",
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-full w-full max-w-[1280px]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="100vw"
                    quality={72}
                    priority={i === openIndex}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              aria-label={prevLabel}
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-white/50 hover:bg-white/15 md:left-8 md:h-14 md:w-14"
            >
              <ChevronLeft size={22} strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-white/50 hover:bg-white/15 md:right-8 md:h-14 md:w-14"
            >
              <ChevronRight size={22} strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <footer
            className="relative z-10 px-4 pb-6 md:px-10 md:pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mx-auto max-w-2xl text-center text-sm text-white/80">
              {photos[openIndex].alt}
            </p>
            <ul className="mx-auto mt-5 flex max-w-full items-center justify-start gap-2 overflow-x-auto md:justify-center">
              {photos.map((p, i) => (
                <li key={p.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={p.alt}
                    aria-current={i === openIndex}
                    className={cn(
                      "relative h-14 w-20 overflow-hidden rounded-md border transition-all md:h-16 md:w-24",
                      i === openIndex
                        ? "border-white opacity-100 ring-1 ring-white"
                        : "border-white/20 opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="100px"
                      quality={60}
                      className="object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      ) : null}
    </>
  );
}
