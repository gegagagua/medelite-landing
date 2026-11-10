import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/page-hero";
import { BookingFlow } from "@/components/booking-flow";
import { doctors, isLocale, services } from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.booking" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function BookingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const safeLocale = isLocale(locale) ? locale : "ka";

  return (
    <>
      <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} body={t("heroBody")} />

      <section className="container-wide pb-24 md:pb-32">
        <BookingFlow services={services} doctors={doctors} locale={safeLocale} />

        <p className="mt-10 max-w-2xl text-sm text-ink-muted leading-relaxed">
          {t("note")}
        </p>
      </section>
    </>
  );
}
