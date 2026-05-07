"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/shop`, label: t("shop") },
    { href: `/${locale}/how-it-works`, label: t("howItWorks") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-paper)]/80 backdrop-blur-xl shadow-sm border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-xl sm:text-2xl font-bold tracking-tight text-ink"
          >
            {t("storeName")}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-accent ${
                  pathname === link.href ? "text-accent font-medium" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={switchLocale}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors px-2 py-1 rounded-lg hover:bg-[var(--color-border)]/50"
              title="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span>{locale === "ar" ? "EN" : "عربي"}</span>
            </button>

            <Link
              href={`/${locale}/cart`}
              className="relative p-2 rounded-lg hover:bg-[var(--color-border)]/50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-[var(--color-border)]/50"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted hover:text-ink transition-colors border-b border-[var(--color-border)] last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
