import Image from "next/image";

import { cn } from "@/lib/cn";

type Props = {
  initials: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

export function Portrait({ initials, src, alt, size = "md", className, priority }: Props) {
  const dims =
    size === "lg"
      ? "aspect-[3/4]"
      : size === "sm"
        ? "h-12 w-12 rounded-full"
        : "aspect-[4/5]";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-bg-sunken grain",
        size !== "sm" && "rounded-lg border border-line",
        dims,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? initials}
          fill
          priority={priority}
          sizes={size === "lg" ? "(min-width: 1024px) 420px, 60vw" : "(min-width: 1024px) 300px, 50vw"}
          className="object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 70% 20%, color-mix(in oklab, var(--brand) 35%, transparent), transparent 65%), radial-gradient(80% 60% at 20% 80%, color-mix(in oklab, var(--accent) 24%, transparent), transparent 55%)",
            }}
          />
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center font-display font-light tracking-tight text-ink/70",
              size === "lg" ? "text-7xl" : size === "sm" ? "text-sm" : "text-5xl",
            )}
            aria-hidden
          >
            {initials}
          </span>
        </>
      )}
    </div>
  );
}
