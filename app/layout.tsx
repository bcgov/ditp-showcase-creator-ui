import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JSONPreview } from "@/components/json-preview";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DITP Showcase Creator",
  description: "Create your own showcase for the DITP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text">
            <NavBar />
            {children}
            {process.env.NODE_ENV === "development" && <JSONPreview />}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
