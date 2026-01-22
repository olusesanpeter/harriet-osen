import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SmoothScroll from "@/components/SmoothScroll";

const graphik = localFont({
  src: [
    {
      path: "../../public/fonts/graphik/web/Graphik-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/graphik/web/Graphik-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/graphik/web/Graphik-Medium.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["sans-serif"],
});

const canela = localFont({
  src: [
    {
      path: "../../public/fonts/canela/Canela-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["serif"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const libreCaslon = localFont({
  src: [
    {
      path: "../fonts/LibreCaslonCondensed-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/LibreCaslonCondensed-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-caslon",
  display: "swap",
  fallback: ["serif"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${graphik.variable} ${canela.variable} ${instrumentSerif.variable} ${libreCaslon.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
