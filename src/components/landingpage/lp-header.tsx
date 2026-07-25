import Image from "next/image";
import Link from "next/link";

import { landingContent } from "@/lib/i18n/landing";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/marketing/mobile-nav";

/** Floating pill navbar — sticky, blurred, rounded-full. */
export function LpHeader() {
  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-5xl px-4 sm:px-6 font-sans">
      <div className="flex h-14 items-center justify-between gap-4 rounded-full border border-border/70 bg-background/80 ps-5 pe-2 shadow-sm backdrop-blur-md">
        <Link
          href="/landingpage"
          className="flex shrink-0 items-center"
          aria-label={`${landingContent.brand.name} — الرئيسية`}
        >
          <Image
            src="/ttLogo.svg"
            alt={landingContent.brand.name}
            width={160}
            height={81}
            priority
            className="h-8 w-auto"
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
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            size="lg"
            asChild
            className="rounded-full bg-brand px-6 text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/signup">{landingContent.navCta.signup}</Link>
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
