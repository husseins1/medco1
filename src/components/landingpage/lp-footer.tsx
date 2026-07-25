import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";

/** Minimal centered footer — logo, tagline, quick links, copyright. */
export function LpFooter() {
  const { footer, brand, contact, nav } = landingContent;

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <Image
          src="/ttLogo.svg"
          alt={brand.name}
          width={160}
          height={81}
          className="h-9 w-auto"
        />
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {footer.description}
        </p>
        <nav
          aria-label="روابط سريعة"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand/80"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {footer.whatsappLabel}
          </a>
        </nav>
        <p className="text-xs text-muted-foreground">{footer.copyright}</p>
      </div>
    </footer>
  );
}
