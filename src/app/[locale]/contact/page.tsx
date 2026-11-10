import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, Mail, MapPin, Clock, AlertTriangle } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tMeta = await getTranslations("meta");

  const directions = t.raw("directions") as { title: string; body: string }[];

  return (
    <>
      <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} body={t("heroBody")} />

      {/* INFO BLOCKS */}
      <section className="container-wide py-10 md:py-14">
        <ul className="grid gap-px bg-line/60 border border-line/60 md:grid-cols-4">
          <InfoBlock Icon={MapPin} eyebrow={t("visit")}>
            <p className="font-display text-xl font-normal text-ink">{tMeta("address")}</p>
            <p className="mt-2 text-sm text-ink-muted">{tMeta("city")}, {tMeta("country")}</p>
          </InfoBlock>
          <InfoBlock Icon={Phone} eyebrow={t("call")}>
            <a
              href={`tel:${tMeta("phone").replace(/\s/g, "")}`}
              className="font-display text-xl font-normal text-ink hover:text-accent transition-colors"
            >
              {tMeta("phone")}
            </a>
            <p className="mt-2 text-sm text-ink-muted">
              {locale === "ka"
                ? "ქართული · რუსული · ინგლისური"
                : locale === "ru"
                  ? "Грузинский · Русский · Английский"
                  : "Georgian · Russian · English"}
            </p>
          </InfoBlock>
          <InfoBlock Icon={Mail} eyebrow={t("write")}>
            <a
              href={`mailto:${tMeta("email")}`}
              className="font-display text-xl font-normal text-ink hover:text-accent transition-colors"
            >
              {tMeta("email")}
            </a>
            <p className="mt-2 text-sm text-ink-muted">
              {locale === "ka"
                ? "პასუხი — ერთ სამუშაო დღეში"
                : locale === "ru"
                  ? "Ответ — в течение рабочего дня"
                  : "Reply within one working day"}
            </p>
          </InfoBlock>
          <InfoBlock Icon={Clock} eyebrow={t("hours")}>
            <p className="font-display text-xl font-normal text-ink leading-snug">
              {tMeta("hours")}
            </p>
          </InfoBlock>
        </ul>
      </section>

      {/* MAP + DIRECTIONS */}
      <section className="container-wide pb-20 md:pb-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7 relative overflow-hidden rounded-xl border border-line/60 aspect-[4/3] bg-bg-sunken grain">
            {/* Stylised map pattern — swapped for real map at Phase 2 */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(55deg, color-mix(in oklab, var(--line) 50%, transparent) 0 1px, transparent 1px 42px), repeating-linear-gradient(-35deg, color-mix(in oklab, var(--line) 50%, transparent) 0 1px, transparent 1px 42px), radial-gradient(60% 50% at 55% 40%, color-mix(in oklab, var(--brand) 20%, transparent), transparent 70%)",
              }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink shadow-glow">
                <MapPin size={20} strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-display text-xl text-ink">{tMeta("clinicShortName")}</p>
              <p className="text-sm text-ink-muted">{tMeta("address")}</p>
            </div>
          </div>

          <div className="md:col-span-5">
            <p className="text-eyebrow">{t("directionsTitle")}</p>
            <ul className="mt-6 divide-y divide-line/60 border-t border-b border-line/60">
              {directions.map((d, i) => (
                <li key={d.title} className="py-4 flex gap-6">
                  <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg">{d.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft leading-relaxed">{d.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="border-t border-line/60 bg-bg-sunken/40">
        <div className="container-wide py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-eyebrow">02 — {t("formTitle")}</p>
              <h2 className="mt-4 text-h1 max-w-md">{t("formTitle")}</h2>
              <p className="mt-6 text-ink-soft max-w-md">{t("formHint")}</p>
            </div>
            <div className="md:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCY */}
      <section className="container-wide py-16">
        <div className="flex items-start gap-4 rounded-lg border border-danger/40 bg-bg-raised p-6 max-w-3xl">
          <AlertTriangle
            size={20}
            strokeWidth={1.75}
            className="mt-0.5 flex-shrink-0 text-danger"
          />
          <p className="text-sm text-ink-soft leading-relaxed">{t("emergency")}</p>
        </div>
      </section>
    </>
  );
}

function InfoBlock({
  Icon,
  eyebrow,
  children,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <li className="bg-bg p-6">
      <Icon size={18} strokeWidth={1.5} className="text-accent" />
      <p className="mt-6 text-eyebrow">{eyebrow}</p>
      <div className="mt-3">{children}</div>
    </li>
  );
}
