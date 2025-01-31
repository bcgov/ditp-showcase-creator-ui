import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JSONPreview } from "@/components/json-preview";
import i18nConfig from "@/i18n.config";
import IntlProvider from "@/providers/intl-provider";
import {PageParams} from "@/types";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DITP Showcase Creator",
  description: "Create your own showcase for the DITP",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: PageParams;
}>) {
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <IntlProvider locale={locale}>
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text">
              <NavBar locale={locale}/>
              {children}
              {process.env.NODE_ENV === "development" && <JSONPreview />}
              <Footer locale={locale}/>
            </div>
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
