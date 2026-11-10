import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ka", "ru", "en"],
  defaultLocale: "ka",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": {
      ka: "/services",
      ru: "/services",
      en: "/services",
    },
    "/services/[slug]": {
      ka: "/services/[slug]",
      ru: "/services/[slug]",
      en: "/services/[slug]",
    },
    "/booking": {
      ka: "/booking",
      ru: "/booking",
      en: "/booking",
    },
    "/news": {
      ka: "/news",
      ru: "/news",
      en: "/news",
    },
    "/news/[slug]": {
      ka: "/news/[slug]",
      ru: "/news/[slug]",
      en: "/news/[slug]",
    },
    "/about": {
      ka: "/about",
      ru: "/about",
      en: "/about",
    },
    "/contact": {
      ka: "/contact",
      ru: "/contact",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
