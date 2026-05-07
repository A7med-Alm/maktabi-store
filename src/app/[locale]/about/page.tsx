import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("aboutPage");
  const tc = useTranslations("common");
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="text-muted text-lg leading-relaxed mb-6">{t("description")}</p>
      <p className="text-muted leading-relaxed mb-6">{t("mission")}</p>
      <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6 mb-8">
        <p className="text-sm leading-relaxed text-ink/70">{t("academic")}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center justify-center gap-2 bg-ink text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-accent transition-colors group"
        >
          {tc("shop")}
          <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </Link>
        <Link
          href={`/${locale}/how-it-works`}
          className="inline-flex items-center justify-center gap-2 border border-[var(--color-border)] text-ink px-6 py-3 rounded-2xl text-sm font-medium hover:border-accent hover:text-accent transition-colors"
        >
          {tc("howItWorks")}
        </Link>
      </div>
    </div>
  );
}
