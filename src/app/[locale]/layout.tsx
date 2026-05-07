import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

const ibmAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ar",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en",
});

const locales = ["ar", "en"];

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();
  const messages = await getMessages();
  const isAr = locale === "ar";

  return (
    <html lang={locale} dir={isAr ? "rtl" : "ltr"}>
      <body
        className={`${ibmAr.variable} ${inter.variable} ${
          isAr ? "font-ar" : "font-en"
        } min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <Toast />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
