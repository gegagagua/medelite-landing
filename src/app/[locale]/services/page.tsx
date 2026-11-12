import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { ServicesGrid } from "@/components/services-grid";
import { isLocale, serviceCategories, services } from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "pages.services" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("metaDescription"),
    siteName: tMeta("clinicName"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const safeLocale = isLocale(locale) ? locale : "ka";

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        body={t("heroBody")}
      />

      <ServicesGrid
        services={services}
        locale={safeLocale}
        categoryLabels={serviceCategories[safeLocale]}
      />

      <section className="container-wide pb-28">
        <div className="relative overflow-hidden rounded-xl border border-line/60 bg-bg-raised p-6 md:p-12 grain">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, color-mix(in oklab, var(--accent) 24%, transparent), transparent 65%)",
            }}
          />
          <div className="relative z-10 grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="text-eyebrow">02 · 08</p>
              <h2 className="mt-4 text-h1 max-w-xl">{t("ctaTitle")}</h2>
              <p className="mt-6 max-w-lg text-lead">{t("ctaBody")}</p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-soft"
              >
                {t("ctaButton")}
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
