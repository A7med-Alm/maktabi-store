import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  return (
    <footer className="border-t border-[var(--color-border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">{tc("storeName")}</h3>
            <p className="text-sm text-muted">{tc("tagline")}</p>
          </div>

          {/* Links */}
          <div>
            <nav className="flex flex-col gap-2 text-sm text-muted">
              <Link href={`/${locale}/shop`} className="hover:text-ink transition-colors">{tc("shop")}</Link>
              <Link href={`/${locale}/how-it-works`} className="hover:text-ink transition-colors">{tc("howItWorks")}</Link>
              <Link href={`/${locale}/about`} className="hover:text-ink transition-colors">{tc("about")}</Link>
            </nav>
          </div>

          {/* Academic info */}
          <div className="text-sm text-muted space-y-1">
            <p><span className="font-medium text-ink">{t("student")}:</span> Ahmed Almajed</p>
            <p><span className="font-medium text-ink">{t("course")}:</span> IAS430</p>
            <p><span className="font-medium text-ink">{t("instructor")}:</span> Abdulrahman Al-Saad</p>
            <p><span className="font-medium text-ink">{t("semester")}:</span> Fall 2025</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border)] text-center text-xs text-muted">
          © {new Date().getFullYear()} {tc("storeName")}. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}
