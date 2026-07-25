import Image from "next/image";
import Link from "next/link";

import { landingContent } from "@/lib/i18n/landing";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${landingContent.brand.name} — الرئيسية`}
        >
          <Image
            src="/ttLogo.svg"
            alt={landingContent.brand.name}
            width={160}
            height={81}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="التنقل الرئيسي"
        >
          {landingContent.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/signup">{landingContent.navCta.login}</Link>
          </Button>
          <Button
            asChild
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/signup">{landingContent.navCta.signup}</Link>
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
