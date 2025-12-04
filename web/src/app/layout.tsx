import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "HealthArchive.ca – Independent archive of Canadian public health information",
    template: "%s · HealthArchive.ca",
  },
  description:
    "HealthArchive.ca is an independent, non-governmental project preserving snapshots of Canadian public health websites so changes over time remain visible.",
  metadataBase: new URL("https://healtharchive.ca"),
  openGraph: {
    title:
      "HealthArchive.ca – Independent archive of Canadian public health information",
    description:
      "Volunteer-led project preserving snapshots of Canadian public health websites, so clinicians, researchers, journalists, and the public can see what was published even after it changes or disappears.",
    url: "https://healtharchive.ca",
    siteName: "HealthArchive.ca",
    type: "website",
  },
  twitter: {
    card: "summary",
    title:
      "HealthArchive.ca – Independent archive of Canadian public health information",
    description:
      "Independent, non-governmental archive of Canadian public health information and data.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1 pb-10 pt-4 sm:pt-6">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

