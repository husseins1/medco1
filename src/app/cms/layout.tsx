import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, FileText, FolderTree } from "lucide-react";

import { requireBlogOwner } from "@/lib/blog/owner";
import { Button } from "@/components/ui/Button";
import { Toaster } from "@/components/ui/Sonner";

export const metadata: Metadata = {
  title: {
    default: "لوحة تحكم المدونة",
    template: "%s | لوحة تحكم المدونة",
  },
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/cms", label: "المقالات", icon: FileText },
  { href: "/cms/categories", label: "التصنيفات", icon: FolderTree },
];

export default async function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const owner = await requireBlogOwner();

  return (
    <div dir="rtl" className="min-h-screen bg-muted/20 font-sans">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/cms" className="flex items-center" aria-label="لوحة تحكم المدونة">
              <Image
                src="/ttLogo.svg"
                alt="طبيب تري"
                width={160}
                height={81}
                className="h-7 w-auto"
              />
            </Link>
            <span className="hidden text-sm text-muted-foreground sm:block">
              {owner.email}
            </span>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/blog" target="_blank" rel="noopener noreferrer">
              عرض المدونة
              <ExternalLink aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <nav className="mx-auto -mb-px flex w-full max-w-6xl gap-1 px-4 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      <Toaster richColors position="top-center" />
    </div>
  );
}
