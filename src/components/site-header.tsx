"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { key: "home", href: "/" as const },
  { key: "services", href: "/services" as const },
  { key: "news", href: "/news" as const },
  { key: "about", href: "/about" as const },
  { key: "contact", href: "/contact" as const },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all",
          scrolled
            ? "bg-bg/80 backdrop-blur-md border-b border-line/60"
            : "bg-transparent",
        )}
      >
        <div className="container-wide flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-ink"
            aria-label={tMeta("clinicName")}
          >
            <Logomark />
            <span className="font-display text-lg leading-none tracking-tight">
              {tMeta("clinicShortName")}
            </span>
          </Link>

          <nav aria-label="primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative inline-block py-2 text-sm text-ink-soft transition-colors hover:text-ink",
                        active && "text-ink",
                      )}
                    >
                      <span>{t(item.key)}</span>
                      <span
                        className={cn(
                          "absolute left-0 right-0 -bottom-0.5 h-px bg-accent origin-left transition-transform",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/booking"
              className="hidden sm:inline-flex h-10 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-soft"
            >
              {t("book")}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink lg:hidden"
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-bg grain overflow-y-auto"
            >
              <div className="container-wide flex h-[72px] items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-ink"
                >
                  <Logomark />
                  <span className="font-display text-lg leading-none">{tMeta("clinicShortName")}</span>
                </Link>
                <button
                  type="button"
                  aria-label={t("closeMenu")}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <nav aria-label="mobile" className="container-wide relative z-10 py-10">
                <ul className="flex flex-col divide-y divide-line/60">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between py-6 text-ink"
                      >
                        <span className="font-display text-3xl font-light tracking-tight">
                          {t(item.key)}
                        </span>
                        <span className="font-mono text-xs text-ink-muted group-hover:text-accent transition-colors">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12"
                >
                  <Link
                    href="/booking"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex h-12 items-center rounded-md bg-accent px-6 text-sm font-medium text-accent-ink"
                  >
                    {t("book")}
                  </Link>
                  <div className="mt-8 space-y-2 text-sm text-ink-muted">
                    <p>{tMeta("phone")}</p>
                    <p>{tMeta("address")}</p>
                    <p>{tMeta("hours")}</p>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Header space reserve — fixed header is translucent so we don't need it, but main needs top padding for below-the-fold pages */}
    </>
  );
}

function Logomark() {
  return (
    <svg
      aria-hidden
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      className="text-accent"
    >
      {/* Serpent-and-rod reinterpreted as two interlaced arcs */}
      <path
        d="M14 2.5C7.65 2.5 2.5 7.65 2.5 14S7.65 25.5 14 25.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M14 25.5c6.35 0 11.5-5.15 11.5-11.5S20.35 2.5 14 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />
      <path
        d="M14 7v14M9 14h10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
