import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.name} — Founder workshops in Toronto`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  robots:
    site.demo || site.origin.includes("localhost")
      ? { index: false, follow: false }
      : { index: true, follow: true },
  openGraph: {
    title: `${site.name} — Founder workshops in Toronto`,
    description: site.description,
    url: "/",
    type: "website",
    siteName: site.name,
    locale: "en_CA",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Founder workshops in Toronto`,
    description: site.description,
    images: ["/opengraph-image"],
  },
};
export const viewport: Viewport = {
  themeColor: "#F3F0E8",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <head>
        <link
          rel="preload"
          href="/fonts/barlow-condensed-800.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
