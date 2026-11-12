import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://medelite.ge";

const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=630&fit=crop&crop=entropy&auto=format&q=70";

const ogLocale: Record<Locale, string> = {
  ka: "ka_GE",
  ru: "ru_RU",
  en: "en_US",
};

const alternateOgLocales: Record<Locale, string[]> = {
  ka: ["ru_RU", "en_US"],
  ru: ["ka_GE", "en_US"],
  en: ["ka_GE", "ru_RU"],
};

export type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type BuildMetadataOptions = {
  locale: Locale;
  /** Path without locale prefix, e.g. "/services" or "/news/slug". Use "" for home. */
  path?: string;
  title: string;
  description: string;
  siteName: string;
  images?: OgImage[];
  /** Content type for openGraph. Defaults to "website". */
  type?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
  };
};

function withLocale(path: string, locale: Locale) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  siteName,
  images,
  type = "website",
  article,
}: BuildMetadataOptions): Metadata {
  const canonical = withLocale(path, locale);

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = withLocale(path, l);
  }
  languages["x-default"] = withLocale(path, routing.defaultLocale);

  const fallbackImage: OgImage = {
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: siteName,
  };
  const resolvedImages = (images && images.length > 0 ? images : [fallbackImage]).map((img) => ({
    url: img.url,
    width: img.width ?? 1200,
    height: img.height ?? 630,
    alt: img.alt ?? title,
  }));

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type,
      locale: ogLocale[locale],
      alternateLocale: alternateOgLocales[locale],
      siteName,
      title,
      description,
      url: canonical,
      images: resolvedImages,
      ...(type === "article" && article ? article : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedImages?.map((i) => i.url),
    },
  };
}
