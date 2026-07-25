"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";

export function LpMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={landingContent.navCta.openMenuLabel}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="sr-only">
            {landingContent.navCta.mobileMenuLabel}
          </SheetTitle>
          <Image
            src="/ttLogo.svg"
            alt={landingContent.brand.name}
            width={160}
            height={81}
            className="h-9 w-auto"
          />
        </SheetHeader>
        <nav
          className="flex flex-col gap-1 px-4"
          aria-label={landingContent.navCta.mobileMenuLabel}
        >
          {landingContent.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 p-4">
          <Button variant="outline" asChild>
            <Link href="/signup">{landingContent.navCta.login}</Link>
          </Button>
          <Button
            asChild
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/signup">{landingContent.navCta.signup}</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
