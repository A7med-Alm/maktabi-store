"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ShoppingBag, Star } from "lucide-react";
import { Product, formatPrice } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { useToast } from "./Toast";

type Props = {
  product: Product;
  locale: string;
  showTransparency?: boolean;
};

export default function ProductCard({ product, locale, showTransparency }: Props) {
  const t = useTranslations("common");
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToast();
  const name = locale === "ar" ? product.name.ar : product.name.en;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.show(t("addedToCart"));
  };

  return (
    <Link
      href={`/${locale}/product/${product.slug}`}
      className="group block bg-surface rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg hover:shadow-[var(--color-border)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[var(--color-paper)] overflow-hidden">
        <img
          src={product.images[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
            <span className="bg-white text-ink text-xs font-medium px-3 py-1 rounded-full">
              {t("outOfStock")}
            </span>
          </div>
        )}
        <button
          onClick={handleAdd}
          className="absolute bottom-3 end-3 bg-ink text-white p-2.5 rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-sm leading-snug mb-2 line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-accent font-bold">
            {formatPrice(product.retailPrice, locale)}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </div>
        </div>

        {showTransparency && (
          <div className="mt-3 pt-3 border-t border-[var(--color-border)] text-xs space-y-1">
            <div className="flex justify-between text-muted">
              <span>{t("sourcePrice")}</span>
              <span>{formatPrice(product.sourcePrice, locale)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>{t("retailPrice")}</span>
              <span>{formatPrice(product.retailPrice, locale)}</span>
            </div>
            <div className="flex justify-between font-medium text-green-700">
              <span>{t("margin")}</span>
              <span>{((1 - product.sourcePrice / product.retailPrice) * 100).toFixed(0)}%</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
