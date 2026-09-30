import type { Metadata } from "next";
import { Archivo, Averia_Serif_Libre, Geist, Geist_Mono, Manrope } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "../providers";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Éloure's heading face (Archivo Expanded on maisoneloure.com) — the wdth
// axis lets globals.css stretch it via font-stretch.
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin", "latin-ext"], axes: ["wdth"] });
// Eau de 1974's pairing on eaude1974.com: Averia Serif headings, Manrope body.
const averia = Averia_Serif_Libre({ variable: "--font-averia", subsets: ["latin"], weight: ["300", "400", "700"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin", "latin-ext"] });

// Fallback title/description for every route that doesn't set its own via
// generateMetadata (only the landing page does) — reuses the "landing"
// namespace so it stays in one place and translates per locale.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("landing");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${averia.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
