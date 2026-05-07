"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function CartPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("common");
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">{t("cart")}</h1>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 skeleton rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-[var(--color-border)] mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t("emptyCart")}</h1>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-2 mt-4 bg-ink text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-accent transition-colors"
        >
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("cart")}</h1>

      <div className="space-y-4">
        {items.map((item) => {
          const name = isAr ? item.product.name.ar : item.product.name.en;
          return (
            <div
              key={item.product.id}
              className="flex gap-4 bg-surface border border-[var(--color-border)] rounded-2xl p-4"
            >
              <img
                src={item.product.images[0]}
                alt={name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link
                  href={`/${locale}/product/${item.product.slug}`}
                  className="font-medium text-sm sm:text-base hover:text-accent transition-colors line-clamp-1"
                >
                  {name}
                </Link>
                <p className="text-accent font-bold mt-1">
                  {formatPrice(item.product.retailPrice, locale)}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-[var(--color-border)] rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-[var(--color-paper)] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-[var(--color-paper)] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-surface border border-[var(--color-border)] rounded-2xl p-6">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>{t("total")}</span>
          <span className="text-accent">{formatPrice(getTotal(), locale)}</span>
        </div>
        <Link
          href={`/${locale}/checkout`}
          className="flex items-center justify-center gap-2 w-full mt-4 bg-ink text-white py-4 rounded-2xl font-medium hover:bg-accent transition-colors group"
        >
          {t("proceedCheckout")}
          <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
