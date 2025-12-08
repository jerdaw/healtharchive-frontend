import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:
    "HealthArchive.ca – Independent archive of Canadian public health information",
  description:
    "HealthArchive.ca is an independent, non-governmental project preserving snapshots of key Canadian public health websites so that clinicians, researchers, journalists, and the public can see what was published even after it changes or disappears.",
  icons: {
    icon: "/healtharchive-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className="antialiased">
        <Script
          id="ha-theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var storageKey='ha-theme';var stored=window.localStorage.getItem(storageKey);var mql=window.matchMedia('(prefers-color-scheme: dark)');var systemPrefersDark=mql.matches;var theme='light';if(stored==='light'||stored==='dark'){theme=stored;}else{theme=systemPrefersDark?'dark':'light';}document.documentElement.dataset.theme=theme;}catch(e){}})();`,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-slate-900 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main
          id="main-content"
          className="pt-20 pb-10 sm:pt-24 sm:pb-12"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
