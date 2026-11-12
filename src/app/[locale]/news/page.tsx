import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { SmartImage } from "@/components/smart-image";
import {
  formatDate,
  getDoctor,
  isLocale,
  news,
  newsCategories,
  newsImages,
} from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "pages.news" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    path: "/news",
    title: t("title"),
    description: t("metaDescription"),
    siteName: tMeta("clinicName"),
  });
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const tCommon = await getTranslations("common");
  const safeLocale = isLocale(locale) ? locale : "ka";

  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;
  const cats = newsCategories[safeLocale];

  const author = featured.author === "editorial" ? t("editorial") : getDoctor(featured.author)?.name[safeLocale];

  return (
    <>
      <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} body={t("heroBody")} />

      {/* FEATURED */}
      <section className="container-wide py-10 md:py-14">
        <Link
          href={{ pathname: "/news/[slug]", params: { slug: featured.slug } }}
          className="group grid gap-10 md:grid-cols-12 md:gap-16 border-t border-line/60 pt-10"
        >
          <div className="md:col-span-5 relative">
            {newsImages[featured.slug] ? (
              <SmartImage
                src={newsImages[featured.slug].src}
                alt={newsImages[featured.slug].alt[safeLocale]}
                aspect="aspect-[4/3]"
                rounded="lg"
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            ) : (
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-bg-sunken grain" />
            )}
            <span className="absolute left-4 top-4 inline-flex h-7 items-center rounded-sm bg-bg/80 px-3 text-eyebrow text-ink backdrop-blur-sm">
              {cats[featured.category]}
            </span>
          </div>
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs text-ink-muted">
                <time dateTime={featured.date}>{formatDate(featured.date, safeLocale)}</time>
                <span aria-hidden>·</span>
                <span>{tCommon("readingMin", { min: featured.readingMin })}</span>
              </div>
              <h2 className="mt-6 text-h1 font-light max-w-2xl group-hover:text-accent transition-colors">
                {featured.title[safeLocale]}
              </h2>
              <p className="mt-6 text-lead max-w-xl">{featured.excerpt[safeLocale]}</p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-ink-soft">
              <span>
                {t("by")} <span className="text-ink">{author}</span>
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="ml-auto text-ink-muted group-hover:text-accent transition-all group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </Link>
      </section>

      {/* GRID */}
      <section className="container-wide pb-24">
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => {
            const postAuthor =
              post.author === "editorial" ? t("editorial") : getDoctor(post.author)?.name[safeLocale];
            const photo = newsImages[post.slug];
            return (
              <li key={post.slug}>
                <Link
                  href={{ pathname: "/news/[slug]", params: { slug: post.slug } }}
                  className="group block"
                >
                  {photo ? (
                    <SmartImage
                      src={photo.src}
                      alt={photo.alt[safeLocale]}
                      aspect="aspect-[4/3]"
                      rounded="lg"
                    />
                  ) : null}
                  <div className="mt-6 flex items-center justify-between font-mono text-xs text-ink-muted">
                    <span>{cats[post.category]}</span>
                    <time dateTime={post.date}>{formatDate(post.date, safeLocale)}</time>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-normal leading-snug text-ink group-hover:text-accent transition-colors">
                    {post.title[safeLocale]}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                    {post.excerpt[safeLocale]}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-xs text-ink-muted">
                    <span>{postAuthor}</span>
                    <span>{tCommon("readingMin", { min: post.readingMin })}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
