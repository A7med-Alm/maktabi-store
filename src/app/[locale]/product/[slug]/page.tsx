"use client";

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  getProductBySlug,
  formatPrice,
  getPlatformName,
} from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/Toast";
import {
  Star,
  Truck,
  ShoppingBag,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";

export default function ProductPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const t = useTranslations("common");
  const product = getProductBySlug(slug);
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToast();
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const isAr = locale === "ar";

  if (!product) return notFound();

  const name = isAr ? product.name.ar : product.name.en;
  const desc = isAr ? product.description.ar : product.description.en;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.show(t("addedToCart"));
  };

  const handleBuyNow = () => {
    window.open(product.sourceUrl, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted">
        <Link href={`/${locale}`} className="hover:text-ink transition-colors">
          {t("home")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/shop`} className="hover:text-ink transition-colors">
          {t("shop")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--color-paper)] border border-[var(--color-border)]">
            <img
              src={product.images[selectedImg]}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImg === i
                      ? "border-accent"
                      : "border-[var(--color-border)] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            {name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-[var(--color-border)]"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              {product.rating} ({product.reviewCount} {t("reviews")})
            </span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <span className="text-3xl font-bold text-accent">
              {formatPrice(product.retailPrice, locale)}
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 text-muted leading-relaxed">{desc}</p>

          {/* Shipping */}
          <div className="flex items-center gap-2 mt-6 text-sm text-muted">
            <Truck className="w-4 h-4" />
            <span>
              {t("shipping")}: {product.shippingDays} {t("days")}
            </span>
          </div>

          {/* Stock */}
          <div className="mt-3">
            <span
              className={`text-sm font-medium ${
                product.inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.inStock ? t("inStock") : t("outOfStock")}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-8">
            <span className="text-sm font-medium">{t("quantity")}</span>
            <div className="flex items-center border border-[var(--color-border)] rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 hover:bg-[var(--color-paper)] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 hover:bg-[var(--color-paper)] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-ink text-white py-4 rounded-2xl font-medium hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              {t("addToCart")}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 bg-accent text-white py-4 rounded-2xl font-medium hover:bg-accent/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t("viewOnPlatform", { platform: getPlatformName(product.sourcePlatform) })}
            </button>
          </div>

          {/* Source badge */}
          <p className="mt-4 text-xs text-muted text-center">
            {isAr ? "مصدر المنتج:" : "Sourced from:"}{" "}
            {getPlatformName(product.sourcePlatform)}
          </p>
        </div>
      </div>
    </div>
  );
}
