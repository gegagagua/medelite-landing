import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");
  return (
    <section className="container-wide min-h-[70svh] flex flex-col justify-center py-32">
      <p className="font-mono text-6xl text-accent">404</p>
      <h1 className="mt-8 text-display">{t("notFoundTitle")}</h1>
      <p className="mt-6 max-w-xl text-lead">{t("notFoundBody")}</p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-ink px-5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          ← {t("backHome")}
        </Link>
      </div>
    </section>
  );
}
