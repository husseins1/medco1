import { Plus } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { SectionHeader } from "./section-header";

export function FaqSection() {
  const { faq } = landingContent;

  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-muted/40 py-16 lg:py-24"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader badge={faq.badge} title={faq.title} id="faq-title" />

        <div className="mx-auto max-w-3xl space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-border bg-background open:border-brand/40"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  className="size-5 shrink-0 text-brand transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
