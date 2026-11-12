import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
  grain?: boolean;
  overlay?: boolean;
  quality?: number;
};

const ROUNDED: Record<NonNullable<Props["rounded"]>, string> = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  style,
  priority,
  sizes = "(min-width: 1280px) 50vw, (min-width: 768px) 60vw, 100vw",
  aspect = "aspect-[4/3]",
  rounded = "lg",
  grain = true,
  overlay = false,
  quality = 70,
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-bg-sunken",
        aspect,
        ROUNDED[rounded],
        rounded !== "none" && "border border-line/60",
        grain && "grain",
        wrapperClassName,
      )}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={cn("object-cover", className)}
      />
      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--ink) 0%, transparent) 55%, color-mix(in oklab, var(--ink) 55%, transparent) 100%)",
          }}
        />
      ) : null}
    </div>
  );
}
