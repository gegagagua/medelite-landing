"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { SmartImage } from "@/components/smart-image";
import { cn } from "@/lib/cn";
import { serviceImages, type Locale, type Service, type ServiceCategory } from "@/lib/content";

type Props = {
  services: Service[];
  locale: Locale;
  categoryLabels: Record<ServiceCategory, string>;
};

const CATEGORY_ORDER: ServiceCategory[] = [
  "internal",
  "surgical",
  "diagnostics",
  "women-children",
  "aesthetic",
  "mind-body",
];

export function ServicesGrid({ services, locale, categoryLabels }: Props) {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const [filter, setFilter] = useState<ServiceCategory | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? services : services.filter((s) => s.category === filter)),
    [filter, services],
  );

  return (
    <section className="container-wide py-12 md:py-16">
      <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label={t("filterBy")}>
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          {t("filterAll")}
        </FilterChip>
        {CATEGORY_ORDER.map((c) => (
          <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
            {categoryLabels[c]}
          </FilterChip>
        ))}
      </div>

      <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => {
          const photo = serviceImages[service.slug];
          return (
            <li key={service.slug}>
              <Link
                href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line/60 bg-bg transition-colors hover:border-line-strong"
              >
                {photo ? (
                  <div className="relative">
                    <SmartImage
                      src={photo.src}
                      alt={photo.alt[locale]}
                      aspect="aspect-[16/10]"
                      rounded="none"
                      grain={false}
                      wrapperClassName="border-b border-line/60"
                    />
                    <span className="absolute left-5 top-5 text-eyebrow text-ink bg-bg/85 px-2 py-1 rounded-sm backdrop-blur-sm">
                      {service.number}
                    </span>
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <span className="text-eyebrow text-ink-muted">
                      {categoryLabels[service.category]}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-light leading-tight text-ink group-hover:text-accent transition-colors">
                      {service.name[locale]}
                    </h3>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                      {service.short[locale]}
                    </p>
                  </div>
                  <div className="mt-8 flex items-end justify-between">
                    <div>
                      <p className="text-eyebrow text-ink-muted">{tCommon("priceFrom")}</p>
                      <p className="mt-1 text-numeral text-2xl text-ink">
                        {service.priceFrom} <span className="text-sm text-ink-muted">{tCommon("currency")}</span>
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-all group-hover:border-accent group-hover:text-accent group-hover:translate-x-0.5"
                    >
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 max-w-xl text-sm text-ink-muted">{t("priceDisplayed")}</p>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center rounded-sm border px-4 text-xs uppercase tracking-widest transition-colors",
        active
          ? "border-ink bg-ink text-bg"
          : "border-line text-ink-soft hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
