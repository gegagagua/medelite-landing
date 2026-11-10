"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const change = (next: (typeof routing.locales)[number]) => {
    setOpen(false);
    startTransition(() => {
      // params is a Record<string, string | string[]>, usable by typed router
      router.replace(
        // @ts-expect-error -- next-intl typed routes accept params + pathname
        { pathname, params },
        { locale: next },
      );
    });
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("switcher")}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-md border border-line px-3 text-sm text-ink",
          "transition-colors hover:border-accent hover:text-accent",
        )}
      >
        <Globe size={16} strokeWidth={1.5} />
        <span className="font-mono text-xs uppercase tracking-[0.14em]">{locale}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[180px] overflow-hidden rounded-md border border-line bg-bg-raised shadow-md"
          >
            {routing.locales.map((loc) => (
              <li key={loc} role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => change(loc)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors",
                    "hover:bg-bg-sunken",
                    loc === locale ? "text-accent" : "text-ink",
                  )}
                >
                  <span>{t(loc)}</span>
                  {loc === locale ? <Check size={14} strokeWidth={2} /> : null}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
