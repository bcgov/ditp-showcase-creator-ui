import React, { PropsWithChildren } from "react";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JSONPreview } from "@/components/json-preview";
import i18nConfig from "@/i18n.config";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import { Locale, PageParams } from "@/types";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}) {
  const locale = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});
 
  return {
    title: t('title'), 
    description: t('description'),
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

type Params = PropsWithChildren<{
  params: PageParams;
}>

export default async function RootLayout({
  children,
  params,
}: Params) {
  const { locale } = await params
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text">
              <NavBar/>
              {children}
              {process.env.NODE_ENV === "development" && <JSONPreview />}
              <Footer/>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
