import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";
import { SmartImage } from "@/components/smart-image";
import {
  formatDate,
  getDoctor,
  getNews,
  isLocale,
  news,
  newsCategories,
  newsImages,
} from "@/lib/content";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getNews(slug);
  if (!post || !isLocale(locale)) return {};
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const photo = newsImages[post.slug];
  const author =
    post.author === "editorial"
      ? tMeta("clinicShortName")
      : getDoctor(post.author)?.name[locale];

  return buildMetadata({
    locale,
    path: `/news/${post.slug}`,
    title: post.title[locale],
    description: post.excerpt[locale],
    siteName: tMeta("clinicName"),
    type: "article",
    images: photo
      ? [{ url: photo.src, alt: photo.alt[locale] }]
      : undefined,
    article: {
      publishedTime: post.date,
      authors: author ? [author] : undefined,
    },
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getNews(slug);
  if (!post) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("news");
  const tCommon = await getTranslations("common");
  const safeLocale = isLocale(locale) ? locale : "ka";

  const author = post.author === "editorial" ? t("editorial") : getDoctor(post.author)?.name[safeLocale];
  const related = news.filter((n) => n.slug !== post.slug).slice(0, 2);
  const cats = newsCategories[safeLocale];

  return (
    <>
      <article>
        {/* HERO */}
        <section className="relative overflow-hidden pt-28 pb-10 md:pt-32 md:pb-14 grain">
          <div className="container-wide relative z-10">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-eyebrow text-ink-muted hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={1.75} />
              {t("backToNews")}
            </Link>

            <div className="mt-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-muted">
                <span className="rounded-sm border border-line px-3 py-1 text-ink">
                  {cats[post.category]}
                </span>
                <time dateTime={post.date}>{formatDate(post.date, safeLocale)}</time>
                <span aria-hidden>·</span>
                <span>{tCommon("readingMin", { min: post.readingMin })}</span>
              </div>
              <h1 className="mt-6 text-display-xl text-ink">{post.title[safeLocale]}</h1>
              <p className="mt-6 text-lead">{post.excerpt[safeLocale]}</p>
              <p className="mt-8 text-sm text-ink-soft">
                {t("by")} <span className="text-ink">{author}</span>
              </p>
            </div>
          </div>
          <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-line/60" />
        </section>

        {/* COVER */}
        {newsImages[post.slug] ? (
          <section className="container-wide py-10">
            <SmartImage
              src={newsImages[post.slug].src}
              alt={newsImages[post.slug].alt[safeLocale]}
              aspect="aspect-[16/8]"
              rounded="xl"
              priority
              sizes="(min-width: 1360px) 1360px, 100vw"
            />
          </section>
        ) : null}

        {/* BODY */}
        <section className="container-wide pb-20 md:pb-28">
          <div className="container-prose">
            {post.body[safeLocale].map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lead text-ink mt-8 leading-relaxed"
                    : "mt-6 text-ink-soft leading-relaxed"
                }
              >
                {p}
              </p>
            ))}
            <hr className="hairline my-12" />
            <p className="text-sm text-ink-muted">
              {safeLocale === "ka"
                ? "გსურთ შეუერთდეთ კარდიოლოგის პრევენციულ შემოწმებას? ჩაწერა ხელმისაწვდომია პორტალზე."
                : safeLocale === "ru"
                  ? "Хотите пройти кардиологический чек-ап? Запись доступна в личном кабинете."
                  : "Want to join the cardiology check-up? Booking is open through the patient portal."}
            </p>
            <Link
              href="/booking"
              className="mt-6 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-soft"
            >
              {tCommon("bookNow")}
            </Link>
          </div>
        </section>
      </article>

      {/* RELATED */}
      {related.length > 0 ? (
        <section className="border-t border-line/60 bg-bg-sunken/40">
          <div className="container-wide py-12 md:py-16">
            <p className="text-eyebrow">{t("related")}</p>
            <ul className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={{ pathname: "/news/[slug]", params: { slug: r.slug } }}
                    className="group block border-t border-line pt-6"
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
                      <span>{cats[r.category]}</span>
                      <time dateTime={r.date}>{formatDate(r.date, safeLocale)}</time>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-light text-ink group-hover:text-accent transition-colors">
                      {r.title[safeLocale]}
                    </h3>
                    <p className="mt-4 text-sm text-ink-soft">{r.excerpt[safeLocale]}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm text-ink-soft group-hover:text-accent transition-colors">
                      {tCommon("readMore")}
                      <ArrowRight size={14} strokeWidth={1.75} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
