import Link from "next/link";
import Image from "next/image";
import { HelpCircle, Menu } from "lucide-react";
import { DocsSidebar } from "@/components/help/DocsSidebar";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: {
    default: "مركز المساعدة",
    template: "%s | مركز المساعدة — طبيب تري",
  },
  description:
    "مركز مساعدة طبيب تري — شروحات خطوة بخطوة لكل أقسام النظام: المواعيد، المرضى، الفواتير، التذكيرات والمزيد.",
};

interface HelpLayoutProps {
  children: React.ReactNode;
}

export default function HelpLayout({ children }: HelpLayoutProps) {
  return (
    <div dir="rtl" className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex shrink-0 items-center" aria-label="طبيب تري — الرئيسية">
              <Image
                src="/ttLogo.svg"
                alt="طبيب تري"
                width={160}
                height={81}
                className="h-7 w-auto"
              />
            </Link>
            <span className="hidden h-6 w-px bg-border sm:block" />
            <Link
              href="/help"
              className="hidden items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand/80 transition-colors sm:flex"
            >
              <HelpCircle className="size-4" aria-hidden="true" />
              مركز المساعدة
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/signup">ابدأ مجاناً</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">دخول</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Mobile topics toggle */}
          <details className="lg:hidden group">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm font-semibold text-brand">
              <span>أقسام المساعدة</span>
              <Menu className="size-4" aria-hidden="true" />
            </summary>
            <div className="mt-3 rounded-xl border border-border bg-background p-3">
              <DocsSidebar />
            </div>
          </details>

          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-xl border border-border bg-muted/20 p-4 custom-scrollbar">
              <DocsSidebar />
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1 pb-16">{children}</main>
        </div>
      </div>
    </div>
  );
}
