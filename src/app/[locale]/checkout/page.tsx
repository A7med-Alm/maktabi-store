"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { CheckCircle, ExternalLink } from "lucide-react";

export default function CheckoutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("checkoutPage");
  const tc = useTranslations("common");
  const { items, getTotal, clearCart } = useCartStore();
  const isAr = locale === "ar";
  const [mounted, setMounted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    // Open each supplier link
    items.forEach((item, i) => {
      setTimeout(() => {
        window.open(item.product.sourceUrl, "_blank");
      }, i * 500);
    });
    clearCart();
  };

  if (!mounted) return null;

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">{t("orderConfirmed")}</h1>
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 mt-6">
          <p className="text-sm leading-relaxed text-ink/80">{t("orderMessage")}</p>
        </div>
        <p className="mt-4 text-sm text-muted">{t("redirecting")}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 mt-8 bg-ink text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-accent transition-colors"
        >
          {t("backHome")}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">{tc("emptyCart")}</h1>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-2 mt-4 bg-ink text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-accent transition-colors"
        >
          {tc("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
          {[
            { key: "name", type: "text" },
            { key: "email", type: "email" },
            { key: "phone", type: "tel" },
            { key: "address", type: "text" },
            { key: "city", type: "text" },
          ].map(({ key, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1.5">
                {t(key as any)}
              </label>
              <input
                type={type}
                required
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-accent text-white py-4 rounded-2xl font-medium hover:bg-accent/90 transition-colors mt-6"
          >
            {t("placeOrder")}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-[var(--color-border)] rounded-2xl p-5 sticky top-24">
            <h2 className="font-bold mb-4">{tc("cart")}</h2>
            <div className="space-y-3">
              {items.map((item) => {
                const name = isAr ? item.product.name.ar : item.product.name.en;
                return (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted line-clamp-1 flex-1">
                      {name} × {item.quantity}
                    </span>
                    <span className="font-medium ms-3">
                      {formatPrice(item.product.retailPrice * item.quantity, locale)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[var(--color-border)] mt-4 pt-4 flex justify-between font-bold">
              <span>{tc("total")}</span>
              <span className="text-accent">{formatPrice(getTotal(), locale)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
