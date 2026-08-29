import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Ivory Silk Collective — Premium Digital Products",
    template: "%s — Ivory Silk Collective",
  },
  description:
    "A premium marketplace for beautifully designed digital products: templates, presets, fonts, and brand kits. Guest checkout. Instant download.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#faf7f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-ivory text-ink [overflow-wrap:anywhere]">
        <a
          href="#main-content"
          className="sr-only z-50 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ink focus:px-4 focus:py-2 focus:text-micro focus:text-ivory focus:outline-none"
        >
          Skip to content
        </a>
        <TooltipProvider>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </TooltipProvider>
        <Toaster theme="light" position="bottom-right" gap={8} />
      </body>
    </html>
  );
}
