import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { Portrait } from "@/components/portrait";
import { SmartImage } from "@/components/smart-image";
import {
  doctorImages,
  doctors,
  facilityPhotos,
  isLocale,
  timeline,
  values,
} from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "pages.about" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("metaDescription"),
    siteName: tMeta("clinicName"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const safeLocale = isLocale(locale) ? locale : "ka";

  const facilityItems = t.raw("facilityItems") as { title: string; body: string }[];
  const numbers = t.raw("numbers") as { value: string; label: string }[];
  const accreditations = t.raw("accreditations") as string[];

  const featuredDoctors = doctors.slice(0, 9);

  return (
    <>
      <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} body={t("heroBody")} />

      {/* NUMBERS */}
      <section className="container-wide py-12 md:py-16">
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {numbers.map((n, i) => (
            <li key={n.label} className="relative border-t border-line pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0">
              <p className="text-numeral text-6xl font-light text-ink">{n.value}</p>
              <p className="mt-3 text-eyebrow text-ink-muted">{n.label}</p>
              <span aria-hidden className="absolute -top-px left-0 h-px w-6 bg-accent md:top-0 md:left-0 md:h-6 md:w-px" />
              {/* decorative index */}
              <span aria-hidden className="absolute right-0 top-2 font-mono text-xs text-ink-muted">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* MISSION */}
      <section className="border-t border-line/60">
        <div className="container-wide py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-eyebrow">{t("missionEyebrow")}</p>
              <h2 className="mt-4 text-h1">{t("missionTitle")}</h2>
            </div>
            <div className="md:col-span-8 md:pt-2">
              <p className="text-lead max-w-2xl">{t("missionBody")}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-flex h-11 items-center rounded-md border border-ink px-5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {tCommon("allServices")}
                  <ArrowRight size={14} strokeWidth={1.75} className="ml-2" />
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-soft"
                >
                  {tCommon("bookNow")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-bg-sunken/40 border-t border-b border-line/60 grain">
        <div className="container-wide py-12 md:py-16 relative z-10">
          <p className="text-eyebrow">{t("valuesEyebrow")}</p>
          <h2 className="mt-4 text-h1 max-w-2xl">{t("valuesTitle")}</h2>
          <ul className="mt-10 grid gap-px bg-line/60 border border-line/60 sm:grid-cols-2 lg:grid-cols-5">
            {values[safeLocale].map((v, i) => (
              <li key={v.title} className="bg-bg-raised p-6">
                <p className="font-mono text-xs text-ink-muted">
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-display text-xl font-normal">{v.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-wide py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-eyebrow">{t("timelineEyebrow")}</p>
            <h2 className="mt-4 text-h1">{t("timelineTitle")}</h2>
          </div>
          <ol className="md:col-span-8 relative">
            <span aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-line hidden md:block" />
            {timeline[safeLocale].map((item, i) => (
              <li key={item.year} className="relative pl-0 md:pl-10 pb-10 last:pb-0">
                <span
                  aria-hidden
                  className="absolute left-[-4px] top-2 hidden h-2 w-2 rounded-full bg-accent md:block"
                />
                <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-baseline">
                  <p className="text-numeral text-2xl text-accent">{item.year}</p>
                  <div>
                    <h3 className="font-display text-xl font-normal">{item.title}</h3>
                    <p className="mt-2 text-ink-soft">{item.body}</p>
                  </div>
                </div>
                {i < timeline[safeLocale].length - 1 ? (
                  <span aria-hidden className="mt-10 block h-px w-full bg-line/60 md:hidden" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FACILITY */}
      <section className="border-t border-line/60 bg-bg-raised">
        <div className="container-wide py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-eyebrow">{t("facilityEyebrow")}</p>
              <h2 className="mt-4 text-display">{t("facilityTitle")}</h2>
            </div>
          </div>

          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {facilityItems.map((f, i) => (
              <li key={f.title} className="border-t border-line pt-6">
                <p className="font-mono text-xs text-ink-muted">0{i + 1}</p>
                <h3 className="mt-6 font-display text-2xl font-light">{f.title}</h3>
                <p className="mt-4 text-ink-soft leading-relaxed">{f.body}</p>
              </li>
            ))}
          </ul>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {facilityPhotos.slice(0, 6).map((p) => (
              <li key={p.src}>
                <SmartImage
                  src={p.src}
                  alt={p.alt[safeLocale]}
                  aspect="aspect-[4/3]"
                  rounded="lg"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TEAM TEASER */}
      <section className="container-wide py-12 md:py-16">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-eyebrow">03 — {tCommon("allDoctors")}</p>
            <h2 className="mt-4 text-h1 max-w-xl">
              {safeLocale === "ka"
                ? "გუნდი, რომელმაც ააშენა კლინიკა."
                : safeLocale === "ru"
                  ? "Команда, которая построила клинику."
                  : "The team that built the clinic."}
            </h2>
          </div>
        </div>

        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="mt-2 font-display text-2xl font-light">{d.name[safeLocale]}</h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    {tCommon("yearsOfPractice", { years: d.years })}
                  </p>
                  <p className="mt-4 text-sm text-ink-soft line-clamp-3">{d.bio[safeLocale]}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ACCREDITATIONS */}
      <section className="border-t border-line/60 bg-bg-sunken/40">
        <div className="container-wide py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-4">
              <p className="text-eyebrow">{t("accreditationsEyebrow")}</p>
              <h2 className="mt-4 font-display text-2xl font-light">
                {t("accreditationsTitle")}
              </h2>
            </div>
            <ul className="md:col-span-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 text-sm text-ink-soft">
              {accreditations.map((a) => (
                <li key={a} className="border-t border-line/60 pt-3">{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
