import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, languageTags } from "@/i18n/routing";
import { siteOrigin } from "@/i18n/site";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "../globals.css";
import "../home.css";
import "../experience.css";
import "@/components/hero/hero.css";
import "@/components/home/platform-at-work.css";
import "../olive-signature.css";

export const metadata: Metadata = {
  metadataBase: siteOrigin(),
  title: "Enterprise Agentic AI Platform | From conversation to execution",
  description: "AI agents that understand intent, access trusted enterprise knowledge, orchestrate capabilities and execute real actions across your business systems.",
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("ui");
  return <html lang={languageTags[locale]} suppressHydrationWarning>
    <body>
      <a className="skip-link" href="#main">{t("skip")}</a>
      <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
    </body>
  </html>;
}
