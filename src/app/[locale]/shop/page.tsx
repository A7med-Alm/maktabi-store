"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { products, getCategories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

export default function ShopPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations();
  const isAr = locale === "ar";
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const categories = getCategories();
  const categoryLabels: Record<string, { en: string; ar: string }> = {
    all: { en: "All", ar: "الكل" },
    organization: { en: "Organization", ar: "تنظيم" },
    tech: { en: "Tech", ar: "تقنية" },
    furniture: { en: "Furniture", ar: "أثاث" },
    lighting: { en: "Lighting", ar: "إضاءة" },
    comfort: { en: "Comfort", ar: "راحة" },
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.includes(q) ||
          p.description.en.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "priceLow":
        result.sort((a, b) => a.retailPrice - b.retailPrice);
        break;
      case "priceHigh":
        result.sort((a, b) => b.retailPrice - a.retailPrice);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [category, sort, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t("common.shop")}</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder={t("common.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full ps-10 pe-4 py-2.5 bg-surface border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-surface border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
        >
          <option value="newest">{t("common.newest")}</option>
          <option value="priceLow">{t("common.priceLowHigh")}</option>
          <option value="priceHigh">{t("common.priceHighLow")}</option>
          <option value="rating">{t("common.rating")}</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["all", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              category === cat
                ? "bg-ink text-white"
                : "bg-surface border border-[var(--color-border)] text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {isAr ? categoryLabels[cat]?.ar : categoryLabels[cat]?.en}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted">
          <p className="text-lg">No products found</p>
        </div>
      )}
    </div>
  );
}
