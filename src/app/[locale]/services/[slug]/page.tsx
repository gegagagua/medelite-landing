import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";
import { FaqList } from "@/components/faq-list";
import { Portrait } from "@/components/portrait";
import { SmartImage } from "@/components/smart-image";
import {
  doctorImages,
  getDoctor,
  getService,
  isLocale,
  serviceCategories,
  serviceImages,
  services,
} from "@/lib/content";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const out: { slug: string }[] = [];
  for (const s of services) out.push({ slug: s.slug });
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service || !isLocale(locale)) return {};
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const photo = serviceImages[service.slug];

  return buildMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: service.name[locale],
    description: service.short[locale],
    siteName: tMeta("clinicName"),
    images: photo
      ? [{ url: photo.src, alt: photo.alt[locale] }]
      : undefined,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tCommon = await getTranslations("common");
  const safeLocale = isLocale(locale) ? locale : "ka";

  const assignedDoctors = service.doctors
    .map((d) => getDoctor(d))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
  const relatedServices = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14 grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklab, var(--brand) 25%, transparent), transparent 60%)",
          }}
        />
        <div className="container-wide relative z-10">
          <nav aria-label="breadcrumbs" className="text-eyebrow text-ink-muted">
            <Link href="/services" className="hover:text-ink transition-colors">
              {tCommon("allServices")}
            </Link>{" "}
            / {serviceCategories[safeLocale][service.category]}
          </nav>
          <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="text-eyebrow text-accent">{service.number}</p>
              <h1 className="mt-6 text-display">{service.name[safeLocale]}</h1>
              <p className="mt-8 max-w-xl text-lead">{service.short[safeLocale]}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="text-eyebrow text-ink-muted">{tCommon("priceFrom")}</p>
              <p className="mt-2 text-numeral text-5xl font-light text-ink">
                {service.priceFrom} <span className="text-base text-ink-muted">{tCommon("currency")}</span>
              </p>
              <Link
                href="/booking"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-soft"
              >
                {t("bookThis")}
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-line/60" />
      </section>

      {/* COVER IMAGE */}
      {serviceImages[service.slug] ? (
        <section className="container-wide">
          <SmartImage
            src={serviceImages[service.slug].src}
            alt={serviceImages[service.slug].alt[safeLocale]}
            aspect="aspect-[16/7]"
            rounded="xl"
            priority
            sizes="(min-width: 1360px) 1360px, 100vw"
          />
        </section>
      ) : null}

      {/* OVERVIEW + HIGHLIGHTS */}
      <section className="container-wide py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-eyebrow">01 — {t("heroEyebrow").replace("02 — ", "")}</p>
            <p className="mt-6 text-lead text-ink-soft">
              {service.description[safeLocale]}
            </p>
          </div>
          <div className="md:col-span-5 space-y-10 md:border-l md:border-line/60 md:pl-10">
            {service.highlights[safeLocale].map((h) => (
              <div key={h.title}>
                <h3 className="font-display text-xl">{h.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCEDURES */}
      <section className="border-t border-line/60 bg-bg-sunken/40">
        <div className="container-wide py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-eyebrow">02</p>
              <h2 className="mt-4 text-h1">{t("procedures")}</h2>
            </div>
            <ul className="md:col-span-8 divide-y divide-line/60 border-t border-b border-line/60">
              {service.procedures[safeLocale].map((p, i) => (
                <li key={p} className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-4">
                    <Check size={16} strokeWidth={1.5} className="text-accent" />
                    <span className="text-ink">{p}</span>
                  </div>
                  <span className="text-eyebrow text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TEAM */}
      {assignedDoctors.length > 0 ? (
        <section className="container-wide py-12 md:py-16">
          <p className="text-eyebrow">03</p>
          <h2 className="mt-4 text-h1 max-w-xl">{t("team")}</h2>

          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {assignedDoctors.map((doc) => {
              const photo = doctorImages[doc.slug];
              return (
                <li key={doc.slug}>
                  <Portrait
                    initials={doc.initials}
                    src={photo?.src}
                    alt={photo?.alt[safeLocale]}
                  />
                  <div className="mt-6">
                    <p className="text-eyebrow text-ink-muted">{doc.specialty[safeLocale]}</p>
                    <h3 className="mt-2 font-display text-2xl font-light text-ink">
                      {doc.name[safeLocale]}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">
                      {tCommon("yearsOfPractice", { years: doc.years })}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {/* FAQ */}
      {service.faqs[safeLocale].length > 0 ? (
        <section className="border-t border-line/60">
          <div className="container-wide py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-eyebrow">04</p>
                <h2 className="mt-4 text-h1">{t("faq")}</h2>
              </div>
              <div className="md:col-span-8">
                <FaqList items={service.faqs[safeLocale]} />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* RELATED */}
      {relatedServices.length > 0 ? (
        <section className="border-t border-line/60 bg-bg-sunken/40">
          <div className="container-wide py-12 md:py-16">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="text-eyebrow">05</p>
                <h2 className="mt-4 text-h1">{serviceCategories[safeLocale][service.category]}</h2>
              </div>
              <Link href="/services" className="text-sm text-ink-soft hover:text-accent transition-colors">
                {tCommon("allServices")} →
              </Link>
            </div>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={{ pathname: "/services/[slug]", params: { slug: s.slug } }}
                    className="group block border-t border-line pt-6"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-eyebrow">{s.number}</span>
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        className="text-ink-muted transition-all group-hover:text-accent group-hover:translate-x-0.5"
                      />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-light text-ink group-hover:text-accent transition-colors">
                      {s.name[safeLocale]}
                    </h3>
                    <p className="mt-3 text-sm text-ink-soft">{s.short[safeLocale]}</p>
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
