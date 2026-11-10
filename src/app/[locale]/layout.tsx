import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { CookieNotice } from "@/components/cookie-notice";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("clinicName"),
      template: `%s — ${t("clinicShortName")}`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ka: "/ka",
        ru: "/ru",
        en: "/en",
        "x-default": "/ka",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ka" ? "ka_GE" : locale === "ru" ? "ru_RU" : "en_US",
      siteName: t("clinicName"),
      title: t("clinicName"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("clinicName"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          {messages.nav && typeof messages.nav === "object" && "skipToContent" in messages.nav
            ? (messages.nav as { skipToContent: string }).skipToContent
            : "Skip"}
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
        <CookieNotice />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
