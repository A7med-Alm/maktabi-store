import { useTranslations } from "next-intl";
import Link from "next/link";
import { products, getCategories, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, ArrowLeft, Package, RefreshCw, Truck } from "lucide-react";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations();
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const featured = products.slice(0, 4);
  const categories = getCategories();

  const categoryLabels: Record<string, { en: string; ar: string }> = {
    organization: { en: "Organization", ar: "تنظيم" },
    tech: { en: "Tech", ar: "تقنية" },
    furniture: { en: "Furniture", ar: "أثاث" },
    lighting: { en: "Lighting", ar: "إضاءة" },
    comfort: { en: "Comfort", ar: "راحة" },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight whitespace-pre-line">
              {t("hero.headline")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-2 mt-8 bg-ink text-white px-8 py-4 rounded-2xl text-sm font-medium hover:bg-accent transition-colors group"
            >
              {t("hero.cta")}
              <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        {/* Decorative accent */}
        <div className="absolute top-20 end-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-1/3 w-96 h-96 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          {t("common.categories")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/${locale}/shop?category=${cat}`}
              className="bg-surface border border-[var(--color-border)] rounded-2xl p-6 text-center hover:border-accent hover:shadow-md transition-all group"
            >
              <span className="text-sm font-medium group-hover:text-accent transition-colors">
                {isAr ? categoryLabels[cat]?.ar : categoryLabels[cat]?.en}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {t("common.featured")}
          </h2>
          <Link
            href={`/${locale}/shop`}
            className="text-sm text-accent hover:underline flex items-center gap-1"
          >
            {t("common.viewAll")}
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
            />
          ))}
        </div>
      </section>

      {/* How it works teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-ink text-white rounded-3xl p-8 sm:p-12 lg:p-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            {t("howItWorksTeaser.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Package, text: t("howItWorksTeaser.step1"), num: "01" },
              { icon: RefreshCw, text: t("howItWorksTeaser.step2"), num: "02" },
              { icon: Truck, text: t("howItWorksTeaser.step3"), num: "03" },
            ].map(({ icon: Icon, text, num }) => (
              <div key={num} className="flex items-start gap-4">
                <span className="text-accent text-sm font-bold">{num}</span>
                <div>
                  <Icon className="w-5 h-5 text-accent mb-2" />
                  <p className="text-sm text-white/80">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/how-it-works`}
            className="inline-flex items-center gap-2 mt-8 bg-white text-ink px-6 py-3 rounded-xl text-sm font-medium hover:bg-accent hover:text-white transition-colors group"
          >
            {t("howItWorksTeaser.cta")}
            <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
