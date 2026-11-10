"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const topicOptions = t.raw("topicOptions") as string[];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Mock submission — the real integration will hit the CRM adapter in src/lib/crm.
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-line bg-bg-raised p-6 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent text-accent">
          <Check size={18} strokeWidth={1.75} />
        </span>
        <p className="mt-6 font-display text-xl text-ink">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} name="name" required />
        <Field label={t("email")} name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("phone")} name="phone" type="tel" />
        <Select label={t("topic")} name="topic" options={topicOptions} />
      </div>
      <Textarea label={t("message")} name="message" required />

      <label className="mt-2 flex items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-accent" />
        <span>{t("consent")}</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-ink px-6 text-sm font-medium text-bg transition-colors hover:bg-brand disabled:opacity-60"
      >
        {loading ? "···" : t("submit")}
      </button>
    </form>
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
    <label className="group block">
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

function Textarea({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-eyebrow text-ink-muted">{label}</span>
      <textarea
        name={name}
        rows={5}
        required={required}
        className="mt-2 block w-full rounded-md border border-line bg-bg-sunken px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none"
      />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-eyebrow text-ink-muted">{label}</span>
      <select
        name={name}
        className="mt-2 block w-full rounded-md border border-line bg-bg-sunken px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled>
          —
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
