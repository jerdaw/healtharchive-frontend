import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:
    "HealthArchive.ca – Independent archive of Canadian public health information",
  description:
    "HealthArchive.ca is an independent, non-governmental project preserving snapshots of key Canadian public health websites so that clinicians, researchers, journalists, and the public can see what was published even after it changes or disappears.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-20 pb-10 sm:pt-24 sm:pb-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

