import { getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

type Props = { locale: Locale };

export async function StructuredData({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const tHours = t("hours");

  const clinic = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#clinic`,
    name: t("clinicName"),
    alternateName: t("clinicShortName"),
    description: t("description"),
    url: `${SITE_URL}/${locale}`,
    telephone: t("phone"),
    email: t("email"),
    image: `${SITE_URL}/${locale}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: t("address"),
      addressLocality: t("city"),
      addressCountry: t("country"),
    },
    areaServed: t("city"),
    openingHours: tHours,
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: t("clinicName"),
    description: t("description"),
    inLanguage: routing.locales,
    publisher: { "@id": `${SITE_URL}/#clinic` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinic) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
