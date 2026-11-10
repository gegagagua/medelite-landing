"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Link } from "@/i18n/navigation";

export function FloatingActions() {
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
        >
          <a
            href="https://wa.me/995322445577"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("floatingWhatsAppAria")}
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg-raised text-ink shadow-md transition-all hover:border-accent hover:text-accent hover:shadow-glow"
          >
            <MessageCircle size={20} strokeWidth={1.5} />
          </a>
          <Link
            href="/booking"
            aria-label={t("floatingBookAria")}
            className="group inline-flex h-14 items-center gap-2 rounded-full bg-accent px-5 text-accent-ink shadow-glow transition-all hover:bg-accent-soft"
          >
            <Calendar size={18} strokeWidth={1.75} />
            <span className="font-medium text-sm pr-1">{tNav("book")}</span>
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
