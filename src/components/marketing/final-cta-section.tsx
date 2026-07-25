import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { Button } from "@/components/ui/Button";

export function FinalCtaSection() {
  const { finalCta } = landingContent;

  return (
    <section className="bg-brand py-16 lg:py-24" aria-labelledby="final-cta-title">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2
          id="final-cta-title"
          className="text-3xl font-extrabold tracking-tight text-brand-foreground text-balance sm:text-4xl"
        >
          {finalCta.title}
        </h2>
        <p className="mt-4 text-lg text-brand-foreground/80">
          {finalCta.subtitle}
        </p>

        <Button
          size="lg"
          asChild
          className="mt-8 h-12 bg-white px-8 text-base font-bold text-brand hover:bg-white/90"
        >
          <Link href="/signup">
            {finalCta.cta}
            <ArrowLeft aria-hidden="true" />
          </Link>
        </Button>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {finalCta.trustSignals.map((signal) => (
            <li
              key={signal}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-foreground/80"
            >
              <BadgeCheck className="size-4" aria-hidden="true" />
              {signal}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
