"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "cookie-consent";

export function CookieNotice() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const resolve = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-live="polite"
          aria-labelledby="cookie-notice-title"
          className="fixed bottom-4 left-4 right-4 z-30 max-w-md rounded-lg border border-line bg-bg-raised p-5 shadow-lg sm:left-6 sm:bottom-6"
        >
          <h3 id="cookie-notice-title" className="text-eyebrow text-ink">
            {t("title")}
          </h3>
          <p className="mt-3 text-sm text-ink-soft">{t("body")}</p>
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => resolve("accepted")}
              className="inline-flex h-10 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-ink hover:bg-accent-soft"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={() => resolve("declined")}
              className="inline-flex h-10 items-center rounded-md border border-line px-4 text-sm text-ink-soft hover:border-accent hover:text-accent"
            >
              {t("decline")}
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
