import type { Metadata } from "next";
import { Geist, Geist_Mono, Almarai } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { MetaPixel } from "@/components/meta/meta-pixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "طبيب تري | Tabibtree",
    template: "%s | طبيب تري",
  },
  description:
    "نظّم عيادتك كاملة — مواعيد، سجلات مرضى، حسابات، وتذكير واتساب. تطبيق عربي على الجوال. مجاني للبدء.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${almarai.variable} antialiased`}
      >
        <Analytics />
        <MetaPixel pixelId={process.env.META_PIXEL_ID} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
