import type { Metadata } from "next";
import { Geist, Geist_Mono, Almarai } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
