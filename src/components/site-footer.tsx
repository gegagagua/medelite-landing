import { getTranslations } from "next-intl/server";
import { Facebook, Instagram, Youtube, MessageCircle, Send, Phone } from "lucide-react";

import { Link } from "@/i18n/navigation";

const socials = [
  { key: "facebook", href: "https://facebook.com/medelite", Icon: Facebook, label: "Facebook" },
  { key: "instagram", href: "https://instagram.com/medelite", Icon: Instagram, label: "Instagram" },
  { key: "tiktok", href: "https://tiktok.com/@medelite", Icon: TikTokIcon, label: "TikTok" },
  { key: "youtube", href: "https://youtube.com/@medelite", Icon: Youtube, label: "YouTube" },
  { key: "whatsapp", href: "https://wa.me/995322445577", Icon: MessageCircle, label: "WhatsApp" },
  { key: "telegram", href: "https://t.me/medelite", Icon: Send, label: "Telegram" },
  { key: "viber", href: "viber://chat?number=%2B995322445577", Icon: Phone, label: "Viber" },
];

export async function SiteFooter() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-line/60 bg-bg-sunken grain">
      <div className="container-wide relative z-10 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5 lg:col-span-6">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl tracking-tight">
                {t("meta.clinicShortName")}
              </span>
            </div>
            <p className="mt-4 max-w-md text-ink-soft">
              {t("meta.description")}
            </p>

            <form className="mt-8 flex max-w-md gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                {t("footer.newsletter.placeholder")}
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="flex-1 rounded-md border border-line bg-bg-raised px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="rounded-md border border-ink bg-ink px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-brand hover:border-brand hover:text-brand-ink"
              >
                {t("footer.newsletter.submit")}
              </button>
            </form>
          </div>

          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title={t("footer.columns.clinic")}>
              <FooterLink href="/about">{t("nav.about")}</FooterLink>
              <FooterLink href="/news">{t("nav.news")}</FooterLink>
              <FooterLink href="/contact">{t("nav.contact")}</FooterLink>
            </FooterColumn>

            <FooterColumn title={t("footer.columns.services")}>
              <FooterLink href="/services">{t("nav.services")}</FooterLink>
              <FooterLink href="/booking">{t("nav.book")}</FooterLink>
            </FooterColumn>

            <FooterColumn title={t("footer.columns.contact")}>
              <p className="text-sm text-ink-soft">{t("meta.phone")}</p>
              <p className="text-sm text-ink-soft">{t("meta.email")}</p>
              <p className="text-sm text-ink-soft">{t("meta.address")}</p>
              <p className="text-sm text-ink-muted">{t("meta.hours")}</p>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-10 border-t border-line/60 pt-8 flex flex-col-reverse items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-muted">
            {t("footer.copyright", { year })}
          </p>
          <ul className="flex flex-wrap items-center gap-3">
            {socials.map(({ key, href, Icon, label }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-eyebrow mb-4">{title}</h3>
      <ul className="space-y-2">
        {Array.isArray(children)
          ? children.map((child, i) => <li key={i}>{child}</li>)
          : <li>{children}</li>}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: Parameters<typeof Link>[0]["href"]; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-ink-soft transition-colors hover:text-accent"
    >
      {children}
    </Link>
  );
}

function TikTokIcon({ size = 16, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 12a4 4 0 1 0 4 4V4c1 2 3 4 6 4" />
    </svg>
  );
}
