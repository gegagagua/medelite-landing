"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Apple,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  Check,
  Droplet,
  Droplets,
  Dumbbell,
  Ear,
  Eye,
  Flower2,
  HeartPulse,
  type LucideIcon,
  MessageCircle,
  Phone,
  Salad,
  ScanLine,
  Smile,
  Sparkles,
  Stethoscope,
  Users,
  Wind,
} from "lucide-react";

import { cn } from "@/lib/cn";
import type { Doctor, Locale, Service } from "@/lib/content";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  cardiology: HeartPulse,
  "general-medicine": Stethoscope,
  dermatology: Sparkles,
  gynaecology: Flower2,
  paediatrics: Baby,
  dentistry: Smile,
  neurology: Brain,
  orthopaedics: Bone,
  endocrinology: Droplet,
  imaging: ScanLine,
  ophthalmology: Eye,
  psychology: Users,
  urology: Droplets,
  "ent-otolaryngology": Ear,
  gastroenterology: Salad,
  pulmonology: Wind,
  physiotherapy: Dumbbell,
  nutrition: Apple,
};

type Props = {
  services: Service[];
  doctors: Doctor[];
  locale: Locale;
};

const TIMESLOTS = {
  morning: ["09:00", "09:40", "10:20", "11:00", "11:40"],
  midday: ["12:20", "13:00"],
  afternoon: ["14:20", "15:00", "15:40", "16:20", "17:00"],
  evening: ["17:40", "18:20", "19:00", "19:40"],
} as const;

function next14Days(): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", weekday: "short" }),
    });
  }
  return out;
}

export function BookingFlow({ services, doctors, locale }: Props) {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const tForm = useTranslations("booking.form");
  const tTimes = useTranslations("booking.times");

  const [step, setStep] = useState(1);
  const [serviceSlug, setService] = useState<string>("");
  const [doctorSlug, setDoctor] = useState<string>("any");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [sent, setSent] = useState(false);

  const service = services.find((s) => s.slug === serviceSlug);
  const stepTitles = t.raw("steps") as { title: string; body: string }[];

  const availableDoctors = useMemo(() => {
    if (!service) return doctors;
    return doctors.filter((d) => service.doctors.includes(d.slug));
  }, [service, doctors]);

  const dates = useMemo(() => next14Days(), []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.setTimeout(() => setSent(true), 500);
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-line bg-bg-raised p-6 text-center shadow-sm">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent text-accent">
          <Check size={22} strokeWidth={1.75} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-light text-ink">
          {locale === "ka"
            ? "მადლობა — ვიზიტი დადასტურებულია."
            : locale === "ru"
              ? "Спасибо — визит подтверждён."
              : "Thank you — your visit is confirmed."}
        </h3>
        <p className="mt-4 text-ink-soft">
          {locale === "ka"
            ? "დადასტურებას მიიღებთ ელფოსტაზე და SMS-ით რამდენიმე წუთში."
            : locale === "ru"
              ? "Подтверждение придёт на e-mail и SMS в течение нескольких минут."
              : "A confirmation will arrive by email and SMS within a few minutes."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      {/* FORM */}
      <form onSubmit={submit} className="lg:col-span-8 space-y-12">
        {/* progress */}
        <ol className="grid grid-cols-4 gap-2 border-b border-line/60 pb-6">
          {stepTitles.map((s, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setStep(n)}
                  className={cn(
                    "group text-left w-full",
                    !active && !done && "opacity-60",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs",
                        done
                          ? "bg-accent text-accent-ink"
                          : active
                            ? "border border-ink text-ink"
                            : "border border-line text-ink-muted",
                      )}
                    >
                      {done ? <Check size={14} strokeWidth={2} /> : n}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                      {t("step")} {n} / {stepTitles.length}
                    </span>
                  </div>
                  <p className={cn("mt-3 font-display text-sm text-ink hidden md:block")}>
                    {s.title}
                  </p>
                </button>
              </li>
            );
          })}
        </ol>

        {/* STEP 1 — Service */}
        <section hidden={step !== 1}>
          <h2 className="font-display text-2xl font-light">
            {stepTitles[0].title}
          </h2>
          <p className="mt-2 text-sm text-ink-soft">{stepTitles[0].body}</p>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {services.map((s) => {
              const checked = serviceSlug === s.slug;
              const Icon = SERVICE_ICONS[s.slug] ?? Stethoscope;
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => setService(s.slug)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-md border p-4 text-left transition-colors",
                      checked
                        ? "border-accent bg-accent/10"
                        : "border-line hover:border-ink",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border transition-colors",
                        checked
                          ? "border-accent bg-accent text-accent-ink"
                          : "border-line bg-bg-sunken text-ink-soft",
                      )}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-eyebrow text-ink-muted">{s.number}</p>
                      <p className="mt-1 font-display text-lg leading-snug">{s.name[locale]}</p>
                      <p className="mt-1 text-xs text-ink-muted">
                        {tCommon("priceFrom")} {s.priceFrom} {tCommon("currency")}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border",
                        checked ? "border-accent bg-accent text-accent-ink" : "border-line",
                      )}
                    >
                      {checked ? <Check size={12} strokeWidth={2.5} /> : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <StepNav
            onNext={() => setStep(2)}
            nextDisabled={!serviceSlug}
            locale={locale}
          />
        </section>

        {/* STEP 2 — Doctor */}
        <section hidden={step !== 2}>
          <h2 className="font-display text-2xl font-light">{stepTitles[1].title}</h2>
          <p className="mt-2 text-sm text-ink-soft">{stepTitles[1].body}</p>

          <ul className="mt-8 grid gap-3">
            <li>
              <button
                type="button"
                onClick={() => setDoctor("any")}
                className={cn(
                  "flex w-full items-center justify-between gap-4 rounded-md border p-4 text-left transition-colors",
                  doctorSlug === "any" ? "border-accent bg-accent/10" : "border-line hover:border-ink",
                )}
              >
                <span className="font-display">{tForm("anyDoctor")}</span>
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border",
                    doctorSlug === "any" ? "border-accent bg-accent text-accent-ink" : "border-line",
                  )}
                >
                  {doctorSlug === "any" ? <Check size={12} strokeWidth={2.5} /> : null}
                </span>
              </button>
            </li>
            {availableDoctors.map((d) => {
              const checked = doctorSlug === d.slug;
              return (
                <li key={d.slug}>
                  <button
                    type="button"
                    onClick={() => setDoctor(d.slug)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-md border p-4 text-left transition-colors",
                      checked ? "border-accent bg-accent/10" : "border-line hover:border-ink",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg-sunken font-display text-sm text-ink">
                        {d.initials}
                      </span>
                      <div>
                        <p className="font-display text-lg">{d.name[locale]}</p>
                        <p className="text-xs text-ink-muted">
                          {d.specialty[locale]} · {tCommon("yearsOfPractice", { years: d.years })}
                        </p>
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className={cn(
                        "inline-flex h-5 w-5 items-center justify-center rounded-full border",
                        checked ? "border-accent bg-accent text-accent-ink" : "border-line",
                      )}
                    >
                      {checked ? <Check size={12} strokeWidth={2.5} /> : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <StepNav
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            locale={locale}
          />
        </section>

        {/* STEP 3 — Date & Time */}
        <section hidden={step !== 3}>
          <h2 className="font-display text-2xl font-light">{stepTitles[2].title}</h2>
          <p className="mt-2 text-sm text-ink-soft">{stepTitles[2].body}</p>

          <div className="mt-8">
            <p className="text-eyebrow">{tForm("date")}</p>
            <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {dates.map((d) => (
                <li key={d.iso}>
                  <button
                    type="button"
                    onClick={() => setDate(d.iso)}
                    className={cn(
                      "flex min-w-[88px] flex-col items-center rounded-md border px-3 py-3 transition-colors",
                      date === d.iso ? "border-accent bg-accent/10" : "border-line hover:border-ink",
                    )}
                  >
                    <span className="font-mono text-xs uppercase text-ink-muted">
                      {d.label.split(",")[0]}
                    </span>
                    <span className="font-display text-xl text-ink">
                      {d.label.split(" ")[1]}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">
                      {d.label.split(" ")[2]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <p className="text-eyebrow">{tForm("time")}</p>
            <div className="mt-6 space-y-6">
              {(["morning", "midday", "afternoon", "evening"] as const).map((slot) => (
                <div key={slot}>
                  <p className="font-mono text-xs text-ink-muted">{tTimes(slot)}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {TIMESLOTS[slot].map((t) => (
                      <li key={t}>
                        <button
                          type="button"
                          onClick={() => setTime(t)}
                          disabled={!date}
                          className={cn(
                            "inline-flex h-10 min-w-[72px] items-center justify-center rounded-md border text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                            time === t
                              ? "border-accent bg-accent text-accent-ink"
                              : "border-line text-ink hover:border-ink",
                          )}
                        >
                          {t}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <StepNav
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
            nextDisabled={!date || !time}
            locale={locale}
          />
        </section>

        {/* STEP 4 — Confirm */}
        <section hidden={step !== 4}>
          <h2 className="font-display text-2xl font-light">{stepTitles[3].title}</h2>
          <p className="mt-2 text-sm text-ink-soft">{stepTitles[3].body}</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label={tForm("firstName")} name="firstName" required />
            <Field label={tForm("lastName")} name="lastName" required />
            <Field label={tForm("phone")} name="phone" type="tel" required />
            <Field label={tForm("email")} name="email" type="email" required />
          </div>
          <Textarea label={tForm("notes")} hint={tForm("notesHint")} />

          <label className="mt-6 flex items-start gap-3 text-sm text-ink-soft">
            <input type="checkbox" required className="mt-1 h-4 w-4 accent-accent" />
            <span>{tForm("consent")}</span>
          </label>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm text-ink hover:border-ink"
            >
              ←
            </button>
            <button
              type="submit"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-ink hover:bg-accent-soft"
            >
              {tForm("submit")}
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </div>
        </section>
      </form>

      {/* SUMMARY */}
      <aside className="lg:col-span-4">
        <div className="sticky top-28 rounded-xl border border-line bg-bg-raised p-6 shadow-sm">
          <p className="text-eyebrow">{t("summaryTitle")}</p>
          {!service ? (
            <p className="mt-6 text-ink-muted">{t("summaryEmpty")}</p>
          ) : (
            <dl className="mt-6 space-y-5 text-sm">
              <SummaryRow label={tForm("service")} value={service.name[locale]} />
              <SummaryRow
                label={tForm("doctor")}
                value={
                  doctorSlug === "any"
                    ? tForm("anyDoctor")
                    : doctors.find((d) => d.slug === doctorSlug)?.name[locale] || "—"
                }
              />
              <SummaryRow label={tForm("date")} value={date || "—"} />
              <SummaryRow label={tForm("time")} value={time || "—"} />
              <hr className="hairline" />
              <SummaryRow
                label={tCommon("priceFrom")}
                value={`${service.priceFrom} ${tCommon("currency")}`}
                mono
              />
            </dl>
          )}

          <hr className="hairline my-6" />
          <p className="text-xs text-ink-muted leading-relaxed">{t("insurance")}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="tel:+995322445577"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-ink px-4 text-sm text-ink hover:border-accent hover:text-accent"
          >
            <Phone size={14} strokeWidth={1.75} />
            {tForm("callUs")}
          </a>
          <a
            href="https://wa.me/995322445577"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-line px-4 text-sm text-ink-soft hover:border-accent hover:text-accent"
          >
            <MessageCircle size={14} strokeWidth={1.75} />
            {tForm("whatsapp")}
          </a>
        </div>
      </aside>
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  nextDisabled,
  locale,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  locale: Locale;
}) {
  return (
    <div className="mt-10 flex items-center gap-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm text-ink hover:border-ink"
        >
          ←
        </button>
      ) : null}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex h-12 items-center gap-2 rounded-md bg-ink px-6 text-sm font-medium text-bg transition-colors hover:bg-brand disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {locale === "ka" ? "შემდეგი" : locale === "ru" ? "Далее" : "Continue"}
        <ArrowRight size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-eyebrow text-ink-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 block w-full rounded-md border border-line bg-bg-sunken px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
      />
    </label>
  );
}

function Textarea({ label, hint }: { label: string; hint?: string }) {
  return (
    <label className="mt-5 block">
      <span className="text-eyebrow text-ink-muted">{label}</span>
      <textarea
        rows={4}
        className="mt-2 block w-full rounded-md border border-line bg-bg-sunken px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none"
      />
      {hint ? <span className="mt-2 block text-xs text-ink-muted">{hint}</span> : null}
    </label>
  );
}

function SummaryRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <dt className="text-eyebrow text-ink-muted">{label}</dt>
      <dd className={cn("text-right text-ink", mono && "text-numeral text-lg")}>{value}</dd>
    </div>
  );
}
