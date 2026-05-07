"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import {
  ShoppingCart,
  Send,
  Truck,
  Package,
  Eye,
  EyeOff,
  BookOpen,
  ArrowDown,
} from "lucide-react";

export default function HowItWorksPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("howItWorksPage");
  const tc = useTranslations("common");
  const [transparency, setTransparency] = useState(false);
  const isAr = locale === "ar";

  const steps = [
    { icon: ShoppingCart, title: t("step1Title"), desc: t("step1Desc"), num: "01" },
    { icon: Send, title: t("step2Title"), desc: t("step2Desc"), num: "02" },
    { icon: Truck, title: t("step3Title"), desc: t("step3Desc"), num: "03" },
    { icon: Package, title: t("step4Title"), desc: t("step4Desc"), num: "04" },
  ];

  const concepts = [
    { title: t("concept1Title"), desc: t("concept1Desc") },
    { title: t("concept2Title"), desc: t("concept2Desc") },
    { title: t("concept3Title"), desc: t("concept3Desc") },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-muted text-lg leading-relaxed max-w-3xl mb-12">
        {t("intro")}
      </p>

      {/* Flow Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((step, i) => (
          <div key={step.num} className="relative">
            <div className="bg-surface border border-[var(--color-border)] rounded-2xl p-6 h-full">
              <span className="text-accent text-xs font-bold">{step.num}</span>
              <step.icon className="w-8 h-8 text-ink mt-3 mb-3" />
              <h3 className="font-bold text-sm mb-2">{step.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden lg:flex absolute top-1/2 -end-3 transform -translate-y-1/2 z-10">
                <ArrowDown className={`w-5 h-5 text-accent ${isAr ? "rotate-90" : "-rotate-90"}`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Transparency Mode */}
      <div className="bg-ink text-white rounded-3xl p-8 sm:p-10 mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">{tc("transparencyMode")}</h2>
            <p className="text-white/60 text-sm">{tc("transparencyDesc")}</p>
          </div>
          <button
            onClick={() => setTransparency(!transparency)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              transparency
                ? "bg-accent text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {transparency ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {transparency
              ? isAr ? "إخفاء" : "Hide"
              : isAr ? "كشف" : "Reveal"}
          </button>
        </div>

        {transparency && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                locale={locale}
                showTransparency
              />
            ))}
          </div>
        )}
      </div>

      {/* Course Concepts */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-6 h-6 text-accent" />
          <h2 className="text-2xl sm:text-3xl font-bold">{t("courseTitle")}</h2>
        </div>
        <p className="text-muted mb-8 max-w-3xl">{t("courseIntro")}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((concept, i) => (
            <div
              key={i}
              className="bg-surface border border-[var(--color-border)] rounded-2xl p-6 hover:border-accent/40 transition-colors"
            >
              <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded-lg mb-4">
                {isAr ? `مفهوم ${i + 1}` : `Concept ${i + 1}`}
              </span>
              <h3 className="font-bold mb-3">{concept.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{concept.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
