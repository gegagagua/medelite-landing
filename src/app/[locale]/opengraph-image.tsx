import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Medelite Clinic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const name = t("clinicName");
  const tagline = t("tagline");
  const city = t("city");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0c1714 0%, #142420 55%, #1b3a30 100%)",
          color: "#f6f1e6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c8b48a",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#c8b48a",
            }}
          />
          <span>{name}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            maxWidth: 940,
          }}
        >
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 300,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.3,
              color: "rgba(246, 241, 230, 0.75)",
              maxWidth: 820,
            }}
          >
            {t("description")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "rgba(246, 241, 230, 0.7)",
            borderTop: "1px solid rgba(200, 180, 138, 0.35)",
            paddingTop: 28,
          }}
        >
          <span>medelite.ge</span>
          <span>{city}</span>
        </div>
      </div>
    ),
    size,
  );
}
