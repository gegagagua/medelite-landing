"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  items: { q: string; a: string }[];
};

export function FaqList({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-line/60">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="border-b border-line/60">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-xl font-normal leading-snug text-ink max-w-3xl">
                {item.q}
              </span>
              <span
                aria-hidden
                className={cn(
                  "mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-all",
                  isOpen && "rotate-45 border-accent text-accent",
                )}
              >
                <Plus size={16} strokeWidth={1.5} />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-8 pr-14 text-ink-soft leading-relaxed max-w-3xl">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
