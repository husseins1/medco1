import type { Metadata } from "next";

import { LpHeader } from "@/components/landingpage/lp-header";
import { LpFooter } from "@/components/landingpage/lp-footer";

export const metadata: Metadata = {
  title: {
    default: "مدونة طبيب تري",
    template: "%s | مدونة طبيب تري",
  },
  description:
    "مقالات ونصائح حول إدارة العيادات، تنظيم المواعيد، تجربة المرضى، والتحول الرقمي في القطاع الصحي.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-background font-sans">
      <LpHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-10 pb-16 sm:px-6">
        {children}
      </main>
      <LpFooter />
    </div>
  );
}
