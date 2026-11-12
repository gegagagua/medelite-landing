import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Portrait } from "@/components/portrait";
import { SmartImage } from "@/components/smart-image";
import { HeroSlider } from "@/components/hero-slider";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { FaqList } from "@/components/faq-list";
import {
  doctorImages,
  doctors,
  facilityPhotos,
  formatDate,
  getDoctor,
  heroPhoto,
  homeFaq,
  isLocale,
  news,
  newsImages,
  serviceImages,
  services,
  serviceCategories,
  testimonials,
} from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.home" });
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = isLocale(locale) ? locale : "ka";

  const t = await getTranslations("pages.home");
  const tHome = await getTranslations("home");
  const tCommon = await getTranslations("common");

  const featuredServices = services.slice(0, 6);
  const featuredDoctors = doctors.slice(0, 4);
  const featuredNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const stats = tHome.raw("stats") as {
    specialities: string;
    doctors: string;
    patients: string;
    years: string;
  };
  const process = tHome.raw("process") as { title: string; body: string }[];
  const featuredTestimonials = testimonials.slice(0, 3);
  const galleryPhotos = facilityPhotos.slice(0, 6);
  const faqItems = homeFaq[safeLocale];

  const heroSlides = [
    { src: heroPhoto.src, alt: heroPhoto.alt[safeLocale] },
    ...facilityPhotos.slice(0, 3).map((p) => ({
      src: p.src,
      alt: p.alt[safeLocale],
    })),
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <HeroSlider slides={heroSlides} />

        <div className="container-wide relative z-10 flex h-[100svh] flex-col justify-end pt-24 pb-10 text-white md:pb-16">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-white/80">{t("heroEyebrow")}</p>
            <h1 className="mt-6 text-display-xl text-white drop-shadow-sm">
              {t("heroTitle")}
            </h1>
            <p className="mt-8 max-w-xl text-lead text-white/85">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center rounded-md bg-accent px-6 text-sm font-medium text-accent-ink transition-all hover:bg-accent-soft hover:shadow-glow"
              >
                {t("heroPrimaryCta")}
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-white/60 px-6 text-sm text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {t("heroSecondaryCta")}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/25 pt-8 md:grid-cols-4 md:gap-x-10">
            <HeroStat value="18" label={stats.specialities} />
            <HeroStat value="24" label={stats.doctors} />
            <HeroStat value="12k" label={stats.patients} />
            <HeroStat value="11" label={stats.years} />
          </dl>
        </div>
      </section>

      {/* SPECIALITIES */}
      <section className="container-wide py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-eyebrow">{tHome("specialitiesEyebrow")}</p>
            <h2 className="mt-4 text-display">{tHome("specialitiesTitle")}</h2>
            <p className="mt-6 text-lead max-w-xl">{tHome("specialitiesBody")}</p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition-colors"
            >
              {tCommon("allServices")}
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => {
            const photo = serviceImages[s.slug];
            return (
              <li key={s.slug}>
                <Link
                  href={{ pathname: "/services/[slug]", params: { slug: s.slug } }}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line/60 bg-bg transition-colors hover:border-line-strong"
                >
                  {photo ? (
                    <div className="relative">
                      <SmartImage
                        src={photo.src}
                        alt={photo.alt[safeLocale]}
                        aspect="aspect-[16/10]"
                        rounded="none"
                        grain={false}
                        wrapperClassName="border-b border-line/60"
                      />
                      <span className="absolute left-5 top-5 text-eyebrow text-ink-muted bg-bg/85 px-2 py-1 rounded-sm backdrop-blur-sm">
                        {s.number}
                      </span>
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <span className="text-eyebrow text-ink-muted">
                        {serviceCategories[safeLocale][s.category]}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-light text-ink group-hover:text-accent transition-colors">
                        {s.name[safeLocale]}
                      </h3>
                      <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                        {s.short[safeLocale]}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center justify-between text-xs text-ink-muted">
                      <span>
                        {tCommon("priceFrom")} {s.priceFrom} {tCommon("currency")}
                      </span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-all group-hover:text-accent group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* DOCTORS */}
      <section className="border-t border-line/60 bg-bg-sunken/40">
        <div className="container-wide py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-eyebrow">{tHome("doctorsEyebrow")}</p>
              <h2 className="mt-4 text-display">{tHome("doctorsTitle")}</h2>
              <p className="mt-6 text-lead max-w-xl">{tHome("doctorsBody")}</p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition-colors"
              >
                {tCommon("allDoctors")}
                <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </div>
          </div>

          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDoctors.map((d) => {
              const photo = doctorImages[d.slug];
              return (
                <li key={d.slug}>
                  <Portrait
                    initials={d.initials}
                    src={photo?.src}
                    alt={photo?.alt[safeLocale]}
                  />
                  <div className="mt-6">
                    <p className="text-eyebrow text-ink-muted">{d.specialty[safeLocale]}</p>
                    <h3 className="mt-2 font-display text-xl font-light text-ink">
                      {d.name[safeLocale]}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">
                      {tCommon("yearsOfPractice", { years: d.years })}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-wide py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-eyebrow">{tHome("processEyebrow")}</p>
            <h2 className="mt-4 text-display">{tHome("processTitle")}</h2>
          </div>
          <ol className="md:col-span-8 grid gap-px bg-line/60 border border-line/60 sm:grid-cols-2">
            {process.map((p, i) => (
              <li key={i} className="bg-bg p-6">
                <p className="text-numeral text-5xl font-light text-accent">0{i + 1}</p>
                <h3 className="mt-6 font-display text-xl font-normal text-ink">{p.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FACILITY */}
      <section className="border-t border-line/60 bg-bg-raised grain">
        <div className="container-wide py-14 md:py-20 relative z-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="text-eyebrow">{tHome("facilityEyebrow")}</p>
              <h2 className="mt-4 text-display">{tHome("facilityTitle")}</h2>
              <p className="mt-6 max-w-xl text-lead">{tHome("facilityBody")}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition-colors"
              >
                {safeLocale === "ka" ? "შენობის შესახებ" : safeLocale === "ru" ? "О здании" : "About the building"}
                <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <SmartImage
                src={facilityPhotos[0].src}
                alt={facilityPhotos[0].alt[safeLocale]}
                aspect="aspect-[4/3]"
                rounded="xl"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
            <ul className="md:col-span-5 flex flex-col justify-between gap-6">
              <FacilityStat
                number="1400"
                unit={safeLocale === "ka" ? "მ²" : "m²"}
                label={safeLocale === "ka" ? "სრული ფართი" : safeLocale === "ru" ? "общая площадь" : "total floor area"}
              />
              <FacilityStat
                number="04"
                label={safeLocale === "ka" ? "სართული" : safeLocale === "ru" ? "этажа" : "floors"}
              />
              <FacilityStat
                number="32"
                unit="dB"
                label={safeLocale === "ka" ? "ფონის დონე კონსულტაციაში" : safeLocale === "ru" ? "фон в кабинете консультации" : "ambient noise in consultation rooms"}
              />
            </ul>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="container-wide py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-eyebrow">{tHome("galleryEyebrow")}</p>
            <h2 className="mt-4 text-display">{tHome("galleryTitle")}</h2>
          </div>
          <p className="md:col-span-5 text-ink-soft max-w-md">{tHome("galleryBody")}</p>
        </div>

        <GalleryCarousel
          photos={galleryPhotos.map((p) => ({ src: p.src, alt: p.alt[safeLocale] }))}
          closeLabel={safeLocale === "ka" ? "დახურვა" : safeLocale === "ru" ? "Закрыть" : "Close"}
          prevLabel={safeLocale === "ka" ? "წინა" : safeLocale === "ru" ? "Назад" : "Previous"}
          nextLabel={safeLocale === "ka" ? "შემდეგი" : safeLocale === "ru" ? "Далее" : "Next"}
        />
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-line/60 bg-bg-sunken/40">
        <div className="container-wide py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-eyebrow">{tHome("testimonialsEyebrow")}</p>
              <h2 className="mt-4 text-display">{tHome("testimonialsTitle")}</h2>
            </div>
            <p className="md:col-span-5 text-ink-soft max-w-md">{tHome("testimonialsBody")}</p>
          </div>

          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {featuredTestimonials.map((tst) => (
              <li
                key={tst.slug}
                className="relative flex flex-col justify-between rounded-lg border border-line/60 bg-bg p-6"
              >
                <Quote
                  size={28}
                  strokeWidth={1.25}
                  className="text-accent"
                  aria-hidden
                />
                <blockquote className="mt-6 font-display text-xl font-light leading-snug text-ink">
                  “{tst.quote[safeLocale]}”
                </blockquote>
                <div className="mt-8 border-t border-line/60 pt-6">
                  <div className="flex items-center gap-1" aria-label={`${tst.rating}/5`}>
                    {Array.from({ length: tst.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        strokeWidth={1.5}
                        className="fill-accent text-accent"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-medium text-ink">
                    {tst.author[safeLocale]}
                  </p>
                  <p className="text-xs text-ink-muted">{tst.context[safeLocale]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWS */}
      <section className="container-wide py-14 md:py-20">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-eyebrow">{tHome("newsEyebrow")}</p>
            <h2 className="mt-4 text-display">{tHome("newsTitle")}</h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition-colors"
          >
            {tCommon("allNews")}
            <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        </div>

        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {featuredNews.map((n) => {
            const photo = newsImages[n.slug];
            const author = n.author === "editorial"
              ? (safeLocale === "ka" ? "სარედაქციო" : safeLocale === "ru" ? "Редакция" : "Editorial")
              : getDoctor(n.author)?.name[safeLocale];
            return (
              <li key={n.slug}>
                <Link
                  href={{ pathname: "/news/[slug]", params: { slug: n.slug } }}
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
                    <span>{formatDate(n.date, safeLocale)}</span>
                    <span>{tCommon("readingMin", { min: n.readingMin })}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-normal text-ink leading-snug group-hover:text-accent transition-colors">
                    {n.title[safeLocale]}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft">{n.excerpt[safeLocale]}</p>
                  <p className="mt-6 text-xs text-ink-muted">{author}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* FAQ */}
      <section className="border-t border-line/60">
        <div className="container-wide py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-eyebrow">{tHome("faqEyebrow")}</p>
              <h2 className="mt-4 text-display">{tHome("faqTitle")}</h2>
              <p className="mt-6 text-ink-soft max-w-sm">{tHome("faqBody")}</p>
            </div>
            <div className="md:col-span-8">
              <FaqList items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line/60 bg-bg-sunken grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklab, var(--accent) 25%, transparent), transparent 60%)",
          }}
        />
        <div className="container-wide relative z-10 py-10 md:py-14 text-center">
          <p className="text-eyebrow">{tHome("ctaEyebrow")}</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-display">{tHome("ctaTitle")}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lead">{tHome("ctaBody")}</p>
          <div className="mt-10">
            <Link
              href="/booking"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-7 text-sm font-medium text-accent-ink hover:bg-accent-soft hover:shadow-glow transition-all"
            >
              {tHome("ctaButton")}
              <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-eyebrow text-white/70">{label}</dt>
      <dd className="mt-2 text-numeral text-5xl font-light text-white">{value}</dd>
    </div>
  );
}

function FacilityStat({ number, unit, label }: { number: string; unit?: string; label: string }) {
  return (
    <li className="border-t border-line pt-4">
      <p className="text-numeral text-5xl font-light text-ink">
        {number}
        {unit ? <span className="ml-2 text-base text-ink-muted">{unit}</span> : null}
      </p>
      <p className="mt-2 text-eyebrow text-ink-muted">{label}</p>
    </li>
  );
}
