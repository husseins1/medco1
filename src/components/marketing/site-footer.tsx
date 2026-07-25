import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";

export function SiteFooter() {
  const { footer, brand, contact } = landingContent;

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Image
              src="/ttLogo.svg"
              alt={brand.name}
              width={160}
              height={81}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footer.description}
            </p>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/15"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span>{footer.whatsappLabel}</span>
              <span dir="ltr" className="text-xs text-muted-foreground">
                {contact.whatsappDisplay}
              </span>
            </a>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-4 text-sm font-bold text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-brand"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
